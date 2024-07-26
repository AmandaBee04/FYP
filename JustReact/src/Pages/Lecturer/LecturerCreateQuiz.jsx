import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../Css/Lecturer/LecturerCreateQuiz.css'

export default function LecturerCreateQuiz() {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
    navigate('/Lecturer/Quiz_Creation/Multiple_Choice_Question'); // Navigate to the desired route after login
  };


  return (
    <>
    <div className="lcq-holder">
      <div className="lcq-container">
        <div className="lcq-header">
          <h1>Quiz Creation</h1>
        </div>
        <div className="lcq-form">
          <form action="">
            <div className="lcr-inner">
              <div className="lcq-leftside">
                <div className="lcq-Ques">
                  <div><label for="subject">Subject :</label></div>
                  <div className='Options'>
                  <select name="cars" id="cars">
                    <option value="Please Choose" default>Please Choose</option>
                    <option value="volvo">Ur mum</option>
                  </select>
                  </div>
                </div>
                <div className="lcq-Ques">
                  <div><label for="name">Name :</label></div>
                  <div><input type="name" placeholder='Enter Your Topic Name...' className='input'/></div>
                </div>
                <div className="lcq-Ques">
                  <div><label for="quiz">Type of Quiz :</label></div>
                  <div>
                    <select name="TypeOfQuiz">
                      <option value="Multiple Choice Questions" default>Multiple Choice Quiz</option>
                      <option value="Written Questions">Written Quiz</option>
                    </select>
                  </div>
                </div>
                <div className="lcq-Ques2">
                  <div><label for="subject" className='assigninput'>Assign :</label></div>
                  <div><input type="checkbox" className='assigninput'/></div>
                </div> 
                <div className="confirmbtn">
                  <button onClick={handleSubmit}>
                    Confirm  
                  </button>  
                </div>              
              </div>
              <div className="lcq-rightside">
                <div className="lcq-Ques">
                  <div><label for="Time">Time (Minutes) :</label></div>
                  <div><input type="number" placeholder='Enter Alloted Time...' max={60} className='input' min={0} /></div>
                </div>
                <div className="lcq-Ques">
                  <div><label for="name">Total Marks :</label></div>
                  <div><input type="number" placeholder='Enter Total Marks...' max={100} className='input' min={0}/></div>
                </div>
                <div className="lcq-Ques">
                  <div><label for="DueDate">Due Date :</label></div>
                  <div><input type="date" className='input'/></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
