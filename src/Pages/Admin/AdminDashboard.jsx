import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import LecturerPic from '../../assets/Admin_Images/LecturerPic.png'
import StudentPic from '../../assets/Admin_Images/StudentPic.png'
import SubjectPic from '../../assets/Admin_Images/SubjectPic.png'
import RequestPic from '../../assets/Admin_Images/RequestPic.png'
import DashboardPic1 from '../../assets/Admin_Images/DashboardImage1.png'
import DashboardPic2 from '../../assets/Admin_Images/DashboardImage2.png'
import '../../Css/Admin/AdminDashboard.css'
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";


export default function AdminDashboard() {

  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    // Check if there's a stored JWT in localStorage
    const storedJwt = localStorage.getItem('jwt');
    if (storedJwt) {
        const decodedToken = jwtDecode(storedJwt);
        const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

        if (expirationTime < Date.now()) {
            // Token has expired, clear localStorage
            localStorage.removeItem('jwt');
            localStorage.removeItem('role');
            localStorage.removeItem('id');
            localStorage.removeItem('exp');
            setToken(null);
            setRole(null);
            setId(null);
            setSessionExpired(true);
        } 
    }
}, []);

  return (
    <>
      <div className="ad-container">
      {sessionExpired && (
          <div className="session-expired-message">
            <p>Your session has expired. Please <Link to="/login">login</Link> again.</p>
          </div>
        )}
        <div className="ad-upper">
          <div className="category">
            <Link to="/Admin/Lecturer">
              <div className="box">
                <img src={LecturerPic} alt="" />
                  <span>Lecturers</span>
              </div>
            </Link>
            
            <Link to="/Admin/Student">
              <div className="box">
                <img src={StudentPic} alt="" />
                <span>Students</span>
              </div>
            </Link>
            
            <Link to="/Admin/Subject">
              <div className="box">
                <img src={SubjectPic} alt="" />
                <span>Subjects</span>
              </div>
            </Link>
            
            <Link to="/Admin/Request">
              <div className="box">
                <img src={RequestPic} alt="" />
                <span>Requests</span>
              </div>
            </Link>
          </div>
        </div>
      
        <div className="lower">
          <div className='responsive'>
            <img src={DashboardPic1} />
            <img src={DashboardPic2} />
          </div>
        </div>
      </div>

    </>
  )
}
