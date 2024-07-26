import React from 'react'
import '../../Css/Lecturer/LecturerSubjectRequest.css'

export default function LecturerSubjectRequest() {
  return (
    <>
        <div className="lsr-holder">
            <div className="lsr-container">
                <h1>Subject Registration Request</h1>
                <form action="" className='lsr-form'>
                    <div className="lsr-upper">
                        <div className="lsr-upperleft">
                            <div className="lsr-id">
                                Lecturer ID
                            </div>
                            <input type="name" placeholder="Enter Lecturer ID" className='ID-lsr' />
                        </div>
                        <div className="lsr-upperright">
                            <div className="lsr-subject">
                                Subject
                            </div>
                                <input type="name" placeholder='Subject Name'  className='Subject-lsr'/>
                        </div>
                    </div>    
                    <div className="lsr-lower">
                        Message
                        <div>
                            <textarea className='lsr-message' placeholder=''></textarea>
                        </div>
                    </div>
                    <div className="lsr-btn">
                        <button>
                            Submit
                        </button>
                    </div>             
                </form>
            </div>
        </div>
    </>
  )
}
