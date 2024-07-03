import React, { useState, useRef } from 'react';
import '../../Css/Admin/AdminStudentConfirmDeletion.css';
import { Link } from 'react-router-dom';
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function AdminStudentConfirmDeletion({ onClose }) {
  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [showThumbsDown, setShowThumbsDown] = useState(false);
  const thumbsUpTimeoutRef = useRef(null);
  const thumbsDownTimeoutRef = useRef(null);

  const handleMouseEnterYes = () => {
    thumbsUpTimeoutRef.current = setTimeout(() => {
      setShowThumbsUp(true);
    }, 500); // 500ms delay before showing the thumbs up icon
  };

  const handleMouseLeaveYes = () => {
    clearTimeout(thumbsUpTimeoutRef.current);
    setShowThumbsUp(false);
  };

  const handleMouseEnterNo = () => {
    thumbsDownTimeoutRef.current = setTimeout(() => {
      setShowThumbsDown(true);
    }, 500); // 500ms delay before showing the thumbs down icon
  };

  const handleMouseLeaveNo = () => {
    clearTimeout(thumbsDownTimeoutRef.current);
    setShowThumbsDown(false);
  };

  return (
    <>
      <div className="ascd-popup-overlay ascd-show-popup">
        <div className="ascd-popup">
          <button className="ascd-close" onClick={onClose}>X</button>
          <h2>Confirm Delete?</h2>
          <div className="ascd-buttons">
            <div className="ascd-yes-btn">
              <Link to={'/Admin/Student'}>
                <button
                  onMouseEnter={handleMouseEnterYes}
                  onMouseLeave={handleMouseLeaveYes}
                >
                  {showThumbsUp ? <FaThumbsUp /> : 'Yes'}
                </button>
              </Link>
            </div>
            <div className="ascd-no-btn">
              <Link to={'/Admin/Student'}>
                <button
                  onMouseEnter={handleMouseEnterNo}
                  onMouseLeave={handleMouseLeaveNo}
                >
                  {showThumbsDown ? <FaThumbsDown /> : 'No'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
