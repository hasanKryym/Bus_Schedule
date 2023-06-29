import React, { useEffect, useState } from 'react'
import './AddSchedule.css';


const AddSchedule = () => {

  const [schedules, SetSchedules] = useState([]);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [loading, setLoading] = useState(true);
  const [addNewScheduleForm, setAddNewScheduleForm] = useState(false);

  const [inputs, setInputs] = useState({
    shedule_time: '',
    schedule_day: ''
  });

  const {schedule_time, schedule_day } = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value});
  }

  const getSchedule = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/v1/schedule', {
        headers: {Authorization: `${token}`}
      });

      const parseRes = await response.json();
      SetSchedules(parseRes);
      setLoading(false);

    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getSchedule();
  },[])

  const deleteSchedule = async (e) => {
    
      try {
        const token = localStorage.getItem('token');
        const id = e;
        const response = await fetch(`http://localhost:5000/api/v1/schedule/${id}`, {
          method: 'DELETE',
          headers: {Authorization: `${token}`}
        });
        const parseRes = await response.json();
        if(parseRes.success)
        getSchedule();
        else 
        alert(parseRes.msg);

      } catch (err) {
        console.error(err.message);
      }
    }


    const addNewSchedule = async (e) => {
      e.preventDefault();
      if (schedule_day && schedule_time) {
        try {
          const token = localStorage.getItem('token');
          const body = {schedule_time, schedule_day};
          const response = await fetch('http://localhost:5000/api/v1/schedule', {
            method: 'POST',
            headers: {Authorization: `${token}`, "Content-Type": "application/json"},
            body: JSON.stringify(body)
          });
    
          const parseRes = await response.json();
          if(parseRes.success){
            getSchedule();
            setAddNewScheduleForm(false);
          }else {
            alert(parseRes.msg);
          }
          
        } catch (err) {
          console.error(err.message);
        }
      }else {
        alert('please fill the inputs');
      }
    }

    return (
      <>
      <div className='scheule_add-container'>
        <button onClick={() => setAddNewScheduleForm(true)} className='add_schedule'><i className="fa-solid fa-plus"></i></button>
        {
        schedules.map((schedule) => {
          return <article id={schedule.schedule_id} key={schedule.schedule_id} className='schedule_add-article'>
            <div>
            <h3>{schedule.schedule_day}</h3>
            <p>{schedule.schedule_time}</p>
            </div>
  
            <div className='delete_schedule'>
              <button onClick={(e) => deleteSchedule(e.currentTarget.parentElement.parentElement.id)} className='delete_schedule'><i className="fa-solid fa-trash"></i></button>
            </div>
          </article>
        })
        }
  
        {addNewScheduleForm && <div className="edit_form_container">
          <form className="edit_form" onSubmit={addNewSchedule}>
              <div className="edit_form-close_btn">
                  <button onClick={() => setAddNewScheduleForm(false)}><i className="fa-solid fa-xmark"></i></button>
              </div>
        <div className="title">Add Schedule</div>
        <div className="subtitle">Enter your new schedule</div>
  
        <div className="input-container ic1">
          <input onChange={e => onChange(e)} list='days' name='schedule_day' id='schedule_day' />
          <datalist id='days'>
            <option value="Monday"></option>
            <option value="Tuesday"></option>
            <option value="Wednesday"></option>
            <option value="Thursday"></option>
            <option value="Friday"></option>
            <option value="Saturday"></option>
            <option value="Sunday"></option>
          </datalist>
        </div>
        <div className="input-container ic1">
          <input onChange={e => onChange(e)} list='time' name='schedule_time' id='schedule_time' />
          <datalist id='time'>
            <option value="8:00:00"></option>
            <option value="9:30:00"></option>
            <option value="12:30:00"></option>
            <option value="14:00:00"></option>
            <option value="15:30:00"></option>
            <option value="17:00:00"></option>
          </datalist>
        </div>
        {/* <div className="input-container ic1">
          <input id="schedule_time" className="input" type="text" placeholder=" " name='schedule_time' onChange={e => onChange(e)}/>
          <div className="cut"></div>
          <label htmlFor="name" className="placeholder">time</label>
        </div> */}
  
        {/* <div className="input-container ic1">
          <input id="schedule_day" className="input" type="text" placeholder=" " name='schedule_day' onChange={e => onChange(e)}/>
          <div className="cut"></div>
          <label htmlFor="email" className="placeholder">day</label>
        </div> */}

        <div className='add_newSchedule-container'>
        <button type='submit' className='add_newSchedule'>Add</button>
        </div>
      </form>
  
      </div>}
      </div>
      </>
    )
    }



export default AddSchedule