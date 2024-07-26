import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Css/Student/StudentQuizzes.css';
import axios from 'axios';

export default function StudentQuizzes() {
  const [questionSets, setQuestionSets] = useState([]);
  const [error, setError] = useState('');
  const studentId = localStorage.getItem('id');

  useEffect(() => {
    const fetchQuestionSets = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/question_set/getAllQuestionSetsStudent/${studentId}`);
        if (response.status === 200) {
          setQuestionSets(response.data);
          console.log(response.data);
        } else {
          console.error('Failed to fetch question sets');
        }
      } catch (error) {
        console.error('An error occurred while fetching question sets:', error);
        setError('An error occurred while fetching question sets');
      }
    };

    fetchQuestionSets();
  }, [studentId]);

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
      <div className="holder">
        <div className="sq-container">
          <div className="sq-header">
            <h1>Quiztopia Bank</h1>
          </div>
          <div className="sq-bank">
            {Object.keys(groupedBySubject).map((subjectId) => (
              <div key={subjectId} className="sq-subjectcontainer">
                <div className="sq-subjectname">
                  <label className="sq-SubjectNameCode">{subjectId} - {groupedBySubject[subjectId].name}</label>
                </div>
                <div className="sq-QuizChapters">
                  {groupedBySubject[subjectId].questionSets.map((qs) => (
                    <Link key={qs.id} to={`Start_Quiz/${qs.id}`}>
                      <div className="sq-quizzes">
                        <div className="sq-quizupper" />
                        <div className="sq-quizlower">
                          <div className="sq-quizchaptername">{qs.qs_name}</div>
                          <div className="sq-quizAuthor">By: {qs.lecturer_name}</div>
                          <div className="sq-QuiznoQuestions">{qs.question_count} Qs</div>
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
