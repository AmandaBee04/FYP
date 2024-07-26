import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../Css/Admin/AdminAddStudent.css';
import '../../Css/Admin/AdminAddStudentConfirmation.css';
import '../../Css/Admin/AdminAddStudentReject.css';
import AdminAddStudentConfirmation from '../../Components/Admin/AdminAddStudentConfirmation';
import AdminAddStudentReject from '../../Components/Admin/AdminAddStudentReject';

export default function AdminAddStudent() {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false); 
  };

  const handleCloseRejectPopup = () => {
    setShowRejectPopup(false); 
  };

  const [student, setStudent] = useState({
    id: '',
    stud_name: '',
    password: '',
    stud_email: '',
    programme: '',
    faculty: '',
    profile_picture: null,
    sub_id: '',
  });
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/subject');
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setStudent({
      ...student,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debugging log
    const formData = new FormData();
    formData.append('id', student.id);
    formData.append('stud_name', student.stud_name);
    formData.append('stud_email', student.stud_email);
    formData.append('password', student.password);
    formData.append('programme', student.programme);
    formData.append('sub_id', student.sub_id);
    formData.append('faculty', student.faculty);

    for (let [key, value] of formData.entries()) {
      console.log(key, value); // Debugging log
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/student/addStud', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowConfirmPopup(true);
    } catch (error) {
      console.error('There was an error!', error);
      setShowRejectPopup(true);
    }
  };

  return (
    <>
      <div className="ads-container">
        <h1>Add New Student</h1>
        <form onSubmit={handleSubmit} className='ads-form'>
          <div className="ads-leftside">
            <div className="ads-label">
              <label className='ads-ID'>Student ID : </label>
            </div>
            <div className="ads-label">
              <label className='ads-Name'>Student Name : </label>
            </div>
            <div className="ads-label">
              <label className='ads-Email'>Email : </label>
            </div>
            <div className="ads-label">
              <label className='ads-Password'>Password : </label>
            </div>
            <div className="ads-label">
              <label className='ads-Programme'>Programme : </label>
            </div>
            <div className="ads-label">
              <label className='ads-SubjectCode'>Subject Code : </label>
            </div>

            <div className="ads-label">
              <label className='ads-Faculty'>Faculty : </label>
            </div>
          </div>

          <div className="ads-rightside">
            <div className="ads-inputs">
              <input 
                type="name" 
                name="id" 
                className='ads-i-ID'
                placeholder='Enter Student ID'
                value={student.id}
                onChange={handleChange}
              />
            </div>

            <div className="ads-inputs">
              <input 
                type="name" 
                name="stud_name" 
                className='ads-i-Name'
                placeholder='Enter Student Name'
                value={student.stud_name}
                onChange={handleChange}
              />
            </div>

            <div className="ads-inputs">
              <input 
                type="name" 
                name="stud_email" 
                className='ads-i-Email'
                placeholder='Enter Email'
                value={student.stud_email}
                onChange={handleChange}
              />
            </div>

            <div className="ads-inputs">
              <input 
                type="name" 
                name="password" 
                className='ads-i-Password'
                placeholder='Enter Password'
                value={student.password}
                onChange={handleChange}
              />
            </div>

            <div className="ads-inputs">
              <input 
                type="name" 
                name="programme" 
                className='ads-i-Programme'
                placeholder='Enter Programme'
                value={student.programme}
                onChange={handleChange}
              />
            </div>

            <div className="ads-inputs">
              <select 
                name="sub_id" 
                className='ads-i-SubjectCode'
                value={student.sub_id}
                onChange={handleChange}
              >
                <option value="">Select Subject Code</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.id} - {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="ads-inputs">
              <input 
                type="name" 
                name="faculty" 
                className='ads-i-Faculty'
                placeholder='Enter Faculty'
                value={student.faculty}
                onChange={handleChange}
              />
            </div>

            <div className="ads-btn">
            <button type="submit">
              Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
      {showConfirmPopup && <AdminAddStudentConfirmation onClose={handleCloseConfirmPopup} />}
      {showRejectPopup && <AdminAddStudentReject onClose={handleCloseRejectPopup} />}
    </>
  );
}