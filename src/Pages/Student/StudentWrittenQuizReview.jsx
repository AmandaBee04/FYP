import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoXCircleFill } from "react-icons/go";
import { RxSlash } from 'react-icons/rx';
import { IoIosCheckmarkCircle } from "react-icons/io";
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails';
import { Link } from 'react-router-dom'
import '../../Css/Student/StudentWrittenQuizReview.css'

export default function StudentWrittenQuizReview() {

  const { id } = useParams(); // Get qs_id from URL
  const stud_id = localStorage.getItem('id');
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
      <div className="swqr-holder">
        <div className="swqr-container">
        {quizDetails && <LecturerQuizDetails quizDetails={quizDetails} />}
          <div className="swqr-rightside">
            <div className="swqr-questioncontainer">
            {questions.map((question, index) => (
                <form key={question.id} className="swqr-question">
                  <div className="swqr-questionNo">
                    <div>Question</div>
                    <div className="questionNo">{index + 1}</div>
                    <label className="swqr-questionName">{question.question}</label>
                    <div className='swqr-TotalMarks'>
                      <div className="Marks">{answers.flat().find(ans => ans.ques_id === question.id)?.marks || 'No answer'}</div>
                      <div>Marks</div>
                    </div>
                  </div>
                  <div className="swqr-answers">
                    <label className='swqr-textarea'>
                      {answers.flat().find(ans => ans.ques_id === question.id)?.answer || 'No answer'}
                    </label>
                  </div>                    
                    <div className="swqr-feedback">{answers.flat().find(ans => ans.ques_id === question.id)?.feedback || 'No answer'}</div>

                   

                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
