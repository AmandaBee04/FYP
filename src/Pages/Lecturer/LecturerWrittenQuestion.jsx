import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import '../../Css/Lecturer/LecturerWrittenQuestion.css';
import LecturerEditQuizDetails from '../../Components/Lecturer/LecturerEditQuizDetails';
import LecturerQuizSave from '../../Components/Lecturer/LecturerQuizSave';

export default function LecturerMCQuestion() {
    const { quizId } = useParams(); // Get qs_id from URL
    const [questions, setQuestions] = useState([]);
    const [quizDetails, setQuizDetails] = useState(null);
    const [questionsToDelete, setQuestionsToDelete] = useState([]);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

    const handleCloseConfirmPopup = () => {
      setShowConfirmPopup(false); 
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const resQuizDetails = await axios.get(`http://127.0.0.1:8000/api/question_set/${quizId}`);
                const resQuestions = await axios.get(`http://127.0.0.1:8000/api/question_set/${quizId}/question/getQuestion`);

                if (resQuizDetails.status === 200) {
                    setQuizDetails(resQuizDetails.data);
                } else {
                    console.error('Failed to fetch quiz details');
                }

                if (resQuestions.status === 200) {
                    setQuestions(resQuestions.data[0] || []);
                } else {
                    console.error('Failed to fetch questions');
                }
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        };

        fetchQuestions();
    }, [quizId]);

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        const newQuestion = {
            id: `new-${Date.now()}`,  // Unique id for new question
            question: '',
            marks: '',
            picture: null,
            correct_ans: '',
            ans_a: '',
            ans_b: '',
            ans_c: '',
            ans_d: '',
            feedback: '',
            qs_id: quizId
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleDeleteQuestion = (index) => {
        const question = questions[index];
        if (question.id !== `new-${question.id}`) {
            setQuestionsToDelete([...questionsToDelete, question.id]);
        }
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSaveAll = async () => {
        try {
            // Update quiz details
            const resQuizDetails = await axios.put(`http://127.0.0.1:8000/api/lecturer/${quizDetails.id}/question_set/updateQS`, quizDetails);
            if (resQuizDetails.status === 201) {
                console.log('Quiz details updated successfully');
            } else {
                console.error('Failed to update quiz details');
            }

            // Update questions
            const resQuestions = await axios.put(`http://127.0.0.1:8000/api/question/updateQues`, { questions });
            if (resQuestions.status === 200) {
                console.log('Questions updated successfully');
                setShowConfirmPopup(true); 
            } else {
                console.error('Failed to update questions');
            }

            // Delete marked questions
            const resDeleteQuestions = await axios.delete(`http://127.0.0.1:8000/api/deleteQues/delete`, { data: { questionsToDelete } });
            if (resDeleteQuestions.status === 200) {
                console.log('Questions deleted successfully');
            } else {
                console.error('Failed to delete questions');
            }
        } catch (error) {
            console.error('An error occurred while saving:', error);
        }
    };

    return (
        <>
            <div className="lwq-holder">
                <div className="lwq-container">
                    {quizDetails && <LecturerEditQuizDetails quizDetails={quizDetails} setQuizDetails={setQuizDetails} />}

                    <div className="lwq-rightside">
                        <div className="lwq-questioncontainer">
                            {questions.length === 0 ? (
                                <div>No questions yet</div>
                            ) : (
                                questions.map((question, index) => (
                                    <form key={question.id} className="lwq-question">
                                        <div className="lwq-questionNo">
                                            <div>Question</div>
                                            <div className="questionNo">{index + 1}</div>
                                            <MdDelete
                                                className='lwq-deletebtn'
                                                onClick={() => handleDeleteQuestion(index)}
                                            />
                                        </div>
                                        <div className="lwq-questiontext">
                                            <textarea
                                                className="questionName"
                                                placeholder="Question.."
                                                value={question.question}
                                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                            />
                                        </div>
                                        <div className="lwq-questionmarks">
                                            <div>Marks : </div>
                                            <input
                                                type="Number"
                                                placeholder='..Enter Marks..'
                                                value={question.marks}
                                                onChange={(e) => handleQuestionChange(index, 'marks', e.target.value)}
                                            />
                                        </div>
                                    </form>
                                ))
                            )}
                        </div>
                        <div className="lwq-lower">
                            <button onClick={handleAddQuestion}>Add Question</button>
                            <button onClick={handleSaveAll}>Save All</button>
                        </div>
                    </div>
                </div>
            </div>
            {showConfirmPopup && <LecturerQuizSave onClose={handleCloseConfirmPopup} />}
        </>
    );
}
