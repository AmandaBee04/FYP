import React from "react";
import { Link } from "react-router-dom";
import { FaUserTie } from "react-icons/fa6";
import '../../Css/Lecturer/LecturerNavbar.css';

export default function LecturerNavbar() {
  return (
    <>
        <div className="l-navbar">
            <div className="l-leftside">
                <div>
                <Link to="/Lecturer/Dashboard"><span className="l-Logo">Quiztopia</span></Link>
                </div>
                <div className="l-linkers">
                    <Link to="/Lecturer/Quizzes">Quizzes</Link>
                </div>
                <div className="l-linkers">
                    <Link to="/Lecturer/Quiz_Bank">Quiz_Bank</Link>
                </div>
                <div className="l-linkers">
                    <Link to="/Lecturer/Requests">Request</Link>
                </div>
            </div>
            <div className="l-space" />
            <div className="l-rightside">
                <Link to="/Lecturer/Profile"><FaUserTie className="NavbarLecIcon" alt="Lecturer Icon" /></Link>
            </div>
        </div>


  </>
  );
}
