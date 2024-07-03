import React from 'react';
import LecturerQuizDetails from '../../Components/Lecturer/LecturerQuizDetails';
import '../../Css/Lecturer/LecturerViewMCQuestionSet.css';

export default function LecturerViewMCQuestionSet() {
  return (
    <>
      <div className="lvmcq-holder">
        <div className="lvmcq-container">
          <LecturerQuizDetails />
          <div className="lvmcq-rightside">
            <div className="lvmcq-questioncontainer">
              <form action="" className="lvmcq-question">
                <div className="lvmcq-questionNo">
                  <div>Question</div>
                  <div className="questionNo">1</div>
                  <label className="questionName" > Sakedik</label>
                </div>
                <div className="lvmcq-answers">
                  <div className="lvmcq-answerdiv">
                    <div className="Checkbox">
                      <label className="lvmcq-answers-container">
                        <input type="checkbox" className="CheckboxAnswer1" disabled/>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="Answer">
                      <label className="TextAnswer1"  >AFsdfsdfd</label> 
                    </div>
                  </div>
                  <div className="lvmcq-answerdiv">
                    <div className="Checkbox">
                      <label className="lvmcq-answers-container">
                        <input type="checkbox" className="CheckboxAnswer2" disabled/>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="Answer">
                      <label className="TextAnswer2"  >AFsdfsdfd</label>
                    </div>
                  </div>
                  <div className="lvmcq-answerdiv">
                    <div className="Checkbox">
                      <label className="lvmcq-answers-container">
                        <input type="checkbox" className="CheckboxAnswer3" disabled/>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="Answer">
                      <label type="name" className="TextAnswer3" >AFsdfsdfd</label>
                    </div>
                  </div>
                  <div className="lvmcq-answerdiv">
                    <div className="Checkbox">
                      <label className="lvmcq-answers-container">
                        <input type="checkbox" className="CheckboxAnswer4" disabled/>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="Answer">
                      <label type="name" className="TextAnswer4" >AFsdfsdfd</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
