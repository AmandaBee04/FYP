import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Fox from '../../assets/Student_Images/Fox.png';
import axios from 'axios';
import '../../Css/Student/StudentStartQuiz.css';

const StudentStartQuiz = ({ token, saveToDatabase }) => {
  const { id } = useParams();
  const [quizDetails, setQuizDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/question_set/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setQuizDetails(res.data);
        } else {
          setError('Failed to fetch quiz details');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching quiz details');
      }
    };

    fetchQuizDetails();
  }, [id, token]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!quizDetails) {
    return <p><div class="sd-loader"></div></p>;
  }

  return (
    <div className="holder">
      <div className="ssq-container">
        <div className="ssq-subject">
          <span className='ssq-SubjectName'>{quizDetails.subjects.name} <br/> {quizDetails.qs_name}</span>
        </div>

        <div className="ssq-middle">
          <div className="ssq-middle1">
            <div className="ssq-label">Type</div>
            <div className="TypeOfQuiz">
              <span className="QuizType">{quizDetails.type}</span>
            </div>
          </div>
          <div className="ssq-middle2">
            <div className="ssq-label">Time Limit</div>
            <div className="TimeLimit">
              <span className='Time' id='gap'>{quizDetails.time}</span><span id='gap'>Minutes</span>
            </div>
          </div>
          <div className="ssq-middle3">
            <div className="ssq-label">Total Marks</div>
            <div className="ssq-TotalMarks">
              <span className='Marks' id='gap'>{quizDetails.total_mark}</span><span id='gap'>Marks</span>
            </div>
          </div>
          <div className="ssq-middle4">
            <img src={Fox} alt="Quiz Illustration" />
          </div>
          
        </div>

        <label className='Makesure'>Make sure to check your answers before submitting your answer...</label>

        <div className="ssq-lower">
        <Link to={
          quizDetails.type === 'Multiple Question'
          ? `/Student/${saveToDatabase ? 'Dashboard' : 'Quizzes'}/Start_Quiz/MCQ_Quiz/${id}`
          : `/Student/Quizzes/Start_Quiz/Written_Quiz/${id}`
          }>
          <button>Start Quiz</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentStartQuiz;
