import React from "react";
import { Link } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import '../../Css/Student/StudentNavbar.css';

export default function StudentNavbar() {
    return (
        <div className="s-navbar">
            <div className="s-leftside">
                <div>
                    <Link to="/Student/Dashboard"><span className="s-Logo">Quiztopia</span></Link>
                </div>
                <div className="s-linkers">
                    <Link to="/Student/Quizzes">Quizzes</Link>
                </div>
                <div className="s-linkers">
                    <Link to="/Student/Grades">Grades</Link>
                </div>
            </div>
           
           <div className="s-space" />
            
            <div className="s-rightside">
                <Link to="/Student/Profile"><FaUserGraduate className="NavbarStuIcon" alt="Student Profile"/></Link>
            </div>
        </div>
    );
}
