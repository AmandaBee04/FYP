import React, { useState, useEffect } from 'react';
import '../../Css/Admin/AdminRequests.css';
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [lecturerProfile, setLecturerProfile] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => { 
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/request/getLecRequest`);
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

  return (
    <>
      <div className="ar-holder">
        <div className="ar-leftside">
          <div className="ar-header">
            <h2>Requests</h2>
          </div>
          <div className="requestslider">
            {requests.map((request) => (
              <div className="ar-requests" key={request.id} onClick={() => handleRequestClick(request)}>
                <div className="ar-requests-left" />
                <div className="ar-requests-middle">
                  <div className="ar-requestName">
                    {request.lecturer_name}
                  </div>
                  <div className="ar-requestsubject">
                    {request.subject}
                  </div>
                </div>
                <div className="ar-requests-right">
                  {new Date(request.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedRequest && lecturerProfile && (
          <div className="ar-rightside">
            <div className="ar-rightside-top">
            {lecturerProfile && lecturerProfile.profile_pic ? (
                <img src={lecturerProfile.profile_pic} alt="Lecturer Profile" />
              ) : (
                <FaUserCircle className='Profile' />
              )}
              <div className="ar-rightside-top-text">
                {lecturerProfile.name}
              </div>
              <div className="ar-rightside-top-lecID">
                <div><b>Lecturer ID : </b></div> <div className="ar-LecID">{selectedRequest.lec_id}</div>
              </div>
            </div>

            <hr />

            <div className="ar-rightside-bottom">
              <div className="ar-rightside-bottom-text">
                <div className="ar-subject">
                  <b>Subject :</b>
                </div>
                <div className="ar-subjecttext">
                  {selectedRequest.subject}
                </div>
              </div>

              <div className="ar-rightside-lowest">
                <div className="ar-message">
                  Message
                </div>
                <div className="ar-textbox">
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
