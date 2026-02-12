import { useEffect, useState } from "react"
import api from "../../api/api"
import { format } from "date-fns"
import { FaRegPenToSquare } from "react-icons/fa6"
import Navbar from "../../components/Navbar"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const ViewJobs = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get("/api/recruiter/jobs")
                setJobs(res.data.jobs || [])
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to fetch jobs")
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center py-20 text-gray-600 dark:text-gray-400">
                Loading your job postings...
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-600 dark:text-red-400">
                {error}
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Your Job Postings
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage and track all jobs posted by you
                    </p>
                </div>

                {/* Empty State */}
                {jobs.length === 0 && (
                    <div className="text-center py-16 text-gray-600 dark:text-gray-400">
                        You haven’t posted any jobs yet.
                    </div>
                )}

                {/* Job Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.map(job => (
                        <div
                            key={job._id}
                            className="
              bg-white dark:bg-gray-900
              border border-gray-200 dark:border-gray-700
              rounded-xl p-6 shadow-sm
              hover:shadow-md transition
            "
                        >
                            {/* Title + Status */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {job.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {job.companyName} • {job.location}
                                    </p>
                                </div>

                                <span
                                    className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${job.status === "OPEN"
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"}
                `}
                                >
                                    {job.status}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                                {job.description}
                            </p>

                            {/* Meta Info */}
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Job Type</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {job.jobType}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">CTC</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {job.CTC}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Eligible Branches</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {job.eligibility.branches.join(", ")}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Min CGPA</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {job.eligibility.minCgpa}
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <p>
                                    Deadline:{" "}
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        {format(new Date(job.deadline), "dd-MMM-yyyy")}
                                    </span>
                                </p>

                                <p>
                                    Posted on{" "}
                                    {format(new Date(job.createdAt), "dd-MMM-yyyy")}
                                </p>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center justify-evenly">
                                    <Link to={`/recruiter/update-job/${job._id}`} className="text-gray-600 dark:text-gray-50 text-xl"><FaRegPenToSquare /></Link>
                                    <p className="ml-1 text-sm text-gray-700 dark:text-gray-50">Edit</p>
                                </div>
                                <div>
                                    <button className="rounded-3xl px-2 text-gray-800 dark:text-gray-50 bg-gray-50 dark:bg-gray-600"
                                    onClick={() => navigate(`/recruiter/view-applications/${job._id}`)}
                                    >See Applications</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ViewJobs