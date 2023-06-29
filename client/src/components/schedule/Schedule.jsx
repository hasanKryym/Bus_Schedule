import React, { useState } from 'react'

const Schedule = ({showSchedules, isRegistered, schedule_id, schedule_time, schedule_day}) => {

  const [registered, setIsRegistered] = useState(isRegistered);

  const registerSchedule = async(m) => {
    try {
      const user_id = localStorage.getItem('user_id');
      const token = localStorage.getItem('token');
      const body = {schedule_id};
      if (user_id && token) {
        const response = await fetch(`http://localhost:5000/api/v1/schedule/registration/${user_id}`, {
          method: m,
          headers: {Authorization: `${token}`, "Content-Type" : "application/json"},
          body: JSON.stringify(body)
        })
        const parseRes = await response.json();
        if (parseRes.success === true){
          if( m === 'POST')
          setIsRegistered(true);
          if (m === 'DELETE') 
          setIsRegistered(false);
        }
        else {
          alert(parseRes.msg);
        }
      }
      else{
        console.error('provide user_id and schedule_id');
      }

    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <article className='schedule_article'>
      
      <div className='schedule_date'>
      <p>{schedule_time}</p>
      </div>
      
      {showSchedules && !registered &&
      <button onClick={() => registerSchedule('POST')} className='schedule_register'>Register</button>
      }
      {showSchedules && registered &&
      <button onClick={() => registerSchedule('DELETE')} className='schedule_unregister'>unregister</button>
      }
    </article>
  )
}

export default Schedule