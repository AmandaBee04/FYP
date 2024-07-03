import React from 'react'
import { RxSlash } from "react-icons/rx";
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails';
import '../../Css/Lecturer/LecturerMarking.css'

export default function LecturerMarking() {
  return (
    <>
      <div className="lm-holder">
        <div className="lm-container">
          <LecturerQuizDetails />
          <div className="lm-rightside">
            <div className="lm-questioncontainer">
              <form className="lm-question">
                <div className="lm-questionNo">
                  <div>Question</div>
                  <div className="questionNo">1</div>
                  <label className="lm-questionName" > Sakedik</label>
                  <div className='TotalMarks'>
                    <div className="Marks">5</div>
                    <div>Marks</div>
                  </div>
                </div>
                <div className="lm-answers">
                  <label className='lm-Student_Anwsers'>
                    fjshkfjhdksjfd
                  </label>
                </div>

                <div className="lm-feedback">
                  <input type="name" className='feedback' placeholder='Provide Feedback... If Any'/>
                  <div className='lm-ProvideMarks'>
                    <div className='lm-Marks'><input type="name"/></div>
                    <div className='slash'><RxSlash style={{fontSize:29}}/></div>
                    <label className='lm-TotalMarks'>5</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
