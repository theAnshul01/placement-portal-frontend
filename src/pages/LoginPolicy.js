import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"

const LoginPolicy = () => {
    return (
        <>
            {/* Top Navigation */}
            <Navbar />
            <p className="px-4 py-3 mt-2 mb-0 font-medium dark:text-gray-50 dark:bg-gray-900">Registration or Login related policies</p>
            <div className="flex flex-col items-left justify-between py-4 px-4 m-0">
                {/* Student Sign up policy */}
                <div className="px-3 py-6">
                    <p className="font-medium text-gray-700 dark:text-gray-200">Student Registration Policy</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Students are advised to visit the placement cell office or contact <span className="font-medium">placements{new Date().getFullYear()}@college.edu</span></p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Students are not allowed to sign up by themselves.</p>
                </div>

                {/* Recruiter Sign up policy */}
                <div className="mt-4 px-3 py-6">
                    <p className="font-medium text-gray-700 dark:text-gray-200">Recruiter Registration Policy</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Recruiters are required to register themselves by the <span className="font-medium">Recruiter Registeration</span> link.</p>
                    <Link to="/recruiter-registration" className="text-blue-500 text-sm hover:underline dark:text-blue-400">Recruiter Registration</Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Recruiters are advised to send an email on <span className="font-medium">placements{new Date().getFullYear()}@college.edu</span> to get verified post registration.</p>
                </div>

                {/* Placement Officer Sign up policy */}
                <div className="mt-4 px-3 py-6">
                    <p className="font-medium text-gray-700 dark:text-gray-200">Placement Officer Registration Policy</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Placement Officers will be alloted accounts from placements cell.</p>
                </div>

                {/* Password reset policy */}
                <div className="mt-4 px-3 py-6 ">
                    <p className="font-medium text-gray-700 dark:text-gray-200">Password Reset Policy</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Send an email to the <span className="font-medium">placements{new Date().getFullYear()}@college.edu</span> to request for password reset email.</p>
                </div>

                <Footer />
                
            </div>
            
        </>
    )
}

export default LoginPolicy