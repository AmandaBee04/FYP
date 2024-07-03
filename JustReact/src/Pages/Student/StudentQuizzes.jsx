import React from 'react'
import { Link } from 'react-router-dom'
import '../../Css/Student/StudentQuizzes.css'

export default function StudentQuizzes() {
  return (
    <>
    <div className="sq-holder">
      <div className="sq-container">
        <div className="sq-header">
          <h1>Quiztopia Bank</h1>
        </div>
        <div className="sq-bank">
          <div className="sq-subjectcontainer">
            <div className="sq-subjectname">
              <label className='sq-SubjectNameCode'>DIT5401 - INTERNET & WEB PUBLISHING</label>
            </div>
            <div className="sq-QuizChapters">
              <Link to={'Start_Quiz'}>
                <div className="sq-quizzes">
                  <div className="sq-quizupper"/>    
                  <div className="sq-quizlower">
                    <div className="sq-quizchaptername">
                      Introduction to Internet
                    </div>
                    <div className="sq-quizAuthor">
                      By: Dr. John Doe
                    </div>
                    <div className="sq-QuiznoQuestions">
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
  )
}
