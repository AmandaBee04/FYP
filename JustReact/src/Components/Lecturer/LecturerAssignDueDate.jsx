import React, { useState, useRef, useEffect } from 'react';
import { FaThumbsUp } from "react-icons/fa";
import '../../Css/Lecturer/LecturerAssignDueDate.css';

export default function LecturerAssignDueDate({ onClose }) {
  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const thumbsUpTimeoutRef = useRef(null);

  const handleMouseEnterYes = () => {
    thumbsUpTimeoutRef.current = setTimeout(() => {
      setShowThumbsUp(true);
    }, 500); // 500ms delay before showing the thumbs up icon
  };

  const handleMouseLeaveYes = () => {
    clearTimeout(thumbsUpTimeoutRef.current);
    setShowThumbsUp(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match this duration with the CSS transition duration
  };

  return (
    <div className={`ladd-popup-overlay ${isVisible ? 'ladd-show-popup' : 'ladd-hide-popup'}`}>
      <div className={`ladd-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
        <button className="ladd-close" onClick={handleClose}>X</button>
        <h2>DUE DATE?</h2>
        <div className="ladd-input">
          <input type="date" />
        </div>
        <div className="ladd-buttons">
          <div className="ladd-yes-btn">
            <button
              onMouseEnter={handleMouseEnterYes}
              onMouseLeave={handleMouseLeaveYes}
              onClick={handleClose} // Close the popup when Confirm is clicked 
            >
              {showThumbsUp ? <FaThumbsUp /> : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
