import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa6';
import '../../Css/Student/StudentSubjectDetails.css';
import axios from 'axios'

export default function StudentSubjectDetails() {
  const [showRightSide, setShowRightSide] = useState(false);
  const [hiding, setHiding] = useState(false);
  const { sub_id } = useParams(); 
  const [subject, setSubject] = useState({});
  const [students, setStudents] = useState([]);
  const [lecturer, setLecturer] = useState({});
  const [error, setError] = useState('');
  

  const handleLecProfileMiniClick = () => {
    if (showRightSide) {
      setHiding(true);
      setTimeout(() => {
        setShowRightSide(false);
        setHiding(false);
      }, 500); 
    } else {
      setShowRightSide(true);
    }
  };

  useEffect(() => {
    if (!showRightSide && !hiding) {
      document.querySelector('.ssd-rightside').classList.add('hidden');
    }
  }, [showRightSide, hiding]);

  useEffect(() => {
    const fetchStudentsBySubject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/subject/${sub_id}/getStudentsBySubject`);
        if (response.status === 200) {
          setSubject(response.data.subject);
          setStudents(response.data.students);
  
         
          const fetchLecturerDetails = async () =>{
            try{
              console.log(response.data.subject.lec_id);
              const res = await axios.get(`http://127.0.0.1:8000/api/lecturer/${response.data.subject.lec_id}`);
              if (res.status === 200) {
                console.log(res.data);
                setLecturer(res.data[0]);
              } else {
                console.error('Failed to fetch lecturer');
              }
            } catch (error) {
              console.error('An error occurred while fetching lecturer:', error);
              setError('An error occurred while fetching lecturer');
            }
          };
          fetchLecturerDetails();
  
        } else {
          console.error('Failed to fetch students by subject');
        }
      } catch (error) {
        console.error('An error occurred while fetching students by subject:', error);
        setError('An error occurred while fetching students by subject');
      }
    };
  
    fetchStudentsBySubject();
  }, [sub_id]);
  

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }
 
  return (
    <>
      <div className="ssd-holder">
        <div className={`ssd-container ${showRightSide ? 'move-left' : ''}`}>
          <div className="ssd-upper">
            <div className="ssd-SubjectName">
              <h2>{subject.id} - {subject.name}</h2>
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
                  <p>Programme</p>
                </div>
                <div className="ssd-tag6">
                  <p>Faculty</p>
                </div>
              </div>

              <div className="ssd-lecturerbox">
              {students.map((student) => (
                  <div key={student.id} className="ssd-box">
                    <div className="ssd-ID">
                      <p>{student.id}</p>
                    </div>
                    <div className="ssd-name">
                      <p>{student.stud_name}</p>
                    </div>
                    
                    <div className="ssd-programme">
                      <p>{student.programme}</p>
                    </div>
                    <div className="ssd-faculty">
                      <p>{student.faculty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`ssd-rightside ${showRightSide ? (hiding ? 'hide' : 'show') : ''}`}>
          <div className="ssd-lecprofile">
          {lecturer.profile_picture ?<img src={lecturer.profile_picture} className='profile-image' alt="Student" /> : <FaUserTie className="Icon" />}
            
          </div>
          <div className="ssd-lectureName">
            <p>{lecturer.id} - {lecturer.name}</p>
            <p>{lecturer.email}</p>
          </div>
        </div>

        <div className="ssd-lecprofilemini" onClick={handleLecProfileMiniClick}>
          <FaUserTie />
        </div>
      </div>
    </>
  );
}
