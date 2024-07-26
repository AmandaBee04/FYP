import React, { useState, useRef } from 'react';
import '../../Css/Admin/AdminSubjectConfirmDeletion.css';
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function AdminSubjectConfirmDeletion({ onClose, onConfirm}) {
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

  return (
    <>
      <div className={`asscd-popup-overlay ${isVisible ? 'asscd-show-popup' : 'asscd-hide-popup'}`}>
        <div className={`asscd-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="asscd-close" onClick={onClose}>X</button>
          <h2>Confirm Delete?</h2>
          <div className="asscd-buttons">
            <div className="asscd-yes-btn">
                <button
                  onMouseEnter={handleMouseEnterYes}
                  onMouseLeave={handleMouseLeaveYes}
                  onClick={onConfirm} 
                >
                  {showThumbsUp ? <FaThumbsUp /> : 'Yes'}
                </button>
            </div>
            <div className="asscd-no-btn">
                <button
                  onMouseEnter={handleMouseEnterNo}
                  onMouseLeave={handleMouseLeaveNo}
                  onClick={onClose}
                >
                  {showThumbsDown ? <FaThumbsDown /> : 'No'}
                </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
