import React, { useState, useEffect } from 'react';
import '../../Css/Lecturer/LecturerSubjectRequest.css';
import LecturerSubjectRequestSent from '../../Components/Lecturer/LecturerSubjectRequestSent'
import axios from 'axios';

export default function LecturerSubjectRequest() {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [lecturerID, setLecturerID] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false);
  };


  useEffect(() => {
    const storedLecturerID = localStorage.getItem('id');
    if (storedLecturerID) {
      setLecturerID(storedLecturerID);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/request/addLecReq', {
        lec_id: lecturerID,
        subject,
        message,
      });

      if (response.status === 201) {
        setShowConfirmPopup(true);
      } else {
        alert('Request not sent! Please try again!');
      }
    } catch (error) {
      console.error('An error occurred while sending the request:', error);
      alert('Request not sent! Please try again!');
    }
  };

  return (
    <>
      <div className="lsr-container">
        <h1>Subject Registration Request</h1>
        <form className="lsr-form" onSubmit={handleSubmit}>
          <div className="lsr-upper">
            <div className="lsr-upperleft">
              <div className="lsr-id">Lecturer ID</div>
              <input
                type="name"
                value={lecturerID}
                readOnly
                className="ID-lsr"
              />
            </div>
            <div className="lsr-upperright">
              <div className="lsr-subject">Subject</div>
              <input
                type="name"
                placeholder="Subject Name"
                className="Subject-lsr"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
          <div className="lsr-lower">
            Message
            <div>
              <textarea
                className="lsr-message"
                placeholder=""
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="lsr-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      {showConfirmPopup && <LecturerSubjectRequestSent onClose={handleCloseConfirmPopup} />}
    </>
  );
}
