import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './AdminPanel.css'
import Days from './admin_components/Days';

const AdminPanel = () => {

  const [showAddUser, setShowAddUser] = useState(false);

  const [inputs, setInputs] = useState({
    user_name: '',
    user_email: '',
    user_password: "",
    user_number: '',
    is_admin: false
  });

  const {user_name, user_email, user_password, user_number, is_admin } = inputs;

  const onChange = (e) => {
    if(e.target.name != 'is_admin')
    setInputs({...inputs, [e.target.name] : e.target.value});
    else 
      setInputs({...inputs, [e.target.name] : e.target.checked});
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (user_name && user_email && user_password && user_number){
        const body = {user_name, user_email, user_password, user_number, is_admin};
       const response = await fetch("http://localhost:5000/api/v1/users", {
        method: 'POST',
        headers: {Authorization: `${token}`,"Content-Type" : "application/json"},
        body: JSON.stringify(body)
       });

       const parseRes = await response.json();
       if (parseRes.success) {
         setShowAddUser(false);
        alert(parseRes.msg);
       }else {
        alert(parseRes.msg);
       }
      }else {
        alert('please fill all the inputs');
      }
    } catch (err) {
      console.error(err.message);
    }
  }
    
  return (
    <>
    <div className='Admin_panel-container'>
      <h2 className='schedule_title'>Schedule</h2>
        <Days/>
    </div>

    <div className='show_users_btn'>
      <Link to='/showUsers'>
        <button className='admin_panel-btn'>show users</button>
      </Link>

      <button onClick={() => setShowAddUser(true)} className='admin_panel-btn add'>Add User</button>

    </div>
    <div className='add_schedule-btn_container'>
    <Link to='/addSchedule'>
      <button className='admin_panel-btn add'>Add schedule</button>
    </Link>
    </div>

    {showAddUser && 
      <div className="edit_form_container">
        <form className="edit_form" onSubmit={submitForm}>
            <div className="edit_form-close_btn">
                <button onClick={() => setShowAddUser(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
      <div className="title">Add User</div>
      <div className="subtitle">Enter your new user</div>


      <div className="input-container ic1">
        <input id="name" className="input" type="text" placeholder=" " name='user_name' onChange={e => onChange(e)}/>
        <div className="cut"></div>
        <label htmlFor="name" className="placeholder">Name</label>
      </div>

      <div className="input-container ic1">
        <input id="email" className="input" type="email" placeholder=" " name='user_email' onChange={e => onChange(e)}/>
        <div className="cut"></div>
        <label htmlFor="email" className="placeholder">email</label>
      </div>

      <div className="input-container ic2">
        <input id="password" className="input" type="password" placeholder=" " name='user_password' onChange={e => onChange(e)}/>
        <div className="cut"></div>
        <label htmlFor="password" className="placeholder">Password</label>
      </div>

      <div className="input-container ic2">
        <input id="number" className="input" type="number" placeholder=" " name='user_number' value={user_number} onChange={e => onChange(e)}/>
        <div className="cut cut-short"></div>
        <label htmlFor='number' className="placeholder">phone</label>
      </div>

      <div className='check-is_admin'>
        <label htmlFor="is_admin">
          is_admin
        </label>
      <input 
          type="checkbox"
          name="is_admin"
          onChange={e => onChange(e)}
        />
      </div>

      <div className='submit-add_user-container'>
      <button className='submit-add_user' type='submit'>Submit</button>
      </div>

      
    </form>

    </div>
    }
    </>
  )
}

export default AdminPanel