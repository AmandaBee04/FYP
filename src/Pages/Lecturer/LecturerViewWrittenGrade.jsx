import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoXCircleFill } from "react-icons/go";
import { RxSlash } from 'react-icons/rx';
import { IoIosCheckmarkCircle } from "react-icons/io";
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails';
import { Link } from 'react-router-dom'
import '../../Css/Lecturer/LecturerViewWrittenGrade.css'

export default function LecturerViewWrittenGrade() {

  const { id, stud_id } = useParams(); // Get qs_id from URL
  const [questions, setQuestions] = useState([]);
  const [quizDetails, setQuizDetails] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [marks, setMarks] = useState({});

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const resQuizDetails = await axios.get(`http://127.0.0.1:8000/api/question_set/${id}`);
        if (resQuizDetails.status === 200) {
          setQuizDetails(resQuizDetails.data);
        } else {
          console.error('Failed to fetch quiz details');
        }

        const resQuestions = await axios.get(`http://127.0.0.1:8000/api/question_set/${id}/question/getQuestion`);
        if (resQuestions.status === 200) {
          setQuestions(resQuestions.data[0]);
        } else {
          console.error('Failed to fetch questions');
        }

        const resAnswers = await axios.get(`http://127.0.0.1:8000/api/student/${stud_id}/question_set/${id}/stud_ans/getStudAns`);
        if (resAnswers.status === 200) {
          setAnswers(resAnswers.data.stud_answers);
        } else {
          console.error('Failed to fetch student answers');
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchQuizData();
  }, [id, stud_id]);

  
  return (
    <>
      <div className="lvwg-holder">
        <div className="lvwg-container">
        {quizDetails && <LecturerQuizDetails quizDetails={quizDetails} />}
          <div className="lvwg-rightside">
            <div className="lvwg-questioncontainer">
            {questions.map((question, index) => (
                <form key={question.id} className="lvwg-question">
                  <div className="lvwg-questionNo">
                    <div>Question</div>
                    <div className="questionNo">{index + 1}</div>
                    <label className="lvwg-questionName">{question.question}</label>
                    {/* <div className='lvwg-TotalMarks'>
                      <div className="Marks">{answers.flat().find(ans => ans.ques_id === question.id)?.marks || 'No answer'}</div>
                      <div>Marks</div>
                    </div> */}
                  </div>
                  <div className="lvwg-answers">
                    <label className='lvwg-textarea'>
                      {answers.flat().find(ans => ans.ques_id === question.id)?.answer || 'No answer'}
                    </label>
                  </div>                    
                    <div className="lvwg-feedback">{answers.flat().find(ans => ans.ques_id === question.id)?.feedback || 'No answer'}</div>

                    <div className='lvwg-ProvidedMarks'>
                    <label className='lvwg-AllotedMarks'>{answers.flat().find(ans => ans.ques_id === question.id)?.marks || 0}</label>
                    <div className='lvwg-slash'><RxSlash style={{fontSize:29}}/></div>
                    <label className='lvwg-TotalQuestionMarks'>{question.marks}</label>
                </div>

                   

                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
