import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditStudentReject.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminEditStudentReject({ onClose }) {

  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const thumbsUpTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(thumbsUpTimeoutRef.current);
    };
  }, []);

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
      <div className={`aeasr-popup-overlay ${isVisible ? 'aeasr-show-popup' : 'aeasr-hide-popup'}`}>
        <div className={`aeasr-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aeasr-close" onClick={handleClose}>X</button>
          <h2>Student Not Edited. Please Try Again!</h2>
          <div className="aeasr-buttons">
            <div className="aeasr-yes-btn">
              <Link to={'/Admin/Lecturer/Edit_Student'}>
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
