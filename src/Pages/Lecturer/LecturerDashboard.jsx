import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../Css/Lecturer/LecturerDashboard.css'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios'


export default function LecturerDashboard() {


  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  const [lecturer, setLecturer] = useState(null);
  const [error, setError] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [image, setImage] = useState(null);
  const [questionSets, setQuestionSets] = useState([]);

  useEffect(() => {
    const fetchLecturerDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/lecturer/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const lecturerData = res.data; // Assuming API returns an array with one admin object
          setLecturer(lecturerData);
          setImage(lecturerData.profile_pic);
          console.log(lecturerData);
        } else {
          setError('Failed to fetch lecturer details');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching lecturer details');
      }
    };

    const fetchSubjects = async () => {

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/subject/${userId}/subjects-with-count`);
        if (response.status === 200) {
          setSubjects(response.data);
        } else {
          console.error('Failed to fetch subjects');
        }
      } catch (error) {
        console.error('An error occurred while fetching subjects:', error);
      }
    };

    const fetchStudentGrades = async () => {
      try {
          const res = await axios.get(`http://127.0.0.1:8000/api/lecturer/${userId}/studentGradesSubject`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });

          if (res.status === 200) {
            console.log(res.data);
              setQuestionSets(res.data);
          } else {
              setError('Failed to fetch question sets');
          }
      } catch (err) {
          console.error(err);
          setError('An error occurred while fetching question sets');
      }
  };

    fetchStudentGrades();
    fetchSubjects();
    fetchLecturerDetails();

  }, [userId, token]);

  

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!lecturer) {
    return <p><div class="sd-loader"></div></p>;
  }
  
  return (
    <>
      <div className="ld-holder">
        <div className="ld-container">
          <div className="ld-header">
          {image ?<img src={image} className='profile-image' alt="Lecturer" /> : <FaUserCircle className="Icon" />}
            <div>Welcome back</div>
            <div>{lecturer.name}</div>
          </div>

          <div className="ld-bigcontainer">

              <div className="ld-mysubjects">
                <div className="ld-mysubjects-header">
                  <h2>My Subjects</h2>
                </div>

                <div className="ld-subjectholder">
                {subjects.map((subject) => (
                  <Link key={subject.id} to={`/Lecturer/Subject_Details/${subject.id}`}>
                    <div className="ld-subjects">
                      <div className="ld-CoverPage"/>
                      <div className="ld-Class">
                        <div className="ld-classCode">{subject.id}</div>
                        <div className="ld-classname">{subject.name}</div>
                      </div>
                      <div className="ld-howmany">
                        <div className="ld-NoStudents">{subject.subject_taken_count}</div>
                        <div>Students</div>
                      </div>
                    </div>
                  </Link>
                ))}


                  

                </div>
              </div>

              <div className="ld-MyQuizzes">

                <div className="ld-MyQuizzes-header">
                  <h2>Student Grades</h2>
                </div>

                <div className="ld-MyQuizzes-holder">

                {questionSets.map((questionSet) => (
                  <Link key={questionSet.id} to={`/Lecturer/Student_Grades/${questionSet.id}`}>
                      <div className="ld-subjects">
                          <div className="ld-CoverPage"/>
                          <div className="ld-Class">
                              <div className="ld-classCode">{questionSet.qs_name}</div>
                              <div className="ld-classtype">{questionSet.type}</div>
                          </div>
                          <label className='ld-nameofclass'>{questionSet.subject_name}</label>
                          <div className="ld-howmany">
                              <div className="ld-NoStudents">{questionSet.stud_grade_count}</div>
                              <div>Students Marked</div>
                          </div>
                      </div>
                  </Link>
                ))}



                </div>
              </div>

                        
          </div>
        </div>
      
      </div>
    </>
  )
}
