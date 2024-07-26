import React, { useState } from 'react';
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash, FaThumbsUp } from "react-icons/fa";
import '../Css/ChangePassword.css';

export default function ChangePassword({ onClose, token, userId, role }) {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showThumbsUp, setShowThumbsUp] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/${role}/${userId}/Profile/updatePassword`, {
        old_password: oldPassword,
        new_password: newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (oldPassword.length < 8 || newPassword.length < 8) {
        setError('Password must be at least 8 characters long.');
      } 

      if (response.status === 201) {
        setSuccess('Password updated successfully');
        setError('');
        setOldPassword('');
        setNewPassword('');
        onClose(); // Close the popup after successful update
      }
    } catch (error) {
      setError('Old password does not match');
      setSuccess('');
    }
  };

  return (
    <>
      <div className="cp-popup-overlay cp-show-popup" onClick={onClose}>
        <div className="cp-popup" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit} className='cp-form'>
            <button action="" type="button" className="cp-close" onClick={onClose}>X</button>
            <h2>Change Password</h2>
            {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div className="cp-form-element">
              <label className="cp-Password">Enter Old Password:</label>
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
              <label className="cp-Password">Enter New Password:</label>
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

            {error && <div className="error-message">{error}</div>}
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