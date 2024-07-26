import React, { useState, useRef, useEffect } from 'react';
import { FaThumbsUp } from "react-icons/fa";
import axios from 'axios';
import '../../Css/Lecturer/LecturerAssignDueDate.css';

export default function LecturerAssignDueDate({ onClose, quizId }) {
  const lecturerId = localStorage.getItem('id');
  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [dueDate, setDueDate] = useState('');
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

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match this duration with the CSS transition duration
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.post(`http://127.0.0.1:8000/api/question_set/update/${quizId}`, {
        due_date: dueDate,
        assign: 1,
        assignLec_id: lecturerId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        console.log('Due date assigned successfully');
        handleClose(); // Close the popup after successful update
      } else {
        console.error('Failed to assign due date');
      }
    } catch (error) {
      console.error('An error occurred while assigning due date:', error);
      // Handle error state or feedback to the user
    }
  };

  return (
    <div className={`ladd-popup-overlay ${isVisible ? 'ladd-show-popup' : 'ladd-hide-popup'}`}>
      <div className={`ladd-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
        <button className="ladd-close" onClick={handleClose}>X</button>
        <h2>DUE DATE?</h2>
        <div className="ladd-input">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="ladd-buttons">
          <div className="ladd-yes-btn">
            <button
              onMouseEnter={handleMouseEnterYes}
              onMouseLeave={handleMouseLeaveYes}
              onClick={handleConfirm} // Call handleConfirm to save due date and update
            >
              {showThumbsUp ? <FaThumbsUp /> : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
