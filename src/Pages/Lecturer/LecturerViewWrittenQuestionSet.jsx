import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails'
import '../../Css/Lecturer/LecturerViewWrittenQuestionSet.css'

export default function LecturerViewWrittenQuestionSet() {

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
      <div className="lvwq-holder">
        <div className="lvwq-container">
          {quizDetails && <LecturerQuizDetails quizDetails={quizDetails} />}
          <div className="lvwq-rightside">
            <div className="lvwq-questioncontainer">
              {questions.length === 0 ? (
                <div>No questions yet</div>
              ) : (
                questions.map((question, index) => (
                  <form key={question.id} className="lvwq-question">
                    <div className="lvwq-questionNo">
                      <div>Question</div>
                      <div className="questionNo">{index + 1}</div>
                      <div className="TotalMarks">
                        <div className="Marks">{question.marks}</div>
                        <div>Marks</div>
                      </div>
                    </div>
                    <div className="lvwq-questiontext">
                      <label className="Question">{question.question}</label>
                    </div>
                  </form>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
