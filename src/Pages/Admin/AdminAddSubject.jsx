import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../Css/Admin/AdminAddSubject.css';
import '../../Css/Admin/AdminAddSubjectConfirmation.css';
import '../../Css/Admin/AdminAddSubjectReject.css';
import AdminAddSubjectConfirmation from '../../Components/Admin/AdminAddSubjectConfirmation';
import AdminAddSubjectReject from '../../Components/Admin/AdminAddSubjectReject';

export default function AdminAddSubject() {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false); 
  };

  const handleCloseRejectPopup = () => {
    setShowRejectPopup(false); 
  };

  const [subject, setSubject] = useState({
    id: '',
    name: '',
    lec_id: '',
  });
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/lecturer');
        if (response.status === 200) {
          setLecturers(response.data);
        } else {
          console.error('Failed to fetch lecturers');
        }
      } catch (error) {
        console.error('An error occurred while fetching lecturers:', error);
      }
    };

    fetchLecturers();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSubject({
      ...subject,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debugging log
    const formData = new FormData();
    formData.append('id', subject.id);
    formData.append('name', subject.name);
    formData.append('lec_id', subject.lec_id);

    for (let [key, value] of formData.entries()) {
      console.log(key, value); // Debugging log
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/subject/addSub', formData, {
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
        <div className="adss-container">
            <h1>Add New Subjects</h1>
            <form onSubmit={handleSubmit} className='adss-form'>
              <div className="adss-leftside">
                <div className="adss-label">
                  <label className='adss-Name'>Subject Code : </label>
                </div>
                <div className="adss-label">
                  <label className='adss-Email'>Subject Name : </label>
                </div>
                <div className="adss-label">
                  <label className='adss-Password'>Subject Taught By : </label>
                </div>
              </div>
              <div className="adss-rightside">
                <div className="adss-inputs">
                  <input 
                    type="name" 
                    name="id" 
                    className='adss-i-Name'
                    placeholder='Enter Subject Code'
                    value={subject.id}
                    onChange={handleChange}
                  />
                </div>
                <div className="adss-inputs">
                  <input 
                    type="name" 
                    name="name" 
                    className='adss-i-Email'
                    placeholder='Enter Subject Name'
                    value={subject.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="adss-inputs">
                  
                  <select 
                  name="lec_id" 
                  className='adss-i-Password'
                  value={subject.lec_id}
                  onChange={handleChange}
                >
                  <option value="">Select Lecturer</option>
                  {lecturers.map((lecturer) => (
                    <option key={lecturer.id} value={lecturer.id}>
                      {lecturer.id} - {lecturer.name}
                    </option>
                  ))}
                </select>
                </div>
                <div className="adss-btn">
                <button type="submit">
                  Confirm
                </button>
                </div>
              </div>
        </form>
      </div>
      {showConfirmPopup && <AdminAddSubjectConfirmation onClose={handleCloseConfirmPopup} />}
      {showRejectPopup && <AdminAddSubjectReject onClose={handleCloseRejectPopup} />}
    </>
  )
}
