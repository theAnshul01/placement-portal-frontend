import { useParams, Link } from "react-router-dom"
import api from "../../api/api"
import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"

const JobDetails = () => {
    const { jobId } = useParams()
    const [jobDetails, setJobDetails] = useState([])

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

    const filteredJob = jobDetails?.find(job => job._id === jobId)

    const branches = filteredJob?.eligibility?.branches
    const cutOffCGPA = filteredJob?.eligibility?.minCgpa

    return (
        <>  
        <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8">
                <div className="max-w-4xl mx-auto">

                    {/* Card */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">

                        {/* Header */}
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                {filteredJob?.companyName}
                            </h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {filteredJob?.title}
                            </p>
                        </div>

                        {/* Job Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Job Type</p>
                                <p className="text-gray-900 dark:text-gray-100">
                                    {filteredJob?.jobType}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Location</p>
                                <p className="text-gray-900 dark:text-gray-100">
                                    {filteredJob?.location}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Status</p>
                                <span
                                    className={`
                                    inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full
                                    ${filteredJob?.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                        }
                                `}
                                >
                                    {filteredJob?.status}
                                </span>
                            </div>

                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Cut-off CGPA</p>
                                <p className="text-gray-900 dark:text-gray-100">
                                    {cutOffCGPA}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                Job Description
                            </h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {filteredJob?.description}
                            </p>
                        </div>

                        {/* Eligibility */}
                        <div>
                            <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                Eligible Branches
                            </h2>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {branches?.map((branch, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                                    >
                                        {branch}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 flex justify-end">
                            <Link
                                to={`/student/apply-job/${filteredJob?._id}`}
                                className="
                                px-5 py-2 text-sm font-medium rounded-md
                                bg-sky-600 hover:bg-sky-700
                                text-white transition
                                focus:outline-none focus:ring-2 focus:ring-sky-500
                            "
                            >
                                Apply for Job
                            </Link>
                        </div>

                    </section>
                </div>
            </div>
        </>
    )
}

export default JobDetails