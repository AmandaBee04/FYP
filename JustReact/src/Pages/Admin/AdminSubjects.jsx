import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { BiSolidEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { FaBookOpen } from "react-icons/fa6";
import AdminSubjectConfirmDeletion from '../../Components/Admin/AdminSubjectConfirmDeletion';
import '../../Css/Admin/AdminSubjects.css';

export default function AdminSubject() {

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
      <div className="ass-holder">
        <h1>Subjects</h1>
        <div className="ass-container">

          <div className="ass-upper">
            <HiOutlineSearch className='img' />
            <input type="search" placeholder='Search For Subject' />
          </div>

          <div className="ass-lecturercontainer">
            <div className="ass-tags">
              <div className="ass-tag1">
                <p>Subject ID</p>
              </div>
              <div className="ass-tag2">
                <p>Subject Name</p>
              </div>
              <div className="ass-tag3">
                <p>Lecturer ID</p>
              </div>
            </div>
          
            <div className="ass-lecturerbox">

              <div className="ass-box">
                <div className="ass-ID">
                  <p>100123456</p>
                </div>
                <div className="ass-SubjectName">
                  <p>Way Tu Yung</p>
                </div>
                <div className="ass-LecturerID">
                  <p>WTY_001</p>
                </div>

                <div className="ass-edit">
                  <Link to={'Edit_Subject'}>
                    < BiSolidEdit id='img' /> 
                  </Link>
                </div>
                <div className="ass-delete">
                  <Link>
                    <FaTrash id='img'  onClick={handleConfirmClick}/>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="ass-btn">
          <Link to={"Add_Subject"}>
            <button>
              <FaBookOpen className='adduser'/>Add New Subject
            </button>
          </Link>
        </div>
      </div>
      {showConfirmation && <AdminSubjectConfirmDeletion onClose={handleClosePopup} />}
    </>
  );
}
