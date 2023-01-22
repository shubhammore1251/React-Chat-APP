import React from 'react'
import "./InputBox.css";

const InputBox = ({message, setMessage , sendMessage}) => {
  return (
    <form className='form'>
        <input
          className='input'
          placeholder='Message'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
        />

        <button className="sendButton" onClick={(event)=> sendMessage(event)}>Send</button>
    </form>
  )
}

export default InputBox