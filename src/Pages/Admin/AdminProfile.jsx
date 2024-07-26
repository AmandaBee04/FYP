import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import AdminIcon from '../../assets/Admin_Images/AdminIcon.png';
import ChangePassword from '../../Components/ChangePassword';
import '../../Css/Admin/AdminProfile.css';

const AdminProfile = ({ token, onLogout, userId }) => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
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
        const res = await axios.post(`http://127.0.0.1:8000/api/admin/${userId}/uploadProfilePicture`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const imageUrl = res.data.profile_picture;
        console.log('Image URL:', imageUrl); // Log the image URL received from the API
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
    const fetchAdminDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/admin/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const adminData = res.data[0]; // Assuming API returns an array with one admin object
          setAdmin(adminData);
          setImage(adminData.profile_picture || AdminIcon);
          console.log(adminData.profile_picture);
        } else {
          setError('Failed to fetch admin details');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching admin details');
      }
    };

    fetchAdminDetails();
  }, [token, userId]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!admin) {
    return <p><div class="sd-loader"></div></p>;
  }

  return (
    <>
    <div className="holder">
      <div className="ap-container">
        <div className="ap-upper">Profile</div>
        <div className="ap-lower">
          <div className="ap-lowerleft">
            <div className="ap-leftcolumn-up">
              <br />
              <br />
              <div onClick={handleImageClick}>
                {image ? <img src={image} alt="Admin" className="profile-image" /> : <img src={AdminIcon} alt="Admin Icon" className="profile-image" />}
                <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
              </div>
              <br />
              <hr />
            </div>
            <div className="ap-leftcolumn-down">
              <span>{admin.name}</span>
              <button onClick={onLogout}>Log Out</button>
            </div>
          </div>
          <div className="ap-lowerright">
            <div className="ap-lowerupperright">
              <h1>Email Address: </h1>
              <span className="ap-emailaddress">{admin.email}</span>
              <button onClick={handleChangePasswordClick}>Change Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {isChangePasswordVisible && <ChangePassword onClose={handleClosePopup} token={token} userId={userId} role="admin" />}
    </>
  );
};

export default AdminProfile;