import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
// import object from '../uploads'
const Home = () => {
   const navigate = useNavigate([]);
   const [image,setImage]=useState([]);
   useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/getImage');
        const fetchedImages = res.data.map(item => item.file);
        setImage(fetchedImages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
   },[])
  //  const [file, setFile] = useState(null);
  //  const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleFileUpload = async () => {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     const res = await fetch("/upload", formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     console.log(res.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
       <Navbar/>

    <h1>
      <button onClick={()=>{
        navigate("about")
      }}>click</button>
    </h1>
    <img src="../uploads/1715332495957-profileImage.png" alt="No image" />
    <h1>File Upload</h1>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="profileImage" />
      <button type='submit'>Upload</button>
      </form>
      <h4>File size cannot exceed 1MB</h4>
      {/* <img src="../../../server/uploads/1715310412419-profileImage.jpg" alt="No image" /> */}
      <h5>IMAGE ABOVE</h5>
      {(image.length!==0)?
      image.map((ele,index)=>{
        return(
          <>
          
          <h1>
            {ele}
          </h1>
          {/* <div key={index}> */}
          <img src={`../uploads/${ele}`} alt={`Image ${index}`} />
        {/* </div> */}

          </>
        )
      }):" "
    }

    <Outlet/>
    </>
  )
}

export default Home