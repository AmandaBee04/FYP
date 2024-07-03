import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { BiSolidEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa";
import AdminStudentConfirmDeletion from '../../Components/Admin/AdminStudentConfirmDeletion';
import '../../Css/Admin/AdminStudent.css';

export default function AdminStudent() {

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmClick = (e) => {
    e.preventDefault();
    // Logic for adding a student goes here

    setShowConfirmation(true); // Show the confirmation popup
  };

  const handleClosePopup = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="as-holder">
        <h1>Students</h1>
        <div className="as-container">

          <div className="as-upper">
            <HiOutlineSearch className='img' />
            <input type="search" placeholder='Search For Student' />
          </div>

          <div className="as-lecturercontainer">
            <div className="as-tags">
              <div className="as-tag1">
                <p>Student ID</p>
              </div>
              <div className="as-tag2">
                <p>Name</p>
              </div>
              <div className="as-tag4">
                <p>Email</p>
              </div>
              <div className="as-tag5">
                <p>Programme</p>
              </div>
              <div className="as-tag6">
                <p>Faculty</p>
              </div>
            </div>
          
            <div className="as-lecturerbox">

              <div className="as-box">
                <div className="as-ID">
                  <p>100123456</p>
                </div>
                <div className="as-name">
                  <p>Way Tu Yung</p>
                </div>
                <div className="as-email">
                  <p>WayTY@gmail.com</p>
                </div>
                <div className="as-programme">
                  <p>Diploma in IT</p>
                </div>
                <div className="as-faculty">
                  <p>FCI</p>
                </div>
                <div className="as-edit">
                  <Link to="Edit_Student">
                    < BiSolidEdit id='img' />
                  </Link>
                </div>
                <div className="as-delete">
                  <Link>
                    <FaTrash id='img' onClick={handleConfirmClick}/>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="as-btn">
          <Link to={"Add_Student"}>
            <button>
              <FaUserPlus className='adduser'/>Add New Student
            </button>
          </Link>
        </div>
      </div>
      {showConfirmation && <AdminStudentConfirmDeletion onClose={handleClosePopup} />}
    </>
  );
}
