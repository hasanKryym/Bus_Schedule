import React, { useState } from 'react'
import './EditProfile.css'

const EditProfile = ({closeEditForm, userData}) => {

    const [inputs, setInputs] = useState({
    user_name: `${userData.user_name}`,
    user_password: "",
    user_number: `${userData.user_number}`
  });

  const {user_name, user_password, user_number } = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value});
  }

  const editFrom = async (e) => {
    e.preventDefault();
      try {
        if (user_name && user_password && user_number){
            const token = localStorage.getItem('token');
            const user_id = localStorage.getItem('user_id');
            if (token && user_id) {
                const body = {user_name, user_password, user_number};
                const response = await fetch(`http://localhost:5000/api/v1/users/${user_id}`, {
                    method: 'PATCH',
                    headers: {Authorization: `${token}`, "Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                });

                const parseRes = await response.json();
                if (parseRes.success) {
                    closeEditForm();
                }else {
                    console.error(parseRes.msg);
                }
            }else {
                alert('please login');
            }
        }else {
            alert('please fill all the inputs')
        }
    } catch (err) {
        console.error(err.message);
    }
  }
  return (
    <>
    <div className="edit_form_container">
        <form className="edit_form" onSubmit={editFrom}>
            <div className="edit_form-close_btn">
                <button onClick={closeEditForm}><i className="fa-solid fa-xmark"></i></button>
            </div>
      <div className="title">Edit Profile</div>
      <div className="subtitle">Enter your new data</div>
      <div className="input-container ic1">
        <input id="name" className="input" type="text" placeholder=" " name='user_name' value={user_name} onChange={e => onChange(e)}/>
        <div className="cut"></div>
        <label htmlFor="name" className="placeholder">Name</label>
      </div>

      <div className="input-container ic2">
        <input id="password" className="input" type="password" placeholder=" " name='user_password' value={user_password} onChange={e => onChange(e)}/>
        <div className="cut"></div>
        <label htmlFor="password" className="placeholder">Password</label>
      </div>
      <div className="input-container ic2">
        <input id="number" className="input" type="number" placeholder=" " name='user_number' value={user_number} onChange={e => onChange(e)}/>
        <div className="cut cut-short"></div>
        <label htmlFor='number' className="placeholder">phone</label>
      </div>
      <button type="submit" className="submit">Edit</button>
    </form>

    </div>
    </>
  )
}

export default EditProfile