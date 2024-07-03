import React from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Lecturer/LecturerQuizBank.css';

export default function LecturerQuizBank() {
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
                    <div className="lqb-quizupper"/>    
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
    </>
  );
}
