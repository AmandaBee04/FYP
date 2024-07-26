import React, { useState, useEffect } from 'react';
import '../../Css/Lecturer/LecturerRequests.css';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LecturerRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [lecturerProfile, setLecturerProfile] = useState(null);
  const navigate = useNavigate();
  const lec_id = localStorage.getItem('id'); 

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const lec_id = localStorage.getItem('id'); // Retrieve lecturer ID from local storage
        const response = await axios.get(`http://127.0.0.1:8000/api/request/getLecRequestById/${lec_id}`);
        if (response.status === 200) {
          setRequests(response.data);
        } else {
          console.error('Failed to fetch requests');
        }
      } catch (error) {
        console.error('An error occurred while fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const fetchLecturerProfile = async (lec_id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/lecturer/profile/${lec_id}`);
      if (response.status === 200) {
        console.log(response.data);
        setLecturerProfile(response.data);
      } else {
        console.error('Failed to fetch lecturer profile');
      }
    } catch (error) {
      console.error('An error occurred while fetching lecturer profile:', error);
    }
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    fetchLecturerProfile(request.lec_id);
  };

  const handleComposeClick = () => {
    navigate('/Lecturer/Subject_Request');
  };



  return (
    <>
      <div className="lr-holder">
        <div className="lr-leftside">
          <div className="lr-header">
            <div><h2>Requests</h2></div>
            <div className='lr-btn'>
              <button onClick={handleComposeClick}>
                Compose
              </button>
            </div>
          </div>
          <div className="requestslider">
            {requests.map((request) => (
              <div className="lr-requests" key={request.id} onClick={() => handleRequestClick(request)}>
                <div className="lr-requests-left"/>
                <div className="lr-requests-middle">
                  <div className="lr-requestName">
                    {request.lecturer_name}
                  </div>
                  <div className="lr-requestsubject">
                    {request.subject}
                  </div>
                </div>
                <div className="lr-requests-right">
                  {new Date(request.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedRequest && (
          <div className="lr-rightside">
            <div className="lr-rightside-top">
            {lecturerProfile && lecturerProfile.profile_pic ? (
                <img src={lecturerProfile.profile_pic} className='profile-image' id='imageFile' alt="Lecturer Profile" />
              ) : (
                <FaUserCircle className='Profile' />
              )}
              <div className="lr-rightside-top-text">
                {selectedRequest.lecturer_name}
              </div>
              <div className="lr-rightside-top-lecID">
                <div><b>Lecturer ID : </b></div> 
                <div className="lr-LecID">{selectedRequest.lec_id}</div>
              </div>
            </div>

            <hr />

            <div className="lr-rightside-bottom">
              <div className="lr-rightside-bottom-text">
                <div className="lr-subject">
                  <b>Subject :</b>
                </div>
                <div className="lr-subjecttext">
                  {selectedRequest.subject}
                </div>
              </div>

              <div className="lr-rightside-lowest">
                <div className="lr-message">
                  Message
                </div>
                <div className="lr-textbox">
                  {selectedRequest.message}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
