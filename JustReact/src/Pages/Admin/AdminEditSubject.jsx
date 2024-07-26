import React from 'react'
import { useState } from 'react';
import '../../Css/Admin/AdminEditSubject.css'
import AdminEditSubjectConfirmation from '../../Components/Admin/AdminEditSubjectConfirmation'; // Ensure the import path is correct
import AdminEditSubjectReject from '../../Components/Admin/AdminEditSubjectReject'


export default function AdminEditSubject() {
    
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
        <div className="aess-container">
            <h1>Edit Subject Details</h1>
            <form action="" className='aess-form'>
              <div className="aess-leftside">
                <div className="aess-label">
                  <label className='aess-Name'>Subject Code : </label>
                </div>
                <div className="aess-label">
                  <label className='aess-Email'>Subject Name : </label>
                </div>
                <div className="aess-label">
                  <label className='aess-Password'>Subject Taught By : </label>
                </div>
              </div>
              <div className="aess-rightside">
                <div className="aess-inputs">
                  <label className='aess-i-Name'>123123</label>
                </div>
                <div className="aess-inputs">
                  <input type="email" className='aess-i-Email'placeholder='Enter Subject Name'/>
                </div>
                <div className="aess-inputs">
                  <select className="aess-i-Password" value="Lecturer">
                    <option className='aess-i-Password'>lkfdhdskjd</option>
                  </select>
                </div>
                <div className="aess-btn">
                  <button onClick={handleConfirmClick}>
                    Confirm
                  </button>
                </div>
              </div>
        </form>
      </div>
      {showPopup && <AdminEditSubjectConfirmation onClose={handleClosePopup} />} {/* Show popup conditionally */}

    </>
  )
}
