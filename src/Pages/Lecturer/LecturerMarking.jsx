import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { RxSlash } from "react-icons/rx";
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails';
import LecturerMarkConfirmation from '../../Components/Lecturer/LecturerMarkConfirmation';
import '../../Css/Lecturer/LecturerMarking.css';

export default function LecturerMarking() {
  const { stud_id, id } = useParams();
  const [quizDetails, setQuizDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [marks, setMarks] = useState({});
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleCloseConfirmPopup = () => {
    setShowConfirmPopup(false); 
  };

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
          const initialFeedback = {};
          const initialMarks = {};
          resAnswers.data.stud_answers.forEach(ans => {
            initialFeedback[ans[0].ques_id] = ans[0].feedback;
            initialMarks[ans[0].ques_id] = ans[0].marks;
          });
          setFeedback(initialFeedback);
          setMarks(initialMarks);
        } else {
          console.error('Failed to fetch student answers');
        }
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchQuizData();
  }, [id, stud_id]);

  const handleFeedbackChange = (ques_id, value) => {
    setFeedback({ ...feedback, [ques_id]: value });
  };

  const handleMarksChange = (ques_id, value) => {
    setMarks({ ...marks, [ques_id]: value });
  };

  const handleSubmit = async () => {
    try {
      let totalMarks = 0;
      for (const question of questions) {
        const ques_id = question.id;
        const mark = marks[ques_id] || 0;
        totalMarks += parseFloat(mark);

        await axios.post(`http://127.0.0.1:8000/api/student/${stud_id}/question/${ques_id}/updateStudAns`, {
          feedback: feedback[ques_id],
          marks: mark
        });
      }

      const totalMark = quizDetails.total_mark;
      const grade = (totalMarks / totalMark) * 100;

      await axios.post(`http://127.0.0.1:8000/api/student/${stud_id}/question_set/${id}/updateStudGrade`, {
        grade: grade,
        score: totalMarks
      });

      setShowConfirmPopup(true);
    } catch (error) {
      console.error('An error occurred while submitting:', error);
      alert('An error occurred while submitting.');
    }
  };

  console.log(answers);

  return (
    <>
      <div className="lm-holder">
        <div className="lm-container">
          {quizDetails && <LecturerQuizDetails quizDetails={quizDetails} />}
          <div className="lm-rightside">
            <div className="lm-questioncontainer">
              {questions.map((question, index) => (
                <form key={question.id} className="lm-question">
                  <div className="lm-questionNo">
                    <div>Question</div>
                    <div className="questionNo">{index + 1}</div>
                    <label className="lm-questionName">{question.question}</label>
                    <div className='TotalMarks'>
                      <div className="Marks">{question.marks}</div>
                      <div>Marks</div>
                    </div>
                  </div>
                  <div className="lm-answers">
                    <label className='lm-Student_Anwsers'>
                      {answers.flat().find(ans => ans.ques_id === question.id)?.answer || 'No answer'}
                    </label>
                  </div>
                  <div className="lm-feedback">
                  <input
                    type="text"
                    className='feedback'
                    placeholder='Provide Feedback... If Any'
                    value={feedback[question.id] || ''}
                    onChange={(e) => handleFeedbackChange(question.id, e.target.value)}
                  />
                    <div className='lm-ProvideMarks'>
                      <div className='lm-Marks'>
                        <input
                          type="number"
                          value={marks[question.id] || ''}
                          onChange={(e) => handleMarksChange(question.id, e.target.value)}
                        />
                      </div>
                      <div className='slash'><RxSlash style={{fontSize:29}}/></div>
                      <label className='lm-TotalMarks'>{question.marks}</label>
                    </div>
                  </div>
                </form>
              ))}
            </div>
            <button className='lm-SubmitBtn' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
      {showConfirmPopup && <LecturerMarkConfirmation onClose={handleCloseConfirmPopup} />}
    </>
  );
}
