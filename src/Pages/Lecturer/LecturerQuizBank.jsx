import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Lecturer/LecturerQuizBank.css';
import axios from 'axios';

export default function LecturerQuizBank() {
  const [questionSets, setQuestionSets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestionSets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/question_set/getAllQuestionSets');
        if (response.status === 200) {
          setQuestionSets(response.data);
        } else {
          console.error('Failed to fetch question sets');
        }
      } catch (error) {
        console.error('An error occurred while fetching question sets:', error);
        setError('An error occurred while fetching question sets');
      }
    };

    fetchQuestionSets();
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  const groupedBySubject = questionSets.reduce((acc, qs) => {
    const subjectId = qs.sub_id;
    const subjectName = qs.subject_name;
    if (!acc[subjectId]) {
      acc[subjectId] = { name: subjectName, questionSets: [] };
    }
    acc[subjectId].questionSets.push(qs);
    return acc;
  }, {});

  return (
    <>
      <div className="lqb-holder">
        <div className="lqb-container">
          <div className="lqb-header">
            <h1>Quiztopia Bank</h1>
          </div>
          <div className="lqb-above">
            <div className='lqb-linktoRequest'>
              <Link to="/Lecturer/Subject_Request">
                Need a new subject? Send a request!
              </Link>
            </div>
            <div className="lqb-space" />
            <div className='lqb-linktoQuizCreation'>
              <Link to="/Lecturer/Quiz_Creation">
                + Create New Quiz
              </Link>
            </div>
          </div>
          <div className="lqb-bank">
            {Object.keys(groupedBySubject).map((subjectId) => (
              <div key={subjectId} className="lqb-subjectcontainer">
                <div className="lqb-subjectname">
                  <label className='lqb-SubjectNameCode'>{subjectId} - {groupedBySubject[subjectId].name}</label>
                </div>
                <div className="lqb-QuizChapters">
                  {groupedBySubject[subjectId].questionSets.map((qs) => (
                    <Link key={qs.id} 
                    
                    to={
                      qs.type === 'Multiple Question'
                        ? `/Lecturer/Quiz_Bank/View_MCQ_Question_Set/${qs.id}`
                        : `/Lecturer/Quiz_Bank/View_Written_Question_Set/${qs.id}`
                        }>

                      <div className="lqb-quizzes">
                        <div className="lqb-quizupper" />
                          <div className="lqb-quizlower">
                          <div className="lqb-quizchaptername">{qs.qs_name}</div>
                          <div className="lqb-quizAuthor">By: {qs.lecturer_name}</div>
                          <div className="lqb-QuiznoQuestions">{qs.question_count} Qs</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}