import React, { useState } from 'react';
import Sloth from '../../assets/Student_Images/Sloth.png';
import '../../Css/Student/StudentWrittenQuiz.css';

export default function StudentWrittenQuiz() {
  const [expandedBox, setExpandedBox] = useState(null);

  const handleExpandClick = (boxNumber) => {
    setExpandedBox(boxNumber);
  };

  return (
    <div className="swqp-Quizholder">
      <div className="swqp-container">
        <div className="swqp-upperheader">
          <div className="swqp-numberofquestions">
            <div className="swqp-questionNo">
              <span>1</span>
            </div>
            <div className='swqp-midquestionno'>
              <span>of</span>
            </div>
            <div className="swqp-totalquestions">
              <label>10</label>
            </div>
          </div>
          <div className="swqp-quizlogo">
            Quiztopia
          </div>
          <div className="timer">
            <div className="swqp-timer">
              sgfgdf
            </div>
          </div>
        </div>
        <div className="swqp-lowerupper">
          <div className="swqp-QuizTopic">
            <label>Propositional Logic</label>
            <img src={Sloth} className='Weirdassimage' alt="Sloth" />
          </div>
        </div>
        <div className="swqp-AnsweringPart">
          <div className="swqp-leftside">
            <div className="swqp-Question">
              <label>Hide Yo Wifes</label>
            </div>
          </div>
          <div className="swqp-rightside">
            <textarea className="swqp-textanswer" placeholder='Answer Here......................................................................................'/>
            <button className='swqp-nextbtn'>
                Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
