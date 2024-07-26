import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Lecturer/LecturerMarkConfirmation.css';
import { FaThumbsUp } from "react-icons/fa";

export default function LecturerMarkConfirmation({ onClose }) {
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
    <>
      <div className={`lmcw-popup-overlay ${isVisible ? 'lmcw-show-popup' : 'lmcw-hide-popup'}`}>
        <div className={`lmcw-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="lmcw-close" onClick={handleClose}>X</button>
          <h2>Marks Saved!</h2>
          <div className="lmcw-buttons">
            <div className="lmcw-yes-btn">
              <Link to={'/Admin/Lecturer'}>
                <button
                  onMouseEnter={handleMouseEnterYes}
                  onMouseLeave={handleMouseLeaveYes}
                  onClick={handleClose} // Close the popup when Confirm is clicked 
                >
                  {showThumbsUp ? <FaThumbsUp /> : 'Confirm'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
