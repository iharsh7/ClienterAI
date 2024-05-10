import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const Login = () => {
  const navigate = useNavigate();
  const [data,setData] = useState({
    phoneno:"",
    password:""
  });

  const checkId = (event)=>{
    const name = event.target.name;
    const value = event.target.value;

      setData({...data,[name]:value});

  }
  const verifyId = async(e)=>{

    e.preventDefault();
    const {phoneno,password} = data;
    console.log(phoneno);
    console.log(password);
    
    const tyru = await fetch("/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        phoneno,password
      })
    });
    const daaata =  tyru.json();
    console.log(daaata);
    navigate("/about");
    }
  return (
    <>
       {/* <Navbar/> */}

    <div className="containerlogin">
      <form  method="POST">
      <input type="tel" name="phoneno" value={data.phoneno} onChange={checkId} placeholder="Ur Email-Id"/>
      <input type="password" name="password" value={data.password} onChange={checkId} placeholder="Ur password"/>
      <button type="submit" onClick={verifyId}>Log In</button>
      </form>
    </div>
    
    </>
  )
}

export default Login