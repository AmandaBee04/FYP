import React from 'react'
import { Outlet } from 'react-router-dom'
import LecturerNavbar from './LecturerNavbar'

export default function LecturerNavbarLayout() {
  return (
    <>
        <LecturerNavbar />
        <main>
            <Outlet/>
        </main>
    </>
  )
}
