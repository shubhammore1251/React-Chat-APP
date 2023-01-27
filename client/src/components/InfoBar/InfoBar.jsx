import React from "react";
import "./InfoBar.css";
import onlineIcon from '../../assests/Icons/onlineIcon.png';
import closeIcon from '../../assests/Icons/closeIcon.png';

const InfoBar = ({room}) => {
  return (
    <div className="infoBar">
      <div className="left-inner-container">
        <img className="onlineicon" src={onlineIcon} alt="online-img" />
        <h3>{room}</h3>
      </div>

      <div className="right-inner-container">
        <a href="/">
          <img src={closeIcon} alt="close-img" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
