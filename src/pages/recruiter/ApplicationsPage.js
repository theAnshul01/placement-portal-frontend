import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../api/api"
import Navbar from "../../components/Navbar"

const ApplicationsPage = () => {

    const { jobId } = useParams()

    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get(`/api/recruiter/jobs/${jobId}/applications`)
                setApplications(response.data.applications || [])
            } catch (err) {
                setError("Failed to load applications")
            } finally {
                setLoading(false)
            }
        }

        fetchApplications()
    }, [jobId])

    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="
                    bg-white dark:bg-gray-900
                    border border-gray-200 dark:border-gray-700
                    rounded-2xl shadow-md
                ">

                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Job Applications
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            View all student applications for this job posting
                        </p>
                    </div>

                    {/* Body */}
                    <div className="px-8 py-8">

                        {loading && (
                            <p className="text-gray-600 dark:text-gray-400">
                                Loading applications...
                            </p>
                        )}

                        {error && (
                            <div className="rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-3 text-sm">
                                {error}
                            </div>
                        )}

                        {!loading && !error && applications.length === 0 && (
                            <div className="
                                text-center py-16
                                text-gray-500 dark:text-gray-400
                            ">
                                No applications received yet.
                            </div>
                        )}

                        {!loading && applications.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                                                #
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Roll Number
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Branch
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-28">
                                                CGPA
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-40">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {applications.map((app, index) => (
                                            <tr
                                                key={app._id || index}
                                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                            >
                                                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                    {index + 1}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                    {app.student?.rollNumber || "N/A"}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {app.student?.branch || "N/A"}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-center text-gray-800 dark:text-gray-200 font-medium">
                                                    {app.student?.cgpa || "—"}
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <span className="
                            inline-flex items-center justify-center
                            px-3 py-1 rounded-full text-xs font-semibold
                            bg-blue-100 text-blue-700
                            dark:bg-blue-900/40 dark:text-blue-300
                        ">
                                                        {app.status || "APPLIED"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ApplicationsPage