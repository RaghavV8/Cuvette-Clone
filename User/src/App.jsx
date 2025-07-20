import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import './index.css'
import LoginStudents from './Components/LoginStudents'
import LoginCompany from './Components/LoginCompany'
import Navbar from './Components/Navbar'
import RegisterStudents from './Components/RegisterStudents'
import RegisterCompany from './Components/RegisterCompany'
import StudentsHome from './Components/StudentsHome'
import CompanyHome from './Components/CompanyHome'
import OtherJobs from './Components/OtherJobs'
import AppliedJobs from './Components/AppliedJobs'
import HomePage from './Components/HomePage'
import CompanyApplicants from './Components/CompanyApplicants'
import CreateJob from './Components/CreateJob'
import EditJob from './Components/EditJob'

function App() {
// const router = createBrowserRouter([
//   {
//     path:"/students/login",
//     element: <><LoginStudents/></>
//   },
//   {
//     path:"/company/login",
//     element: <><LoginCompany/></>
//   },
//   {
//     path:"/students/register",
//     element: <><RegisterStudents/></>
//   },
//   {
//     path:"/company/register",
//     element: <><RegisterCompany/></>
//   },
//   {
//     path:"/company/home",
//     element: <><CompanyHome/></>
//   },
//   {
//     path:"/students/home",
//     element: <><StudentsHome/></>
//   },
// ])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/students/login" element={<LoginStudents />} />
        <Route path="/company/login" element={<LoginCompany />} />
        <Route path="/students/register" element={<RegisterStudents />} />
        <Route path="/company/register" element={<RegisterCompany />} />
        <Route path="/company/home" element={<CompanyHome />} />
        <Route path="/students/home" element={<StudentsHome />} />
        <Route path="/students/home/other-jobs" element={<OtherJobs/>}/>
        <Route path="/students/home/applied" element={<AppliedJobs/>}/>
        <Route path="/company/home/applied" element={<CompanyApplicants/>}/>
        <Route path="/company/home/createjob" element={<CreateJob/>}/>
        <Route path="/company/home/editjob/:jobId" element={<EditJob/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
