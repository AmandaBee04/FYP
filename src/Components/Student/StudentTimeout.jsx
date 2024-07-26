import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoSkullSharp } from "react-icons/io5";
import PropTypes from 'prop-types';
import '../../Css/Admin/AdminStudentConfirmDeletion.css';

const StudentTimeout = ({ onClose }) => {

  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <div className={`ascd-popup-overlay ${isVisible ? 'ascd-show-popup' : 'ascd-hide-popup'}`}>
        <div className={`ascd-popup ${isVisible ? 'popup-enter' : 'popup-exit'}`}>

          <h2><IoSkullSharp/>Times Up<IoSkullSharp/></h2>
          <button onClick={onClose}>Proceed to Summary</button>
        </div>
      </div>
    </>
  );
};

StudentTimeout.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default StudentTimeout;