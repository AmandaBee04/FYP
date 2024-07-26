import React from 'react';
import { useState } from 'react';
import LecturerAssignDueDate from '../../Components/Lecturer/LecturerAssignDueDate';
import { Link } from 'react-router-dom'
import { MdAssignmentAdd } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import '../../Css/Lecturer/LecturerQuizBank.css';

export default function LecturerQuizBank() {
  
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const handleConfirmClick = (event) => {
    event.preventDefault(); // Prevent form submission
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };


  return (
    <>
      <div className="lqb-holder">
        <div className="lqb-container">
          <div className="lqb-header">
            <h1>Quiztopia Bank</h1>
          </div>
          <div className="lqb-above">
            <div className='lqb-linktoRequest'>
              <Link to="/Lecturer/Subject_Request">
                Need a new Subject? Send a request!
              </Link>
            </div>
            <div className="lqb-space" />
            <div className='lqb-linktoQuizCreation'>
              <Link to="/Lecturer/Quiz_Creation">
                + Create New Quiz
              </Link>
            </div>
          </div>
          <div className="lqb-bank">

            <div className="lqb-subjectcontainer">
              <div className="lqb-subjectname">
                <label className='lqb-SubjectNameCode'>DIT5401 - INTERNET & WEB PUBLISHING</label>
              </div>
              <div className="lqb-QuizChapters">  

                <Link to={'/Lecturer/Quiz_Bank/View_Written_Question_Set'}>
                  <div className="lqb-quizzes">
                    <div className="lqb-quizupper">  
                      <div class="dropdown">
                          <HiDotsHorizontal className='img1'/>
                          <div class="dropdown-content">
                            <div className="closing">
                              <div className="link1" onClick={handleConfirmClick}>
                                <div><MdAssignmentAdd className='img'/></div><div className='word'><a>Assign Quiz</a></div>
                              </div>
                              <div className="link2">
                                <div><FiEdit className='img'/></div><div className='word'><a>Edit Quiz</a></div>
                              </div>
                              <div className="link3">
                                <div><IoMdTrash className='img'/></div><div className='word'><a>Delete Quiz</a></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div className="lqb-quizlower">
                      <div className="lqb-quizchaptername">
                        Introduction to Internet
                      </div>
                      <div className="lqb-quizAuthor">
                        By: Dr. John Doe
                      </div>
                      <div className="lqb-QuiznoQuestions">
                        10 Qs
                      </div>
                    </div>
                  </div>
                </Link>

              </div>
            </div>

            
          </div>
        </div>
      </div>
      {showPopup && <LecturerAssignDueDate onClose={handleClosePopup} />} {/* Show popup conditionally */}

    </>
  );
}
