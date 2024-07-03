import React from 'react'
import LoginForm from '../Components/LoginForm'
import { Outlet } from 'react-router-dom'
import '../Css/Login.css'

export default function Login() {
  return (
    <>
      <div className='Loginholder'>
        <LoginForm/>
        <main>
          <Outlet/>
        </main>
      </div>
    </>
  )
}
