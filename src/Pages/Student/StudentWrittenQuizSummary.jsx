import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Progress from 'react-circle-progress-bar';
import { FaUserCircle } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import '../../Css/Student/StudentWrittenQuizSummary.css';

const StudentWrittenQuizSummary = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [questionSetDetails, setQuestionSetDetails] = useState({});
  const [studentName, setStudentName] = useState('');
  const location = useLocation();
  const [gradeAlreadySaved, setGradeAlreadySaved] = useState(false);
  const { timeTaken } = location.state || {};
  const gradeAlreadySavedRef = useRef(false);

  
  
  const saveGradeToDatabase = async () => {
    if (gradeAlreadySaved === false) {
      try {
        await axios.post('http://127.0.0.1:8000/api/grades', {
          grade: 0,
          score: 0,
          stud_id: localStorage.getItem('id'),
          qs_id: id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        console.log('Grade saved successfully');
        setGradeAlreadySaved(true); // Update the ref
      } catch (err) {
        console.error('Error saving grade:', err);
        setError('An error occurred while saving your grade');
      }
    }
  }; 
  
  useEffect(() => {
    if (!gradeAlreadySaved) {
      saveGradeToDatabase();
    }
  }, [gradeAlreadySaved]);

  useEffect(() => {
    let isMounted = true;

    const fetchQuestionSetDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/question_set/${id}`);
        if (res.status === 200 && isMounted) {
          setQuestionSetDetails(res.data);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching question set details');
      }
    };

    const fetchStudentName = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/student/${localStorage.getItem('id')}`);
        if (res.status === 200 && isMounted) {
          setStudentName(res.data[0].stud_name); // Assuming response.data is an array
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching student name');
      }
    };

    
    

    fetchStudentName();
    fetchQuestionSetDetails();

    return () => { isMounted = false };
  }, [id, token]);

  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }
  
  return (
    <div className="swqs-Quizholder">
      <div className="swqs-container swqs-slide-in">
          <div className="swqs-quizlogo">Quiztopia</div>
        <div className="swqs-summarybox">
          <div className="swqs-summaryheader">Summary</div>
          <div className="swqs-StudentIDName"> 
            <div className='swqs-ProfilePic'><FaUserCircle/></div>
            <div className='swqs-StudentName'>{studentName}</div>
          </div>
          <div className="swqs-subjectname">{questionSetDetails.subjects?.name || 'Subject Name'}</div>
          <div className="swqs-topicname">{questionSetDetails.qs_name}</div>
          <div className="swqs-typeofquiz">{questionSetDetails.type}</div>
 
          <div className="swqs-quizsummary">
            <div className="swqs-quizsummaryheader">Performance Stats</div>
            <div className="swqs-quizsummarycontent">
              <div className="swqs-quizsummarycontent3">
                <div className='swqs-timetaken'>{formatTime(timeTaken)}</div>
                <div>Time Taken</div>
                <div className='swqs-TimeIcon'><IoTimeOutline/></div>
              </div>
            </div>
            <div className="QuizSubmitted">Thank You, Your Quiz Has Been Submitted For Review..</div>
          </div>
          <Link to={'/Student/Dashboard'}>
            <button className='swqs-Exitbtn'>Confirm</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentWrittenQuizSummary;
