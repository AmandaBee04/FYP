import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoSkullSharp } from "react-icons/io5";
import '../../Css/Student/StudentTimeout.css';

export default function StudentTimeout({ onClose }) {

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match this duration with the CSS transition duration
  };

  return (
    <>
      <div className={`st-popup-overlay ${isVisible ? 'stlc-show-popup' : 'stlc-hide-popup'}`}>
        <div className={`st-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aalc-close" onClick={handleClose}>X</button>
          <h2><IoSkullSharp/>Times Up<IoSkullSharp/></h2>
        </div>
      </div>
    </>
  );
}
