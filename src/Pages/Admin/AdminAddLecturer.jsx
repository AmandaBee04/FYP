import React, { useState } from 'react';
import axios from 'axios';
import '../../Css/Admin/AdminAddLecturer.css';
import '../../Css/Admin/AdminAddLecturerConfirmation.css';
import '../../Css/Admin/AdminAddLecturerReject.css';
import AdminAddLecturerConfirmation from '../../Components/Admin/AdminAddLecturerConfirmation';
import AdminAddLecturerReject from '../../Components/Admin/AdminAddLecturerReject';

export default function AdminAddLecturer() {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false); 
  };

  const handleCloseRejectPopup = () => {
    setShowRejectPopup(false);
  };

  const [lecturer, setLecturer] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    profile_picture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setLecturer({
      ...lecturer,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', lecturer.id);
    formData.append('name', lecturer.name);
    formData.append('email', lecturer.email);
    formData.append('password', lecturer.password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/lecturer/addLec', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowConfirmPopup(true);
    } catch (error) {
      console.error('There was an error!', error);
      setShowRejectPopup(true);
    }
  };

  return (
    <>
      <div className="adl-container">
        <h1>Add New Lecturer</h1>
        <form onSubmit={handleSubmit} className='adl-form'>
          <div className="adl-leftside">
            <div className="adl-label">
              <label className='adl-ID'>Lecturer ID : </label>
            </div>
            <div className="adl-label">
              <label className='adl-Name'>Lecturer Name : </label>
            </div>
            <div className="adl-label">
              <label className='adl-Email'>Email : </label>
            </div>
            <div className="adl-label">
              <label className='adl-Password'>Password : </label>
            </div>
          </div>
          <div className="adl-rightside">
            <div className="adl-inputs">
              <input 
                type="text" 
                name="id" 
                className='adl-i-ID'
                placeholder='Enter Lecturer ID'
                value={lecturer.id}
                onChange={handleChange}
              />
            </div>
            <div className="adl-inputs">
              <input 
                type="text" 
                name="name" 
                className='adl-i-Name'
                placeholder='Enter Lecturer Name'
                value={lecturer.name}
                onChange={handleChange}
              />
            </div>
            <div className="adl-inputs">
              <input 
                type="email" 
                name="email" 
                className='adl-i-Email'
                placeholder='Enter Email'
                value={lecturer.email}
                onChange={handleChange}
              />
            </div>
            <div className="adl-inputs">
              <input 
                type="name" 
                name="password" 
                className='adl-i-Password'
                placeholder='Enter Password'
                value={lecturer.password}
                onChange={handleChange}
              />
            </div>
            <div className="adl-btn">
              <button type="submit">
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
      {showConfirmPopup && <AdminAddLecturerConfirmation onClose={handleCloseConfirmPopup} />}
      {showRejectPopup && <AdminAddLecturerReject onClose={handleCloseRejectPopup} />}
    </>
  );
}
