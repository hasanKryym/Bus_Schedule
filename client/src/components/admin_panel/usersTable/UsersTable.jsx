import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './UsersTable.css';
import Loading from '../../loading/Loading';
import UsersTableRows from './UsersTableRows';

const UsersTable = () => {

    const location = useLocation();
    const schedule_info = location.state;

    const {schedule_day, schedule_time} = schedule_info;

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSchedule = async () => {
        try {
            const token = localStorage.getItem('token');
            const body = {schedule_day, schedule_time};
            const response = await fetch('http://localhost:5000/api/v1/adminPanel/getUsersSchedule', {
                method: 'POST',
                headers: {Authorization: `${token}`, "Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = await response.json();
            setUsers(parseRes);
            setIsLoading(false);
        } catch (err) {
            console.error(err.message);
        }

    }

    useEffect(() => {
        fetchSchedule();
    },[])

  return (
    <>
    {!isLoading &&

    <div className='schedule_day-container'>
        {/* <h2>{schedule_day}</h2> */}
        <div className="table-wrapper">
    <table className="fl-table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Number</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {users.map((user, index) => {
            return <UsersTableRows key={index} {...user}/>
        })}
        
        </tbody>
    </table>
</div>
    </div>
    }

    {isLoading && <Loading/>}
    </>
  )
}

export default UsersTable