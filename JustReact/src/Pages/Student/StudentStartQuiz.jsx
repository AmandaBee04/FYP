import React from 'react'
import { Link } from 'react-router-dom'
import Fox from '../../assets/Student_Images/Fox.png'
import '../../Css/Student/StudentStartQuiz.css'

export default function StudentStartQuiz() {
  return (
    <>
    <div className="holder">
        <div className="ssq-container">
            <div className="ssq-subject">
                <span className='ssq-SubjectName'>Lorem ipsun</span>
            </div>

            <div className="ssq-middle">
              <div className="ssq-middle1">
                <div className="ssq-label">
                  Type
                </div>
                <div className="TypeOfQuiz">
                  <span className="QuizType">Multiple Choice</span>
                </div>
              </div>
              <div className="ssq-middle2">
                <div className="ssq-label">
                  Time Limit
                </div>
                <div className="TimeLimit">
                  <span className='Time' id='gap'>10</span><span id='gap'>Minutes</span>
                </div>
              </div>
              <div className="ssq-middle3">
                <div className="ssq-label">
                  Total Marks
                </div>
                <div className="ssq-TotalMarks">
                  <span className='Marks' id='gap'>100</span><span id='gap'>Marks</span>
                </div>
              </div>
              <div className="ssq-middle4">
                  <img src={Fox} />
              </div>        
            </div>

            <div className="ssq-lower">
              <Link to={'Quiz'}>
                <button>
                  Start Quiz
                </button>
              </Link>
            </div>

        </div>



    </div>
    </>
  )
}
