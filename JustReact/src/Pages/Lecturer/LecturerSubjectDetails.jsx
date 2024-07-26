import React, { useState } from 'react'
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import { FaBookDead } from "react-icons/fa";
import '../../Css/Lecturer/LecturerSubjectDetails.css'
import LecturerConfirmDelete from '../../Components/Lecturer/LecturerConfirmDelete';

export default function LecturerSubjectDetails() {

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
        <div className="lsd-holder">
            <div className="lsd-container">
                <div className="lsd-upper">
                    <div className="lsd-SubjectName">
                        <h2>Subject Name</h2>
                    </div>


                </div>

                <div className="lsd-lower">
                    <div className="lsd-lower-header">
                        <div><h2>Student List</h2></div>
                        <div className="lsd-btn">
                            <Link to={"Add_Students"}>
                                <button>
                                    + Add New Students
                                </button>
                            </Link>
                        </div>
                    </div>


                    <div className="lsd-lecturercontainer">
                        <div className="lsd-tags">
                            <div className="lsd-tag1">
                                <p>Student ID</p>
                            </div>
                            <div className="lsd-tag2">
                                <p>Name</p>
                            </div>
                            <div className="lsd-tag4">
                                <p>Email</p>
                            </div>
                            <div className="lsd-tag5">
                                <p>Programme</p>
                            </div>
                            <div className="lsd-tag6">
                                <p>Faculty</p>
                            </div>
                        </div>
          
                        <div className="lsd-lecturerbox">

                            <div className="lsd-box">
                                <div className="lsd-ID">
                                    <p>100123456</p>
                                </div>
                                <div className="lsd-name">
                                    <p>Way Tu Yung</p>
                                </div>
                                <div className="lsd-email">
                                    <p>WayTY@gmail.com</p>
                                </div>
                                <div className="lsd-programme">
                                    <p>Diploma in IT</p>
                                </div>
                                <div className="lsd-faculty">
                                    <p>FCI</p>
                                </div>
                                <div className="lsd-deleteicon" onClick={handleConfirmClick}>
                                        <FaBookDead/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        {showPopup && <LecturerConfirmDelete onClose={handleClosePopup} />} {/* Show popup conditionally */}
    </>
  )
}
