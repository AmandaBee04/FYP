import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditLecturerReject.css';
import { FaThumbsUp } from "react-icons/fa";


export default function AdminEditLecturerReject({ onClose, userId }) {

  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const thumbsUpTimeoutRef = useRef(null);
  const id = userId;

  const handleMouseEnterYes = () => {
    thumbsUpTimeoutRef.current = setTimeout(() => {
      setShowThumbsUp(true);
    }, 500); // 500ms delay before showing the thumbs up icon
  };

  const handleMouseLeaveYes = () => {
    clearTimeout(thumbsUpTimeoutRef.current);
    setShowThumbsUp(false);
  };

  return (
    <>
      <div className={`aelr-popup-overlay ${isVisible ? 'aelr-show-popup' : 'aelr-hide-popup'}`}>
        <div className={`aelr-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aelr-close" onClick={onClose}>X</button>
          <h2>Lecturer Not Edited. Please Try Again!</h2>
          <div className="aelr-buttons">
            <div className="aelr-yes-btn">
              <Link>
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
