import React from 'react'
import Fox from '../../assets/Lecturer_Images/Fox.png'
import '../../Css/Lecturer/LecturerQuizDetails.css'
import { GiClockwork } from "react-icons/gi";

export default function LecturerQuizDetails() {
  return (
    <>
                <div className="lwq-leftside">
                    <div className="lwq-leftside-top"/>
                    <div className="lwq-leftside-bottom">
                        <div className="lwq-subjectname">
                            Discrete Structures
                        </div>    
                        <div className="lwq-subjecttopic">
                            Propositional Logic
                        </div>
                        <div className="lwq-typeofquiz">
                            <div className="typeofquiz">Written</div>
                            <div>Question</div>
                        </div>
                        <div className="lwq-allotedtime">
                            <div className='Clock'><GiClockwork/></div>
                            <div className="allotedtime">10</div>
                            <div>Minutes</div>
                        </div>
                        <div className="lwq-totalmarks">
                            <div className="totalmarks">10</div>
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
