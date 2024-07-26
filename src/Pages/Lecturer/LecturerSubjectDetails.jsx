import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaBookDead } from "react-icons/fa";

import '../../Css/Lecturer/LecturerSubjectDetails.css';
import axios from 'axios';
 
export default function LecturerSubjectDetails() {
  const { sub_id } = useParams(); // Get subject ID from URL parameters
  const [subject, setSubject] = useState({});
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentsBySubject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/subject/${sub_id}/getStudentsBySubject`);
        if (response.status === 200) {
          setSubject(response.data.subject);
          setStudents(response.data.students);
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

  const deleteStudent = async (stud_id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/subject/${sub_id}/student/${stud_id}`);
      if (response.status === 200) {
        // Remove the student from the students state
        setStudents(students.filter(student => student.id !== stud_id));
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('An error occurred while deleting the student:', error);
    }
  };
  

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <>
      <div className="lsd-holder">
        <div className="lsd-container">
          <div className="lsd-upper">
            <div className="lsd-SubjectName">
              <h2>{subject.id} - {subject.name}</h2>
            </div>
          </div>

          <div className="lsd-lower">
            <div className="lsd-lower-header">
              <div><h2>Student List</h2></div>
              <div className="lsd-btn">
                <Link to={`/Lecturer/Subject_Details/Add_Students/${sub_id}`}>
                  <button>
                    + Add New Students
                  </button>
                </Link>
              </div>
            </div>

            <div className="lsd-lecturercontainer">
              <div className="lsd-tags">
                <div className="lsd-tag1">
                  <p>Student ID</p>
                </div>
                <div className="lsd-tag2">
                  <p>Name</p>
                </div>
                <div className="lsd-tag4">
                  <p>Email</p>
                </div>
                <div className="lsd-tag5">
                  <p>Programme</p>
                </div>
                <div className="lsd-tag6">
                  <p>Faculty</p>
                </div>
              </div>

              <div className="lsd-lecturerbox">
                {students.map((student) => (
                  <div key={student.id} className="lsd-box">
                    <div className="lsd-ID">
                      <p>{student.id}</p>
                    </div>
                    <div className="lsd-name">
                      <p>{student.stud_name}</p>
                    </div>
                    <div className="lsd-email">
                      <p>{student.stud_email}</p>
                    </div>
                    <div className="lsd-programme">
                      <p>{student.programme}</p>
                    </div>
                    <div className="lsd-faculty">
                      <p>{student.faculty}</p>
                    </div>
                    <FaBookDead className='deadbook' onClick={() => deleteStudent(student.id)}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
