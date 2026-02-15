import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../api/api"
import Navbar from "../../components/Navbar"
import ErrorStrip from "../../components/ErrorStrip"
import { FaRegPenToSquare } from "react-icons/fa6"

const ApplicationsPage = () => {

    const { jobId } = useParams()

    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selectedApp, setSelectedApp] = useState(null)
    const [statusValue, setStatusValue] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get(`/api/recruiter/jobs/${jobId}/applications`)
                console.log(response.data.applications)
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
                            <ErrorStrip message={error} onClose={() => setError(null)} />
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
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className="
                                inline-flex items-center justify-center
                                px-3 py-1 rounded-full text-xs font-semibold
                                bg-blue-100 text-blue-700
                                dark:bg-blue-900/40 dark:text-blue-300
                            ">
                                                            {app.status || "APPLIED"}
                                                        </span>

                                                        <button
                                                            onClick={() => {
                                                                setSelectedApp(app)
                                                                setStatusValue(app.status || "APPLIED")
                                                                setIsEditOpen(true)
                                                            }}
                                                            title="Edit status"
                                                            className="text-gray-500 hover:text-blue-600 dark:text-gray-300"
                                                        >
                                                            <FaRegPenToSquare />
                                                        </button>
                                                    </div>
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
            {isEditOpen && (
                <EditStatusModal
                    app={selectedApp}
                    initialStatus={statusValue}
                    onClose={() => setIsEditOpen(false)}
                    onSave={async (value) => {
                        if (!selectedApp) return
                        setSaving(true)
                        try {
                            const id = selectedApp.applicationId || selectedApp._id

                            await api.patch(`/api/recruiter/applications/${id}/status`, { status: value })

                            setApplications(prev => prev.map(a => {
                                const aId = a.applicationId || a._id
                                return aId === id ? { ...a, status: value } : a
                            }))

                            setIsEditOpen(false)
                        } catch (err) {
                            console.error(err)
                            const serverMsg = err?.response?.data?.message || err?.response?.data || err.message
                            setError(typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg))
                        } finally {
                            setSaving(false)
                        }
                    }}
                    saving={saving}
                />
            )}
        </>
    )
}

export default ApplicationsPage

const EditStatusModal = ({ app, initialStatus, onClose, onSave, saving }) => {
    const [value, setValue] = useState(initialStatus || "")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(value)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Update Application Status
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                        required
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 ${saving ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}