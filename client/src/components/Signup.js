import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Signup = () => {
  const navigate = useNavigate();
  const [uname,setFname] = useState({
    firstname:"",
    lastname:"",
    phoneno:"",
    email:"",
    password:""
  });
  const postData = async(e)=>{
    e.preventDefault();
    const {firstname,lastname,phoneno,email,password} = uname;
    
    const datafetch = await fetch("/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        firstname,lastname,phoneno,email,password
      })
    });
    const data = await datafetch.json();
    navigate("/login");
    }
    let name,value;
  const inputEvent = (e)=>{
    // console.log(e.target);
   value = e.target.value;
   name = e.target.name;
  setFname({...uname, [name]:value});
  }
  
  return (
    <div>
         {/* <Navbar/> */}

      <h1>Welcome {uname.firstname} {uname.lastname}</h1>
      <form   method="POST">
        <input type="text" name="firstname"   value={uname.firstname} onChange={inputEvent} placeholder='Enter ur first name'/>
        <input type="text" name="lastname"  value={uname.lastname} onChange={inputEvent} placeholder='Enter ur last name'/>
        <input type="tel" name="phoneno"  value={uname.phoneno} onChange={inputEvent} placeholder='Enter ur tel-no'/>
        <input type="email" name="email" value={uname.email} onChange={inputEvent} placeholder="Enter ur email" />
        <input type="password" name="password"  value={uname.password} onChange={inputEvent} placeholder='Enter ur password'/>
        <button type="submit" onClick={postData}>Submit</button>
      </form>
    </div>
  )
}

export default Signup