import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Day.css'

const Day = ({schedule_day}) => {

    const [showTime, setShowTime] = useState(false);

    const props = {
        morning: {
            schedule_day,
            time: 'Morning'
        },
        afternoon: {
            schedule_day,
            time: 'Afternoon'
        }
    }

  return (
    <>
    <article className='admin_days-articel'>
        <div className='admin_days-articel_container'>
        <p>{schedule_day}</p>
        <button onClick={() => setShowTime(!showTime)} className='show_detail-btn'>
            {
                showTime ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>
            }
        </button>
        </div>
    {showTime && 
    <div className='time_article-container'>
        <article className='time_article'>
            <button className='show_detail-btn'>
                <Link to='/adminSchedule' state={props.morning}>Morning</Link>
            </button>
            <button className='show_detail-btn'>
                <Link to='/adminSchedule' state={props.afternoon}>Afternoon</Link>
            </button>
        </article>
    </div>
    }
    </article>

    </>
  )
}

export default Day