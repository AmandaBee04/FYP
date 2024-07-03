import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Mainpage from './Pages/Mainpage';
import Login from './Pages/Login';

// Admin Imports
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

// Student Imports
import StudentNavbarLayout from './Components/Student/StudentNavbarLayout';
import StudentDashboard from './Pages/Student/StudentDashboard';
import StudentProfile from './Pages/Student/StudentProfile';
import StudentQuizzes from './Pages/Student/StudentQuizzes';
import StudentStartQuiz from './Pages/Student/StudentStartQuiz';
import StudentQuiz from './Pages/Student/StudentQuiz';
import StudentGrades from './Pages/Student/StudentGrades';
import StudentQuizReview from './Pages/Student/StudentQuizReview';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Mainpage />} />
          <Route path="/Login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/Admin" element={<AdminNavbarLayout />}>
            <Route index element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={<AdminDashboard />} />
            <Route path="Lecturer" element={<AdminLecturer />} />
            <Route path="Student" element={<AdminStudent />} />
            <Route path="Subject" element={<AdminSubject />} />
            <Route path="Request" element={<AdminRequest />} />
            <Route path="Profile" element={<AdminProfile />} />
            <Route path="Subject/Add_Subject" element={<AdminAddSubject />} />
            <Route path="Lecturer/Add_Lecturer" element={<AdminAddLecturer />} />
            <Route path="Student/Add_Student" element={<AdminAddStudent />} />
            <Route path="Lecturer/Edit_Lecturer" element={<AdminEditLecturer />} />
            <Route path="Student/Edit_Student" element={<AdminEditStudent />} />
            <Route path="Subject/Edit_Subject" element={<AdminEditSubject />} />
          </Route>

          {/* Lecturer Routes */}
          <Route path="/Lecturer" element={<LecturerNavbarLayout />}>
            <Route index element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={<LecturerDashboard />} />
            <Route path="Quizzes" element={<LecturerQuizzes />} />
            <Route path="Quiz_Creation" element={<LecturerCreateQuiz />} />
            <Route path="Quiz_Bank" element={<LecturerQuizBank />} />
            <Route path="Requests" element={<LecturerRequests />} />
            <Route path="Profile" element={<LecturerProfile />} />
            <Route path="Subject_Request" element={<LecturerSubjectRequest />} />
            <Route path="Subject_Details" element={<LecturerSubjectDetails />} />
            <Route path="Subject_Details/Add_Students" element={<LecturerAddStudents />} />
            <Route path="Quiz_Creation/Written_Question" element={<LecturerWrittenQuestion />} />
            <Route path="Student_Grades" element={<LecturerStudentGrades/>} />
            <Route path="Quiz_Creation/Multiple_Choice_Question" element={<LecturerMCQuestion/>} />
            <Route path="Quiz_Bank/View_Written_Question_Set" element={<LecturerViewWrittenQuestionSet />} />
            <Route path="Quiz_Bank/View_MCQ_Question_Set" element={<LecturerViewMCQuestionSet/>} />
            <Route path="Quizzes/Unmarked_Quiz_Student" element={<LecturerUnmarkedStudents/>} />
            <Route path="Quizzes/Unmarked_Quiz_Student/Mark" element={<LecturerMarking/>} />
          </Route>

          {/* Student Routes */}
          <Route path="/Student" element={<StudentNavbarLayout />}>
            <Route index element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={<StudentDashboard />} />
            <Route path="Dashboard/Start_Quiz" element={<StudentStartQuiz />} />
            <Route path="Quizzes" element={<StudentQuizzes />} />
            <Route path="Quizzes/Start_Quiz" element={<StudentStartQuiz />} />
            <Route path="Grades" element={<StudentGrades />} />
            <Route path="Profile" element={<StudentProfile />} />
            <Route path="Grades/Review_Marks" element={<StudentQuizReview />} />
            <Route path="Quizzes/Start_Quiz/Quiz" element={<StudentQuiz/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
