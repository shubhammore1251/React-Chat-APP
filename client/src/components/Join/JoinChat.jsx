import React, { useState } from "react";
import './JoinChat.css'
import { Link } from "react-router-dom";


const JoinChat = () => {
  // const [name, setName] = useState("");

  // const [room, setRoom] = useState("");
  
  const [user, setUser] = useState({ name: "", room: ""});

  const handleChange = (e) => {
    setUser({...user,[e.target.name]: e.target.value});
  };

  return (
    <div className="join-chat-container">
      <div className="inner-join-chat-container">
        <h1 className="heading">Join</h1>
        <div>
          <input
            type="text"
            value={user.name}
            name="name"
            className="inputbox"
            placeholder="Name"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            value={user.room}
            name="room"
            className="inputbox mt-20"
            placeholder="Room"
            onChange={handleChange}
          />
        </div>

        <Link
          onClick={(e) => (!user.name || !user.room ? e.preventDefault() : null)}
          
          to={`/chat?name=${user.name}&room=${user.room}`}
        >
          <button className="button mt-20" type="submit">
            SignIn
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinChat;
