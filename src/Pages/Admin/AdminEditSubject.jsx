import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../../Css/Admin/AdminEditSubject.css';
import '../../Css/Admin/AdminEditSubjectConfirmation.css';
import '../../Css/Admin/AdminEditSubjectReject.css';
import AdminEditSubjectConfirmation from '../../Components/Admin/AdminEditSubjectConfirmation';
import AdminEditSubjectReject from '../../Components/Admin/AdminEditSubjectReject';

export default function AdminEditSubject() {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false); 
  };

  const handleCloseRejectPopup = () => {
    setShowRejectPopup(false); 
  };

  const { id } = useParams(); // Assuming you're using react-router for route parameters
  const navigate = useNavigate();
  const [subject, setSubject] = useState({
    id: '',
    name: '',
    lec_id: ''
  });
  const [allLecturers, setAllLecturers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch lecturer details when the component mounts
    const fetchSubject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/subject/${id}`);
        if (response.data && response.data.length > 0) {
          setSubject(response.data[0]);
        } else {
          setError('No subject found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch lecturer details');
        setLoading(false);
      }
    };

    const fetchAllLecturers = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lecturer`);
        console.log('All lecturers fetched:', response.data);
        setAllLecturers(response.data);
      } catch (err) {
        console.error('Failed to fetch lecturer:', err);
        setError('Failed to fetch lecturers');
      }
    };
    
    fetchAllLecturers();
    fetchSubject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubject(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/subject/updateSub`, {
        id,
        name: subject.name,
        lec_id: subject.lec_id,
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
    <>
        <div className="aess-container">
            <h1>Edit Subject Details</h1>
            <form onSubmit={handleSubmit} className='aess-form'>
              <div className="aess-leftside">
                <div className="aess-label">
                  <label className='aess-Name'>Subject Code : </label>
                </div>
                <div className="aess-label">
                  <label className='aess-Email'>Subject Name : </label>
                </div>
                <div className="aess-label">
                  <label className='aess-Password'>Subject Taught By : </label>
                </div>
              </div>
              <div className="aess-rightside">
                <div className="aess-inputs">
                  <input
                    type="name"
                    className='aess-i-Name'
                    placeholder='Subject ID'
                    value={id}
                    readOnly
                  />
                </div>
                <div className="aess-inputs">
                  <input
                    type="name"
                    className='aess-i-Email'
                    name="name"
                    placeholder='Enter Subject Name'
                    value={subject.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="aess-inputs">
                  <select
                  name="lec_id"
                  value={subject.lec_id}
                  onChange={handleChange}
                  className='aess-i-Password'
                >
                    <option value="">Select Lecturer</option>
                    {allLecturers.map((lec) => (
                    <option key={lec.id} value={lec.id}>{lec.id}-{lec.name}</option>
                  ))}
                  </select>
                </div>
                <div className="aess-btn">
                  <button type="submit">
                    Confirm
                  </button>
                </div>
              </div>
        </form>
      </div>
      {showConfirmPopup && <AdminEditSubjectConfirmation onClose={handleCloseConfirmPopup} />}
      {showRejectPopup && <AdminEditSubjectReject onClose={handleCloseRejectPopup} />}
    </>
  )
}
