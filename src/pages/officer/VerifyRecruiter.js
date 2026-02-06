import { useState } from "react"
import api from "../../api/api"
import SuccessStrip from "../../components/SuccessStrip"
import ErrorStrip from "../../components/ErrorStrip"
import Navbar from "../../components/Navbar"


const VerifyRecruiter = () => {
    const [companyName, setCompanyName] = useState("")
    const [recruitingYear, setRecruitingYear] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.patch("/api/officer/recruiters/verify", 
                {companyName, recruitingYear}
            )
            setSuccess(response?.data?.message)
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }

  return (
    <>
          <Navbar />
          <SuccessStrip
              message={success}
              onClose={() => setSuccess("")}
          />
          <ErrorStrip
              message={error}
              onClose={() => setError("")}
          />
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
              <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">

                  {/* Heading */}
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Verify Recruiter
                  </h1>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Enter the below details to verify recruiter.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                      <div>
                          <label
                              htmlFor="rollNumber"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                              Company Name
                          </label>

                          <input
                              id="rollNumber"
                              type="text"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder="e.g. ABCTech"
                              className="
                                    mt-1 w-full px-4 py-2 text-sm
                                    rounded-md
                                    border border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-gray-900
                                    text-gray-900 dark:text-gray-100
                                    placeholder-gray-400 dark:placeholder-gray-500
                                    focus:outline-none focus:ring-2 focus:ring-sky-500
                                "
                              required
                          />
                          <label
                              htmlFor="rollNumber"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                              Recruiting Year
                          </label>

                          <input
                              id="rollNumber"
                              type="text"
                              value={recruitingYear}
                              onChange={(e) => setRecruitingYear(e.target.value)}
                              placeholder="e.g. 2026"
                              className="
                                    mt-1 w-full px-4 py-2 text-sm
                                    rounded-md
                                    border border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-gray-900
                                    text-gray-900 dark:text-gray-100
                                    placeholder-gray-400 dark:placeholder-gray-500
                                    focus:outline-none focus:ring-2 focus:ring-sky-500
                                "
                              required
                          />
                      </div>

                      <button
                          type="submit"
                          className="
                                w-full py-2 text-sm font-medium
                                rounded-md
                               dark-btn btn
                                transition
                                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1
                                dark:focus:ring-offset-gray-800
                            "
                      >
                          Verify Recruiter
                      </button>

                  </form>
              </div>
          </div>

    </>
  )
}

export default VerifyRecruiter