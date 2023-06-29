import React, { useEffect, useState } from 'react'
import Loading from '../../loading/Loading';
import Day from './Day';
const Days = () => {

    const [loading,SetLoading] = useState(true);
    const [scheduleDays, setScheduleDays] = useState([]);

    const orderDays = (days_array) => {
        let orderedDays_array = [];
        days_array.map((day) => {
            if (day.schedule_day === 'Monday')
            orderedDays_array[0] = day.schedule_day;
            else if (day.schedule_day === 'Tuesday')
            orderedDays_array[1] = day.schedule_day;
            else if (day.schedule_day === 'Wednesday')
            orderedDays_array[2] = day.schedule_day;
            else if (day.schedule_day === 'Thursday')
            orderedDays_array[3] = day.schedule_day;
            else if (day.schedule_day === 'Friday')
            orderedDays_array[4] = day.schedule_day;
            else if (day.schedule_day === 'Saturday')
            orderedDays_array[5] = day.schedule_day;
            else 
            orderedDays_array[6] = day.schedule_day;
            setScheduleDays(orderedDays_array);
            SetLoading(false);
        })
    }

    const getDays = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/v1/schedule/getDays', {
                headers: {Authorization: `${token}`}
            });

            const parseRes = await response.json();
            orderDays(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getDays();
    },[])
  return (
    <div>
        {!loading && scheduleDays.map((day, index) => {
            return <Day key={index} schedule_day={day}/>
        })}

        {loading && <Loading/>}
    </div>
  )
}

export default Days