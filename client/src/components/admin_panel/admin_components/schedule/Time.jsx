import React from 'react'
import { Link } from 'react-router-dom'
import '../Day.css'
const Time = ({schedule_time, schedule_day}) => {

    const props = {
        schedule_day,
        schedule_time
    }
  return (
    <div className="time_container">
    <div className='admin_days-articel_container'>
        <h2>{schedule_time}</h2>
        <button className='show_detail-btn_time'>
                <Link to='/usersTable' state={props}>Show Schedule</Link>
            </button>
    </div>
    </div>
  )
}

export default Time