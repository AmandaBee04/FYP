import React from 'react';
import '../../Css/Lecturer/LecturerRequests.css';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

export default function LecturerRequests() {
  const navigate = useNavigate();

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
            <div className="lr-requests">
              <div className="lr-requests-left"/>
              <div className="lr-requests-middle">
                <div className="lr-requestName">
                  Ben Dover
                </div>
                <div className="lr-requestsubject">
                  Request to add subject
                </div>
              </div>
              <div className="lr-requests-right">
                12/28/24
              </div>
            </div>

            <div className="lr-requests">
              <div className="lr-requests-left"/>
              <div className="lr-requests-middle">
                <div className="lr-requestName">
                  Ben Dover
                </div>
                <div className="lr-requestsubject">
                  Request to add subject
                </div>
              </div>
              <div className="lr-requests-right">
                12/28/24
              </div>
            </div>
          </div>
        </div>

        <div className="lr-rightside">
          <div className="lr-rightside-top">
            <FaUserCircle className='Profile'/>
            <div className="lr-rightside-top-text">
              Ben Dover
            </div>
            <div className="lr-rightside-top-lecID">
              <div><b>Lecturer ID : </b></div> 
              <div className="lr-LecID">12345324342</div>
            </div>
          </div>

          <hr />

          <div className="lr-rightside-bottom">
            <div className="lr-rightside-bottom-text">
              <div className="lr-subject">
                <b>Subject :</b>
              </div>
              <div className="lr-subjecttext">
                Request New Subject
              </div>
            </div>

            <div className="lr-rightside-lowest">
              <div className="lr-message">
                Message
              </div>
              <div className="lr-textbox">
                I am writing to request the addition of a new subject, specifically an DIT5551 e-commerce course, to our platform's curriculum. As a lecturer specializing in business and technology, I believe that e-commerce has become an essential lrea of study in today's digital economy. This course would cover fundamental concepts such as online business models, digital mlrketing strategies, payment systems, and e-commerce platforms. It would equip our students with practical skills and knowledge that lre highly relevant to contemporlry business environments. I am confident that offering this course will enhance our platform's academic offerings and better preplre our students for success in their clreers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
