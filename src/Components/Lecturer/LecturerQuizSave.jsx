import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Lecturer/LecturerQuizSave.css';
import { FaThumbsUp } from "react-icons/fa";

export default function LecturerQuizSave({ onClose }) {

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
      <div className={`aaasc-popup-overlay ${isVisible ? 'aaasc-show-popup' : 'aaasc-hide-popup'}`}>
        <div className={`aaasc-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aaasc-close" onClick={onClose}>X</button>
          <h2>Quiz Saved Successfully!</h2>
          <div className="aaasc-buttons">
            <div className="aaasc-yes-btn">
              <Link to={'/Lecturer/Quizzes'}>
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
