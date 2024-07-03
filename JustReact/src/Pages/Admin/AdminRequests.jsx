import React from 'react'
import '../../Css/Admin/AdminRequests.css'
import { FaUserCircle } from "react-icons/fa";

export default function AdminRequests() {
  return (
    <>
      <div className="ar-holder">
        <div className="ar-leftside">
          <div className="ar-header">
            <h2>Requests</h2>
          </div>
          <div className="requestslider">


            <div className="ar-requests">
              <div className="ar-requests-left"/>
              <div className="ar-requests-middle">
                <div className="ar-requestName">
                  Ben Dover
                </div>
                <div className="ar-requestsubject">
                  Request to add subject
                </div>
              </div>
              <div className="ar-requests-right">
                12/28/24
              </div>
            </div>

            <div className="ar-requests">
              <div className="ar-requests-left"/>
              <div className="ar-requests-middle">
                <div className="ar-requestName">
                  Ben Dover
                </div>
                <div className="ar-requestsubject">
                  Request to add subject
                </div>
              </div>
              <div className="ar-requests-right">
                12/28/24
              </div>
            </div>


    


          </div>
        </div>


        <div className="ar-rightside">
          <div className="ar-rightside-top">
            <FaUserCircle className='Profile'/>
            <div className="ar-rightside-top-text">
              Ben Dover
            </div>
            <div className="ar-rightside-top-lecID">
              <div><b>Lecturer ID : </b></div> <div className="ar-LecID">12345324342</div>
            </div>
          </div>

          <hr />

          <div className="ar-rightside-bottom">
            <div className="ar-rightside-bottom-text">
              <div className="ar-subject">
                <b>Subject :</b>
              </div>
              <div className="ar-subjecttext">
                Request New Subject
              </div>
            </div>

            <div className="ar-rightside-lowest">
              <div className="ar-message">
                Message
              </div>
              <div className="ar-textbox">
                I am writing to request the addition of a new subject, specifically an DIT5551 e-commerce course, to our platform's curriculum. As a lecturer specializing in business and technology, I believe that e-commerce has become an essential area of study in today's digital economy. This course would cover fundamental concepts such as online business models, digital marketing strategies, payment systems, and e-commerce platforms. It would equip our students with practical skills and knowledge that are highly relevant to contemporary business environments. I am confident that offering this course will enhance our platform's academic offerings and better prepare our students for success in their careers.
              </div>
            </div>
          </div>

        </div>


      </div>
    </>
  )
}
