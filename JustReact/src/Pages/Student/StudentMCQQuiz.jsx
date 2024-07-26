import React, { useState } from 'react';
import Sloth from '../../assets/Student_Images/Sloth.png';
import '../../Css/Student/StudentMCQQuiz.css';

export default function StudentMCQQuiz() {
  const [expandedBox, setExpandedBox] = useState(null);

  const handleExpandClick = (boxNumber) => {
    setExpandedBox(boxNumber);
  };

  return (
    <div className="smcqqp-Quizholder">
      <div className="smcqqp-container">
        <div className="smcqqp-upperheader">
          <div className="smcqqp-numberofquestions">
            <div className="smcqqp-questionNo">
              <span>1</span>
            </div>
            <div className='smcqqp-midquestionno'>
              <span>of</span>
            </div>
            <div className="smcqqp-totalquestions">
              <label>10</label>
            </div>
          </div>
          <div className="smcqqp-quizlogo">
            Quiztopia
          </div>
          <div className="timer">
            <div className="smcqqp-timer">
              sgfgdf
            </div>
          </div>
        </div>
        <div className="smcqqp-lowerupper">
          <div className="smcqqp-QuizTopic">
            <label>Propositional Logic</label>
            <img src={Sloth} className='Weirdassimage' alt="Sloth" />
          </div>
        </div>
        <div className="smcqqp-AnsweringPart">
          <div className="smcqqp-leftside">
            <div className="smcqqp-Question">
              <label>Hide Yo Wifes</label>
            </div>
          </div>
          <div className="smcqqp-rightside">
            {[1, 2, 3, 4].map(boxNumber => (
              <div
                key={boxNumber}
                className={`smcqqp-AnswerBox smcqqp-AnswerBox${boxNumber} ${expandedBox === boxNumber ? 'expanded' : expandedBox ? 'hidden' : ''}`}
                onClick={() => handleExpandClick(boxNumber)}
              >
                {boxNumber === 1 && "SKIBIDI"}
                {boxNumber === 2 && "yo mama"}
                {boxNumber === 3 && "gayfurry"}
                {boxNumber === 4 && "Something random"}
              </div>
            ))}
            {expandedBox && (
              <div className="smcqqp-NextQuestion">
                <button>Next</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
