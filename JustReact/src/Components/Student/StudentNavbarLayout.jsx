import React from 'react'
import StudentNavbar from './StudentNavbar'
import { Outlet } from 'react-router-dom'

export default function StudentNavbarLayout() {
  return (
    <>
      <StudentNavbar/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}
