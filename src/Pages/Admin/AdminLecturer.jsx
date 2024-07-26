import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiSolidEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa";
import '../../Css/Admin/AdminLecturer.css';
import '../../Css/Admin/AdminLecturerConfirmDeletion.css';
import AdminLecturerConfirmDeletion from '../../Components/Admin/AdminLecturerConfirmDeletion';
import axios from 'axios';

export default function AdminLecturer() {
  const [lecturers, setLecturers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lecIdToDelete, setLecIdToDelete] = useState(null);

  const handleClosePopup = () => {
    setShowConfirmation(false);
    setLecIdToDelete(null);
  };

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/lecturer');
        if (response.status === 200) {
          setLecturers(response.data);
        } else {
          console.error('Failed to fetch lecturers');
        }
      } catch (error) {
        console.error('An error occurred while fetching lecturers:', error);
      }
    };

    fetchLecturers();
  }, []);

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/lecturer/${searchValue}`);
      if (response.status === 200) {
        setLecturers(response.data);
      } else {
        console.error('Failed to search lecturers');
      }
    } catch (error) {
      console.error('An error occurred while searching for lecturers:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setLecIdToDelete(id);
    setShowConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/lecturer/delete/${lecIdToDelete}`);
      if (response.status === 200) {
        setLecturers(lecturers.filter(lecturer => lecturer.id !== lecIdToDelete));
        handleClosePopup();
      } else {
        console.error('Failed to delete lecturer');
      }
    } catch (error) {
      console.error('An error occurred while deleting the lecturer:', error);
    }
  };

  return (
    <>
      <div className="al-holder">
        <h1>Lecturers</h1>
        <div className="al-container">
          <div className="al-upper">
            <HiOutlineSearch className='img' />
            <input 
              type="search" 
              placeholder='Search For Lecturer' 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="al-lecturercontainer">
            <div className="al-tags">
              <div className="al-tag1">
                <p>Lecturer ID</p>
              </div>
              <div className="al-tag2">
                <p>Name</p>
              </div>
              <div className="al-tag3">
                <p>Email</p>
              </div>
            </div>
            <div className="al-lecturerbox">
              {lecturers.length > 0 ? (
                lecturers.map((lecturer) => (
                  <div className="al-box" key={lecturer.id}>
                    <div className="al-ID">
                      <p>{lecturer.id}</p>
                    </div>
                    <div className="al-name">
                      <p>{lecturer.name}</p>
                    </div>
                    <div className="al-email">
                      <p>{lecturer.email}</p>
                    </div>
                    <div className="al-edit">
                      <Link to={`/Admin/Lecturer/Edit_Lecturer/${lecturer.id}`}>
                        <BiSolidEdit id='img' />
                      </Link>
                    </div>
                    <div className="al-delete">
                      <FaTrash 
                        id='img'
                        alt="Delete"
                        onClick={() => handleDeleteClick(lecturer.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No lecturers found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="al-btn">
        <Link to={"Add_Lecturer"}>
          <button>
            <FaUserPlus className='adduser' />Add New Lecturer
          </button>
        </Link>
      </div>
      {showConfirmation && (
        <AdminLecturerConfirmDeletion onClose={handleClosePopup} onConfirm={handleDeleteConfirm} />
      )}
    </>
  );
}
