import React, { useState, useEffect } from 'react';
import { FaUserTie } from 'react-icons/fa6';
import '../../Css/Student/StudentSubjectDetails.css';

export default function StudentSubjectDetails() {
  const [showRightSide, setShowRightSide] = useState(false);
  const [hiding, setHiding] = useState(false);

  const handleLecProfileMiniClick = () => {
    if (showRightSide) {
      setHiding(true);
      setTimeout(() => {
        setShowRightSide(false);
        setHiding(false);
      }, 500); // Match this duration with the animation duration
    } else {
      setShowRightSide(true);
    }
  };

  useEffect(() => {
    if (!showRightSide && !hiding) {
      document.querySelector('.ssd-rightside').classList.add('hidden');
    }
  }, [showRightSide, hiding]);

  return (
    <>
      <div className="ssd-holder">
        <div className={`ssd-container ${showRightSide ? 'move-left' : ''}`}>
          <div className="ssd-upper">
            <div className="ssd-SubjectName">
              <h2>Subject Name</h2>
            </div>
          </div>

          <div className="ssd-lower">
            <div className="ssd-lower-header">
              <div><h2>Student List</h2></div>
            </div>

            <div className="ssd-lecturercontainer">
              <div className="ssd-tags">
                <div className="ssd-tag1">
                  <p>Student ID</p>
                </div>
                <div className="ssd-tag2">
                  <p>Name</p>
                </div>
                <div className="ssd-tag4">
                  <p>Email</p>
                </div>
                <div className="ssd-tag5">
                  <p>Programme</p>
                </div>
                <div className="ssd-tag6">
                  <p>Faculty</p>
                </div>
              </div>

              <div className="ssd-lecturerbox">
                <div className="ssd-box">
                  <div className="ssd-ID">
                    <p>100123456</p>
                  </div>
                  <div className="ssd-name">
                    <p>Way Tu Yung</p>
                  </div>
                  <div className="ssd-email">
                    <p>WayTY@gmail.com</p>
                  </div>
                  <div className="ssd-programme">
                    <p>Diploma in IT</p>
                  </div>
                  <div className="ssd-faculty">
                    <p>FCI</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`ssd-rightside ${showRightSide ? (hiding ? 'hide' : 'show') : ''}`}>
          <div className="ssd-lecprofile">
            <FaUserTie />
          </div>
          <div className="ssd-lectureName">
            <p>Ruzzana</p>
          </div>
        </div>

        <div className="ssd-lecprofilemini" onClick={handleLecProfileMiniClick}>
          <FaUserTie />
        </div>
      </div>
    </>
  );
}
