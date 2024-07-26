import React, { useEffect, useState } from 'react';
import Search from '../../assets/Lecturer_Images/SearchPic.png';
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../Css/Lecturer/LecturerAddStudents.css';

export default function LecturerAddStudents() {
  const { sub_id } = useParams();
  const [students, setStudents] = useState([]);
  const [subjectStudents, setSubjectStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/student');
        console.log('All Students Response:', res.data); // Log the response data
        if (Array.isArray(res.data)) {
          setStudents(res.data);
        } else if (Array.isArray(res.data.students)) {
          setStudents(res.data.students);
        } else {
          console.error('Unexpected response data:', res.data);
        }
      } catch (error) {
        console.error('An error occurred while fetching all students:', error);
      }
    };
  
    const fetchSubjectStudents = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/subject/${sub_id}/getStudentsBySubject`);
        console.log('Subject Students Response:', res.data.students); // Log the response data
        if (res.data && Array.isArray(res.data.students)) {
          setSubjectStudents(res.data.students);
        } else {
          console.error('Unexpected response data:', res.data);
        }
      } catch (error) {
        console.error('An error occurred while fetching students by subject:', error);
      }
    };
  
    fetchStudents();
    fetchSubjectStudents();
  }, [sub_id]);

  useEffect(() => {
    const filtered = students.filter(student => 
        (!searchQuery || student.id.toString().includes(searchQuery) || student.stud_name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !subjectStudents.some(subjectStudent => subjectStudent.id.toString() === student.id.toString())
      );
    setFilteredStudents(filtered);
  }, [students, subjectStudents, searchQuery]);

  const addStudentToSubject = async (studentId) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/subject/addStudToSub', {
        student_id: studentId,
        subject_id: sub_id,
      });
      console.log('Student added to subject successfully:', response.data);
      // Refresh subject students list after adding
      const res = await axios.get(`http://127.0.0.1:8000/api/subject/${sub_id}/getStudentsBySubject`);
      if (res.data && Array.isArray(res.data.students)) {
        setSubjectStudents(res.data.students);
      }
    } catch (error) {
      console.error('Error adding student to subject:', error);
    }
  };

  return (
    <>
      <div className="las-holder">
        <div className="las-container">

          <div className="las-upper">
            <img src={Search} alt="Search" />
            <input type="search" placeholder='Search For Student' value={searchQuery} onChange={handleSearchChange} />
          </div>

          <div className="las-lecturercontainer">
            <div className="las-tags">
              <div className="las-tag1">
                <p>Student ID</p>
              </div>
              <div className="las-tag2">
                <p>Name</p>
              </div>
              <div className="las-tag4">
                <p>Email</p>
              </div>
              <div className="las-tag5">
                <p>Programme</p>
              </div>
              <div className="las-tag6">
                <p>Faculty</p>
              </div>
            </div>

            <div className="las-lecturerbox">
              {filteredStudents.map(student => (
                <div className="las-box" key={student.id}>
                  <div className="las-ID">
                    <p>{student.id}</p>
                  </div>
                  <div className="las-name">
                    <p>{student.stud_name}</p>
                  </div>
                  <div className="las-email">
                    <p>{student.stud_email}</p>
                  </div>
                  <div className="las-programme">
                    <p>{student.programme}</p>
                  </div>
                  <div className="las-faculty">
                    <p>{student.faculty}</p>
                  </div>

                    <button className="las-btn" onClick={() => addStudentToSubject(student.id)}>
                        <FaPlus className='plussign' />
                    </button>
                  </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
