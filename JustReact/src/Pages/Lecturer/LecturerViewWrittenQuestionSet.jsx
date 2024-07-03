import React from 'react'
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails'
import '../../Css/Lecturer/LecturerViewWrittenQuestionSet.css'

export default function LecturerViewWrittenQuestionSet() {
  return (
    <>
        <div className="lvwq-holder">

            <div className="lvwq-container">


                <LecturerQuizDetails/>

                <div className="lvwq-rightside">

                    <div className="lvwq-questioncontainer">
                        <form action="" className="lvwq-question">
                            <div className="lvwq-questionNo">
                                <div>Question</div>
                                <div className="questionNo">1</div>
                                <div className='TotalMarks'>
                                    <div className="Marks">5</div>
                                    <div>Marks</div>
                                </div>
                            </div>
                            <div className="lvwq-questiontext">
                                <label className='Question' >erfdgdfg</label>
                            </div>
                        </form>
                    </div>
                    

                </div>



            </div>

        </div>    
    </>
  )
}
