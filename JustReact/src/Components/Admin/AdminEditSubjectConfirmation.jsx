import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditSubjectConfirmation.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminEditSubjectConfirmation({ onClose }) {

  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const thumbsUpTimeoutRef = useRef(null);

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
      <div className="aeasc-popup-overlay aeasc-show-popup">
        <div className="aeasc-popup">
          <button className="aeasc-close" onClick={onClose}>X</button>
          <h2>Subject Successfully Edited!</h2>
          <div className="aeasc-buttons">
            <div className="aeasc-yes-btn">
              <Link to={'/Admin/Subject'}>
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
