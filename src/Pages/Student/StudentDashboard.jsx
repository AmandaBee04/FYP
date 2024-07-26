import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import '../../Css/Student/StudentDashboard.css';

export default function StudentDashboard() {
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  const [error, setError] = useState('');
  const [student, setStudent] = useState(null);
  const [assignedQuizzes, setAssignedQuizzes] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [image, setImage] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/student/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const studentData = res.data; // Assuming API returns an array with one student object
          setStudent(studentData);
          setImage(studentData.profile_pic);
          console.log(studentData);
        } else {
          setError('Failed to fetch student details');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching student details');
      }
    };

    const fetchAssignedQuizzes = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/student/dashboard/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          const assignedQuizzesData = res.data; // Assuming API returns an array of quizzes
          setAssignedQuizzes(assignedQuizzesData);
        } else {
          setError('Failed to fetch quiz details');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching quiz details');
      }
    };

    const fetchCompletedQuizzes = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/student/${userId}/completed_quizzes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setCompletedQuizzes(res.data);
        } else {
          setError('Failed to fetch completed quizzes');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching completed quizzes');
      }
    };

    const fetchGrades = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/student/${userId}/grades`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (res.status === 200) {
          if (Array.isArray(res.data)) {
            const gradesWithNumberGrades = res.data.map(grade => ({
              ...grade,
              grade: Number(grade.grade),
            }));
            setGrades(gradesWithNumberGrades);
            console.log(gradesWithNumberGrades);
          } 
        } else {
          setError('Failed to fetch grades');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching grades');
      }
    };    

    fetchGrades();
    fetchStudentDetails();
    fetchAssignedQuizzes();
    fetchCompletedQuizzes();
  }, [userId, token]);

  const filteredAssignedQuizzes = assignedQuizzes.filter(
    (quiz) => !completedQuizzes.includes(quiz.id)
  );

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!student) {
    return <p><div class="sd-loader"></div></p>;
  }

  return (
    <div className="sd-container">
      <div className="sd-holder">
        <div className="sd-header">
          <div>
            {image ?<img src={image} className='profile-image' alt="Student" /> : <FaUserCircle className="Icon" />}
            </div>
          <div>Welcome back</div>
          <div>{student.stud_name}</div>
        </div>

        <div className="sd-assignedquizzes">
          <h2>Assigned Quizzes</h2>
          <hr />
          <div className="sd-quiz">
          {filteredAssignedQuizzes.map((quiz) => (
            <div key={quiz.id}>
              <Link to={`/Student/Dashboard/Start_Quiz/${quiz.id}`}>
                <div className="sd-quizzes">
                  <div className="sd-quizupper" />
                  <div className="sd-quizlower">
                    <div className="sd-quizchaptername">{quiz.qs_name}</div>
                    <div className="sd-quizAuthor">By: {quiz.lec_name}</div>
                    <div className="sd-quizduedate">{quiz.due_date}</div>
                    <div className="sd-QuiznoQuestions">{quiz.question_count} QS</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          </div>
        </div>

        <div className="sd-bottom">
  <h2>Grades and classes</h2>
  <hr />
  {grades.length > 0 ? (
    grades.map((grade, index) => (
      <div className="sd-grades">
        <div className="sd-classcode">{grade.subject_id}</div>
        <div className="sg-classname">{grade.question_sets_name}</div>
        <div className="sd-classlec">{grade.lecturer_name}</div>
        <div className="allotedgrade">{grade.grade.toFixed(0)} %</div>
      </div>
    ))
  ) : (
    <p>No grades found</p>
  )}
</div>
      </div>
    </div>
  );
}
