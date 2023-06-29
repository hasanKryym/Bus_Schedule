import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import checkAuth from '../../checkAuth'
import Login_register from '../login-register/Login_register'
import profileimage from '../../images/programming icon.png'
import './Profile.css'
import EditProfile from './EditProfile'
import checkAdmin from '../../checkAdmin'

const Profile = () => {

  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState({});
  const [showLoginFrom, setShowLoginForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const logout = () => {
    setShowProfile(false);
    setShowLoginForm(true);
    localStorage.clear();
  }

  const fetchUserData = async (url, params) => {
    try {
      const user_id = localStorage.getItem('user_id');
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/v1/users/${user_id}`, {
        headers: {Authorization: `${token}`}
      });

      const data = await response.json();
      setUserData(data[0])
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    let loggedIn = checkAuth();
    loggedIn.then((res) => {
      if (res === true) {
        fetchUserData();
        setShowLoginForm(false);
        setShowProfile(true);
      }
      else {
        setShowProfile(false);
        setShowLoginForm(true);
      }
    });

    let is_admin = checkAdmin();
    is_admin.then((res) => {
      if (res === true) 
      setIsAdmin(true);
      else 
      setIsAdmin(false);
    })
  },[]);

   useEffect(() => {
      fetchUserData();
    },[showEditForm]);

  const editProfile = () => {
    setShowEditForm(true);
  }

  const closeEditForm = () => {
    fetchUserData();
    setShowEditForm(false);
  }

  return (
    <>
    {showProfile && 
    <div className="container">

	<div className="card">
		
		<div className="top-container">
			
			<img src={profileimage} alt="" className="img-fluid profile-image" width="70"/>
			<div className="ml-3">
				<h5 className="name">{userData.user_name}</h5>
				<p className="mail">{userData.user_email}</p>
			</div>
		</div>


		<div className="middle-container d-flex justify-content-between align-items-center mt-3 p-2">
				<div className="dollar-div px-3">
					
					

				</div>
				<div className="d-flex flex-column text-right mr-2">
					<span className="current-balance">phone number: </span>
					<span className="amount"><span className="dollar-sign"></span>{userData.user_number}</span>
				</div>

		</div>

		<div className="btn_container">
			<button onClick={editProfile} className='edit_btn'>Edit</button>
      <button onClick={logout} className="logout_btn">Logout</button>
		</div>

    {isAdmin && 
    <div className='admin'>
      <Link className='admin_link' to='/adminPanel'><span>Admin Panel</span><i className="fa-solid fa-lock"></i></Link>
    </div>
    }
		
	</div>
	
</div>
    }

    {!showProfile && showLoginFrom && <Login_register/>}

    {showEditForm &&
    <EditProfile userData={userData} closeEditForm={closeEditForm}/>
    }
    </>
  )
}

export default Profile