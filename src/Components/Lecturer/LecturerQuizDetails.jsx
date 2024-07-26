import React from 'react'
import Fox from '../../assets/Lecturer_Images/Fox.png'
import '../../Css/Lecturer/LecturerQuizDetails.css'
import { GiClockwork } from "react-icons/gi";

export default function LecturerQuizDetails({ quizDetails, setQuizDetails }) {
    const handleDetailChange = (field, value) => {
      const newDetails = { ...quizDetails, [field]: value };
      setQuizDetails(newDetails);
    };
  
    const handleSave = async () => {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/lecturer/${quizDetails.id}/question_set/updateQS`, quizDetails);
        if (response.status === 201) {
          console.log('Quiz details updated successfully');
        } else {
          console.error('Failed to update quiz details');
        }
      } catch (error) {
        console.error('An error occurred while updating the quiz details:', error);
      }
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
                            <div className="allotedtime">{quizDetails.time}</div>
                            <div>Minutes</div>
                        </div>
                        <div className="lwq-totalmarks">
                            <div className="totalmarks">{quizDetails.total_mark}</div>
                            <div>Marks</div>
                        </div>
                        <div className="lwq-img">
                            <img src={Fox} />
                        </div>
                    </div>
                </div>
    </>
  )
}
