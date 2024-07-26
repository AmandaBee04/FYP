import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditLecturerReject.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminEditLecturerReject({ onClose }) {

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
      <div className={`aelr-popup-overlay ${isVisible ? 'aelr-show-popup' : 'aelr-hide-popup'}`}>
        <div className={`aelr-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aelr-close" onClick={handleClose}>X</button>
          <h2>Lecturer Not Edited. Please Try Again!</h2>
          <div className="aelr-buttons">
            <div className="aelr-yes-btn">
              <Link to={'/Admin/Lecturer/Edit_Lecturer'}>
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
