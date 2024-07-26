import React, { useState, useRef } from 'react';
import '../../Css/Lecturer/LecturerConfirmDelete.css';
import { Link } from 'react-router-dom';
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function LecturerConfirmDelete({ onClose }) {

  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [showThumbsDown, setShowThumbsDown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const thumbsUpTimeoutRef = useRef(null);
  const thumbsDownTimeoutRef = useRef(null);

  const handleMouseEnterYes = () => {
    thumbsUpTimeoutRef.current = setTimeout(() => {
      setShowThumbsUp(true);
    }, 500); // 500ms delay before showing the thumbs up icon
  };

  const handleMouseLeaveYes = () => {
    clearTimeout(thumbsUpTimeoutRef.current);
    setShowThumbsUp(false);
  };

  const handleMouseEnterNo = () => {
    thumbsDownTimeoutRef.current = setTimeout(() => {
      setShowThumbsDown(true);
    }, 500); // 500ms delay before showing the thumbs down icon
  };

  const handleMouseLeaveNo = () => {
    clearTimeout(thumbsDownTimeoutRef.current);
    setShowThumbsDown(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match this duration with the CSS transition duration
  };

  return (
    <>
      <div className={`lcd-popup-overlay ${isVisible ? 'lcd-show-popup' : 'lcd-hide-popup'}`}>
        <div className={`lcd-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="lcd-close" onClick={handleClose}>X</button>
          <h2>Confirm Student Delete?</h2>
          <div className="lcd-buttons">
            <div className="lcd-yes-btn">
              <Link to={'/Lecturer/Subject_Details'}>
                <button
                  onMouseEnter={handleMouseEnterYes}
                  onMouseLeave={handleMouseLeaveYes}
                >
                  {showThumbsUp ? <FaThumbsUp /> : 'Yes'}
                </button>
              </Link>
            </div>
            <div className="lcd-no-btn">
              <Link to={'/Lecturer/Subject_Details'}>
                <button
                  onMouseEnter={handleMouseEnterNo}
                  onMouseLeave={handleMouseLeaveNo}
                >
                  {showThumbsDown ? <FaThumbsDown /> : 'No'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
