import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminAddSubjectReject.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminAddSubjectReject({ onClose }) {

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
      <div className="aasr-popup-overlay aasr-show-popup">
        <div className="aasr-popup">
          <button className="aasr-close" onClick={onClose}>X</button>
          <h2>Subject Not Added. Please Try Again!</h2>
          <div className="aasr-buttons">
            <div className="aasr-yes-btn">
              <Link to={'/Admin/Lecturer/Add_Subject'}>
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
