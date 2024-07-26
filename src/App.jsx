import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Mainpage from './Pages/Mainpage';
import LoginForm from './Components/LoginForm';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';

import AdminNavbarLayout from './Components/Admin/AdminNavbarLayout';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminLecturer from './Pages/Admin/AdminLecturer';
import AdminStudent from './Pages/Admin/AdminStudent';
import AdminSubject from './Pages/Admin/AdminSubjects';
import AdminRequest from './Pages/Admin/AdminRequests';
import AdminProfile from './Pages/Admin/AdminProfile';
import AdminAddSubject from './Pages/Admin/AdminAddSubject';
import AdminAddLecturer from './Pages/Admin/AdminAddLecturer';
import AdminAddStudent from './Pages/Admin/AdminAddStudent';
import AdminEditLecturer from './Pages/Admin/AdminEditLecturer';
import AdminEditStudent from './Pages/Admin/AdminEditStudent';
import AdminEditSubject from './Pages/Admin/AdminEditSubject';

// Lecturer Imports
import LecturerNavbarLayout from './Components/Lecturer/LecturerNavbarLayout';
import LecturerDashboard from './Pages/Lecturer/LecturerDashboard';
import LecturerQuizzes from './Pages/Lecturer/LecturerQuizzes';
import LecturerCreateQuiz from './Pages/Lecturer/LecturerCreateQuiz';
import LecturerQuizBank from './Pages/Lecturer/LecturerQuizBank';
import LecturerRequests from './Pages/Lecturer/LecturerRequests';
import LecturerProfile from './Pages/Lecturer/LecturerProfile';
import LecturerSubjectRequest from './Pages/Lecturer/LecturerSubjectRequest';
import LecturerSubjectDetails from './Pages/Lecturer/LecturerSubjectDetails';
import LecturerAddStudents from './Pages/Lecturer/LecturerAddStudents';
import LecturerWrittenQuestion from './Pages/Lecturer/LecturerWrittenQuestion';
import LecturerStudentGrades from './Pages/Lecturer/LecturerStudentGrades';
import LecturerMCQuestion from './Pages/Lecturer/LecturerMCQuestion';
import LecturerViewWrittenQuestionSet from './Pages/Lecturer/LecturerViewWrittenQuestionSet';
import LecturerViewMCQuestionSet from './Pages/Lecturer/LecturerViewMCQuestionSet';
import LecturerUnmarkedStudents from './Pages/Lecturer/LecturerUnmarkedStudents';
import LecturerMarking from './Pages/Lecturer/LecturerMarking';
import LecturerViewMCQGrade from './Pages/Lecturer/LecturerViewMCQGrade';
import LecturerViewWrittenGrade from './Pages/Lecturer/LecturerViewWrittenGrade';

// Student Imports
import StudentNavbarLayout from './Components/Student/StudentNavbarLayout';
import StudentDashboard from './Pages/Student/StudentDashboard';
import StudentProfile from './Pages/Student/StudentProfile';
import StudentQuizzes from './Pages/Student/StudentQuizzes';
import StudentStartQuiz from './Pages/Student/StudentStartQuiz';
import StudentMCQQuiz from './Pages/Student/StudentMCQQuiz';
import StudentWrittenQuiz from './Pages/Student/StudentWrittenQuiz';
import StudentGrades from './Pages/Student/StudentGrades';
import StudentMCQQuizReview from './Pages/Student/StudentMCQQuizReview';
import StudentWrittenQuizReview from './Pages/Student/StudentWrittenQuizReview';
import StudentSubjectDetails from './Pages/Student/StudentSubjectDetails';
// import StudentQuizSummary from './Pages/Student/StudentQuizSummary';
import StudentMCQQuizSummary from './Pages/Student/StudentMCQQuizSummary';
import StudentWrittenQuizSummary from './Pages/Student/StudentWrittenQuizSummary';

