import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Css/Admin/AdminEditLecturer.css';
import '../../Css/Admin/AdminEditLecturerConfirmation.css';
import '../../Css/Admin/AdminEditLecturerReject.css';
import AdminEditLecturerConfirmation from '../../Components/Admin/AdminEditLecturerConfirmation';
import AdminEditLecturerReject from '../../Components/Admin/AdminEditLecturerReject';

export default function AdminEditLecturer() {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false); 
  };

  const handleCloseRejectPopup = () => {
    setShowRejectPopup(false); 
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [lecturer, setLecturer] = useState({
    name: '',
    email: '',
    profile_picture: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch lecturer details when the component mounts
    const fetchLecturer = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lecturer/profile/${id}`);
        setLecturer(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch lecturer details');
        setLoading(false);
      }
    };

    fetchLecturer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLecturer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.put(`http://127.0.0.1:8000/api/lecturer/updateLec`, {
        id,
        name: lecturer.name,
        email: lecturer.email,
        // Add other fields if necessary
      });

      if (response.status === 201) {
        setShowConfirmPopup(true);
      } 
    } catch (err) {
      setShowRejectPopup(true);
    }
  };

  if (loading) {
    return <div><div class="sd-loader"></div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ael-container">
      <h1>Edit Lecturer Details</h1>
      <form onSubmit={handleSubmit} className='ael-form'>
        <div className="ael-leftside">
          <div className="ael-label">
            <label className='ael-ID'>Lecturer ID : </label>
          </div>
          <div className="ael-label">
            <label className='ael-Name'>Lecturer Name : </label>
          </div>
          <div className="ael-label">
            <label className='ael-Email'>Email : </label>
          </div>
        </div>
        <div className="ael-rightside">
          <div className="ael-inputs">
            <input
              type="name"
              className='ael-i-ID'
              placeholder='Edit Lecturer ID'
              value={id}
              readOnly
            />
          </div>
          <div className="ael-inputs">
            <input
              type="name"
              className='ael-i-Name'
              name="name"
              placeholder='Edit Lecturer Name'
              value={lecturer.name}
              onChange={handleChange}
            />
          </div>
          <div className="ael-inputs">
            <input
              type="email"
              className='ael-i-Email'
              name="email"
              placeholder='Edit Email'
              value={lecturer.email}
              onChange={handleChange}
            />
          </div>
          <div className="ael-btn">
            <button type="submit">
              Confirm
            </button>
          </div>
        </div>
      </form>
      {showConfirmPopup && <AdminEditLecturerConfirmation onClose={handleCloseConfirmPopup} />}
      {showRejectPopup && <AdminEditLecturerReject onClose={handleCloseRejectPopup} />}
    </div>
    
  );
}