import { Link } from "react-router-dom"
import Navbar from "../../components/Navbar"

const officerDashboard = () => {
  return (
    <>
      <Navbar />
      <div>
        {/* 
          Four works for officer - 
          1. Create student
          2. resend reset password
          3. verify recruiter
          4. view verified and unverified recruiter
        */}

        <h1 className="text-4xl font-bold ml-3 mt-3">Officer Dashboard</h1>
        <div className="text-sm mt-5 ml-3 flex flex-col md:flex-row gap-4">
        <Link className="border border-gray-900 rounded-3xl px-3 py-2 hover:bg-blue-600 hover:text-white hover:border-white" to="/">Home</Link>
          <Link className="border border-gray-900 rounded-3xl px-3 py-2 hover:bg-blue-600 hover:text-white hover:border-white" to="/verify-recruiter">Verify Recruiter</Link>
        </div>

      </div>
    </>
  )
}

export default officerDashboard