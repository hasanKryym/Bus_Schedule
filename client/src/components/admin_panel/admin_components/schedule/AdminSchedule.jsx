import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Loading from '../../../loading/Loading';
import './Morning.css'
import Time from './Time';
const AdminSchedule = () => {

    const location = useLocation();
    const schedule_info = location.state;

    const {schedule_day, time} = schedule_info;

    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSchedule();
    },[])
    
    const fetchSchedule = async () => {
        try {
            const token = localStorage.getItem('token');
            const body = {schedule_day, time};
            const response = await fetch('http://localhost:5000/api/v1/schedule/morning_afternoon_schedule', {
                method: 'POST',
                headers: {Authorization: `${token}`, "Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            setSchedules(parseRes);
            setIsLoading(false);
            
        } catch (err) {
            console.error(err.message);
        }
    }
  return (
    <>
    {!isLoading &&
    <div className='schedule_time'>
        <h1 className='schedule_day'>{schedule_day}</h1>
        {schedules.map((schedule, index) => {
            return <Time key={index} schedule_day={schedule_day} schedule_time={schedule.schedule_time}/>
        })}
    </div>
    }

    {isLoading && <Loading/>}
    </>
  )
}

export default AdminSchedule