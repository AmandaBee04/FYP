import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { FaBookOpen } from "react-icons/fa6";
import AdminSubjectConfirmDeletion from '../../Components/Admin/AdminSubjectConfirmDeletion';
import '../../Css/Admin/AdminSubjects.css';
import '../../Css/Admin/AdminSubjectConfirmDeletion.css';
import axios from 'axios';

export default function AdminSubject() {

  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [subIdToDelete, setSubIdToDelete] = useState(null);

  const handleClosePopup = () => {
    setShowConfirmation(false);
    setSubIdToDelete(null);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/subject`);
        if (response.status === 200) {
          setSubjects(response.data);
        } else {
          console.error('Failed to fetch subjects');
        }
      } catch (error) {
        console.error('An error occurred while fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/subject/${searchValue}`);
      if (response.status === 200) {
        setSubjects(response.data);
      } else {
        console.error('Failed to search subjects');
      }
    } catch (error) {
      console.error('An error occurred while searching for subjects:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setSubIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/subject/delete/${subIdToDelete}`);
      if (response.status === 200) {
        setSubjects(subjects.filter(subject => subject.id !== subIdToDelete));
        handleClosePopup();
      } else {
        console.error('Failed to delete subject');
      }
    } catch (error) {
      console.error('An error occurred while deleting the subject:', error);
    }
  };

  return (
    <>
      <div className="ass-holder">
        <h1>Subjects</h1>
        <div className="ass-container">

          <div className="ass-upper">
          <HiOutlineSearch className="img" />
            <input 
              type="search" 
              placeholder='Search For Subject' 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="ass-lecturercontainer">
            <div className="ass-tags">
              <div className="ass-tag1">
                <p>Subject ID</p>
              </div>
              <div className="ass-tag2">
                <p>Subject Name</p>
              </div>
              <div className="ass-tag3">
                <p>Lecturer ID</p>
              </div>
            </div>
          
            <div className="ass-lecturerbox">

            {subjects.length > 0 ? (
                    subjects.map((subject) => (
                      <div className="ass-box" key={subject.id}>
                        <div className="ass-ID">
                          <p>{subject.id}</p>
                        </div>
                        <div className="ass-SubjectName">
                          <p>{subject.name}</p>
                        </div>
                        <div className="ass-LecturerID">
                          <p>{subject.lec_id}</p>
                        </div>
                        <div className="ass-edit">
                        <Link to={`/Admin/Subject/Edit_Subject/${subject.id}`}>
                          < BiSolidEdit id='img' /> 
                        </Link>
                  </div>
                  <div className="ass-delete">
                  <FaTrash 
                      id='img'
                      onClick={() => handleDeleteClick(subject.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                      </div>
                    ))
                  ) : (
                    <p>No subjects found.</p>
                  )}


            </div>
          </div>

        </div>

        <div className="ass-btn">
          <Link to={"Add_Subject"}>
            <button>
            <FaBookOpen className='adduser'/>Add New Subject
            </button>
          </Link>
        </div>
      </div>
      {showConfirmation && (
        <AdminSubjectConfirmDeletion onClose={handleClosePopup} onConfirm={handleDeleteConfirm} />
      )}
    </>
  );
}




