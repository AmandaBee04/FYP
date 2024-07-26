import React from 'react'
import { GoXCircleFill } from "react-icons/go";
import { RxSlash } from 'react-icons/rx';
import { IoIosCheckmarkCircle } from "react-icons/io";
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails';
import { Link } from 'react-router-dom'
import '../../Css/Student/StudentWrittenQuizReview.css'

export default function StudentWrittenQuizReview() {
  return (
    <>
      <div className="swqr-holder">
        <div className="swqr-container">
          <LecturerQuizDetails />
          <div className="swqr-rightside">
            <div className="swqr-questioncontainer">
              <form action="" className="swqr-question">
                <div className="swqr-questionNo">
                  <div>Question</div>
                  <div className="questionNo">1</div>
                  <div className='swqr-TotalMarks'>
                    <div className="swqr-Marks">5</div>
                        <div>Marks</div>
                    </div>
                  <label className="questionName" > Sakedik</label>
                </div>
                <div className="swqr-answers">
                    <textarea className='swqr-textarea' placeholder='Answer' disabled/>
                </div>

                <div className="swqr-feedback">
                    Answer should be (-P ^ Q) 
                </div>
                <div className='swqr-ProvidedMarks'>
                    <label className='swqr-AllotedMarks'>5</label>
                    <div className='swqr-slash'><RxSlash style={{fontSize:29}}/></div>
                    <label className='swqr-TotalQuestionMarks'>5</label>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
