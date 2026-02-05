import SuccessStrip from "../../components/SuccessStrip"
import ErrorStrip from "../../components/ErrorStrip"
import { useState, useRef } from "react"
import api from "../../api/api"
import { MdOutlineFileUpload } from "react-icons/md";
import Navbar from "../../components/Navbar"

const BulkStudentUpload = () => {
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [csvFile, setCsvFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef(null)


    const handleFileChange = async (e) => {
        const file = e.target.files[0]

        if (!file) return

        if (file.type !== "text/csv") {
            setError("Please upload a valid CSV file")
            return
        }

        setCsvFile(file)
        setError("")
        setSuccess("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!csvFile) {
            setError("Please select a CSV file first")
            return
        }

        const formData = new FormData()
        formData.append("file", csvFile)

        try {
            setUploading(true)

            const response = await api.post("/api/officer/students/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            setSuccess("Students uploaded successfully.")
            if (fileInputRef.current) fileInputRef.current.value = ""
            setCsvFile(null)
            console.log(response)
        } catch (error) {
            console.log(error?.response?.data?.message)
            setError(error?.response?.data?.message || "upload failed")
        } finally {
            setUploading(false)
        }
    }


    return (
        <>
            <SuccessStrip
                message={success}
                onClose={() => setSuccess("")}
            />
            <ErrorStrip
                message={error}
                onClose={() => setError("")}
            />
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100">
                <div className="w-full max-w-md bg-gray-200 dark:bg-gray-600 rounded-xl shadow-lg p-6">

                    {/* Header */}
                    <h1 className="text-xl font-semibold mb-1">
                        Bulk Student Account Creation
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Upload a CSV file to create multiple student accounts at once
                    </p>

                    {/* Upload Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* File input box */}
                        <label
                            htmlFor="csv-upload"
                            className="
                            flex flex-col items-center justify-center
                            border-2 border-dashed border-gray-400 dark:border-gray-300
                            rounded-lg p-6 cursor-pointer
                            hover:bg-gray-300/40 dark:hover:bg-gray-500/40
                            transition
                            "
                        >
                            <MdOutlineFileUpload className="text-3xl mb-2" />
                            <span className="text-sm font-medium">
                                {csvFile ? "Change CSV file" : "Click to upload CSV"}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                                Only .csv files are supported
                            </span>

                            <input
                                id="csv-upload"
                                ref={fileInputRef}
                                type="file"
                                accept=".csv"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>

                        {/* Selected file info */}
                        {csvFile && (
                            <div className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md flex justify-between items-center">
                                <span className="truncate">
                                    📄 {csvFile.name}
                                </span>
                                <button
                                    type="button"
                                    className="text-blue-600 dark:text-blue-400 text-xs underline"
                                    onClick={() => {
                                        setCsvFile(null)
                                        setSuccess("")
                                        setError("")
                                        if (fileInputRef.current) fileInputRef.current.value = ""
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={uploading}
                                className="
                                flex-1 flex items-center justify-center gap-2
                                bg-blue-600 hover:bg-blue-700
                                text-white px-4 py-2.5 rounded-lg
                                disabled:opacity-60 disabled:cursor-not-allowed
                                transition dark:bg-gray-800 dark:hover:bg-gray-700
                                "
                            >
                                <MdOutlineFileUpload />
                                {uploading ? "Uploading..." : "Upload CSV"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default BulkStudentUpload