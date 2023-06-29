import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import './Login-register.css'
import { Link } from 'react-router-dom'
import checkAuth from '../../checkAuth'
import Profile from '../profile/Profile'

const Login_register = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [inputs, setInputs] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_number: "",
  });

  const {user_name, user_email, user_password, user_number } = inputs;

  const onChange = (e) => {
    // inputs[e.target.name] = 'hasan'
    // setInputs(inputs)
    setInputs({...inputs, [e.target.name] : e.target.value});
  }


  useEffect(() => {
    abc();

    // (async () => {

    // })();

  },[])

  const abc = async () => {
     const loggedIn = await checkAuth();
     if(loggedIn === true) {
      setShowForm(false);
    }
    else {
      setShowForm(true);
    }
  }

  const signup = async (e) => {
    e.preventDefault();
    try {
      if (user_name && user_email && user_password && user_number){
       const body = {user_name, user_email, user_password, user_number};
       const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
       });

       const parseRes = await response.json();

       if(parseRes.token){
         localStorage.setItem('token', parseRes.token);
         localStorage.setItem('user_id', parseRes.user_id)
         setShowForm(false);
       }

      }
      
    } catch (err) {
      console.log(err.message);
    }
  }

  const Login = async(e) => {
    e.preventDefault();
    try {
      if (user_email && user_password){
       const body = {user_email, user_password};
       const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: 'POST',
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
       });

       const parseRes = await response.json();
       if(parseRes.token){
         localStorage.setItem('token', parseRes.token);
         localStorage.setItem('user_id', parseRes.user_id);
         setShowForm(false);
       }else {
        setInputs({...inputs, user_email : '', user_password: ''});
        alert('Invalid email/password combination');
       }
      

      }
      
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <Fragment>
      <div className="container">
        <input type="chekbox" id='check' />
        
        {!showLogin && showForm &&

        <div className="signup form">
            <header>Signup</header>
            <form onSubmit={signup}>
              <input type="text" name="user_name" placeholder='name'
              value={user_name} 
              onChange={e => onChange(e)}
          />
              <input type="email" name="user_email" placeholder='email' 
              value={user_email} 
              onChange={e => onChange(e)}
          />
              <input type="password" name="user_password" placeholder='password'
              value={user_password} 
              onChange={e => onChange(e)}
          />
              <input type="number" name="user_number" placeholder='Phone number'
              value={user_number} 
              onChange={e => onChange(e)}
          />
              <input type="submit" className="button" value="Signup"/>
            </form>
            <div className="signup">
               <span className="signup">Already have an account?
                <button onClick={() => {setShowLogin(true)}}>login</button>
              </span>
            </div>
          </div>
        }


        {showLogin && showForm &&
        <div className='login form'>
          <header>Login</header>
          <form onSubmit={Login}>
            <input type="email" name="user_email" placeholder='email' 
              value={user_email} 
              onChange={e => onChange(e)}
          />
            <input type="password" name="user_password" placeholder='password'
              value={user_password} 
              onChange={e => onChange(e)}
          />
            <input type="submit" className="button" value="Login"/>
          </form>

          <div className="signup">
            <span className="signup">Don't have an account?
            <button onClick={() => {setShowLogin(false)}}>Sign up</button>
            </span>
          </div>
        </div>
        }
        
        {!showForm && 
        <>
        <Profile/>
        </>
        }
        
  
      </div>

    </Fragment>   
  )
}

export default Login_register
