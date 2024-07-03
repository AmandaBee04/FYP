import React from 'react';
import { useState } from 'react';
import AdminAddStudentConfirmation from '../../Components/Admin/AdminAddStudentConfirmation'; // Ensure the import path is correct

import '../../Css/Admin/AdminAddStudent.css';

export default function AdminAddStudent() {

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
      <div className="ads-container">
        <h1>Add New Student</h1>
        <form action="" className='ads-form'>
          <div className="ads-leftside">
            <div className="ads-label">
              <label className='ads-ID'>Student ID : </label>
            </div>
            <div className="ads-label">
              <label className='ads-Name'>Student Name : </label>
            </div>
            <div className="ads-label">
              <label className='ads-Email'>Email : </label>
            </div>
            <div className="ads-label">
              <label className='ads-Password'>Password : </label>
            </div>
            <div className="ads-label">
              <label className='ads-Programme'>Programme : </label>
            </div>
            <div className="ads-label">
              <label className='ads-SubjectCode'>Subject Code : </label>
            </div>
          </div>

          <div className="ads-rightside">
            <div className="ads-inputs">
              <input type="name" className='ads-i-ID' placeholder='Enter Student ID' />
            </div>
            <div className="ads-inputs">
              <input type="name" className='ads-i-Name' placeholder='Enter Student Name' />
            </div>
            <div className="ads-inputs">
              <input type="email" className='ads-i-Email' placeholder='Enter Email' />
            </div>
            <div className="ads-inputs">
              <input type="name" className='ads-i-Password' placeholder='Enter Password' />
            </div>
            <div className="ads-inputs">
              <input type="name" className='ads-i-Programme' placeholder='Enter Programme' />
            </div>
            <div className="ads-inputs">
              <input type="name" className='ads-i-SubjectCode' placeholder='Subject Code' />
            </div>
            <div className="ads-btn">
              <button onClick={handleConfirmClick}>
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
      {showPopup && <AdminAddStudentConfirmation onClose={handleClosePopup} />} {/* Show popup conditionally */}

    </>
  );
}
