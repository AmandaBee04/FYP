import React from 'react'
import Search from '../../assets/Lecturer_Images/SearchPic.png';
import { FaPlus } from "react-icons/fa6";
import '../../Css/Lecturer/LecturerAddStudents.css'

export default function LecturerAddStudents() {
  return (
    <>
        <div className="las-holder">
            <div className="las-container">

                <div className="las-upper">
                    <img src={Search} alt="Search" />
                    <input type="search" placeholder='Search For Student' />
                </div>

                <div className="las-lecturercontainer">
                    <div className="las-tags">
                        <div className="las-tag1">
                        <p>Student ID</p>
                        </div>
                        <div className="las-tag2">
                        <p>Name</p>
                        </div>
                        <div className="las-tag4">
                        <p>Email</p>
                        </div>
                        <div className="las-tag5">
                        <p>Programme</p>
                        </div>
                        <div className="las-tag6">
                        <p>Faculty</p>
                        </div>
                    </div>

                    <div className="las-lecturerbox">

                        <div className="las-box">
                            <div className="las-ID">
                                <p>100123456</p>
                            </div>
                            <div className="las-name">
                                <p>Way Tu Yung</p>
                            </div>
                            <div className="las-email">
                                <p>WayTY@gmail.com</p>
                            </div>
                            <div className="las-programme">
                                <p>Diploma in IT</p>
                            </div>
                            <div className="las-faculty">
                                <p>FCI</p>
                            </div>
                            <button className="las-btn"><FaPlus className='plussign' /></button>
                        </div>

                        

                    </div>
                </div>

            </div>


        </div>
    </>
  )
}
