import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import InputBox from "../InputBox/InputBox";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";

// const ENDPOINT = 'localhost:5000';

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {
     
    });

    return () => {
      socket.disconnect();
      socket.off();
    }

  }, [location.search]);



  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
    
    socket.on('roomData', ({users}) => {
      setUsers(users);
    });

  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);
  

  return (
    <div className="chat-container">
      <div className="inner-chat-container">
        <InfoBar room={room}/>

        <Messages messages={messages} name={name}/>
        
        <InputBox message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>

      <TextContainer users={users}/>
    </div>
  );
};

export default Chat;
