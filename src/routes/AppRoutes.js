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
import BulkStudentUpload from "../pages/officer/BulkStudentUpload"
import RecruiterList from "../pages/officer/RecruiterList"
import PasswordResetEmail from "../pages/officer/PasswordResetEmail"
import VerifyRecruiter from "../pages/officer/VerifyRecruiter"
import Applyjob from "../pages/student/Applyjob"
import JobDetails from "../pages/student/JobDetails"
import StudentProfile from "../pages/student/StudentProfile"
import WithdrawApplication from "../pages/student/WithdrawApplication"

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

        <Route path="student" element={<RequireRole allowedRoles={["STUDENT"]} />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="view-job/:jobId" element={<JobDetails/>} />
          <Route path="apply-job/:jobId" element={<Applyjob/>} />
          <Route path="profile" element={<StudentProfile/>} />
          <Route path="withdraw-application/:applicationId" element={<WithdrawApplication/>}/>
        </Route>

        <Route path="recruiter" element={<RequireRole allowedRoles={["RECRUITER"]} />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="dashboard" element={<RecruiterDashboard />} />
        </Route>

        <Route path="officer" element={<RequireRole allowedRoles={["OFFICER"]} />}>
          <Route index element={<OfficerDashboard />} />
          <Route path="dashboard" element={<OfficerDashboard />} />
          <Route path="create-student-account" element={<StudentAccount/>} />
          <Route path="bulk-upload" element={<BulkStudentUpload/>} />
        </Route>

        <Route path="jobs" element={<JobPage/>} />

        <Route path="officer" element={<RequireRole allowedRoles={["OFFICER", "ADMIN"]} />}>
          <Route path="recruiter-verification" element={<RecruiterList/>} />
          <Route path="password-reset-email" element={<PasswordResetEmail/>} />
          <Route path="verify-recruiter" element={<VerifyRecruiter/>} />
        </Route>

      </Route>

      {/* Error/Fallback Routes */}
      <Route path="/unauthorized" element={<Unauthorized />}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes