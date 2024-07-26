import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Progress from 'react-circle-progress-bar';
import { FaUserCircle } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { GoXCircleFill } from "react-icons/go";
import { IoIosCheckmarkCircle } from "react-icons/io";
import '../../Css/Student/StudentMCQQuizSummary.css';

const StudentMCQQuizSummary = ({ token }) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [grade, setGrade] = useState(null);
  const [error, setError] = useState('');
  const [gradeAlreadySaved, setGradeAlreadySaved] = useState(false);
  const [questionSetDetails, setQuestionSetDetails] = useState({});
  const [studentName, setStudentName] = useState('');
  const location = useLocation();
  const { tempAnswers, questionsLength, timeTaken } = location.state || {};

  useEffect(() => {
    let isMounted = true; // add this line

    const fetchGrade = async () => {
      try {
        if (tempAnswers) {
          // Calculate grade based on temporary answers
          const score = tempAnswers.reduce((acc, ans) => acc + ans.marks, 0);
          const gradeValue = ((score / questionsLength) * 100);
          const wrong = questionsLength - score;
          console.log(wrong);
          setGrade({ score, grade: gradeValue, wrong });


        } else {
          // Fetch grade from the database
          const res = await axios.get(`http://127.0.0.1:8000/api/student/${localStorage.getItem('id')}/quiz/${id}/grade`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.status === 200 && isMounted) { // modify this line
            const { score, total_mark } = res.data;
            const gradeValue = ((total_mark / questionsLength) * score) / total_mark * 100;
            const wrong = questionsLength - score;
            setGrade({ score, grade: gradeValue, wrong });

            if (!gradeAlreadySaved) {
              await saveGradeToDatabase(gradeValue, score);
              setGradeAlreadySaved(true);
            }
          } 
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching grade');
      }
    };

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
    
    fetchGrade();
    fetchStudentName();
    fetchQuestionSetDetails();
    return () => { isMounted = false }; // add this line
  }, [id, token]);

  const saveGradeToDatabase = async (gradeValue, score) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/grades', {
        grade: gradeValue,
        score: score,
        stud_id: localStorage.getItem('id'),
        qs_id: id,
        marked: 1,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log('Grade saved successfully');
    } catch (err) {
      console.error('Error saving grade:', err);
      setError('An error occurred while saving your grade');
    }
  }; 

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!grade) {
    return <p><div class="sd-loader"></div></p>;
  }

  return (
    <div className="sqs-Quizholder">
      <div className="sqs-container sqs-slide-in">
          <div className="sqs-quizlogo">Quiztopia</div>
        <div className="sqs-summarybox">
          <div className="sqs-summaryheader">Summary</div>
          <div className="sqs-StudentIDName">
            <div className='sqs-ProfilePic'><FaUserCircle/></div>
            <div className='sqs-StudentName'>{studentName}</div>
          </div>
          <div className="sqs-subjectname">{questionSetDetails.subjects?.name || 'Subject Name'}</div>
          <div className="sqs-topicname">{questionSetDetails.qs_name}</div>
          <div className="sqs-typeofquiz">{questionSetDetails.type}</div>
          <div className='sqs-word'>Score</div>
          <div className="sqs-scoreslider">
            <Progress progress={grade.grade} 
                subtitle='Overall' 
                strokeWidth={15} 
                gradient={[{stop: 0.0, color: 'blue'},{stop: 1, color: 'purple'}]}
                reduction={0.2}/>
          </div>
          <div className="sqs-quizsummary">
            <div className="sqs-quizsummaryheader">Performance Stats</div>
            <div className="sqs-quizsummarycontent">
              <div className="sqs-quizsummarycontent1">
                <div className='sqs-howmanycorrect'>{grade.score}</div>
                <div>Correct</div>
                <div className='sqs-CorrectIcon'><IoIosCheckmarkCircle/></div>
              </div>
              <div className="sqs-quizsummarycontent2">
                <div className='sqs-howmanyincorrect'>{grade.wrong}</div>
                <div>Incorrect</div>
                <div className='sqs-IncorrectIcon'><GoXCircleFill/></div>
              </div>
              <div className="sqs-quizsummarycontent3">
                <div className='sqs-timetaken'>{formatTime(timeTaken)}</div>
                <div>Time Taken</div>
                <div className='sqs-TimeIcon'><IoTimeOutline/></div>
              </div>
            </div>
            <div className="sqs-QuizSubmitted">You have reached the end of the quiz...</div>
          </div>
          <Link to={'/Student/Dashboard'}>
          <button className='sqs-Exitbtn'>Confirm</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentMCQQuizSummary;
