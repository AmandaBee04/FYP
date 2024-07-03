import React, { useState } from 'react';
import '../../Css/Admin/AdminAddLecturer.css';
import AdminAddLecturerConfirmation from '../../Components/Admin/AdminAddLecturerConfirmation'; // Ensure the import path is correct

export default function AdminAddLecturer() {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const handleConfirmClick = (event) => {
    event.preventDefault(); // Prevent form submission
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <>
      <div className="adl-container">
        <h1>Add New Lecturer</h1>
        <form className='adl-form'>
          <div className="adl-leftside">
            <div className="adl-label">
              <label className='adl-ID'>Lecturer ID : </label>
            </div>
            <div className="adl-label">
              <label className='adl-Name'>Lecturer Name : </label>
            </div>
            <div className="adl-label">
              <label className='adl-Email'>Email : </label>
            </div>
            <div className="adl-label">
              <label className='adl-Password'>Password : </label>
            </div>
          </div>
          <div className="adl-rightside">
            <div className="adl-inputs">
              <input type="name" className='adl-i-ID' placeholder='Enter Lecturer ID' />
            </div>
            <div className="adl-inputs">
              <input type="name" className='adl-i-Name' placeholder='Enter Lecturer Name' />
            </div>
            <div className="adl-inputs">
              <input type="email" className='adl-i-Email' placeholder='Enter Email' />
            </div>
            <div className="adl-inputs">
              <input type="password" className='adl-i-Password' placeholder='Enter Password' />
            </div>
            <div className="adl-btn">
              <button onClick={handleConfirmClick}>
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
      {showPopup && <AdminAddLecturerConfirmation onClose={handleClosePopup} />} {/* Show popup conditionally */}
    </>
  );
}
