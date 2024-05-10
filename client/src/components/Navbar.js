import React from 'react'
import { NavLink , useHistory } from 'react-router-dom'
import '../App.css';
const Navbar = () => {
  return (
    <div>
        <div className="navbar">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/signup">Signup</NavLink></li>
            </ul>
        </div>
    </div>
  )
}


export default Navbar