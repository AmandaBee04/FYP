import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sloth from '../../assets/Student_Images/Sloth.png';
import '../../Css/Student/StudentMCQQuiz.css';
import StudentTimeout from '../../Components/Student/StudentTimeout';

const StudentMCQQuiz = ({ token, saveToDatabase }) => {
  const { id } = useParams(); // qs_id
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [expandedBox, setExpandedBox] = useState(null);
  const [error, setError] = useState('');
  const [tempAnswers, setTempAnswers] = useState([]);
  const [quizDetails, setQuizDetails] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [correctBox, setCorrectBox] = useState(null);
  const [incorrectBox, setIncorrectBox] = useState(null);
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
          console.log('Questions fetched:', res.data);

          const fetchedQuestions = res.data[0] || [];
          setQuestions(fetchedQuestions);
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
          setIsTimeoutVisible(true);
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

  const handleAnswerClick = async (boxNumber, answerKey) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correct_ans === answerKey;
    const marks = isCorrect ? currentQuestion.marks : 0;

    if (saveToDatabase) {
      try {
        await axios.post(
          'http://127.0.0.1:8000/api/question/saveAnswer',
          {
            stud_id: localStorage.getItem('id').toString(), // Assuming student ID is stored in local storage
            ques_id: currentQuestion.id,
            answer: answerKey,
            marks,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );

        setExpandedBox(boxNumber);
      } catch (err) {
        console.error(err);
        setError('An error occurred while saving your answer');
      }
    } else {
      setTempAnswers([...tempAnswers, { ques_id: currentQuestion.id, answer: answerKey, marks }]);
      setExpandedBox(boxNumber);
    }

    if (isCorrect) {
      setCorrectBox(boxNumber);
      setIncorrectBox(null);
    } else {
      setCorrectBox(['ans_a', 'ans_b', 'ans_c', 'ans_d'].indexOf(currentQuestion.correct_ans) + 1);
      setIncorrectBox(boxNumber);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setExpandedBox(null);
      setCorrectBox(null);
      setIncorrectBox(null);
    } else {
      if (!saveToDatabase) {
        navigate(`/Student/Quizzes/MCQ/Summary/${id}`, { state: { tempAnswers, questionsLength: questions.length, timeTaken: quizDetails.time * 60 - timeLeft } });
      } else {
        navigate(`/Student/Quizzes/MCQ/Summary/${id}`, { state: { questionsLength: questions.length, timeTaken: quizDetails.time * 60 - timeLeft } });
      }
    }
  };

  const handleTimeoutClose = () => {
    if (!saveToDatabase) {
      navigate(`/Student/Quizzes/MCQ/Summary/${id}`, { state: { tempAnswers, questionsLength: questions.length, timeTaken: quizDetails.time * 60 - timeLeft } });
    } else {
      navigate(`/Student/Quizzes/MCQ/Summary/${id}`, { state: { questionsLength: questions.length, timeTaken: quizDetails.time * 60 - timeLeft } });
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!questions.length) {
    return <p><div className="sd-loader"></div></p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  console.log('Current Question:', currentQuestion);

  return (
    <div className="smcqqp-Quizholder">
      <div className="smcqqp-container">
        <div className="smcqqp-upperheader">
          <div className="smcqqp-numberofquestions">
            <div className="smcqqp-questionNo">
              <span>{currentQuestionIndex + 1}</span>
            </div>
            <div className="smcqqp-midquestionno">
              <span>of</span>
            </div>
            <div className="smcqqp-totalquestions">
              <label>{questions.length}</label>
            </div>
          </div>
          <div className="smcqqp-quizlogo">
            Quiztopia
          </div>
          <div className="timer">
            <div className="smcqqp-timer">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        <div className="smcqqp-lowerupper">
          <div className="smcqqp-QuizTopic">
            <label>{currentQuestion.question}</label>
            <img src={Sloth} className="Weirdassimage" alt="Sloth" />
          </div>
        </div>
        <div className="smcqqp-AnsweringPart">
          <div className="smcqqp-leftside">
            <div className="smcqqp-Question">
              <label>{currentQuestion.question}</label>
            </div>
          </div>
          <div className="smcqqp-rightside">
            {['ans_a', 'ans_b', 'ans_c', 'ans_d'].map((answerKey, index) => (
              <div
                key={index}
                className={`smcqqp-AnswerBox smcqqp-AnswerBox${index + 1} 
                ${expandedBox === index + 1 ? 'expanded' : expandedBox ? 'hidden' : ''} 
                ${expandedBox === index + 1 && correctBox === index + 1 ? 'correct' : ''} 
                ${expandedBox === index + 1 && incorrectBox === index + 1 ? 'incorrect' : ''}`}
                onClick={() => handleAnswerClick(index + 1, answerKey)}
              >
                {currentQuestion[answerKey]}
              </div>
            ))}
            {expandedBox && (
              <div className="smcqqp-NextQuestion">
                <button onClick={handleNextClick}>Next</button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isTimeoutVisible && <StudentTimeout onClose={handleTimeoutClose} />}
    </div>
  );
};

export default StudentMCQQuiz;
