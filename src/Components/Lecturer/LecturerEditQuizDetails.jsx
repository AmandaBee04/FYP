import React from 'react';
import Fox from '../../assets/Lecturer_Images/Fox.png';
import '../../Css/Lecturer/LecturerQuizDetails.css';
import { GiClockwork } from "react-icons/gi";

export default function LecturerEditQuizDetails({ quizDetails, setQuizDetails }) {
    const handleDetailChange = (field, value) => {
      const newDetails = { ...quizDetails, [field]: value };
      setQuizDetails(newDetails);
    };

  return (
    <>
      <div className="lwq-leftside">
        <div className="lwq-leftside-top"/>
        <div className="lwq-leftside-bottom">
          <div className="lwq-subjectname">
            {quizDetails.subjects.name}
          </div>
          <div className="lwq-subjecttopic">
            {quizDetails.qs_name}
          </div>
          <div className="lwq-typeofquiz">
            <div className="typeofquiz">{quizDetails.type}</div>
            <div>Question</div>
          </div>
          <div className="lwq-allotedtime">
            <div className='Clock'><GiClockwork/></div>
            <input
              type="name"
              value={quizDetails.time}
              onChange={(e) => handleDetailChange('time', e.target.value)}
            />
            <div>Minutes</div>
          </div>
          <div className="lwq-totalmarks">
            <input
              type="name"
              value={quizDetails.total_mark}
              onChange={(e) => handleDetailChange('total_mark', e.target.value)}
            />
            <div>Marks</div>
          </div>
          {/* Save button removed */}
          <div className="lwq-img">
            <img src={Fox} />
          </div>
        </div>
      </div>
    </>
  );
}
