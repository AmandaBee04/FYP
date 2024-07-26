import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditSubjectReject.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminEditSubjectReject({ onClose }) {
  
  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const thumbsUpTimeoutRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      <div className={`aesr-popup-overlay ${isVisible ? 'aesr-show-popup' : 'aesr-hide-popup'}`}>
        <div className={`aesr-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aesr-close" onClick={handleClose}>X</button>
          <h2>Subject Not Edited. Please Try Again!</h2>
          <div className="aesr-buttons">
            <div className="aesr-yes-btn">
              <Link>
                <button
                  onMouseEnter={handleMouseEnterYes}
                  onMouseLeave={handleMouseLeaveYes}
                  onClick={handleClose} 
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
