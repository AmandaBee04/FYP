import React, { useState } from 'react';
import '../Css/ChangePassword.css';
import { FaRegEye, FaRegEyeSlash, FaThumbsUp } from "react-icons/fa";

export default function ChangePassword({ onClose }) {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => {
      setShowThumbsUp(true);
    }, 500); // 500ms delay before showing the thumbs up icon
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowThumbsUp(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500); // 500ms duration of the fade-out animation
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (oldPassword.length < 8 || newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
    } else {
      // Add logic for changing the password
      console.log('Password changed successfully');
      setErrorMessage('');
    }
  };

  return (
    <>
      <div className={`cp-popup-overlay ${isClosing ? 'fade-out' : 'cp-show-popup'}`}>
        <div className="cp-popup" onClick={(e) => e.stopPropagation()}>
          <form action="" className='cp-form' onSubmit={handleSubmit}>
            <button className="cp-close" onClick={handleClose}>X</button>
            <h2>Change Password</h2>
            <div className="cp-form-element">
              <label className="cp-Password">Enter Old Password: </label>
              <div className="cp-password-container">
                <input 
                  type={oldPasswordVisible ? "text" : "password"} 
                  id="OldPassword" 
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  minLength="8"
                  required 
                />
                <div className="cp-password-toggle" onClick={toggleOldPasswordVisibility}>
                  {oldPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
            </div>
            <div className="cp-form-element">
              <label className="cp-Password">Enter New Password: </label>
              <div className="cp-password-container">
                <input 
                  type={newPasswordVisible ? "text" : "password"} 
                  id="NewPassword" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength="8"
                  required 
                />
                <div className="cp-password-toggle" onClick={toggleNewPasswordVisibility}>
                  {newPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
            </div>
            {errorMessage && <div className="cp-error-message">{errorMessage}</div>}
            <div className="cp-form-element">
              <button 
                type="submit" 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
              >
                {showThumbsUp ? <FaThumbsUp /> : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
