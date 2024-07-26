import React from 'react';
import Progress from 'react-circle-progress-bar';
import { FaUserCircle } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { GoXCircleFill } from "react-icons/go";
import { IoIosCheckmarkCircle } from "react-icons/io";
import '../../Css/Student/StudentWrittenQuizSummary.css';

const StudentWrittenQuizSummary = () => {
  return (
    <div className="swqs-Quizholder">
      <div className="swqs-container swqs-slide-in">
          <div className="swqs-quizlogo">Quiztopia</div>
        <div className="swqs-summarybox">
          <div className="swqs-summaryheader">Summary</div>
          <div className="swqs-StudentIDName">
            <div className='swqs-ProfilePic'><FaUserCircle/></div>
            <div className='swqs-StudentName'>Mike Ox Mall</div>
          </div>
          <div className="swqs-subjectname">Discrete Structure</div>
          <div className="swqs-topicname">Propositional Logic</div>
          <div className="swqs-typeofquiz">Written Question</div>
 
          <div className="swqs-quizsummary">
            <div className="swqs-quizsummaryheader">Performance Stats</div>
            <div className="swqs-quizsummarycontent">
              <div className="swqs-quizsummarycontent3">
                <div className='swqs-timetaken'>3.55</div>
                <div>Time Taken</div>
                <div className='swqs-TimeIcon'><IoTimeOutline/></div>
              </div>
            </div>
            <div className="QuizSubmitted">Thank You, Your Quiz Has Been Submitted For Review..</div>
          </div>
          <button className='swqs-Exitbtn' value={confirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default StudentWrittenQuizSummary;
