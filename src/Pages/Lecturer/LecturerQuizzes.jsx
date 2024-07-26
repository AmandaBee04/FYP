import React, { useState, useEffect } from 'react';
import LecturerDeleteQuizConfirm from '../../Components/Lecturer/LecturerDeleteQuizConfirm';
import LecturerAssignDueDate from '../../Components/Lecturer/LecturerAssignDueDate';
import { Link } from 'react-router-dom';
import { MdAssignmentAdd } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import '../../Css/Lecturer/LecturerQuizzes.css';
import axios from 'axios';

export default function LecturerQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [assignedWrittenQuizzes, setAssignedWrittenQuizzes] = useState([]);
  const [error, setError] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const userId = localStorage.getItem('id'); // Assuming the lecturer ID is stored in localStorage
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await axios.get(`http://127.0.0.1:8000/api/lecturer/${userId}/question_set/myQuestionSets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          if (response.data[0] && Array.isArray(response.data[0])) {
            setQuizzes(response.data[0]);
          } else {
            setQuizzes([]);
          } // Adjust according to your API response structure
        } else {
          console.error('Failed to fetch quizzes');
        }
      } catch (error) {
        console.error('An error occurred while fetching quizzes:', error);
        setError('An error occurred while fetching quizzes');
      }
    };

    const fetchAssignedWrittenQuizzes = async () => {
      try {
        const userId = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/question_set/${userId}/assignedWrittenQuiz`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setAssignedWrittenQuizzes(response.data);
        } else {
          console.error('Failed to fetch assigned written quizzes');
        }
      } catch (error) {
        console.error('An error occurred while fetching assigned written quizzes:', error);
        setError('An error occurred while fetching assigned written quizzes');
      }
    };

    fetchQuizzes();
    fetchAssignedWrittenQuizzes();
  }, []);

  const handleConfirmClick = (quizId) => {
    setSelectedQuizId(quizId);
    console.log(quizId);
    setShowPopup(true); // Show the popup
  };

  const handleDeleteClick = (quizId) => {
    setSelectedQuizId(quizId);
    setShowDeletePopup(true); // Show the delete confirmation popup
  };


  const handleClosePopup = () => {
    setSelectedQuizId(null);
    setShowAssignPopup(false);
    setShowDeletePopup(false); // Close both popups
  };


  const handleDeleteQuiz = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.delete(`http://127.0.0.1:8000/api/question_set/delete/${selectedQuizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setQuizzes(quizzes.filter(quiz => quiz.id !== selectedQuizId));
        console.log('Question set deleted successfully');
      } else {
        console.error('Failed to delete question set');
      }
    } catch (error) {
      console.error('An error occurred while deleting the question set:', error);
      setError('An error occurred while deleting the question set');
    } finally {
      handleClosePopup();
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <>
      <div className="lq-holder">
        <div className="lq-container">
          <div className="lq-leftside">
            <div className="lq-bigcontainer">
              <div className="lq-header">
                <h2>Quizzes</h2>
              </div>
              <div className="lq-mysubjects">
                <div className="lq-mysubjects-header">
                  <h2>My Quizzes</h2>
                </div>
                <div className="lq-subjectholder">
                  {quizzes.length === 0 ? (
                    <p>No quizzes found.</p>
                  ) : (
                    quizzes.map((quiz) => (
                      <div key={quiz.id} className="lq-quizzes">
                        <div className="lq-quizupper">
                          <div className="ld-dropdown">
                            <HiDotsHorizontal className='img1' />
                            <div className="ld-dropdown-content">
                              <div className="ld-closing">
                                <div className="ld-link1">
                                  <div onClick={() => handleConfirmClick(quiz.id)}><MdAssignmentAdd className='ld-img'  /></div><div className='ld-word'  ><span>Assign Quiz</span></div>
                                </div>
                                <div className="ld-link2">
                                  <Link
                                    to={
                                      quiz.type === 'Multiple Question'
                                        ? `/Lecturer/Quiz_Creation/Multiple_Choice_Question/${quiz.id}`
                                        : `/Lecturer/Quiz_Creation/Written_Question/${quiz.id}`
                                    }
                                  >
                                   <div className='ld-word'> <FiEdit className='ld-img2' />Edit Quiz</div>
                                  </Link>
                                </div>
                                <div className="ld-link3">
                                <div onClick={() => handleDeleteClick(quiz.id)}><IoMdTrash className='ld-img' /></div><div className='ld-word'><span>Delete</span></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Link
                          to={
                            quiz.type === 'Multiple Question'
                              ? `/Lecturer/Quiz_Bank/View_MCQ_Question_Set/${quiz.id}`
                              : `/Lecturer/Quiz_Bank/View_Written_Question_Set/${quiz.id}`
                          }
                        >
                          <div className="lq-quizlower">
                            <div className="lq-quizchaptername">{quiz.qs_name}</div>
                            <div className="lq-quizAuthor">By: {quiz.lecturer_name}</div>
                            <div className="lq-QuiznoQuestions">{quiz.question_count} Qs</div>
                          </div>
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="lq-rightside">
              <div className="lq-rightside-header">
                <h2>Assigned Written Quizzes</h2>
              </div>
              <div className="lq-rightside-holqer">
                {assignedWrittenQuizzes.length === 0 ? (
                  <p>No assigned written quizzes found.</p>
                ) : (
                  assignedWrittenQuizzes.map((quiz) => (
                    <Link key={quiz.id} to={`/Lecturer/Quizzes/Unmarked_Quiz_Student/${quiz.id}`}>
                      <div className="lq-assignquizzes">
                        <div className="lq-assignquizupper"/>
                        <div className="lq-assignquizlower">
                          <div className="lq-assignquizchaptername">{quiz.qs_name}</div>
                          <div className="lq-assignquizAuthor">By: {quiz.lecturer_name}</div>
                          <div className="lq-assignlower">
                            <div className="lq-assignduedate">Due {quiz.due_date}</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeletePopup && (
        <LecturerDeleteQuizConfirm
          onClose={handleClosePopup}
          onDelete={handleDeleteQuiz}
        />
      )}
      {showPopup && (
        <LecturerAssignDueDate
          onClose={handleClosePopup}
          quizId={selectedQuizId}
        />
      )}
    </>
  );
}
