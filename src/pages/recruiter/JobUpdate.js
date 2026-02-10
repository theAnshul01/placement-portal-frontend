import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../api/api"
import Navbar from "../../components/Navbar"

const JobUpdate = () => {
    const { id } = useParams()

    const [form, setForm] = useState({
        title: "",
        description: "",
        branches: "",
        minCgpa: "",
        jobType: "",
        location: "",
        CTC: "",
        deadline: "",
        status: "OPEN"
    })

    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    // 🔹 Fetch existing job details // TODO: create this endpoint in the backend
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await api.get(`/api/recruiter/jobs/${id}`)
                const job = res.data

                setForm({
                    title: job.title || "",
                    description: job.description || "",
                    branches: job.eligibility?.branches?.join(", ") || "",
                    minCgpa: job.eligibility?.minCgpa || "",
                    jobType: job.jobType || "",
                    location: job.location || "",
                    CTC: job.CTC || "",
                    deadline: job.deadline?.slice(0, 10) || "",
                    status: job.status || "OPEN"
                })
            } catch (err) {
                setError("Failed to load job details")
            } finally {
                setLoading(false)
            }
        }

        fetchJob()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    // 🔹 Update Job
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)
        setSuccess(null)

        const payload = {
            title: form.title,
            description: form.description,
            eligibility: {
                branches: form.branches.split(",").map(b => b.trim()),
                minCgpa: Number(form.minCgpa)
            },
            jobType: form.jobType,
            location: form.location,
            CTC: form.CTC,
            deadline: form.deadline,
            status: form.status
        }

        try {
            await api.patch(`/api/recruiter/jobs/${id}`, payload)
            setSuccess("Job updated successfully ✅")
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to update job")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="py-20 text-center text-gray-600 dark:text-gray-400">
                Loading job details...
            </div>
        )
    }

    return (
        <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md">

                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Update Job Posting
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Modify job details or close the job posting
                    </p>
                </div>

                {(error || success) && (
                    <div className="px-8 pt-6">
                        {error && (
                            <div className="rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-3 text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="rounded-md bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-3 text-sm">
                                {success}
                            </div>
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="px-8 py-8 space-y-10">

                    {/* Job Info */}
                    <section className="space-y-6">
                        <h2 className="section-title">Job Information</h2>

                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Job Title"
                            required
                        />

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={5}
                            className="form-input resize-none"
                            placeholder="Job description"
                            required
                        />
                    </section>

                    {/* Eligibility */}
                    <section className="space-y-6">
                        <h2 className="section-title">Eligibility</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                name="branches"
                                value={form.branches}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Eligible Branches (CSE, IT)"
                                required
                            />
                            <input
                                type="number"
                                step="0.1"
                                name="minCgpa"
                                value={form.minCgpa}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Minimum CGPA"
                                required
                            />
                        </div>
                    </section>

                    {/* Job Details */}
                    <section className="space-y-6">
                        <h2 className="section-title">Job Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                name="jobType"
                                value={form.jobType}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Job Type"
                                required
                            />
                            <input
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Location"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                name="CTC"
                                value={form.CTC}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="CTC"
                                required
                            />
                            <input
                                type="date"
                                name="deadline"
                                value={form.deadline}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>
                    </section>

                    {/* Status */}
                    <section className="space-y-4">
                        <h2 className="section-title">Job Status</h2>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="OPEN">OPEN</option>
                            <option value="CLOSED">CLOSED</option>
                        </select>
                    </section>

                    {/* Submit */}
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="
                px-8 py-2.5 rounded-md
                bg-blue-600 hover:bg-blue-700
                text-white font-medium
                transition disabled:opacity-60
              "
                        >
                            {submitting ? "Updating..." : "Update Job"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
        </>
    )
}

export default JobUpdate