const App = () => {

  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt');
    const storedRole = localStorage.getItem('role');
    const storedId = localStorage.getItem('id'); // Change to 'id'
    console.log(`Retrieved from localStorage - Token: ${storedToken}, Role: ${storedRole}, Id: ${storedId}`);
    
    if (storedToken && storedRole && storedId) {
      setToken(storedToken);
      setRole(storedRole);
      setId(storedId);
    }
  }, []);

  useEffect(() => {
    console.log(`Token: ${token}, Role: ${role}, Id: ${id}`);
  }, [token, role, id]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('id'); // Change to 'id'
    localStorage.removeItem('exp');
    setToken(null);
    setRole(null);
    setId(null);
  };

  
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={token ? <Navigate to={`/${role}`} replace /> : <Mainpage />} />
          <Route path="/Login"  element={token ? <Navigate to={`/${role}`} replace /> : <LoginForm setToken={setToken} setRole={setRole} setId={setId} />} />
          <Route path="/Login/Forgot_Password" element={<ForgotPassword />} />
          <Route path="/Login/Reset_Password" element={<ResetPassword />} />

          {/* Admin Routes */}
          <Route path="/Admin" element={token && role === 'Admin' ? <AdminNavbarLayout token={token} onLogout={handleLogout} userId={id} /> : <Navigate to="/Login" replace />}>
             <Route index element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={<AdminDashboard />} />
            <Route path="Lecturer" element={<AdminLecturer />} />
            <Route path="Student" element={<AdminStudent />} />
            <Route path="Subject" element={<AdminSubject />} />
            <Route path="Request" element={<AdminRequest />} />
            <Route path="Profile" element={token && role === 'Admin' ? <AdminProfile token={token} onLogout={handleLogout} userId={id} role={role}/> : <Navigate to="/Login" replace />} />
            <Route path="Subject/Add_Subject" element={<AdminAddSubject />} />
            <Route path="Lecturer/Add_Lecturer" element={<AdminAddLecturer />} />
            <Route path="Student/Add_Student" element={<AdminAddStudent />} />
            <Route path="Lecturer/Edit_Lecturer/:id" element={<AdminEditLecturer />} />
            <Route path="Student/Edit_Student/:id" element={<AdminEditStudent />} />
            <Route path="Subject/Edit_Subject/:id" element={<AdminEditSubject />} />
          </Route>

          {/* Lecturer Routes */}
          <Route path="/Lecturer" element={token && role === 'Lecturer' ? <LecturerNavbarLayout token={token} onLogout={handleLogout} userId={id} /> : <Navigate to="/Login" replace />}>
          <Route index element={<Navigate to="Dashboard" />} />
          <Route path="Dashboard" element={<LecturerDashboard />} />
            <Route path="Quizzes" element={<LecturerQuizzes />} />
            <Route path="Quiz_Creation" element={<LecturerCreateQuiz />} />
            <Route path="Quiz_Bank" element={<LecturerQuizBank />} />
            <Route path="Requests" element={<LecturerRequests />} />
            <Route path="Profile" element={token && role === 'Lecturer' ? <LecturerProfile token={token} onLogout={handleLogout} userId={id} role={role}/> : <Navigate to="/Login" replace />} />
            <Route path="Subject_Request" element={<LecturerSubjectRequest />} />
            <Route path="Subject_Details/:sub_id" element={<LecturerSubjectDetails />} />
            <Route path="Subject_Details/Add_Students/:sub_id" element={<LecturerAddStudents />} />
            <Route path="Quiz_Creation/Written_Question/:quizId" element={<LecturerWrittenQuestion />} />
            <Route path="Student_Grades/:id" element={<LecturerStudentGrades/>} />
            <Route path="Student_Grades/:id/MCQ/:stud_id" element={<LecturerViewMCQGrade/>} />
            <Route path="Student_Grades/:id/Written/:stud_id" element={<LecturerViewWrittenGrade/>} />
            <Route path="Quiz_Creation/Multiple_Choice_Question/:quizId" element={<LecturerMCQuestion/>} />
            <Route path="Quiz_Bank/View_Written_Question_Set/:quizId" element={<LecturerViewWrittenQuestionSet />} />
            <Route path="Quiz_Bank/View_MCQ_Question_Set/:quizId" element={<LecturerViewMCQuestionSet/>} />
            <Route path="Quizzes/Unmarked_Quiz_Student/:id" element={<LecturerUnmarkedStudents/>} />
            <Route path="Quizzes/Unmarked_Quiz_Student/:stud_id/Mark/:id" element={<LecturerMarking/>} />
          </Route>

          {/* Student Routes */}
          <Route path="/Student" element={token && role === 'Student' ? <StudentNavbarLayout token={token} onLogout={handleLogout} userId={id}/> : <Navigate to="/Login" replace />}>
          <Route index element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={<StudentDashboard />} />
            <Route path="Dashboard/Start_Quiz/:id" element={<StudentStartQuiz token={token} saveToDatabase={true} />} />
            <Route path="Quizzes" element={<StudentQuizzes />} />
            <Route path="Quizzes/Start_Quiz/:id" element={<StudentStartQuiz token={token} saveToDatabase={false} />} />
            <Route path="Grades" element={<StudentGrades />} />
            <Route path="Profile" element={token && role === 'Student' ? <StudentProfile token={token} onLogout={handleLogout} userId={id}/> : <Navigate to="/Login" replace />} />
            <Route path="Grades/Review_MCQ_Marks/:id" element={<StudentMCQQuizReview />} />
            <Route path="Grades/Review_Written_Marks/:id" element={<StudentWrittenQuizReview/>} />

            {/* <Route path="Quizzes/Start_Quiz/MCQ_Quiz/:id" element={<StudentMCQQuiz/>} /> */}
            <Route path="Dashboard/Start_Quiz/MCQ_Quiz/:id" element={<StudentMCQQuiz token={token} saveToDatabase={true} />} />
            <Route path="Quizzes/Start_Quiz/MCQ_Quiz/:id" element={<StudentMCQQuiz token={token} saveToDatabase={false} />} />

            <Route path="Quizzes/Start_Quiz/Written_Quiz/:id" element={<StudentWrittenQuiz/>} />
            <Route path="Profile/Subject_Details/:sub_id" element={<StudentSubjectDetails/>} />
            <Route path="Quizzes/MCQ/Summary/:id" element={<StudentMCQQuizSummary/>} />
            <Route path="Quizzes/Written/Summary/:id" element={<StudentWrittenQuizSummary/>} />
            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
