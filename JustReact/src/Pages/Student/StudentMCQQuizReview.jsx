import React from 'react'
import { GoXCircleFill } from "react-icons/go";
import { IoIosCheckmarkCircle } from "react-icons/io";
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails';
import { Link } from 'react-router-dom'
import '../../Css/Student/StudentMCQQuizReview.css'

export default function StudentMCQQuizReview() {
  return (
    <>
      <div className="smqr-holder">
        <div className="smqr-container">
          <LecturerQuizDetails />
          <div className="smqr-rightside">
            <div className="smqr-questioncontainer">
              <form action="" className="smqr-question">
                <div className="smqr-questionNo">
                  <div>Question</div>
                  <div className="questionNo">1</div>
                  <label className="questionName" > Sakedik</label>
                </div>
                <div className="smqr-answers">
                  <div className="smqr-answerdiv">
                    <div className="smqr-Answer">
                      <label className="TextAnswer1"  >AFsdfsdfd</label> 
                    </div>
                  </div>
                  <div className="smqr-answerdiv">
                    <div className="smqr-Answer">
                      <label className="TextAnswer2"  >AFsdfsdfd</label>
                    </div>
                  </div>
                  <div className="smqr-answerdiv">
                    <div className="smqr-Answer">
                      <label type="name" className="TextAnswer3" >AFsdfsdfd</label>
                    </div>
                  </div>
                  <div className="smqr-answerdiv">
                    <div className="smqr-Answer">
                      <label type="name" className="TextAnswer4" >AFsdfsdfd</label>
                    </div>
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
