import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sloth from '../../assets/Student_Images/Sloth.png';
import '../../Css/Student/StudentWrittenQuiz.css';
import StudentTimeout from '../../Components/Student/StudentTimeout'; // Import the StudentTimeout component

const StudentWrittenQuiz = ({ token }) => {
  const { id } = useParams(); // qs_id
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState('');
  const [quizDetails, setQuizDetails] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimeoutVisible, setIsTimeoutVisible] = useState(false);

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
          setTimeLeft(res.data.time * 60); // quizDetails.time in minutes
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

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/question_set/${id}/question/getQuestion`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setQuestions(res.data[0] || []);
        } else {
          setError('Failed to fetch questions');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching questions');
      }
    };

    fetchQuestions();
  }, [id, token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTimeoutVisible(true); // Show timeout message
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizDetails.time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleNextClick = async () => {
    const currentQuestion = questions[currentQuestionIndex];

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/question/saveAnswer',
        {
          stud_id: localStorage.getItem('id').toString(), // Assuming student ID is stored in local storage
          ques_id: currentQuestion.id,
          answer,
          marks: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      setAnswer('');

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        navigate(`/Student/Quizzes/Written/Summary/${id}`, { state: { questionsLength: questions.length, timeTaken: quizDetails.time * 60 - timeLeft } });
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while saving your answer');
    }
  };

  const handleTimeoutClose = () => {
    navigate(`/Student/Quizzes/Written/Summary/${id}`, { state: { questionsLength: questions.length, timeTaken: quizDetails.time * 60 - timeLeft } });
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!questions.length) {
    return <p><div className="sd-loader"></div></p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="swqp-Quizholder">
      <div className="swqp-container">
        <div className="swqp-upperheader">
          <div className="swqp-numberofquestions">
            <div className="swqp-questionNo">
              <span>{currentQuestionIndex + 1}</span>
            </div>
            <div className='swqp-midquestionno'>
              <span>of</span>
            </div>
            <div className="swqp-totalquestions">
              <label>{questions.length}</label>
            </div>
          </div>
          <div className="swqp-quizlogo">
            Quiztopia
          </div>
          <div className="timer">
            <div className="swqp-timer">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        <div className="swqp-lowerupper">
          <div className="swqp-QuizTopic">
            <label>{quizDetails.topic}</label>
            <img src={Sloth} className='Weirdassimage' alt="Sloth" />
          </div>
        </div>
        <div className="swqp-AnsweringPart">
          <div className="swqp-leftside">
            <div className="swqp-Question">
              <label>{currentQuestion.question}</label>
            </div>
          </div>
          <div className="swqp-rightside">
            <textarea
              className="swqp-textanswer"
              value={answer}
              onChange={handleAnswerChange}
              placeholder='Answer here...'
            />
            <button className='swqp-nextbtn' onClick={handleNextClick}>
              Next
            </button>
          </div>
        </div>
      </div>
      {isTimeoutVisible && <StudentTimeout onClose={handleTimeoutClose} />}
    </div>
  );
};

export default StudentWrittenQuiz;
