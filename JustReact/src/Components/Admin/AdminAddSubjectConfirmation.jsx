import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminAddSubjectConfirmation.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminAddSubjectConfirmation({ onClose }) {

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
      <div className="aaasc-popup-overlay aaasc-show-popup">
        <div className="aaasc-popup">
          <button className="aaasc-close" onClick={onClose}>X</button>
          <h2>Subject Successfully Added!</h2>
          <div className="aaasc-buttons">
            <div className="aaasc-yes-btn">
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
