import React, { useState, useRef } from 'react';
import '../../Css/Lecturer/LecturerDeleteQuizConfirm.css';
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function LecturerDeleteQuizConfirm({ onClose, onDelete }) {
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

  const handleDelete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDelete();
      onClose();
    }, 300); // Match this duration with the CSS transition duration
  };

  return (
    <div className={`ldqc-popup-overlay ${isVisible ? 'ldqc-show-popup' : 'ldqc-hide-popup'}`}>
      <div className={`ldqc-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
        <button className="ldqc-close" onClick={handleClose}>X</button>
        <h2>Confirm Delete Quiz?</h2>
        <div className="ldqc-buttons">
          <div className="ldqc-yes-btn">
            <button
              onMouseEnter={handleMouseEnterYes}
              onMouseLeave={handleMouseLeaveYes}
              onClick={handleDelete}
            >
              {showThumbsUp ? <FaThumbsUp /> : 'Yes'}
            </button>
          </div>
          <div className="ldqc-no-btn">
            <button
              onMouseEnter={handleMouseEnterNo}
              onMouseLeave={handleMouseLeaveNo}
              onClick={handleClose}
            >
              {showThumbsDown ? <FaThumbsDown /> : 'No'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
