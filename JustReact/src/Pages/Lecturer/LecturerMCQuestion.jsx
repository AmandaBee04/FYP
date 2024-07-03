import React from 'react'
import '../../Css/Lecturer/LecturerMCQuestion.css'
import Image from '../../assets/Lecturer_Images/ImageUploader.png'
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails'

export default function LecturerMCQuestion() {
  return (
    <>
                <div className="lmcq-holder">

                    <div className="lmcq-container">


                        <LecturerQuizDetails/>

                    <div className="lmcq-rightside">

                        <div className="lmcq-questioncontainer">
                            <form action="" className="lmcq-question">
                                <div className="lmcq-questionNo">
                                    <div>Question</div>
                                    <div className="questionNo">1</div>
                                    <input type="name" className="questionName" placeholder='Question..'/>
                                    <img src={Image} onClick={''} />
                                </div>
                                <div className="lmcq-answers">
                                    <div className="lmcq-answerdiv">
                                        <div className="Checkbox">
                                            <label className="container">
                                                <input type="checkbox" className='CheckboxAnswer1' />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="Answer"><input type="name" className='TextAnswer1' placeholder='Answer 1'/></div>
                                    </div>
                                    <div className="lmcq-answerdiv">
                                        <div className="Checkbox">
                                            <label className="container">
                                                <input type="checkbox" className='CheckboxAnswer2'/>
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="Answer"><input type="name" className='TextAnswer1' placeholder='Answer 2'/></div>
                                    </div>
                                    <div className="lmcq-answerdiv">
                                        <div className="Checkbox">
                                            <label className="container">
                                                <input type="checkbox" className='CheckboxAnswer3'/>
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>                             
                                        <div className="Answer"><input type="name" className='TextAnswer1' placeholder='Answer 3'/></div>
                                    </div>
                                    <div className="lmcq-answerdiv">
                                        <div className="Checkbox">
                                            <label className="container">
                                                <input type="checkbox" className='CheckboxAnswer4'/>
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>                                        
                                        <div className="Answer"><input type="name" className='TextAnswer1' placeholder='Answer 4'/></div>
                                    </div>
                                </div>


                            </form>

                            
                        </div>


                        <div className="lmcq-lower">
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
