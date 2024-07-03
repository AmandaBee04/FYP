import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaUserSecret } from "react-icons/fa";
import ChangePassword from '../../Components/ChangePassword';
import '../../Css/Admin/AdminProfile.css'

export default function AdminProfile() {


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
    <div className="holder">
      <div className="ap-container">
        <div className="ap-upper">
          Profile
        </div>
          <div className="ap-lower">
            <div className="ap-lowerleft">
              <div className="ap-leftcolumn-up">
                <br />
                <br />
                <div onClick={handleImageClick}>
                  { image ? <img src={image} alt="Lecturer"/> : < FaUserSecret id='img' alt="Lecturer Icon"/> }
                  <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:'none'}} />
                </div>
                <br />

                <hr />
              </div>
              <div className="ap-leftcolumn-down">
                <span>Mr.Mike Oxmall</span>
                <button>Log Out</button>
              </div>
            </div>
            <div className="ap-lowerright">
              <div className="ap-lowerupperright">
                <h1>Email Address : </h1>
                <span className="ap-emailaddress">Mikeoxmall0215@gmail.com</span>
                <button onClick={handleChangePasswordClick}>Change Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isChangePasswordVisible && <ChangePassword onClose={handleClosePopup} />}
    </>
  )
}
