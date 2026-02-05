import { Routes, Route } from "react-router-dom"
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from "../pages/NotFound"
import Unauthorized from "../pages/Unauthorized"
import Dashboard from "../pages/Dashboard"

import StudentDashboard from "../pages/student/StudentDashboard"
import OfficerDashboard from "../pages/officer/OfficerDashboard"
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard"

import RequireAuth from "../auth/RequireAuth"
import RequireRole from "../auth/RequireRole"
import LoginPolicy from "../pages/LoginPolicy"
import RecruiterSignup from "../pages/recruiter/RecruiterSignup"
import JobPage from "../pages/JobPage"
import StudentAccount from "../pages/officer/StudentAccount"

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loginpolicy" element={<LoginPolicy />} />
      <Route path="/recruiter-registration" element={<RecruiterSignup/>} />

      {/* Protected Routes */}
      <Route element={<RequireAuth />}>

        <Route path="/dashboard" element={<Dashboard/>}/>

        {/* <Route element={<RequireRole allowedRoles={["STUDENT"]} />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Route> */}
        <Route path="student" element={<RequireRole allowedRoles={["STUDENT"]} />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>

        <Route path="recruiter" element={<RequireRole allowedRoles={["RECRUITER"]} />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="dashboard" element={<RecruiterDashboard />} />
        </Route>

        <Route path="officer" element={<RequireRole allowedRoles={["OFFICER"]} />}>
          <Route index element={<OfficerDashboard />} />
          <Route path="dashboard" element={<OfficerDashboard />} />
          <Route path="create-student-account" element={<StudentAccount/>} />
        </Route>

        <Route path="jobs" element={<JobPage/>} />

      </Route>

      {/* Error/Fallback Routes */}
      <Route path="/unauthorized" element={<Unauthorized />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes