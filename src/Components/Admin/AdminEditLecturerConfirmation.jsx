import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditLecturerConfirmation.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminEditLecturerConfirmation({ onClose }) {
  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const thumbsUpTimeoutRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
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
      <div className={`aelc-popup-overlay ${isVisible ? 'aelc-show-popup' : 'aelc-hide-popup'}`}>
        <div className={`aelc-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aelc-close" onClick={handleClose}>X</button>
          <h2>Lecturer Successfully Edited!</h2>
          <div className="aelc-buttons">
            <div className="aelc-yes-btn">
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