import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Css/Lecturer/LecturerCreateQuiz.css';

export default function LecturerCreateQuiz() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    sub_id: '',
    qs_name: '',
    type: '',
    time: '',
    due_date: '',
    assign: false,
    total_mark: '',
    lec_id: localStorage.getItem('id'), // Add lecturer ID here if available in context or state
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/subject');
        if (res.status === 200) {
          setSubjects(res.data);
        } else {
          console.error('Failed to fetch subjects');
        }
      } catch (error) {
        console.error('An error occurred while fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/question_set/addQS', formData);
      const quizId = response.data.id;
      console.log('Question set added successfully:', response.data);
      console.log(response.data.id);

      if (formData.type === 'Written') {
        navigate(`/Lecturer/Quiz_Creation/Written_Question/${quizId}`);
      } else if (formData.type === 'Multiple Question') {
        navigate(`/Lecturer/Quiz_Creation/Multiple_Choice_Question/${quizId}`);
      }

    } catch (error) {
      console.error('Error adding question set:', error);
    }
  };

  return (
    <>
      <div className="lcq-holder">
        <div className="lcq-container">
          <div className="lcq-header">
            <h1>Quiz Creation</h1>
          </div>
          <div className="lcq-form">
            <form onSubmit={handleSubmit}>
              <div className="lcr-inner">
                <div className="lcq-leftside">
                  <div className="lcq-Ques">
                    <div><label htmlFor="sub_id">Subject :</label></div>
                    <div className='Options'>
                      
                        <select 
                name="sub_id" 
                className='ads-i-SubjectCode'
                value={formData.sub_id}
                onChange={handleChange}
              >
                <option value="" default>Select Subject Code</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.id} - {subject.name}
                  </option>
                ))}
              </select>
                        {/* Add more options as needed */}
                      
                    </div>
                  </div>
                  <div className="lcq-Ques">
                    <div><label htmlFor="qs_name">Name :</label></div>
                    <div><input type="name" name="qs_name" placeholder='Enter Your Topic Name...' className='input' value={formData.qs_name} onChange={handleChange} /></div>
                  </div>
                  <div className="lcq-Ques">
                    <div><label htmlFor="type">Type of Quiz :</label></div>
                    <div>
                      <select name="type" value={formData.type} onChange={handleChange}>
                      <option value="" default>Select Quiz Type</option>
                        <option value="Multiple Question" default>Multiple Choice Quiz</option>
                        <option value="Written">Written Quiz</option>
                      </select>
                    </div>
                  </div>
                  <div className="lcq-Ques2">
                    <div><label htmlFor="assign" className='assigninput'>Assign :</label></div>
                    <div><input type="checkbox" name="assign" className='assigninput' checked={formData.assign} onChange={handleChange} /></div>
                  </div> 
                  <div className="confirmbtn">
                    <button type="submit">
                      Confirm  
                    </button>  
                  </div>              
                </div>
                <div className="lcq-rightside">
                  <div className="lcq-Ques">
                    <div><label htmlFor="Time">Time (Minutes) :</label></div>
                    <div><input type="number" name="time" placeholder='Enter Alloted Time...' max={60} className='input' min={0} value={formData.time} onChange={handleChange} /></div>
                  </div>
                  <div className="lcq-Ques">
                    <div><label htmlFor="name">Total Marks :</label></div>
                    <div><input type="number" name="total_mark" placeholder='Enter Total Marks...' max={100} className='input' min={0} value={formData.total_mark} onChange={handleChange} /></div>
                  </div>
                  {formData.assign && (
                    <div className="lcq-Ques">
                      <div><label htmlFor="due_date">Due Date :</label></div>
                      <div><input type="date" name="due_date" className='input' value={formData.due_date} onChange={handleChange} /></div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 