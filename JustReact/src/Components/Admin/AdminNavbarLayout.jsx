import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'

export default function AdminNavbarLayout() {
  return (
    <>
        <AdminNavbar/>
        <main>
            <Outlet/>
        </main>
    </>
  )
}
