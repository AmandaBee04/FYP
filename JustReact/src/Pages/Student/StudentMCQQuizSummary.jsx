import React from 'react';
import Progress from 'react-circle-progress-bar';
import { FaUserCircle } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { GoXCircleFill } from "react-icons/go";
import { IoIosCheckmarkCircle } from "react-icons/io";
import '../../Css/Student/StudentMCQQuizSummary.css';

const StudentMCQQuizSummary = () => {
  return (
    <div className="sqs-Quizholder">
      <div className="sqs-container sqs-slide-in">
          <div className="sqs-quizlogo">Quiztopia</div>
        <div className="sqs-summarybox">
          <div className="sqs-summaryheader">Summary</div>
          <div className="sqs-StudentIDName">
            <div className='sqs-ProfilePic'><FaUserCircle/></div>
            <div className='sqs-StudentName'>Mike Ox Mall</div>
          </div>
          <div className="sqs-subjectname">Discrete Structure</div>
          <div className="sqs-topicname">Propositional Logic</div>
          <div className="sqs-typeofquiz">Multiple Choice</div>
          <div className='sqs-word'>Score</div>
          <div className="sqs-scoreslider">
            <Progress progress={65} 
                subtitle='Overall' 
                strokeWidth={15} 
                gradient={[{stop: 0.0, color: 'blue'},{stop: 1, color: 'purple'}]}
                reduction={0.2}/>
          </div>
          <div className="sqs-quizsummary">
            <div className="sqs-quizsummaryheader">Performance Stats</div>
            <div className="sqs-quizsummarycontent">
              <div className="sqs-quizsummarycontent1">
                <div className='sqs-howmanycorrect'>3</div>
                <div>Correct</div>
                <div className='sqs-CorrectIcon'><IoIosCheckmarkCircle/></div>
              </div>
              <div className="sqs-quizsummarycontent2">
                <div className='sqs-howmanyincorrect'>3</div>
                <div>Incorrect</div>
                <div className='sqs-IncorrectIcon'><GoXCircleFill/></div>
              </div>
              <div className="sqs-quizsummarycontent3">
                <div className='sqs-timetaken'>3.55</div>
                <div>Time Taken</div>
                <div className='sqs-TimeIcon'><IoTimeOutline/></div>
              </div>
            </div>
            <div className="sqs-QuizSubmitted">Thank You, Your Quiz Has Been Submitted..</div>
          </div>
          <button className='sqs-Exitbtn' value={confirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default StudentMCQQuizSummary;
