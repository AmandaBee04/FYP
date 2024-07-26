import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { SiQuicklook } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails';
import '../../Css/Lecturer/LecturerStudentGrades.css';

// Utility function to convert JSON data to CSV format
const convertToCSV = (data, questionCount, quizDetails) => {
    // Prepare the header
    const header = ['Student ID', 'Name', 'Programme', 'Faculty', 'Score', 'Grade'];

    // Prepare the quiz details row
    const quesCount = questionCount;
    const quizType = quizDetails.type;

    console.log(questionCount);
    console.log(quizType);
    // Prepare the student grades rows
    const rows = data.map(grade => [
        grade.id,
        grade.stud_name,
        grade.programme,
        grade.faculty,
        `'${grade.score} / ${quizType === 'Multiple Question' ? quesCount : grade.total_mark}`,
        `${grade.grade}%`,
    ]);

    // Combine everything
    let csvContent = "data:text/csv;charset=utf-8,"
        + [header.join(","), ...rows.map(row => row.join(","))].join("\n");

    return csvContent;
};

export default function LecturerStudentGrades() {
    const { id } = useParams(); // Get qs_id from URL
    const [quizDetails, setQuizDetails] = useState(null);
    const [studentGrades, setStudentGrades] = useState([]);
    const [questionCount, setQuestionCount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuizDetails = async () => {
            try {
                const resQuizDetails = await axios.get(`http://127.0.0.1:8000/api/question_set/${id}`);
                console.log('Response from backend for quiz details:', resQuizDetails.data);

                if (resQuizDetails.status === 200) {
                    
                    setQuizDetails(resQuizDetails.data);
                } else {
                    console.error('Failed to fetch quiz details');
                }
            } catch (error) {
                console.error('An error occurred while fetching quiz details:', error);
            }
        };

        const fetchStudentGrades = async () => {
            try {
                const resGrades = await axios.get(`http://127.0.0.1:8000/api/lecturer/${id}/getStudentMarkedResult`);
                if (resGrades.status === 200) {
                    console.log(resGrades.data);
                    setStudentGrades(resGrades.data);
                } else {
                    console.error('Failed to fetch student grades');
                }
            } catch (error) {
                console.error('An error occurred while fetching student grades:', error);
                setError('Failed to fetch student grades');
            }
        };

        const fetchQuestionCount = async () => {
            try {
                const resQuestionCount = await axios.get(`http://127.0.0.1:8000/api/question_set/${id}/question_count`);
                if (resQuestionCount.status === 200) {
                    setQuestionCount(resQuestionCount.data.question_count);
                } else {
                    console.error('Failed to fetch question count');
                }
            } catch (error) {
                console.error('An error occurred while fetching question count:', error);
            }
        };

        fetchQuizDetails();
        fetchStudentGrades();
        fetchQuestionCount();
    }, [id]);

    const handleDelete = async (stud_id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/lecturer/${id}/deleteStudentGrade/${stud_id}`);
            if (response.status === 200) {
                setStudentGrades(studentGrades.filter(grade => grade.id !== stud_id));
            } else {
                console.error('Failed to delete student grade');
            }
        } catch (error) {
            console.error('An error occurred while deleting student grade:', error);
        }
    };

    const handleExport = () => {
        const csvContent = convertToCSV(studentGrades, questionCount, quizDetails);
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "student_grades.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="lsg-holder">
                <div className="lsg-container">
                    {quizDetails && <LecturerQuizDetails quizDetails={quizDetails} />}
                    <div className="lsg-rightside">
                        <h2>Student Grades</h2>
                        {error && <p className="error">{error}</p>}
                        <div className="lsg-gradescontainer">
                            <div className="lsg-upper-row">
                                <div className="lsg-tag1">Student ID</div>
                                <div className="lsg-tag2">Name</div>
                                <div className="lsg-tag4">Programme</div>
                                <div className="lsg-tag5">Faculty</div>
                                <div className="lsg-tag6">Score</div>
                                <div className="lsg-tag7">
                                    <TiExport onClick={handleExport} />
                                </div>
                            </div>
                            <div className="lsg-lower-row">
                                {studentGrades.map((grade) => (
                                    <div key={grade.id} className="lsg-grades">
                                        <div className="lsg-studentid">{grade.id}</div>
                                        <div className="lsg-studentname">{grade.stud_name}</div>
                                        <div className="lsg-studentprogramme">{grade.programme}</div>
                                        <div className="lsg-studentfaculty">{grade.faculty}</div>
                                        <div className="lsg-studentscore">{grade.score}/{quizDetails.type === 'Multiple Question' ? questionCount : grade.total_mark}</div>
                                        <div className="lsg-view">
                                            <Link 
                                            
                                            to={
                                                quizDetails.type === 'Multiple Question'
                                                ? `MCQ/${grade.id}`
                                                : `Written/${grade.id}`}>
                                                <SiQuicklook className='lsg-view' />
                                            </Link>
                                            
                                        </div>
                                        <div className="lsg-delete" onClick={() => handleDelete(grade.id)}>
                                            <MdDelete />
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
