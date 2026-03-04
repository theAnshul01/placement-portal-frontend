import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { useSearchParams } from "react-router-dom"
import api from "../../api/api"
import SuccessStrip from "../../components/SuccessStrip"
import ErrorStrip from "../../components/ErrorStrip"


const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [matchPassword, setMatchPassword] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [resetting, setResetting] = useState(false)

    const [searchParams] = useSearchParams()
    const resetToken = searchParams.get("token")
    console.log("reset token: ", resetToken)

    useEffect(() => {
        setValidMatch(password === matchPassword)
    }, [password, matchPassword])

    const toggleShow = () => {
        setShowPassword(prev => !prev)
    }
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setResetting(true)
            await api.post('/api/auth/reset-password', {
                token: resetToken,
                newPassword: password
            })
            setPassword('')
            setMatchPassword('')
            setSuccess('Password reset successfully')
        } catch (error) {
            console.error('error occurred - password reset unsuccessful', error.message)
            setError(error.message)
        } finally {
            setResetting(false)
        }
    }

    return (
        <>
            <Navbar />
            <SuccessStrip message={success} onClose={() => setSuccess('')} />
            <ErrorStrip message={error} onClose={() => setError('')}/>
            <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50 dark:bg-gray-800">

                <div className="w-full max-w-md p-8 rounded-xl shadow-md 
                  bg-white dark:bg-gray-900">

                    {/* Heading */}
                    <h1 className="text-2xl font-bold text-center 
                   text-gray-900 dark:text-gray-100">
                        Reset Account Password
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-2 text-sm text-center 
                  text-gray-600 dark:text-gray-400">
                        Enter a new password for your account
                    </p>

                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

                        {/* New Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium 
                     text-gray-700 dark:text-gray-300"
                            >
                                <div className="flex gap-2 items-center">
                                    New Password {showPassword ? <FaRegEyeSlash onClick={toggleShow} /> : <FaRegEye onClick={toggleShow} />}
                                </div>
                            </label>

                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="mt-1 w-full px-4 py-2 rounded-md border
                     border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-800
                     text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-1
                     focus:ring-sky-500 focus:border-sky-500"
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="matchPassword"
                                className="block text-sm font-medium 
                     text-gray-700 dark:text-gray-300"
                            >
                                <div className="flex gap-2 items-center">
                                    Confirm Password {showConfirmPassword ? <FaRegEyeSlash onClick={toggleShowConfirmPassword} /> : <FaRegEye onClick={toggleShowConfirmPassword} />}
                                </div>
                            </label>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="matchPassword"
                                value={matchPassword}
                                onChange={(e) => setMatchPassword(e.target.value)}
                                placeholder="Re-enter new password"
                                className={`mt-1 w-full px-4 py-2 rounded-md border
                     border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-800
                     text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-1 ${validMatch ? "focus:ring-green-500 focus:border-green-500" : "focus:ring-red-500 focus:border-red-500"} 
                    `}
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!validMatch || !password}
                            className="w-full py-2 rounded-md font-medium text-white transition
                            bg-blue-600 hover:bg-blue-700
                            disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {!resetting ? "Reset Password" : "Resetting"}
                        </button>

                    </form>

                </div>
            </div>
        </>
    )
}

export default ResetPassword