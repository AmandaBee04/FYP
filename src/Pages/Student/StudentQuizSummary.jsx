import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentQuizSummary = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [grade, setGrade] = useState(null);
  const [error, setError] = useState('');
  const [gradeAlreadySaved, setGradeAlreadySaved] = useState(false);

  const location = useLocation();
  const { tempAnswers, questionsLength } = location.state || {};

  useEffect(() => {
    let isMounted = true; // add this line

    const fetchGrade = async () => {
      try {
        if (tempAnswers) {
          // Calculate grade based on temporary answers
          const score = tempAnswers.reduce((acc, ans) => acc + ans.marks, 0);
          const gradeValue = ((score / questionsLength) * 100);
          setGrade({ score, grade: gradeValue });

        } else {
          // Fetch grade from the database
          const res = await axios.get(`http://127.0.0.1:8000/api/student/${localStorage.getItem('id')}/quiz/${id}/grade`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.status === 200 && isMounted) { // modify this line
            const { score, total_mark } = res.data;
            const gradeValue = ((total_mark / questionsLength) * score) / total_mark * 100;
            setGrade({ score, grade: gradeValue });

            if (!gradeAlreadySaved) {
              await saveGradeToDatabase(gradeValue, score);
              setGradeAlreadySaved(true);
            }
          } 
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching grade');
      }
    };
    
    fetchGrade();

    return () => { isMounted = false }; // add this line
  }, [id, token]);

  const saveGradeToDatabase = async (gradeValue, score) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/grades', {
        grade: gradeValue,
        score: score,
        stud_id: localStorage.getItem('id'),
        qs_id: id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log('Grade saved successfully');
    } catch (err) {
      console.error('Error saving grade:', err);
      setError('An error occurred while saving your grade');
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!grade) {
    return <p><div class="sd-loader"></div></p>;
  }

  return (
    <div>
      <h1>Your Grade</h1>
      <p>Score: {grade.score} / {questionsLength}</p>
      <p>Grade: {grade.grade.toFixed(2)}%</p>
    </div>
  );
};

export default StudentQuizSummary;