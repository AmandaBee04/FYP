import React, { useState, useRef, useEffect } from 'react'
import ChangePassword from '../../Components/ChangePassword';
import { FaUserTie } from "react-icons/fa6";

import '../../Css/Lecturer/LecturerProfile.css'

export default function LecturerProfile() {

  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);

  // Load image from localStorage on component mount
  // useEffect(() => {
  //   const savedImage = localStorage.getItem('lecturerImage');
  //   if (savedImage) {
  //     setImage(savedImage);
  //   }
  // }, []);

  const handleImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange  = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
        localStorage.setItem('lecturerImage', base64String);
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
    <div className="lp-holder">
      <div className="lp-container">
        <div className="lp-upper">
          Profile
        </div>
        <div className="lp-lower">
          <div className="lp-lowerleft">
            <div className="lp-leftcolumn-up">
              <br />
              
              <div onClick={handleImageClick}>
                { image ? <img src={image} alt="Lecturer"/> : < FaUserTie className='LecIcon' alt="Lecturer Icon"/> }
                <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:'none'}} />
              </div>
              <span>Mr.Mike Oxmall</span>
              <hr />
            </div>
            <div className="lp-leftcolumn-down">
              <h1>About Me</h1>
              <span style={{fontSize:23}}>Lecturer At MMU</span>
              <button>Log Out</button>
            </div>
          </div>
          <div className="lp-lowerright">
            <div className="upper">
              <div className="lp-lowerupperright">
                <h1>Email Address : </h1>
                <span className="lp-emailaddress">Mikeoxmall0215@gmail.com</span>
                <button onClick={handleChangePasswordClick}>Change Password</button>
                </div>
            </div>
            <div className="lp-Enrolledsubjectscontainer">
              <div className="lp-lowerlowerright">
                <h1>Taught Subjects : </h1>
                <span className="lp-linkstosubjects">
                  <div>sdasds</div>
                  <div>sdasds</div>
                  <div>sdasds</div>
                  <div>sdasds</div>
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
