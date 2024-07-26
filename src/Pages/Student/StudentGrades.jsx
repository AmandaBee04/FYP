import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiQuicklook } from "react-icons/si";
import axios from 'axios';
import '../../Css/Student/StudentGrades.css';

export default function StudentGrades({ token }) {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/student/${localStorage.getItem('id')}/grades`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          
          if (Array.isArray(res.data)) {
            const gradesWithNumberGrades = res.data.map(grade => ({
              ...grade,
              grade: Number(grade.grade),
            }));
            setGrades(gradesWithNumberGrades);
            console.log(gradesWithNumberGrades);
          } 
        } else {
          setError('Failed to fetch grades');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching grades');
      }
    };

    fetchGrades();
  }, [token]);

  
  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }



  if (!grades.length) {
    return <p><div class="sd-loader"></div></p>;
  }

  return (
    <>
      <div className="sg-holder">
        <div className="sg-container">
          <div className="sg-header">Quiz Result</div>
          <div className="sg-resultcontainer">
            <div className="sg-tags">
              <div className="sg-tag1">Subject</div>
              <div className="sg-tag2">Topic</div>
              <div className="sg-tag3">Lecturer</div>
              <div className="sg-tag4">Marks</div>
              <div className="sg-tag5">Grades</div>
            </div>
            <div className="sg-result">
              {grades.length > 0 ? (
              grades.map((grade, index) => (
                <div key={index} className="sg-results">
                  <div className="sg-result1">{grade.subject_name}</div>
                  <div className="sg-result2">{grade.question_sets_name}</div>
                  <div className="sg-result3">{grade.lecturer_name}</div>
                  <div className="sg-result4">
                    <div className='sg-aqcuiredmarks'>{grade.score}</div>
                    <div>/</div>
                    <div className='sg-totalmarks'>
                    {grade.type === 'Multiple Question' ? grade.total_questions : grade.total_mark}</div>
                  </div>
                  <div className="sg-result5">
                    <div className='sg-grade'>{grade.grade.toFixed(0)}</div>
                    <div>%</div>
                  </div>
                  <div className="sg-viewbutton">
                    <Link to={

                      grade.type === 'Multiple Question'
                      ? `/Student/Grades/Review_MCQ_Marks/${grade.qs_id}`
                      : `/Student/Grades/Review_Written_Marks/${grade.qs_id}`
                      }>
                        <SiQuicklook className='hahaah'/>
                    </Link>
                  </div>
                </div>
              ))
              ) : (<p>No grades Found</p>)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
