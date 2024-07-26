import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditStudentConfirmation.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminEditStudentConfirmation({ onClose }) {

  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const thumbsUpTimeoutRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseEnterYes = () => {
    thumbsUpTimeoutRef.current = setTimeout(() => {
      setShowThumbsUp(true);
    }, 500); 
  };

  const handleMouseLeaveYes = () => {
    clearTimeout(thumbsUpTimeoutRef.current);
    setShowThumbsUp(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); 
  };

  return (
    <>
      <div className={`aesc-popup-overlay ${isVisible ? 'aesc-show-popup' : 'aesc-hide-popup'}`}>
        <div className={`aesc-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aesc-close" onClick={handleClose}>X</button>
          <h2>Student Successfully Edited!</h2>
          <div className="aesc-buttons">
            <div className="aesc-yes-btn">
              <Link to={'/Admin/Student'}>
                <button
                  onMouseEnter={handleMouseEnterYes}
                  onMouseLeave={handleMouseLeaveYes}
                  onClick={onClose} // Close the popup when Confirm is clicked 
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
