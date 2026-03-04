import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import useAuth from "../auth/useAuth"
import RecruitersMarquee from "./RecruitersMarquee"

const Home = () => {
  const {user} = useAuth()

  return (
    <>
      {/* Sticky Top Navigation bar */}
      <Navbar />

      {/* Main Wrapper */}
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">

        {/* ========= HERO SECTION ========== */}
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-4 text-center ">

          {/* Main heading */}
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight dark:text-gray-100 ">Building Career. {" "}
            <span className="text-blue-600 dark:text-blue-400">Shaping Futures.</span>
          </h1>

          {/* Subtitle text */}
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            Connecting the bright minds from SVNIT Surat with the world's leading organization through structured placement, internships and best career development programs.
          </p>

          {/* CTA container */}
          <div className="mt-10 flex justify-center gap-4">
            
            {/* Primary CTA button */}
            {!user && <Link
              to="/login"
              className="px-6 py-3 rounded-md font-medium dark-btn transition"
            >
              Login to Portal
            </Link>}

          </div>
        </section>

        {/* ============ FEATURES SECTION ============== */}
        <section
          id="features" className="bg-white py-20 dark:bg-gray-900"
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Grid Layout */}
            <div className="grid md:grid-cols-3 gap-8">

              {/* =========== FEATURE CARD 1 ========== */}
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition hover:scale-105 border dark:border-gray-500 dark:bg-gray-800">
                {/* Icon circle */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mb-4">
                  S
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  Student Management
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-200">
                  Students can track eligibility, applications, and placement status.
                </p>
              </div>

              {/* =========== FEATURE CARD 2 ========== */}
              <div className="bg-gray-50 p-8 border rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition dark:border-gray-500 dark:bg-gray-800">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold mb-4">
                  R
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  Recruiter Workflow
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-200">
                  Streamline job postings, applications, and candidate shortlisting
                  with ease.
                </p>
              </div>

              {/* =========== FEATURE CARD 3 ========== */}
              <div className="bg-gray-50 p-8 border rounded-xl shadow-sm hover:shadow-md transition hover:scale-105 dark:border-gray-500 dark:bg-gray-800">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold mb-4">
                  A
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  Placement Analytics
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-200">
                  Filtered placement statistics at the hand of admin and officers with just one click. 
                </p>
              </div>
            </div>
          </div>
        </section>

        <RecruitersMarquee/>

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default Home