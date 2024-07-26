import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditStudentReject.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminEditStudentReject({ onClose }) {

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
      <div className={`aewsr-popup-overlay ${isVisible ? 'aewsr-show-popup' : 'aewsr-hide-popup'}`}>
        <div className={`aewsr-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aewsr-close" onClick={handleClose}>X</button>
          <h2>Student Not Edited. Please Try Again!</h2>
          <div className="aesr-buttons">
            <div className="aesr-yes-btn">
              <Link>
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
