import React, { useState, useRef, useEffect } from 'react';
import ChangePassword from '../../Components/ChangePassword';
import { FaUserGraduate } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../../Css/Student/StudentProfile.css';
import axios from 'axios';

const StudentProfile = ({ token, onLogout, userId }) => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_picture', file);

      try {
        const res = await axios.post(`http://127.0.0.1:8000/api/student/${userId}/uploadProfilePicture`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const imageUrl = res.data.profile_picture;
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
  };

  const handleClosePopup = () => {
    setIsChangePasswordVisible(false);
  };

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/student/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const studentData = res.data;
          setStudent(studentData);
          setImage(studentData.profile_pic);
        } else {
          setError('Failed to fetch student details');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching student details');
      }
    };

    fetchStudentDetails();
  }, [token, userId]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!student) {
    return <p><div class="sd-loader"></div></p>;
  }

  return (
    <>
      <div className="sp-holder">
        <div className="sp-container">
          <div className="sp-upper">Profile</div>
          <div className="sp-lower">
            <div className="sp-lowerleft">
              <div className="sp-leftcolumn-up">
                <br />
                <div onClick={handleImageClick}>
                  {image ? (
                    <img src={image} className='profile-image' alt="Student" />
                  ) : (
                    <FaUserGraduate className="StuIcon" alt="Student Icon" />
                  )}
                  <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                </div>
                <span>{student.stud_name}</span>
                <hr />
              </div>
              <div className="sp-leftcolumn-down">
                <h1>About Me</h1>
                <label>Programme : </label>
                <span style={{ fontSize: 23 }}>{student.programme}</span>
                <label>Faculty : </label>
                <span style={{ fontSize: 23 }}>{student.faculty}</span>
                <button onClick={onLogout}>Log Out</button>
              </div>
            </div>
            <div className="sp-lowerright">
              <div className="upper">
                <div className="sp-lowerupperright">
                  <h1>Email Address : </h1>
                  <span className="sp-emailaddress">{student.stud_email}</span>
                  <button onClick={handleChangePasswordClick}>Change Password</button>
                </div>
              </div>
              <div className="sp-Enrolledsubjectscontainer">
                <div className="sp-lowerlowerright">
                  <h1>Enrolled Subjects : </h1>
                  <span className="sp-linkstosubjects">
                    {student.enrolled_subjects.map((subject) => (
                      <Link key={subject.id} to={`/Student/Profile/Subject_Details/${subject.id}`}>
                        <div>{subject.id} - {subject.name}</div>
                      </Link>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isChangePasswordVisible && <ChangePassword onClose={handleClosePopup} token={token} userId={userId} role="student" />}
    </>
  );
};

export default StudentProfile;
