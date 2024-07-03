import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Admin/AdminAddLecturerReject.css';
import { FaThumbsUp } from "react-icons/fa";

export default function AdminAddLecturerReject({ onClose }) {

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
      <div className="aalr-popup-overlay aalr-show-popup">
        <div className="aalr-popup">
          <button className="aalr-close" onClick={onClose}>X</button>
          <h2>Lecturer Not Added. Please Try Again!</h2>
          <div className="aalr-buttons">
            <div className="aalr-yes-btn">
              <Link to={'/Admin/Lecturer/Add_Lecturer'}>
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
