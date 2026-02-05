import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      {/* Sticky Top Navigation bar */}
      <Navbar />

      {/* Main Wrapper */}
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">

        {/* ========= HERO SECTION ========== */}
        <section className="max-w-7xl mx-auto px-6 py-24 text-center ">

          {/* Main heading */}
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight dark:text-gray-100">One Platform for {" "}
            <span className="text-blue-600 dark:text-blue-400">Campus Placements</span>
          </h1>

          {/* Subtitle text */}
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            Built for students, recruiters & placement cell. Browse drives, apply with one click, track progress through the journey, and keep everyone aligned-from students to recruiters to administrators.
          </p>

          {/* CTA container */}
          <div className="mt-10 flex justify-center gap-4">
            
            {/* Primary CTA button */}
            <Link
              to="/login"
              className="px-6 py-3 rounded-md font-medium dark-btn transition"
            >
              Login to Portal
            </Link>

            {/* Secondary CTA button */}
            <Link
              to="#features"
              className="px-6 py-3 rounded-md border-gray-300 text-gray-700 bg-gray-200 hover:bg-gray-300 transition dark:bg-gray-300"
            >
              Learn More
            </Link>
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

        {/* ============= CTA SECTION ============= */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Login and manage your placement journey
          </p>

          <div className="mt-6">
            <Link
              to="/login"
              className="px-6 py-3 rounded-md  font-medium dark-btn transition"
            >
              Go to Login
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default Home