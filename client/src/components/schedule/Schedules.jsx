import React, { useEffect, useState } from 'react'
import checkAuth from '../../checkAuth'
import Schedule from './Schedule';
import { Link } from 'react-router-dom'
import './Schedules.css'
import Loading from '../loading/Loading';

const Schedules = () => {
  const [showSchedules, setShowSchedules] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [registeredSchedule, setRegisteredSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
     let loggedIn = checkAuth();
     loggedIn.then((res) => {
       if(res === true) {
         setShowSchedules(true);
         getRegisteredSchdeule();
         fetchScehdules();
         setLoading(false);
       }
       else {
         setShowSchedules(false);
         setLoading(false);
       }
    });
    
  },[]);

  const fetchScehdules = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/v1/schedule', {
        headers: {Authorization: `${token}`}
      });
      const parseRes = await response.json();
      setSchedules(parseRes);
    } catch (err) {
      console.log(err.message);
    }
  }

  const getRegisteredSchdeule = async() => {
    try {
      const user_id = localStorage.getItem('user_id');
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/v1/schedule/registration/${user_id}`, {
        headers: {Authorization: `${token}`}
      });
      const parseRes = await response.json();
      setRegisteredSchedule(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
    {showSchedules && !loading &&
    <div className='body_container'>
      {days.map((day, index) => {
        return <div key={index} className='schedule_container'>
          <h2>{day}</h2>
          <div> 
          {schedules.map((schedule, index) => {
            if (schedule.schedule_day === day){
              let isRegistered = false;
              registeredSchedule.map((e) => {
                if (schedule.schedule_id === e.schedule_id)
                isRegistered = true;
              })
              return <Schedule showSchedules={showSchedules} isRegistered={isRegistered} key={index} {...schedule}/> 
            }
          })}
          </div>
        </div>
      })}

    </div>
    }

        {
          !showSchedules && !loading &&
          <div className='not_loggedIn-container'>
            <h3>Please login to access schedule</h3>
              <Link className='login_btn' to='/login_register'>Login</Link>
            </div>
        }

        {loading && 
        <Loading/>
        }
    

      </>
  )
}

export default Schedules