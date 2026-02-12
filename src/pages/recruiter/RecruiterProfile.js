import { useEffect, useState } from 'react'
import api from "../../api/api"
import Navbar from "../../components/Navbar"

const RecruiterProfile = () => {

    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/api/recruiter/profile")
                setProfile(response.data.profile)
            } catch (err) {
                setError("Failed to load profile")
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    if (loading) {
        return (
            <div className="py-20 text-center text-gray-600 dark:text-gray-400">
                Loading profile...
            </div>
        )
    }

    return (
        <>
            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="
                    bg-white dark:bg-gray-900
                    border border-gray-200 dark:border-gray-700
                    rounded-2xl shadow-md
                ">

                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Recruiter Profile
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Overview of your recruiter and company details
                        </p>
                    </div>

                    <div className="px-8 py-8 space-y-12">

                        {error && (
                            <div className="rounded-md bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-3 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Account Status */}
                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Account Status
                            </h2>

                            <div className="flex flex-wrap gap-4">

                                <StatusBadge
                                    label="Verification Status"
                                    value={profile.verificationStatus}
                                    color={profile.verificationStatus === "VERIFIED" ? "green" : "yellow"}
                                />

                                <StatusBadge
                                    label="Account Active"
                                    value={profile.isActive ? "ACTIVE" : "INACTIVE"}
                                    color={profile.isActive ? "green" : "red"}
                                />

                                <StatusBadge
                                    label="Role"
                                    value={profile.role}
                                    color="blue"
                                />

                            </div>
                        </section>

                        {/* Personal Information */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProfileField label="Name" value={profile.name} />
                                <ProfileField label="Email" value={profile.email} />
                                <ProfileField
                                    label="Member Since"
                                    value={
                                        profile.createdAt
                                            ? new Date(profile.createdAt).toLocaleDateString()
                                            : "—"
                                    }
                                />
                            </div>
                        </section>

                        {/* Company Information */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Company Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProfileField label="Company Name" value={profile.companyName} />
                                <ProfileField label="Recruiting Year" value={profile.recruitingYear} />
                                <ProfileField label="Company Website" value={profile.companyWebsite} />
                            </div>
                        </section>

                        {/* Contact Information */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Contact Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProfileField label="Contact Person" value={profile.contactPerson} />
                                <ProfileField label="Contact Email" value={profile.contactEmail} />
                                <ProfileField label="Contact Number" value={profile.contactNumber} />
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </>
    )
}

/* ---------------- Reusable Components ---------------- */

const ProfileField = ({ label, value }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {label}
        </label>
        <div className="
            px-4 py-2.5 rounded-md
            bg-gray-50 dark:bg-gray-800
            text-sm text-gray-800 dark:text-gray-200
            border border-gray-200 dark:border-gray-700
        ">
            {value || "—"}
        </div>
    </div>
)

const StatusBadge = ({ label, value, color }) => {

    const colorMap = {
        green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
    }

    return (
        <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {label}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex w-fit ${colorMap[color]}`}>
                {value}
            </span>
        </div>
    )
}

export default RecruiterProfile