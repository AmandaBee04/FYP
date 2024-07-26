import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../Css/Admin/AdminEditStudent.css';
import AdminEditStudentConfirmation from '../../Components/Admin/AdminEditStudentConfirmation';
import AdminEditStudentReject from '../../Components/Admin/AdminEditStudentReject';

export default function AdminEditStudent() {

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false); 
  };

  const handleCloseRejectPopup = () => {
    setShowRejectPopup(false); 
  };

  const { id } = useParams(); // Assuming you're using react-router for route parameters
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    id: '',
    stud_name: '',
    stud_email: '',
    faculty: '',
    programme: '',
    profile_picture: '',
    subjects: [],
  });

  const [allSubjects, setAllSubjects] = useState([]);
  const [removedSubjects, setRemovedSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/student/profile/${id}`);
        console.log('Student data fetched:', response.data);
        const studentData = response.data;

        if (!Array.isArray(studentData.enrolled_subjects)) {
          studentData.enrolled_subjects = [];
        }

        const mappedSubjects = studentData.enrolled_subjects.map(sub => ({
          sub_id: sub.id,
          sub_name: sub.name,
        }));
        
        studentData.subjects = mappedSubjects;
        console.log(studentData);
        setStudent(studentData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student details:', err);
        setError('Failed to fetch student details');
        setLoading(false);
      }
    };

    const fetchAllSubjects = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/subject`);
        console.log('All subjects fetched:', response.data);
        setAllSubjects(response.data);
      } catch (err) {
        console.error('Failed to fetch subjects:', err);
        setError('Failed to fetch subjects');
      }
    };

    fetchStudent();
    fetchAllSubjects();
  }, [id]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'subject_id') {
      if (!Array.isArray(student.subjects)) {
        student.subjects = [];
      }
      const updatedSubjects = [...student.subjects];
      updatedSubjects[index] = { ...updatedSubjects[index], sub_id: value };
      setStudent(prevState => ({
        ...prevState,
        subjects: updatedSubjects,
      }));
    } else {
      setStudent(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddSubject = () => {
    setStudent(prevState => ({
      ...prevState,
      subjects: [...prevState.subjects, { sub_id: '' }],
    }));
  };

  const handleRemoveSubject = (index) => {
    const subjectToRemove = student.subjects[index];
    setRemovedSubjects(prevState => [...prevState, subjectToRemove]);
    const updatedSubjects = [...student.subjects];
    updatedSubjects.splice(index, 1);
    setStudent(prevState => ({
      ...prevState,
      subjects: updatedSubjects,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Remove subjects if there are any to be removed
      if (removedSubjects.length > 0) {
        for (const subject of removedSubjects) {
          await axios.delete(`http://127.0.0.1:8000/api/subject_taken/${id}/${subject.sub_id}`);
        }
      }

      const response = await axios.put(`http://127.0.0.1:8000/api/student/updateStud`, {
        id,
        stud_name: student.stud_name,
        stud_email: student.stud_email,
        faculty: student.faculty,
        programme: student.programme,
        subjects: student.subjects,
        // Add other fields if necessary
      });

      if (response.status === 201) {
        // Redirect or show success message
        setShowConfirmPopup(true);
      } 
    } catch (err) {
      setShowRejectPopup(true);
    }
  };

  if (loading) {
    return <div><div class="sd-loader"></div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="aewss-container">
      <h1>Edit Student Details</h1>
      <form onSubmit={handleSubmit} className='aewss-form'>
        <div className="aewss-leftside">
        <div className="aewss-label">
            <label className='aewss-ID'>Student ID: </label>
          </div>
          <div className="aewss-label">
            <label className='aewss-Name'>Student Name: </label>
          </div>
          <div className="aewss-label">
            <label className='aewss-Email'>Student Email: </label>
          </div>
          <div className="aewss-label">
            <label className='aewss-Password'>Programme: </label>
          </div>
          <div className="aewss-label">
            <label className='aewss-Password'>Faculty: </label>
          </div>
          <div className="aewss-label">
            <label className='aewss-Password'>Subject Code: </label>
          </div>
        </div>
        <div className="aewss-rightside">
        <div className="aewss-inputs">
        <input
              type="name"
              className='aewss-i-ID'
              name="stud_name"
              placeholder='Edit Student Name'
              value={student.id}
              onChange={handleChange}
            disabled/>
          </div>
          <div className="aewss-inputs">
            <input
              type="name"
              className='aesws-i-Name'
              name="stud_name"
              placeholder='Edit Student Name'
              value={student.stud_name}
              onChange={handleChange}
            />
          </div>
          <div className="aewss-inputs">
            <input
              type="email"
              className='aewss-i-Email'
              name="stud_email"
              placeholder='Edit Email'
              value={student.stud_email}
              onChange={handleChange}
            />
          </div>
          <div className="aewss-inputs">
            <input
              type="name"
              className='aewss-i-Programme'
              name="programme"
              placeholder='Edit Programme'
              value={student.programme}
              onChange={handleChange}
            />
          </div>

          <div className="aewss-inputs">
            <input
              type="name"
              className='aewss-i-Password'
              name="faculty"
              placeholder='Edit Faculty'
              value={student.faculty}
              onChange={handleChange}
            />
          </div>

          <div className="aewss-subjects-container">
            {student.subjects && student.subjects.length > 0 ? student.subjects.map((subject, index) => (
              <div key={index} className="aewss-subject">
                <select
                  name="subject_id"
                  value={subject.sub_id}
                  onChange={(e) => handleChange(e, index)}
                  className='aewss-i-Password'
                >
                  <option value="">Select Subject</option>
                  {allSubjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.id}-{sub.name}</option>
                  ))}
                </select>
                <button type="button" onClick={() => handleRemoveSubject(index)} className='aewss-removebtn'>Remove</button>
              </div>
            )) : (
              <div className='aewss-word'>No subjects enrolled.</div>
            )}
            <button type="button" onClick={handleAddSubject} className='aewss-addsubject'>Add Subject</button>
          </div>

          <div className="aewss-btn">
            <button type="submit">
              Confirm
            </button>
          </div>
        </div>
      </form>
      {showConfirmPopup && <AdminEditStudentConfirmation onClose={handleCloseConfirmPopup} />}
      {showRejectPopup && <AdminEditStudentReject onClose={handleCloseRejectPopup} />}
    </div>
  );
}
