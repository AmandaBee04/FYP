import React from "react";
import { Link } from "react-router-dom";
import { BsBellFill } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa";
import '../../Css/Admin/AdminNavbar.css';

export default function AdminNavbar() {
    return (
        <>
        <div className="a-navbar">
            <div className="a-leftside">
                <div>
                    <Link to="/Admin/Dashboard"><span className="a-Logo">Quiztopia</span></Link>
                </div>
                <div className="a-linkers"> 
                    <Link to="/Admin/Lecturer">Lecturers</Link>
                </div>
                <div className="a-linkers">
                    <Link to="/Admin/Student">Students</Link>
                </div>
                <div className="a-linkers">
                    <Link to="/Admin/Subject">Subjects</Link>
                </div>
            </div>
           
           <div className="a-space" />
            
            <div className="a-rightside">
                <Link to="/Admin/Request">
                   <BsBellFill id="img"/>
                </Link> 
                
                <Link to="/Admin/Profile">
                    <FaUserSecret id="img"/>
                </Link>
            </div>
        </div>


        </>
    );
}
