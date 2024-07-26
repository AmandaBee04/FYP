import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails';
import '../../Css/Student/StudentMCQQuizReview.css';

const LecturerViewMCQGrade = () => {
  const { id, stud_id } = useParams();
  const studentId = localStorage.getItem('id');
  const [questions, setQuestions] = useState([]);
  const [studAnswers, setStudAnswers] = useState([]);
  const [quizDetails, setQuizDetails] = useState(null);

  useEffect(() => {
    const fetchQuestionsAndAnswers = async () => {
      try {
        const resQuizDetails = await axios.get(`http://127.0.0.1:8000/api/question_set/${id}`);
        const questionsRes = await axios.get(`http://127.0.0.1:8000/api/question_set/${id}/question/getQuestion`);
        const answersRes = await axios.get(`http://127.0.0.1:8000/api/student/${stud_id}/question_set/${id}/stud_ans/getStudAns`);
        

        if (resQuizDetails.status === 200) {
          setQuizDetails(resQuizDetails.data);
        } else {
          console.error('Failed to fetch quiz details');
        }

        if (questionsRes.status === 200) {
          setQuestions(questionsRes.data[0]);
        } else {
          console.error('Failed to fetch questions');
        }

        if (answersRes.status === 200) {
          setStudAnswers(answersRes.data.stud_answers);
          // console.log(answersRes.data.stud_answers)
        } else {
          console.error('Failed to fetch student answers');
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchQuestionsAndAnswers();
  }, [id, studentId]);

  const getAnswerClass = (question, answer) => {
    const studentAnswer = studAnswers.flat().find(ans => ans.ques_id === question.id);
    // console.log(studAnswers.flat().find(ans => ans.ques_id === question.id));
    console.log(answer);
    if (!studentAnswer) return '';
    if (studentAnswer.answer === question.correct_ans && answer === question.correct_ans) {
      return 'correct';
      
    } else if (studentAnswer.answer !== question.correct_ans && answer === question.correct_ans) {
      return 'correct';}
    
    else if (studentAnswer.answer !== question.correct_ans && answer === studentAnswer.answer) {
      return 'incorrect';
    }
    return '';
  };

  return (
    <div className="smqr-holder">
      <div className="smqr-container">
      {quizDetails && <LecturerQuizDetails quizDetails={quizDetails} />}
      <div className="smqr-rightside">
        {questions.map((question, index) => (
          <div key={index} className="smqr-questioncontainer">
            <form className="smqr-question">
              <div className="smqr-questionNo">
                <div>Question</div>
                <div className="questionNo">{index + 1}</div>
                <label className="questionName">{question.question}</label>
              </div>
              <div className="smqr-answers">
                {['ans_a', 'ans_b', 'ans_c', 'ans_d'].map((ansKey, idx) => (
                  <div key={idx} className="smqr-answerdiv">
                    <div className="smqr-Answer">
                      <label className={`smqr-answerdiv ${getAnswerClass(question, ansKey)}`}>{question[ansKey]}</label>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default LecturerViewMCQGrade;
