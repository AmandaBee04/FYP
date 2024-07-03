import React from 'react'
import { Link } from 'react-router-dom'
import { MdAssignmentAdd } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdTrash } from "react-icons/io";
import { HiDotsHorizontal } from "react-icons/hi";
import '../../Css/Lecturer/LecturerQuizzes.css'

export default function LecturerQuizzes() {
  return (
    <>
              <div className="lq-holqer">
        <div className="lq-container">


          <div className="lq-leftside">
            
          <div className="lq-bigcontainer">
              <div className="lq-header">
                <h2>Quizzes</h2>
              </div>
              `<div className="lq-mysubjects">
                <div className="lq-mysubjects-header">
                  <h2>My Quizzes</h2>
                </div>

                <div className="lq-subjectholder">
                
                <Link>
                    <div className="lq-quizzes">
                      <div className="lq-quizupper">
                        <div class="dropdown">
                          <HiDotsHorizontal className='img1'/>
                          <div class="dropdown-content">
                            <div className="closing">
                              <div className="link1">
                                <div><MdAssignmentAdd className='img'/></div><div className='word'><a>Assign Quiz</a></div>
                              </div>
                              <div className="link2">
                                <div><FiEdit className='img'/></div><div className='word'><a>Edit Quiz</a></div>
                              </div>
                              <div className="link3">
                                <div><IoMdTrash className='img'/></div><div className='word'><a>Delete Quiz</a></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="lq-quizlower">
                        <div className="lq-quizchaptername">
                          Introduction to Internet
                        </div>
                        <div className="lq-quizAuthor">
                          By: Dr. John Doe
                        </div>
                        <div className="lq-QuiznoQuestions">
                          10 Qs
                        </div>
                      </div>
                    </div>
                  </Link>

                 


                </div>
              </div>

              <div className="lq-UnMarkedQuizzes">

                <div className="lq-UnMarkedQuizzes-header">
                  <h2>Unmarked Quizzes</h2>
                </div>

                <div className="lq-UnMarkedQuizzes-holder">

                  <Link to={'/Lecturer/Quizzes/Unmarked_Quiz_Student'}>
                    <div className="lq-UnMarkedQuizzes-quizzes">
                      <div className="lq-UnMarkedQuizzes-quizupper"/>
                      <div className="lq-UnMarkedQuizzes-quizlower">
                        <div className="lq-UnMarkedQuizzes-quizchaptername">
                          Introduction to Internet
                        </div>
                        <div className="lq-UnMarkedQuizzes-quizAuthor">
                          By: Dr. John Doe
                        </div>
                        <div className="lq-UnMarkedQuizzes-QuiznoQuestions">
                          10 Qs
                        </div>
                      </div>
                    </div>
                  </Link>




                </div>

              </div>




              <div className="lq-MarkedQuizzes">

                <div className="lq-MarkedQuizzes-header">
                  <h2>Marked Quizzes</h2>
                </div>

                <div className="lq-MarkedQuizzes-holder">

                  <Link>
                    <div className="lq-MarkedQuizzes-quizzes">
                      <div className="lq-MarkedQuizzes-quizupper"/>
                      <div className="lq-MarkedQuizzes-quizlower">
                        <div className="lq-MarkedQuizzes-quizchaptername">
                          Introduction to Internet
                        </div>
                        <div className="lq-MarkedQuizzes-quizAuthor">
                          By: Dr. John Doe
                        </div>
                        <div className="lq-MarkedQuizzes-QuiznoQuestions">
                          10 Qs
                        </div>
                      </div>
                    </div>
                  </Link>




                </div>
                
              </div>



              
            </div>

            <div className="lq-rightside">
              <div className="lq-rightside-header">
                <h2>Assigned Quizzes</h2>
              </div>
              
              <div className="lq-rightside-holqer">

                <Link>
                  <div className="lq-assignquizzes">
                    <div className="lq-assignquizupper"/>   
                    <div className="lq-assignquizlower">
                      <div className="lq-assignquizchaptername">
                        Introduction to Internet
                      </div>
                      <div className="lq-assignquizAuthor">
                        By: Dr. John Doe
                      </div>
                      <div className="lq-assignlower">
                        <div className="lq-assignduedate">
                          Due 16th April  
                        </div>
                        <div className="lq-assignQuiznoQuestions">
                          10 Qs
                        </div> 
                      </div>
                    </div>
                  </div>
                </Link>

                <Link>
                  <div className="lq-assignquizzes">
                    <div className="lq-assignquizupper"/>   
                    <div className="lq-assignquizlower">
                      <div className="lq-assignquizchaptername">
                        Introduction to Internet
                      </div>
                      <div className="lq-assignquizAuthor">
                        By: Dr. John Doe
                      </div>
                      <div className="lq-assignlower">
                        <div className="lq-assignduedate">
                          Due 16th April  
                        </div>
                        <div className="lq-assignQuiznoQuestions">
                          10 Qs
                        </div> 
                      </div>
                    </div>
                  </div>
                </Link>

                <Link>
                  <div className="lq-assignquizzes">
                    <div className="lq-assignquizupper"/>   
                    <div className="lq-assignquizlower">
                      <div className="lq-assignquizchaptername">
                        Introduction to Internet
                      </div>
                      <div className="lq-assignquizAuthor">
                        By: Dr. John Doe
                      </div>
                      <div className="lq-assignlower">
                        <div className="lq-assignduedate">
                          Due 16th April  
                        </div>
                        <div className="lq-assignQuiznoQuestions">
                          10 Qs
                        </div> 
                      </div>
                    </div>
                  </div>
                </Link>

                <Link>
                  <div className="lq-assignquizzes">
                    <div className="lq-assignquizupper"/>   
                    <div className="lq-assignquizlower">
                      <div className="lq-assignquizchaptername">
                        Introduction to Internet
                      </div>
                      <div className="lq-assignquizAuthor">
                        By: Dr. John Doe
                      </div>
                      <div className="lq-assignlower">
                        <div className="lq-assignduedate">
                          Due 16th April  
                        </div>
                        <div className="lq-assignQuiznoQuestions">
                          10 Qs
                        </div> 
                      </div>
                    </div>
                  </div>
                </Link>

                <Link>
                  <div className="lq-assignquizzes">
                    <div className="lq-assignquizupper"/>   
                    <div className="lq-assignquizlower">
                      <div className="lq-assignquizchaptername">
                        Introduction to Internet
                      </div>
                      <div className="lq-assignquizAuthor">
                        By: Dr. John Doe
                      </div>
                      <div className="lq-assignlower">
                        <div className="lq-assignduedate">
                          Due 16th April  
                        </div>
                        <div className="lq-assignQuiznoQuestions">
                          10 Qs
                        </div> 
                      </div>
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
