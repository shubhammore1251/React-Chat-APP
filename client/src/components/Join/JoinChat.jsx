import React, { useState } from "react";
import "./JoinChat.css";
import { Link } from "react-router-dom";
import joinImage from "../../assests/images/join.svg";


const JoinChat = () => {

  const [user, setUser] = useState({ name: "", room: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="join-chat-container">
      <div className="inner-join-chat-container">
        <img className="joinchat-image" src={joinImage} alt="join-img" />

        <h1 className="heading">Realtime Chatroom</h1>

        <div className="input-container">
          <div className="inputleft">
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
              className="inputbox"
              placeholder="Room"
              onChange={handleChange}
            />
          </div>
        </div>

        <Link
          onClick={(e) =>
            !user.name || !user.room ? e.preventDefault() : null
          }
          to={`/chat?name=${user.name}&room=${user.room}`}
        >
          <button className="button mt-50" type="submit">
            Join →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinChat;
