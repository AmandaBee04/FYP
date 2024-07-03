import React from 'react'
import { SiQuicklook } from "react-icons/si";
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails'
import '../../Css/Lecturer/LecturerStudentGrades.css'

export default function LecturerStudentGrades() {
  return (
    <>
        <div className="lsg-holder">

            <div className="lsg-container">

                <LecturerQuizDetails/>

                <div className="lsg-rightside">     
                    <h2>Student Grades</h2>
                    <div className="lsg-gradescontainer">
                        <div className="lsg-upper-row">
                            <div className="lsg-tag1">
                                Student ID
                            </div>
                            <div className="lsg-tag2">
                                Name
                            </div>
                            <div className="lsg-tag3">
                                Email
                            </div>
                            <div className="lsg-tag4">
                                Programme
                            </div>
                            <div className="lsg-tag5">
                                Faculty
                            </div>
                            <div className="lsg-tag6">
                                Score
                            </div>
                        </div>

                        <div className="lsg-lower-row">


                            <div className="lsg-grades">
                                <div className="lsg-studentid">
                                    122123232
                                </div>
                                <div className="lsg-studentname">
                                    Way Tu Yung
                                </div>
                                <div className="lsg-studentemail">
                                    WayTY@gmail.com
                                </div>
                                <div className="lsg-studentprogramme">
                                    Diploma in IT
                                </div>
                                <div className="lsg-studentfaculty">
                                    FCI
                                </div>
                                <div className="lsg-studentscore">
                                    10/14
                                </div>
                                <div className="lsg-view">
                                        <SiQuicklook/>
                                </div>
                            </div>




                        </div>
                    </div>



        

                </div>



            </div>

        </div>    
    </>
  )
}
