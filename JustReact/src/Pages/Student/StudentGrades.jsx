import React from 'react'
import { Link } from 'react-router-dom'
import '../../Css/Student/StudentGrades.css'

export default function StudentGrades() {
  return (
    <>
      <div className="sg-holder">
        <div className="sg-container">
          <div className="sg-header">Quiz Result</div>
          <div className="sg-resultcontainer">

            <div className="sg-tags">
              <div className="sg-tag1">Subject</div>
              <div className="sg-tag2">Topic</div>
              <div className="sg-tag3">Lecturer</div>
              <div className="sg-tag4">Marks</div>
              <div className="sg-tag5">Grades</div>
            </div>

            <div className="sg-result">


              <div className="sg-results">
                <div className="sg-result1">Discrete Structures</div>
                <div className="sg-result2">Propositional Logic</div>
                <div className="sg-result3">Chua Sook Ling</div>
                <div className="sg-result4">
                  <div className='sg-aqcuiredmarks'>10</div>
                  <div>/</div>
                  <div className='sg-totalmarks'>10</div>
                </div>
                <div className="sg-result5">
                  <div className='sg-grade'>100</div>
                  <div>%</div>
                </div>
                <div className="sg-viewbutton">
                  <Link to={'/Student/Grades/Review_Marks'}>
                    <button>
                      View
                    </button>
                  </Link>
                </div>
              </div>
              


            </div>
          </div>
        </div>
      </div>
    </>
  )
}
