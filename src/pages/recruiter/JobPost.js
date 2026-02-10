import { useState } from "react"
import api from "../../api/api"
import Navbar from "../../components/Navbar"

const JobPost = () => {

    const [form, setForm] = useState({
        title: "",
        description: "",
        branches: "",
        minCgpa: "",
        jobType: "",
        location: "",
        CTC: "",
        deadline: ""
    })

    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setSubmitting(true)

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
            deadline: form.deadline
        }

        try {
            await api.post("/api/recruiter/jobs", payload)
            setSuccess("Job posted successfully 🚀")
            setForm({
                title: "",
                description: "",
                branches: "",
                minCgpa: "",
                jobType: "",
                location: "",
                CTC: "",
                deadline: ""
            })
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to post job")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md">

                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Create Job Posting
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Provide accurate details to attract the right candidates
                        </p>
                    </div>

                    {/* Alerts */}
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

                        {/* ===== Job Info ===== */}
                        <section className="space-y-6">
                            <h2 className="section-title">Job Information</h2>

                            <div>
                                <label className="form-label">Job Title</label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Software Engineer"
                                    required
                                />
                            </div>

                            <div>
                                <label className="form-label">Job Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={5}
                                    className="form-input resize-none"
                                    placeholder="Responsibilities, tech stack, team culture..."
                                    required
                                />
                            </div>
                        </section>

                        {/* ===== Eligibility ===== */}
                        <section className="space-y-6">
                            <h2 className="section-title">Eligibility Criteria</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="form-label">Eligible Branches</label>
                                    <input
                                        name="branches"
                                        value={form.branches}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="CSE, IT"
                                        required
                                    />
                                    <p className="helper-text">
                                        Separate multiple branches with commas (CSE, ECE, AI, EE, ME, CE, ChE)
                                    </p>
                                </div>

                                <div>
                                    <label className="form-label">Minimum CGPA</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="minCgpa"
                                        value={form.minCgpa}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="7.5"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        {/* ===== Job Details ===== */}
                        <section className="space-y-6">
                            <h2 className="section-title">Job Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    name="jobType"
                                    value={form.jobType}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Job Type (Full-Time)"
                                    required
                                />
                                <input
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Location (Bangalore)"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    name="CTC"
                                    value={form.CTC}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="CTC (12 LPA)"
                                    required
                                />
                                <div>
                                    <label className="form-label">Application Deadline</label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={form.deadline}
                                        onChange={handleChange}
                                        className="form-input appearance-none"
                                        placeholder="deadline"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        {/* ===== Submit ===== */}
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="
              w-full md:w-auto px-8 py-2.5 rounded-md
              bg-blue-600 hover:bg-blue-700
              text-white font-medium
              transition disabled:opacity-60
            "
                            >
                                {submitting ? "Posting Job..." : "Publish Job"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default JobPost