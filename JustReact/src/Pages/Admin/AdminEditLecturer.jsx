import React from 'react'
import { useState } from 'react';
import AdminEditLecturerConfirmation from '../../Components/Admin/AdminEditLecturerConfirmation'; // Ensure the import path is correct
import AdminEditLecturerReject from '../../Components/Admin/AdminEditLecturerReject';
import '../../Css/Admin/AdminEditLecturer.css'

export default function AdminEditLecturer() {

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
      <div className="ael-container">
            <h1>Edit Lecturer Details</h1>
            <form action="" className='ael-form'>
              <div className="ael-leftside">
                <div className="ael-label">
                  <label className='ael-ID'>Lecturer ID : </label>
                </div>
                <div className="ael-label">
                  <label className='ael-Name'>Lecturer Name : </label>
                </div>
                <div className="ael-label">
                  <label className='ael-Email'>Email : </label>
                </div>
                <div className="ael-label">
                  <label className='ael-Password'>Password : </label>
                </div>
              </div>
              <div className="ael-rightside">
                <div className="ael-inputs">
                  <label className='ael-i-ID' disabled>GAYFURRYNIGGS</label>
                </div>
                <div className="ael-inputs">
                  <input type="Name" className='ael-i-Name'placeholder='Edit Lecturer Name'/>
                </div>
                <div className="ael-inputs">
                  <input type="email" className='ael-i-Email'placeholder='Edit Email'/>
                </div>
                <div className="ael-inputs">
                  <input type="name" className='ael-i-Password'placeholder='Edit Password' hidden/>
                </div>
                <div className="ael-btn">
                  <button onClick={handleConfirmClick}>
                    Confirm
                  </button>
                </div>
              </div>
        </form>
      </div>
      {showPopup && <AdminEditLecturerConfirmation onClose={handleClosePopup} />} {/* Show popup conditionally */}
    </>
  )
}
