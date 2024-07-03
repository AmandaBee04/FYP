import React from 'react'
import { useState } from 'react';
import AdminEditStudentConfirmation from '../../Components/Admin/AdminEditStudentConfirmation'; // Ensure the import path is correct
import '../../Css/Admin/AdminEditStudent.css'

export default function AdminEditStudent() {

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
       <div className="aes-container">
            <h1>Edit Student Details</h1>
            <form action="" className='aes-form'>

              <div className="aes-leftside">
                <div className="aes-label">
                  <label className='aes-ID'>Student ID : </label>
                </div>
                <div className="aes-label">
                  <label className='aes-Name'>Student Name : </label>
                </div>
                <div className="aes-label">
                  <label className='aes-Email'>Email : </label>
                </div>
                <div className="aes-label">
                  <label className='aes-Password'>Password : </label>
                </div>
                <div className="aes-label">
                  <label className='aes-Programme'>Programme : </label>
                </div>
                <div className="aes-label">
                  <label className='aes-SubjectCode'>Subject Code : </label>
                </div>
              </div>

              <div className="aes-rightside">
                <div className="aes-inputs">
                  <label className='aes-i-ID'>Lorem Ipsum</label>
                </div>
                <div className="aes-inputs">
                  <input type="name" className='aes-i-Name'placeholder='Enter Student Name'/>
                </div>
                <div className="aes-inputs">
                  <input type="email" className='aes-i-Email'placeholder='Enter Email'/>
                </div>
                <div className="aes-inputs">
                  <input type="name" className='aes-i-Password'placeholder='Enter Password' />
                </div>
                <div className="aes-inputs">
                  <input type="name" className='aes-i-Programme'placeholder='Enter Programme' />
                </div>
                <div className="aes-inputs">
                  <input type="name" className='aes-i-SubjectCode'placeholder='Subject Code'/>
                </div>
                <div className="aes-btn">
                  <button onClick={handleConfirmClick}>
                    Confirm
                  </button>
                </div>
              </div>
        </form>
      </div>
      {showPopup && <AdminEditStudentConfirmation onClose={handleClosePopup} />} {/* Show popup conditionally */}

    </>
  )
}
