import React from 'react'
import '../../Css/Lecturer/LecturerUnmarkedStudents.css'
import { Link } from 'react-router-dom'
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails'

export default function LecturerUnmarkedStudents() {
  return (
    <>
        <div className="lus-holder">

            <div className="lus-container">

                <LecturerQuizDetails/>

                <div className="lus-rightside">     
                    <h2>Unmarked Students</h2>
                    <div className="lus-gradescontainer">
                        <div className="lus-upper-row">
                            <div className="lus-tag1">
                                Student ID
                            </div>
                            <div className="lus-tag2">
                                Name
                            </div>
                            <div className="lus-tag3">
                                Email
                            </div>
                            <div className="lus-tag4">
                                Programme
                            </div>
                            <div className="lus-tag5">
                                Faculty
                            </div>

                        </div>

                        <div className="lus-lower-row">


                            <div className="lus-grades">
                                <div className="lus-studentid">
                                    122123232
                                </div>
                                <div className="lus-studentname">
                                    Way Tu Yung
                                </div>
                                <div className="lus-studentemail">
                                    WayTY@gmail.com
                                </div>
                                <div className="lus-studentprogramme">
                                    Diploma in IT
                                </div>
                                <div className="lus-studentfaculty">
                                    FCI
                                </div>
                                <div className="lus-studentview">
                                    <Link to={'/Lecturer/Quizzes/Unmarked_Quiz_Student/Mark'}>
                                        <button>
                                            Mark
                                        </button>
                                    </Link>
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
