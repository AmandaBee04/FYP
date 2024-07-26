import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails';
import '../../Css/Lecturer/LecturerViewMCQuestionSet.css';

export default function LecturerViewMCQuestionSet() {
  const { quizId } = useParams(); // Get qs_id from URL
  const [questions, setQuestions] = useState([]);
  const [quizDetails, setQuizDetails] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const resQuizDetails = await axios.get(`http://127.0.0.1:8000/api/question_set/${quizId}`);
        const res = await axios.get(`http://127.0.0.1:8000/api/question_set/${quizId}/question/getQuestion`);
        console.log('Response from backend for quiz details:', resQuizDetails.data);
        console.log('Response from backend:', res.data);

        if (resQuizDetails.status === 200) {
          setQuizDetails(resQuizDetails.data);
        } else {
          console.error('Failed to fetch quiz details');
        }

        if (res.status === 200) {
          setQuestions(res.data[0] || []);
        } else {
          console.error('Failed to fetch questions');
        }
      } catch (error) {
        console.error('An error occurred while fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  return (
    <>
      <div className="lvmcq-holder">
        <div className="lvmcq-container">
         {quizDetails && <LecturerQuizDetails quizDetails={quizDetails} />}
          <div className="lvmcq-rightside">
            <div className="lvmcq-questioncontainer">
              {questions.length === 0 ? (
                <div>No questions yet</div>
              ) : (
                questions.map((question, index) => (
                  <div key={question.id} className="lvmcq-question">
                    <div className="lvmcq-questionNo">
                      <div>Question</div>
                      <div className="questionNo">{index + 1}</div>
                      <label className="questionName">{question.question}</label>
                    </div>
                    <div className="lvmcq-answers">
                      {['ans_a', 'ans_b', 'ans_c', 'ans_d'].map((key) => (
                        <div key={`${question.id}-${key}`} className="lvmcq-answerdiv">
                          <div className="Checkbox">
                            <label className="lvmcq-answers-container">
                              <input
                                type="checkbox"
                                className="CheckboxAnswer"
                                checked={question.correct_ans === key}
                                disabled
                              />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                          <div className="Answer">
                            <label className="TextAnswer">{question[key]}</label> 
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}