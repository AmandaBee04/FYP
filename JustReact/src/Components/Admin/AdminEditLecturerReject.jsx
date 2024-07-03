import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminEditLecturerReject.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminEditLecturerReject({ onClose }) {

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
      <div className="aelr-popup-overlay aelr-show-popup">
        <div className="aelr-popup">
          <button className="aelr-close" onClick={onClose}>X</button>
          <h2>Lecturer Not Edited. Please Try Again!</h2>
          <div className="aelr-buttons">
            <div className="aelr-yes-btn">
              <Link to={'/Admin/Lecturer/Edit_Lecturer'}>
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
