import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../api/api"
import Navbar from "../../components/Navbar"

const Applyjob = () => {
    const { jobId } = useParams() 
    const navigate = useNavigate()
    const [jobDetails, setJobDetails] = useState([])

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
           const fetchJobs = async () => {
               try {
                   const response = await api.get("/jobs")
                   setJobDetails(response?.data?.jobs)
               } catch (error) {
                    console.log(error)
               }
           }
    
           fetchJobs()
    
        }, [])
    
    const filteredJob = jobDetails?.filter(job => job._id === jobId)

    const handleApply = async () => {
        try {
            setIsSubmitting(true)
            setError("")
            setSuccess("")

            const response = await api.post(
                `/api/student/jobs/${jobId}/apply`
            )

            setSuccess(response?.data?.message || "Applied successfully!")

        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Failed to apply for the job"
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8 flex items-center justify-center">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5">

                    {/* Header */}
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Apply for Job
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Confirm your application for this job drive. <span></span>
                        </p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 ">{filteredJob[0]?.companyName} - {filteredJob[0]?.title} - {filteredJob[0]?.CTC}</p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 ">{filteredJob[0]?.location}</p>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="text-sm text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-300 px-4 py-2 rounded-md">
                            {success}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="text-sm text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-300 px-4 py-2 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleApply}
                            disabled={isSubmitting}
                            className="
                                flex-1 py-2 text-sm font-medium rounded-md
                                bg-sky-600 hover:bg-sky-700 text-white
                                transition
                                disabled:opacity-60 disabled:cursor-not-allowed
                                focus:outline-none focus:ring-2 focus:ring-sky-500
                            "
                        >
                            {isSubmitting ? "Applying..." : "Apply"}
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="
                                px-4 py-2 text-sm rounded-md
                                border border-gray-300 dark:border-gray-600
                                text-gray-700 dark:text-gray-300
                                hover:bg-gray-100 dark:hover:bg-gray-700
                                transition
                            "
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Applyjob