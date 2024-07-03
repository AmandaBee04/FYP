import React from 'react'
import { Link } from 'react-router-dom'
import '../../Css/Lecturer/LecturerDashboard.css'
import { FaUserCircle } from "react-icons/fa";


export default function LecturerDashboard() {
  return (
    <>
      <div className="ld-holder">
        <div className="ld-container">
          <div className="ld-header">
            <div><FaUserCircle className='Icon'/></div>
            <div>Welcome back</div>
            <div>Ben Dover</div>
          </div>

          <div className="ld-bigcontainer">

              <div className="ld-mysubjects">
                <div className="ld-mysubjects-header">
                  <h2>My Subjects</h2>
                </div>

                <div className="ld-subjectholder">
                  <Link to={'/Lecturer/Subject_Details'}>
                    <div className="ld-subjects">
                      <div className="ld-CoverPage"/>
                      <div className="ld-Class">
                        <div className="ld-classCode">
                          DIT5401
                        </div>
                        <div className="ld-classname">
                          Internet & Web Publishing
                        </div>
                      </div>
                      <div className="ld-howmany">
                        <div className="ld-NoStudents">
                          15
                        </div>
                        <div>Students</div>
                      </div>
                    </div>
                  </Link>


                  <Link to={'/Lecturer/Subject_Details'}>
                    <div className="ld-subjects">
                      <div className="ld-CoverPage"/>
                      <div className="ld-Class">
                        <div className="ld-classCode">
                          DIT5401
                        </div>
                        <div className="ld-classname">
                          Internet & Web Publishing
                        </div>
                      </div>
                      <div className="ld-howmany">
                        <div className="ld-NoStudents">
                          15
                        </div>
                        <div>Students</div>
                      </div>
                    </div>
                  </Link>

                  <Link to={'/Lecturer/Subject_Details'}>
                    <div className="ld-subjects">
                      <div className="ld-CoverPage"/>
                      <div className="ld-Class">
                        <div className="ld-classCode">
                          DIT5401
                        </div>
                        <div className="ld-classname">
                          Internet & Web Publishing
                        </div>
                      </div>
                      <div className="ld-howmany">
                        <div className="ld-NoStudents">
                          15
                        </div>
                        <div>Students</div>
                      </div>
                    </div>
                  </Link>

                  <Link to={'/Lecturer/Subject_Details'}>
                    <div className="ld-subjects">
                      <div className="ld-CoverPage"/>
                      <div className="ld-Class">
                        <div className="ld-classCode">
                          DIT5401
                        </div>
                        <div className="ld-classname">
                          Internet & Web Publishing
                        </div>
                      </div>
                      <div className="ld-howmany">
                        <div className="ld-NoStudents">
                          15
                        </div>
                        <div>Students</div>
                      </div>
                    </div>
                  </Link>

                </div>
              </div>

              <div className="ld-MyQuizzes">

                <div className="ld-MyQuizzes-header">
                  <h2>Student Grades</h2>
                </div>

                <div className="ld-MyQuizzes-holder">

                  <Link to={'/Lecturer/Student_Grades'}>
                    <div className="ld-subjects">
                      <div className="ld-CoverPage"/>
                      <div className="ld-Class">
                        <div className="ld-classCode">
                          DIT5401
                        </div>
                        <div className="ld-classname">
                          Internet & Web Publishing
                        </div>
                      </div>
                      <div className="ld-howmany">
                        <div className="ld-NoStudents">
                          15
                        </div>
                        <div>Students</div>
                      </div>
                    </div>
                  </Link>



                </div>
              </div>

                        
          </div>
        </div>
      
      </div>
    </>
  )
}
