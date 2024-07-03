import React from 'react';
import { Link } from 'react-router-dom';
import LecturerPic from '../../assets/Admin_Images/LecturerPic.png';
import StudentPic from '../../assets/Admin_Images/StudentPic.png';
import SubjectPic from '../../assets/Admin_Images/SubjectPic.png';
import RequestPic from '../../assets/Admin_Images/RequestPic.png';
import DashboardPic1 from '../../assets/Admin_Images/DashboardImage1.png';
import DashboardPic2 from '../../assets/Admin_Images/DashboardImage2.png';
import '../../Css/Admin/AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <>
      <div className="ad-container">
        <div className="ad-upper">
          <div className="category">
            <Link to="/Admin/Lecturer">
              <div className="box">
                <img src={LecturerPic} alt="Lecturers" />
                <span>Lecturers</span>
              </div>
            </Link>
            
            <Link to="/Admin/Student">
              <div className="box">
                <img src={StudentPic} alt="Students" />
                <span>Students</span>
              </div>
            </Link>
            
            <Link to="/Admin/Subject">
              <div className="box">
                <img src={SubjectPic} alt="Subjects" />
                <span>Subjects</span>
              </div>
            </Link>
            
            <Link to="/Admin/Request">
              <div className="box">
                <img src={RequestPic} alt="Requests" />
                <span>Requests</span>
              </div>
            </Link>
          </div>
        </div>
      
        <div className="lower">
          <div className='responsive'>
            <img src={DashboardPic1} alt="Dashboard 1" />
            <img src={DashboardPic2} alt="Dashboard 2" />
          </div>
        </div>
      </div>
    </>
  );
}
