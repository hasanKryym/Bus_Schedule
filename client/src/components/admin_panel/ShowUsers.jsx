import React, { useEffect, useState } from 'react'
import './ShowUsers.css'
import Loading from '../loading/Loading'
const ShowUsers = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/v1/users', {
        headers: {Authorization: `${token}`}
      });

      const parseRes = await response.json();
      setUsers(parseRes);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  const deleteUser = async (user_id) => {
    // e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/v1/users/${user_id}`, {
        method: 'DELETE',
        headers: {Authorization: `${token}`}
      });
      const parseRes = await response.json();
      if(parseRes.success)
      fetchUsers();
      else 
      alert(parseRes.msg);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  },[])

  return (
    <>
    {isLoading && <Loading/>}

    {!isLoading && 
      <div className="table-wrapper">
    <table className="fl-table">
        <thead>
        <tr>
            <th>Name</th>
            <th>Phone NB</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        

        {users.map((user) => {
          return <tr id={user.user_id} key={user.user_id}>
            <td className={user.is_admin ? 'admin_user' : undefined}>{user.user_name}</td>
            <td className={user.is_admin ? 'admin_user' : undefined}>{user.user_number}</td>
            <td><button onClick={(e) => deleteUser(e.currentTarget.parentElement.parentElement.id)} className='delete_user-btn'><i className="fa-solid fa-trash"></i></button></td>
        </tr>
        })}
        </tbody>
    </table>
</div>
    }
    </>
  )
}

export default ShowUsers