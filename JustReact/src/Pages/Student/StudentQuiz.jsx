import React, { useState } from 'react';
import Sloth from '../../assets/Student_Images/Sloth.png';
import '../../Css/Student/StudentQuiz.css';

export default function StudentQuiz() {
  const [expandedBox, setExpandedBox] = useState(null);

  const handleExpandClick = (boxNumber) => {
    setExpandedBox(prevBox => (prevBox === boxNumber ? null : boxNumber));
  };

  return (
    <div className="sqp-Quizholder">
      <div className="sqp-container">
        <div className="sqp-upperheader">
          <div className="sqp-numberofquestions">
            <div className="sqp-questionNo">
              <span>1</span>
            </div>
            <div className='sqp-midquestionno'>
              <span>of</span>
            </div>
            <div className="sqp-totalquestions">
              <label>10</label>
            </div>
          </div>
          <div className="sqp-quizlogo">
            Quiztopia
          </div>
          <div className="timer">
            <div className="sqp-timer">
              sgfgdf
            </div>
          </div>
        </div>
        <div className="sqp-lowerupper">
          <div className="sqp-QuizTopic">
            <label>Propositional Logic</label>
            <img src={Sloth} className='Weirdassimage' />
          </div>
        </div>
        <div className="sqp-AnsweringPart">
          <div className="sqp-leftside">
            <div className="sqp-Question">
              <label>Hide Yo Wifes</label>
            </div>
          </div>
          <div className="sqp-rightside">
            <div className="sqp-AnswerBox1">
              Hide Yo Wifes
            </div>
            <div className="sqp-AnswerBox2">
              Hide Yo Wifes
            </div>            
            <div className="sqp-AnswerBox3">
              Hide Yo Wifes
            </div>            
            <div className="sqp-AnswerBox4">
              Hide Yo Wifes
            </div>
            <div className="sqp-NextQuestion">
              <button>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
