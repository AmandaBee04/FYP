import React, { useState, useRef } from 'react';
import '../../Css/Admin/AdminLecturerConfirmDeletion.css';
import { Link } from 'react-router-dom';
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function AdminLecturerConfirmDeletion({ onClose }) {
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
      <div className="alcd-popup-overlay alcd-show-popup">
        <div className="alcd-popup">
          <button className="alcd-close" onClick={onClose}>X</button>
          <h2>Confirm Delete?</h2>
          <div className="alcd-buttons">
            <div className="alcd-yes-btn">
              <Link to={'/Admin/Lecturer'}>
                <button
                  onMouseEnter={handleMouseEnterYes}
                  onMouseLeave={handleMouseLeaveYes}
                >
                  {showThumbsUp ? <FaThumbsUp /> : 'Yes'}
                </button>
              </Link>
            </div>
            <div className="alcd-no-btn">
              <Link to={'/Admin/Lecturer'}>
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
