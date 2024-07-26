import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiSolidEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa";
import '../../Css/Admin/AdminLecturer.css'
import AdminLecturerConfirmDeletion from '../../Components/Admin/AdminLecturerConfirmDeletion';

export default function AdminLecturer() {

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
    <div className="al-holder">
      <h1>Lecturers</h1>
      <div className="al-container">

        <div className="al-upper">
          <HiOutlineSearch className='img' />
          <input type="search" placeholder='Search For Lecturer'/>
        </div>

        <div className="al-lecturercontainer">
          <div className="al-tags">
            <div className="al-tag1">
              <p>Lecturer ID</p>
            </div>
            <div className="al-tag2">
              <p>Name</p>
            </div>
            <div className="al-tag3">
              <p>Password</p>
            </div>
            <div className="al-tag4">
              <p>Email</p>
            </div>
          </div>
        

          <div className="al-lecturerbox">

            <div className="al-box">
              <div className="al-ID">
                <p>100123456</p>
              </div>
              <div className="al-name">
                <p>Way Tu Yung</p>
              </div>
              <div className="al-password">
                <p>WTY_001</p>
              </div>
              <div className="al-email">
                <p>WayTY@gmail.com</p>
              </div>
              <div className="al-edit">
                <Link to={'Edit_Lecturer'}>
                  < BiSolidEdit id='img' />
                </Link>
              </div>
              <div className="al-delete">
                <Link>
                  <FaTrash id='img' onClick={handleConfirmClick}/>
                </Link>
              </div>
            </div>

    

          </div> 


        </div>

        
      </div>
        <div className="al-btn">
          <Link to={"Add_Lecturer"}>
            <button>
              <FaUserPlus className='adduser'/>Add New Lecturer
            </button>
          </Link>
        </div>
    </div>
      {showConfirmation && <AdminLecturerConfirmDeletion onClose={handleClosePopup} />}
    </>
  )
}
