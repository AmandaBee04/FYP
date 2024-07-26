import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminAddStudentReject.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminAddStudentReject({ onClose }) {

  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const thumbsUpTimeoutRef = useRef(null);

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
      <div className={`aaasr-popup-overlay ${isVisible ? 'aaasr-show-popup' : 'aaasr-hide-popup'}`}>
        <div className={`aaasr-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aaasr-close" onClick={onClose}>X</button>
          <h2>Student Not Added. Please Try Again!</h2>
          <div className="aaasr-buttons">
            <div className="aaasr-yes-btn">
              <Link to={'/Admin/Student/Add_Student'}>
                <button
                  onMouseEnter={handleMouseEnterYes}
                  onMouseLeave={handleMouseLeaveYes}
                  onClick={onClose} 
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