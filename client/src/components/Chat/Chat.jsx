import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import InputBox from "../InputBox/InputBox";
import Messages from "../Messages/Messages";

import loader from "../../assests/images/loader.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const location = useLocation();
  const ENDPOINT = process.env.REACT_APP_CHAT_SERVER;

  const notify = (message) => toast.error(message);
  
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        notify(error)
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    }

  }, [ENDPOINT,location.search]);



  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  
  }, [messages]);
   

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };


  return (
    
    <div className="chat-container">
    {messages.length>0 ? 
      <div className="inner-chat-container">
        <InfoBar room={room}/>
        
        <Messages messages={messages} name={name}/>
        
        <InputBox message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
     :
     <img src={loader} alt="loader" />
    }

      <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </div>
 
  );
};

export default Chat;
