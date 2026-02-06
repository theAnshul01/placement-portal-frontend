import { useEffect, useState } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

const JobPage = () => {
    const [jobList, setJobList] = useState([])

    useEffect(() => {
        const getList = async () => {
            try {
                const response = await api.get("/jobs")
                setJobList(response.data.jobs)
            } catch (error) {
                console.log(error?.response?.data?.message)
            }
        }

        getList()
    }, [])

    const navigate = useNavigate()
    const handleGoBack = () => navigate(-1)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Active Job Drives
                    </h1>

                    <button
                        onClick={handleGoBack}
                        className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
                    >
                        ← Go Back
                    </button>
                </div>

                {/* Job List Card */}
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">

                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {jobList.length} active job drives
                        </p>
                    </div>

                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {jobList.length === 0 ? (
                            <li className="px-6 py-6 text-sm text-gray-500 dark:text-gray-400">
                                No active job drives available.
                            </li>
                        ) : (
                            jobList.map((job, index) => (
                                <li
                                    key={job._id}
                                    className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <div className="flex items-center justify-between">

                                        {/* Left */}
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {index + 1}. {job.companyName}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {job.title}
                                            </p>
                                        </div>

                                        {/* Status */}
                                        <span
                                            className={`
                                                px-3 py-1 text-xs font-medium rounded-full
                                                ${job.status === "ACTIVE"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                                }
                                            `}
                                        >
                                            {job.status}
                                        </span>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default JobPage