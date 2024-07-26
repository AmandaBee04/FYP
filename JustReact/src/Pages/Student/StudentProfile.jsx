import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ChangePassword from '../../Components/ChangePassword';
import { FaUserGraduate } from "react-icons/fa";

import '../../Css/Student/StudentProfile.css'

export default function StudentProfile() {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);

  const handleImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
        localStorage.setItem('StudentImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleChangePasswordClick = () => {
    setIsChangePasswordVisible(true);
  }

  const handleClosePopup = () => {
    setIsChangePasswordVisible(false);
  }

  return (
    <>
      <div className="sp-holder">
        <div className="sp-container">
          <div className="sp-upper">
            Profile
          </div>
          <div className="sp-lower">
            <div className="sp-lowerleft">
              <div className="sp-leftcolumn-up">
                <br />
                <div onClick={handleImageClick}>
                  {image ? <img src={image} className='profile-image' alt="Student" /> : <FaUserGraduate className='StuIcon' id='img' alt="Student Icon" />}
                  <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                </div>
                <span>Mr.Mike Oxmall</span>
                <hr />
              </div>
              <div className="sp-leftcolumn-down">
                <h1>About Me</h1>
                <label>Programme : </label>
                <span style={{ fontSize: 23 }}>Diploma in Informational Technology</span>
                <label>Faculty : </label>
                <span style={{ fontSize: 23 }}>FCI</span>
                <button>Log Out</button>
              </div>
            </div>
            <div className="sp-lowerright">
              <div className="upper">
                <div className="sp-lowerupperright">
                  <h1>Email Address : </h1>
                  <span className="sp-emailaddress">Mikeoxmall0215@gmail.com</span>
                  <button onClick={handleChangePasswordClick}>Change Password</button>
                </div>
              </div>
              <div className="sp-Enrolledsubjectscontainer">
                <div className="sp-lowerlowerright">
                  <h1>Enrolled Subjects : </h1>
                  <span className="sp-linkstosubjects">
                    <div>
                      <Link to={'Subject_Details'} >
                      sdasds
                      </Link>
                    </div>
                    <div>
                      <Link to={'Subject_Details'} >
                      sdasds
                      </Link>
                    </div>
                    <div>
                      <Link to={'Subject_Details'} >
                      sdasds
                      </Link>
                    </div>
                    <div>
                      <Link to={'Subject_Details'} >
                      sdasds
                      </Link>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isChangePasswordVisible && <ChangePassword onClose={handleClosePopup} />}
    </>
  )
}
