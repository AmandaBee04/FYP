import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditSubjectConfirmation.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminEditSubjectConfirmation({ onClose }) {
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
      <div className={`aeasc-popup-overlay ${isVisible ? 'aeasc-show-popup' : 'aeasc-hide-popup'}`}>
        <div className={`aeasc-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
          <button className="aeasc-close" onClick={handleClose}>X</button>
          <h2>Subject Successfully Edited!</h2>
          <div className="aeasc-buttons">
            <div className="aeasc-yes-btn">
              <Link to={'/Admin/Subject'}>
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
