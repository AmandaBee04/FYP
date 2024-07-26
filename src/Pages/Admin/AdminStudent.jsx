import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidEdit } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaUserPlus } from 'react-icons/fa';
import '../../Css/Admin/AdminStudent.css';
import '../../Css/Admin/AdminStudentConfirmDeletion.css';
import AdminStudentConfirmDeletion from '../../Components/Admin/AdminStudentConfirmDeletion';
import axios from 'axios';

export default function AdminStudent() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [studIdToDelete, setStudIdToDelete] = useState(null);

  const handleClosePopup = () => {
    setShowConfirmation(false);
    setStudIdToDelete(null);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/student`);
        if (response.status === 200) {
          setStudents(response.data);
        } else {
          console.error('Failed to fetch students');
        }
      } catch (error) {
        console.error('An error occurred while fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/student/${searchValue}`);
      if (response.status === 200) {
        setStudents(response.data);
      } else {
        console.error('Failed to search students');
      }
    } catch (error) {
      console.error('An error occurred while searching for students:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setStudIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/student/delete/${studIdToDelete}`);
      if (response.status === 200) {
        setStudents(students.filter((student) => student.id !== studIdToDelete));
        handleClosePopup();
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('An error occurred while deleting the student:', error);
    }
  };

  return (
    <>
      <div className="as-holder">
        <h1>Students</h1>
        <div className="as-container">
          <div className="as-upper">
            <HiOutlineSearch className="img" />
            <input
              type="search"
              placeholder="Search For student"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="as-lecturercontainer">
            <div className="as-tags">
              <div className="as-tag1">
                <p>Student ID</p>
              </div>
              <div className="as-tag2">
                <p>Name</p>
              </div>
              <div className="as-tag3">
                <p>Email</p>
              </div>
              <div className="as-tag5">
                <p>Programme</p>
              </div>
              <div className="as-tag6">
                <p>Faculty</p>
              </div>
            </div>

            <div className="as-lecturerbox">
              {students.length > 0 ? (
                students.map((student) => (
                  <div className="as-box" key={student.id}>
                    <div className="as-ID">
                      <p>{student.id}</p>
                    </div>
                    <div className="as-name">
                      <p>{student.stud_name}</p>
                    </div>

                    <div className="as-email">
                      <p>{student.stud_email}</p>
                    </div>

                    <div className="as-programme">
                      <p>{student.programme}</p>
                    </div>

                    <div className="as-faculty">
                      <p>{student.faculty}</p>
                    </div>

                    <div className="al-edit">
                      <Link to={`/Admin/Student/Edit_Student/${student.id}`}>
                        <BiSolidEdit id="img" />
                      </Link>
                    </div>

                    <div className="al-delete">
                      <FaTrash
                        id="img"
                        onClick={() => handleDeleteClick(student.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No students found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="as-btn">
        <Link to={'Add_Student'}>
          <button>
            <FaUserPlus className="adduser" />
            Add New Student
          </button>
        </Link>
      </div>

      {showConfirmation && (
        <AdminStudentConfirmDeletion onClose={handleClosePopup} onConfirm={handleDeleteConfirm} />
      )}
    </>
  );
}
