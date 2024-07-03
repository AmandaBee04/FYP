import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditStudentReject.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminEditStudentReject({ onClose }) {

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
      <div className="aaasr-popup-overlay aaasr-show-popup">
        <div className="aaasr-popup">
          <button className="aaasr-close" onClick={onClose}>X</button>
          <h2>Student Not Edited. Please Try Again!</h2>
          <div className="aaasr-buttons">
            <div className="aaasr-yes-btn">
              <Link to={'/Admin/Lecturer/Edit_Student'}>
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
