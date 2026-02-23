import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../api/api"
import Navbar from "../../components/Navbar"
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md"
import { IoCloudUploadOutline } from "react-icons/io5"

const StudentProfile = () => {

    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [skills, setSkills] = useState([])
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editField, setEditField] = useState(null)

    const fetchProfile = async () => {
        try {
            const response = await api.get("/api/student/profile")
            console.log(response.data.profile)
            setUserProfile(response?.data?.profile)
            setSkills(response?.data?.profile?.skills)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchProfile()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center
        bg-gray-50 dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-400">
                    Loading profile...
                </p>
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-gray-900">

                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700 p-8">

                    {/* Header */}
                    <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                        Student Profile
                    </h1>

                    {/* Profile grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <ProfileItem label="Name" value={userProfile?.name} />
                        <ProfileItem label="Email" value={userProfile?.email} />
                        <ProfileItem label="Role" value={userProfile?.role} />
                        <ProfileItem label="Roll Number" value={userProfile?.rollNumber} />
                        <ProfileItem label="Branch" value={userProfile?.branch} />
                        <ProfileItem
                            label="CGPA"
                            value={userProfile?.cgpa?.toFixed(2)}
                            editable
                            onEdit={() => {
                                setEditField("cgpa")
                                setIsEditOpen(true)
                            }}
                        />
                        <ProfileItem
                            label="Skills"
                            value={skills.map((item, index) => <span key={index}>{item.trim()}{" "}</span>)}
                            editable
                            onEdit={() => {
                                setEditField("skills")
                                setIsEditOpen(true)
                            }}
                        />

                        <ProfileItem
                            label="Resume"
                            value={userProfile?.resume?.url}
                            onResumeUpload = {fetchProfile}
                            onResumeDelete = {fetchProfile}
                        />

                        <ProfileItem
                            label="Verification Status"
                            value={userProfile?.verificationStatus}
                        />
                        <ProfileItem
                            label="Account Status"
                            value={userProfile?.isActive ? "Active" : "Inactive"}
                            highlight={userProfile?.isActive}
                        />

                        <ProfileItem
                            label="Placement Status"
                            value={userProfile?.isPlaced ? "Placed" : "Not placed yet"}
                            highlight={userProfile?.isPlaced}
                        />


                    </div>
                </div>
            </div>

            {isEditOpen && (
                <EditProfileModal
                    field={editField}
                    initialValue={
                        editField === "cgpa"
                            ? userProfile?.cgpa
                            : skills.join(", ")
                    }
                    onClose={() => setIsEditOpen(false)}
                    onSave={async (value) => {
                        try {
                            const payload =
                                editField === "cgpa"
                                    ? { cgpa: Number(value) }
                                    : { skills: value.split(",").map(s => s.trim()) }

                            await api.patch("/api/student/profile", payload)

                            setUserProfile(prev => ({
                                ...prev,
                                ...payload
                            }))

                            if (editField === "skills") {
                                setSkills(payload.skills)
                            }

                            setIsEditOpen(false)
                        } catch (err) {
                            console.error(err)
                        }
                    }}
                />
            )}
        </>
    )
}

/* ===== Reusable field component ===== */
const ProfileItem = ({ label, value, highlight, editable, onEdit, onResumeUpload, onResumeDelete }) => {

    const baseText =
        "mt-1 text-base font-semibold"

    const colorClass =
        highlight === undefined
            ? "text-gray-900 dark:text-gray-100"
            : highlight
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"

    const deleteResume = async () => {
        try {
            const response = await api.delete("/api/student/profile/resume")
            console.log(response?.data?.message)
            onResumeDelete && onResumeDelete()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <p className="text-sm font-medium
        text-gray-600 dark:text-gray-400 flex items-center gap-2">
                {label}
                {editable && (
                    <button
                        onClick={onEdit}
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                        <FaRegPenToSquare />
                    </button>
                )}

            </p>
            <p className="flex flex-row items-center gap-3">
                {label === "Resume" && value && <Link className={`${baseText} ${colorClass}`} to={value}>📄 View Resume</Link>}
                {label === "Resume" && value && <MdDeleteOutline onClick={deleteResume} className="text-xl dark:text-gray-300 text-gray-600 cursor-pointer" />}
                {label === "Resume" && !value && <ResumeUploadItem 
                    onUploadSuccess={()=>{
                        onResumeUpload && onResumeUpload()
                    }}
                />}
                {label !== "Resume" &&
                    <p className={`${baseText} ${colorClass}`}>
                        {value || "-"}
                    </p>
                }
            </p>

        </div>
    )
}

export default StudentProfile

const EditProfileModal = ({
    field,
    initialValue,
    onClose,
    onSave
}) => {
    const [value, setValue] = useState(initialValue)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(value)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Edit {field === "cgpa" ? "CGPA" : "Skills"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {field === "cgpa" && (
                        <input
                            type="number"
                            step="0.01"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                            required
                        />
                    )}

                    {field === "skills" && (
                        <textarea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter skills separated by commas"
                            rows={4}
                            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-30 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                        />
                    )}

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
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const ResumeUploadItem = ({onUploadSuccess}) => {
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const inputRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!file) return alert("Please select a file")

        const formData = new FormData()
        formData.append("resume", file)

        try {
            setUploading(true)
            const response = await api.post("/api/student/profile/resume", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
            console.log(response.data.message)
            onUploadSuccess && onUploadSuccess()
            setFile(null)
        } catch (error) {
            console.log(error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pdf-upload" className="flex flex-col items-center border border-dashed border-gray-400 dark:border-gray-300
                rounded-lg p-1 cursor-pointer hover:bg-gray-300/40 dark:hover:bg-gray-500/40 transition">
                    <IoCloudUploadOutline className="text-2xl dark:text-gray-300" />
                    <span className="text-sm font-medium dark:text-gray-300">
                        {file ? "Change resume file" : "Click to upload resume"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 dark:text-gray-300">
                        Only .pdf files are allowed.
                    </span>
                    <input
                        type="file"
                        accept=".pdf"
                        id="pdf-upload"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files[0])}
                        ref={inputRef}
                    />
                </label>
                {/* selected file info */}
                {file && (
                    <div className="text-sm dark:text-gray-300 ">
                        <span className="truncate">
                            📄 {file.name}
                        </span>
                        <button
                            onClick={() => {
                                setFile(null)
                                if (inputRef.current) {
                                    inputRef.current.value = ""
                                }
                            }
                            }
                            className=" mt-1 ml-2 underline"
                        >
                            clear
                        </button>
                    </div>
                )}
                <button
                    type="submit"
                    disabled={uploading}
                    className="text-sm dark-btn p-1 rounded-md mt-1"
                >
                    {uploading ? "Uploading..." : "Upload Resume"}
                </button>
            </form>
        </>
    )
}