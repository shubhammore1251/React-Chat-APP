import React from "react";
import "./InputBox.css";
import SendIcon from "../../assests/Icons/send.png";

const InputBox = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="form">
      <input
        className="input"
        placeholder="Message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />

      <button className="sendButton" onClick={(event) => sendMessage(event)}>
        <img src={SendIcon} alt="send-icon" className="send-icon" />
      </button>
    </form>
  );
};

export default InputBox;
