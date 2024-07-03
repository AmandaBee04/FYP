import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditStudentConfirmation.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminEditStudentConfirmation({ onClose }) {

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
      <div className="aesc-popup-overlay aesc-show-popup">
        <div className="aesc-popup">
          <button className="aesc-close" onClick={onClose}>X</button>
          <h2>Student Successfully Edited!</h2>
          <div className="aesc-buttons">
            <div className="aesc-yes-btn">
              <Link to={'/Admin/Student'}>
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
