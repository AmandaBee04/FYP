import React, { useState } from 'react';
import '../../Css/Admin/AdminAddSubject.css';
import AdminAddSubjectConfirmation from '../../Components/Admin/AdminAddSubjectConfirmation'; // Ensure the import path is correct
import AdminAddSubjectReject from '../../Components/Admin/AdminAddSubjectReject';


export default function AdminAddSubject() {
  
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
      <div className="adss-container">
        <h1>Add New Subject</h1>
        <form action="" className='adss-form'>
          <div className="adss-leftside">
            <div className="adss-label">
              <label className='adss-Name'>Subject Code : </label>
            </div>
            <div className="adss-label">
              <label className='adss-Email'>Subject Name : </label>
            </div>
            <div className="adss-label">
              <label className='adss-Password'>Subject Taught By : </label>
            </div>
          </div>
          <div className="adss-rightside">
            <div className="adss-inputs">
              <input type="name" className='adss-i-Name' placeholder='Enter Subject Code' />
            </div>
            <div className="adss-inputs">
              <input type="name" className='adss-i-Email' placeholder='Enter Subject Name' />
            </div>
            <div className="adss-inputs">
              <select className="adss-i-Password" >
                <option value="">Select Lecturer</option>
                <option value="Lecturer1">Lecturer1</option>
                <option value="Lecturer2">Lecturer2</option>
              </select>
            </div>
            <div className="adss-btn">
              <button onClick={handleConfirmClick}>
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
      {showPopup && <AdminAddSubjectConfirmation onClose={handleClosePopup} />} {/* Show popup conditionally */}

    </>
  );
}
