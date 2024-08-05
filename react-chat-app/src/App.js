
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, json, Route, Routes } from 'react-router-dom';
import Sidebar from './Component/Sidebar/Sidebar';
import Home from './Component/Home/Home';
import Chatbar from './Component/Chatbar/Chatbar';
import Mainbar from './Component/Mainbar/Mainbar';
import Signin from './Component/Auth/Signin';
import Signup from './Component/Auth/Signup';
import Notification from './Notification';
import { useState } from 'react';



function App() {

  const [user,setUser] = useState([]);
  // console.log("app.js data" ,JSON.stringify(user))

  return (
    <div className="App">
       <BrowserRouter>
          <Routes>

            <Route path='/' element={<Signin user={user} setUser={setUser} />} /> 
            <Route path='signup' element={<Signup/>} /> 
            <Route path='home' element={<Home user={user}/>} /> 

          </Routes>
       
       </BrowserRouter>
       <Notification/>
    </div>
  );
}

export default App;
