import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminAddSubjectConfirmation.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminAddSubjectConfirmation({ onClose }) {
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
      <div className={`aaasc-popup-overlay ${isVisible ? 'aaasc-show-popup' : 'aaasc-hide-popup'}`}>
        <div className={`aaasc-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aaasc-close" onClick={handleClose}>X</button>
          <h2>Subject Successfully Added!</h2>
          <div className="aaasc-buttons">
            <div className="aaasc-yes-btn">
              <Link to={'/Admin/Subject'}>
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
