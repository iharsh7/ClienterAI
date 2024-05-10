import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes } from 'react-router-dom';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Wonder from './components/Wonder';
function App() {
  return (
   <>
   {/* <Navbar/> */}
   {/* <h1>HELLO</h1> */}
   <Routes>
    <Route path="/wonder" element={<Wonder/>}/>
  <Route path="/" element={<Home />} >
  {/* <Route path="about" element={<About />} /> */}
  <Route path="signup" element={<Signup />} />
  <Route path="login" element={<Login />} />
  </Route>
</Routes>
  
   </>
  );
}

export default App;
