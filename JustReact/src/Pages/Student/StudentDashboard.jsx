import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import '../../Css/Student/StudentDashboard.css'

export default function StudentDashboard() {
  return (
    <>
    <div className="sd-container">
      <div className="sd-holder">
        <div className="sd-header">
          <div><FaUserCircle className='Icon' /></div>
          <div>Welcome back</div>
          <div>Way Tu Yung</div>
        </div>
        
        <div className="sd-assignedquizzes">
          <h2>Assigned Quizzes</h2>
          <hr />  
  
          <div className="sd-quiz">
          <Link to={'Start_Quiz'}>
            <div className="sd-quizzes">
              <div className="sd-quizupper"/>    
              <div className="sd-quizlower">
                <div className="sd-quizchaptername">
                  Introduction to Internet
                </div>
                <div className="sd-quizAuthor">
                  By: Dr. John Doe
                </div>
                <div className="sd-quizduedate">
                  Due 11th April
                </div>
                <div className="sd-QuiznoQuestions">
                  10 Qs
                </div>
              </div>
            </div>
          </Link>  


          </div>
        </div>
      

        <div className="sd-bottom">
          <h2>Grades and classes</h2>
          <div className="sd-grades">
              <div className="sd-classcode">DIT5401</div>
              <div className="sg-classname">Introduction to Web Publishing</div>
              <div className="sd-classlec">Khairil Imran</div>
              <div className="allotedgrade">90.3%</div>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}
