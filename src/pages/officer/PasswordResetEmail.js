import { useState } from "react"
import Navbar from "../../components/Navbar"
import api from "../../api/api"
import SuccessStrip from "../../components/SuccessStrip"
import ErrorStrip from "../../components/ErrorStrip"

const PasswordResetEmail = () => {
    const [rollNumber, setRollNumber] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post(
                "/api/officer/students/resend-reset",
                { rollNumber }
            )
            setSuccess(response?.data?.message)
        } catch (error) {
            setError(error?.response?.data?.message)
        }
    }

    return (
        <>
            <Navbar />
            <SuccessStrip 
                message={success}
                onClose={()=>setSuccess("")}
            />
            <ErrorStrip 
                message={error}
                onClose={() => setError("")}
            />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">

                    {/* Heading */}
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Send Password Reset Email
                    </h1>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Enter the student roll number to resend the password reset link.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">

                        <div>
                            <label
                                htmlFor="rollNumber"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Roll Number
                            </label>

                            <input
                                id="rollNumber"
                                type="text"
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                                placeholder="e.g. ME21B1023"
                                className="
                                    mt-1 w-full px-4 py-2 text-sm
                                    rounded-md
                                    border border-gray-300 dark:border-gray-600
                                    bg-white dark:bg-gray-900
                                    text-gray-900 dark:text-gray-100
                                    placeholder-gray-400 dark:placeholder-gray-500
                                    focus:outline-none focus:ring-2 focus:ring-sky-500
                                "
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="
                                w-full py-2 text-sm font-medium
                                rounded-md
                               dark-btn btn
                                transition
                                focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1
                                dark:focus:ring-offset-gray-800
                            "
                        >
                            Send Password Reset Email
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default PasswordResetEmail