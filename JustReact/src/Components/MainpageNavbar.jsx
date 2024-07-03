import React from "react";
import { Link } from "react-router-dom";
import Fox from '../assets/Fox.png';
import { BsInfoCircle } from "react-icons/bs";
import '../Css/MainpageNavbar.css';

export default function MainpageNavbar() {
    return (
            <div className="bigC">
                <div className="navbar">
                    <div className="leftside">
                        <img src={Fox} alt="Fox Logo" />
                        <div>
                            <span className="mp-Logo">Quiztopia</span>
                        </div>
                    </div>
                    <div className="space" />
                    <div className="rightside">
                        <Link to="/Help"><BsInfoCircle id="Info_Icon"/></Link>
                        <div className="navbarbtn">
                            <Link to="/Login"><input type="submit" value={'Login'} /></Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}
