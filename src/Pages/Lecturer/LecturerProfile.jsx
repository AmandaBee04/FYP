import React, { useState, useRef, useEffect } from 'react'
import ChangePassword from '../../Components/ChangePassword';
import { FaUserTie } from "react-icons/fa6";
import axios from 'axios'
import '../../Css/Lecturer/LecturerProfile.css'

const LecturerProfile = ({ token, onLogout, userId}) => {

  const [lecturer, setLecturer] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);



  


  const handleImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);

      try {
        const res = await axios.post(`http://127.0.0.1:8000/api/lecturer/${userId}/uploadProfilePicture`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const imageUrl = res.data.profile_picture;
        console.log('Image URL:', imageUrl); 
        setImage(imageUrl);
        } else {
          setError('Failed to upload profile picture');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while uploading the profile picture');
      }
    }
  };


  const handleChangePasswordClick = () => {
    setIsChangePasswordVisible(true);
  }

  const handleClosePopup = () => {
    setIsChangePasswordVisible(false);
  }

  useEffect(() => {
    const fetchLecturerDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/lecturer/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const lecturerData = res.data[0]; // Assuming API returns an array with one admin object
          setLecturer(lecturerData);
          setImage(lecturerData.profile_picture);
          console.log(lecturerData.profile_picture);
        } else {
          setError('Failed to fetch lecturer details');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching lecturer details');
      }
    };

    const fetchSubjects = async () => {

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lecturer/${userId}/subject/mySubject`);
        if (response.status === 200) {
          setSubjects(response.data);
        } else {
          console.error('Failed to fetch subjects');
        }
      } catch (error) {
        console.error('An error occurred while fetching subjects:', error);
      }
    };

  

    fetchSubjects();
    fetchLecturerDetails();
  }, [token, userId]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!lecturer) {
    return <p><div class="sd-loader"></div></p>;
  }
  
  return (
    <>
  <div className="holder">
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
                { image ? <img src={image} className='profile-image' alt="Lecturer"/> : < FaUserTie className='LecIcon' alt="Lecturer Icon"/> }
                <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:'none'}} />
              </div>
              <span>{lecturer.name}</span>
              <hr />
            </div>
            <div className="lp-leftcolumn-down">
              <h1>About Me</h1>
              <span style={{fontSize:23}}>Lecturer At MMU</span>
              <button onClick={onLogout}>Log Out</button>
            </div>
          </div>
          <div className="lp-lowerright">
            <div className="upper">
              <div className="lp-lowerupperright">
                <h1>Email Address : </h1>
                <span className="lp-emailaddress">{lecturer.email}</span>
                <button onClick={handleChangePasswordClick}>Change Password</button>
                </div>
            </div>
            <div className="lp-Enrolledsubjectscontainer">
              <div className="lp-lowerlowerright">
                <h1>Taught Subjects : </h1>
                <span className="lp-linkstosubjects">
                {subjects.length > 0 ? (
                subjects.map((subject) => (

                  <div key={subject.id}>{subject.id} - {subject.name}</div>
                  
                ))
              ) : (
                <p>No subjects found.</p>
              )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    {isChangePasswordVisible && <ChangePassword onClose={handleClosePopup} token={token} userId={userId} role="lecturer" />}
    </>
  )
}

export default LecturerProfile;