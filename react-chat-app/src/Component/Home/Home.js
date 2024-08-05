import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Chatbar from "../Chatbar/Chatbar";
import Mainbar from "../Mainbar/Mainbar";
import axios from "axios";

const Home = (props) => {
  const [profile, setProfile] = useState([]);
  const [selectedUser,setSelectedUser]= useState([]);
  const [room,setRoom] = useState([]);
  const [messages, setMessages] = useState([]);






  useEffect(() => {
    axios
      .get("http://localhost:4000/api/profile")
      .then((response) => {
        // console.log(" profile response", response.data.data.rows);
        setProfile( response.data.data.rows);
      })
      .catch((err) => console.log(`something went wrong`, err));
  }, [profile])
  return (
    <>
      <div className="row py-2 maindiv bg-slate-50 mx-auto  ">
        <div className="col-md-1 col-sm-1">
          <Sidebar user={props.user} />
        </div>
        <div className="col-md-3 col-sm-3">
          <Chatbar profile={profile}  selectedUser={selectedUser} setSelectedUser={setSelectedUser} user={props.user} setRoom ={setRoom} room = {room}/>
        </div>
        <div className="col-md-8 col-sm-8">
          <Mainbar profile={profile}  selectedUser={selectedUser} setSelectedUser={setSelectedUser} setRoom ={setRoom} room = {room} setMessages={setMessages} messages={messages}/>
        </div>
      </div>
    </>
  );
};

export default Home;
