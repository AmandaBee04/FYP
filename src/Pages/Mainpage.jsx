import React from "react";
import { Link } from "react-router-dom";
import GirlPic from '../assets/GirlPic.png'
import MainpageNavbar from "../Components/MainpageNavbar";
import '../Css/Mainpage.css'


export default function Mainpage() {
    return(
        <>
        <div className="mp-holder">
            <MainpageNavbar />
            <div className="mp-container">
                <div className="mp-mid">
                    <div>
                        <div className="mp-word1">
                            Create a quiz in minutes, <br /> Not over the weekend.
                        </div>
                        <div className="mp-word2">
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
                    <div className="mp-girlpic">
                        <img src={GirlPic} className="girl" />
                    </div>
                </div>
                <div className="mp-bot">
                    <div className="mp-footerwords1">Loved across 20+ Countries</div>
                    <div className="mp-footerwords2">Trusted by teachers in <span>90% of Malaysian schools</span></div>
                </div>
            </div>
        </div>
        </>
    )
}