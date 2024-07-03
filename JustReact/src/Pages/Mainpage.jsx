import React from "react";
import { Link } from "react-router-dom";
import GirlPic from '../assets/GirlPic.png'
import MainpageNavbar from "../Components/MainpageNavbar";
import '../Css/Mainpage.css'


export default function Mainpage() {
    return(
        <>
        <div className="holder">
            <MainpageNavbar />
            <div className="container">
                <div className="mid">
                    <div>
                        <div className="word1">
                            Create a quiz in minutes, <br /> Not over the weekend.
                        </div>
                        <div className="word2">
                            Create interactive quizzes designed to be enjoyable and dynamic,
                            <br /> no matter if you want to test your colleague’s knowledge, <br />{" "}
                            run a fun quiz with your friends, or help students study.
                        </div>
                        <div>
                            <Link to="/Login">
                                <button type="submit" value="Submit" className="btn">
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="girlpic">
                        <img src={GirlPic} className="girl" />
                    </div>
                </div>
                <div className="bot">
                    <div className="footerwords1">Loved across 20+ Countries</div>
                    <div className="footerwords2">Trusted by teachers in <span>90% of Malaysian schools</span></div>
                </div>
            </div>
        </div>
        </>
    )
}