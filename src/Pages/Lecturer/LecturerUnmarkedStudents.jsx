import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaMarker } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails';
import '../../Css/Lecturer/LecturerUnmarkedStudents.css'

export default function LecturerUnmarkedStudents() {
    const { id } = useParams(); // Get qs_id from URL
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [quizDetails, setQuizDetails] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/lecturer/${id}/getStudentResult`);
                console.log(response);
                if (response.status === 200) {
                    setStudents(response.data);
                } else {
                    setError('Failed to fetch students');
                }
            } catch (error) {
                console.error('An error occurred while fetching students:', error);
                setError('An error occurred while fetching students');
            }
        };

        const fetchQuizDetails = async () => {
            try {
                const resQuizDetails = await axios.get(`http://127.0.0.1:8000/api/question_set/${id}`);
                if (resQuizDetails.status === 200) {
                    setQuizDetails(resQuizDetails.data);
                } else {
                    console.error('Failed to fetch quiz details');
                }
            } catch (error) {
                console.error('An error occurred while fetching quiz details:', error);
            }
        };

        fetchStudents();
        fetchQuizDetails();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <>
            <div className="lus-holder">
                <div className="lus-container">
                    {quizDetails && <LecturerQuizDetails quizDetails={quizDetails} />}
                    <div className="lus-rightside">
                        <h2>Attempted Students</h2>
                        <div className="lus-gradescontainer">
                            <div className="lus-upper-row">
                                <div className="lus-tag1">Student ID</div>
                                <div className="lus-tag2">Name</div>
                                <div className="lus-tag3">Score</div>
                                <div className="lus-tag4">Grade</div>

                            </div>
                            <div className="lus-lower-row">
                                {students.map((student) => (
                                    <div key={student.id} className="lus-grades">
                                        <div className="lus-studentid">{student.id}</div>
                                        <div className="lus-studentname">{student.stud_name}</div>
                                        <div className="lus-studentemail">{student.score} / {student.total_mark}</div>
                                        <div className="lus-studentprogramme">{student.grade} % </div>
                                        
                                        <div className="lus-studentview">
                                            <Link to={`/Lecturer/Quizzes/Unmarked_Quiz_Student/${student.id}/Mark/${id}`}>
                                                <FaMarker className='markbtn'/>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}