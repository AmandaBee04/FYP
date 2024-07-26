import React from 'react'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom'
import '../../Css/Lecturer/LecturerWrittenQuestion.css'

import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails'

export default function LecturerWrittenQuestion() {
  return (
    <>
        <div className="lwq-holder">

            <div className="lwq-container">


                <LecturerQuizDetails/>

                <div className="lwq-rightside">

                    <div className="lwq-questioncontainer">
                        <form action="" className="lwq-question">
                            <div className="lwq-questionNo">
                                <div>Question</div>
                                <div className="questionNo">1</div>
                                <MdDelete className='delbtn'/>
                            </div>
                            <div className="lwq-questiontext">
                                <textarea placeholder='Write question and instructions here...'></textarea>
                            </div>

                            <div className="lwq-questionmarks">
                                <div>Marks : </div>
                                <input type="Number" placeholder='..Enter Marks..'/>               
                            </div>
                        </form>

                        
                    </div>

            
                    <div className="lwq-lower">
                        <button>
                            Add Question
                        </button>
                    </div>

                    

                </div>



            </div>

        </div>    
    </>
  )
}


