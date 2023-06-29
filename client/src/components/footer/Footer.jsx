import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <nav>
            {/* <ul className='nav-list'>
                <li><a href='#'><i className="fa-solid fa-dumbbell"></i></a></li>
                <li><a href='#'><i className="fa-solid fa-pen-to-square"></i></a></li>
                <li><a href='#'><i className="fa-brands fa-nutritionix"></i></a></li>
                <li><a href='#'><i className="fa-solid fa-newspaper"></i></a></li>
            </ul> */}

            <ul className='nav-list'>
                
                <li>
                  <Link className='first' to='/'><i className="fa-solid fa-clock"></i></Link>
                </li>

                <li>
                  <Link className='last' to='profile'><i className="fa-solid fa-user"></i></Link>
                </li>

            </ul>
      </nav>
    </footer>
  )
}

export default Footer