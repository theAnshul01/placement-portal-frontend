import { useState } from "react"
import { LuEye, LuEyeClosed } from "react-icons/lu"
import api from "../../api/api"
import Navbar from "../../components/Navbar"

const CreateOfficer = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setSubmitting(true)

        try {
            await api.post("/api/admin/officers", { name, email, password })
            setSuccess("Officer created successfully!")
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setSubmitting(false)
            setName("")
            setEmail("")
            setPassword("")
        }
    }

    return (
        <>
            <Navbar />
            <div className="
      min-h-screen flex items-center justify-center px-6
      bg-gray-50 dark:bg-gray-900
    ">
                <div className="
        w-full max-w-md p-8 rounded-xl shadow-md
        bg-white dark:bg-gray-800
      ">
                    {/* Heading */}
                    <h2 className="
          text-2xl font-bold text-center
          text-gray-900 dark:text-gray-100
        ">
                        Create Officer Account
                    </h2>

                    <p className="
          mt-2 text-sm text-center
          text-gray-600 dark:text-gray-400
        ">
                        Add a new officer to the placement portal
                    </p>

                    {/* Error */}
                    {error && (
                        <div
                            className="
      mt-4 flex items-start justify-between gap-3
      rounded-md border px-4 py-3
      bg-red-50 border-red-300 text-red-800
      dark:bg-red-900/30 dark:border-red-700 dark:text-red-300
    "
                        >
                            <p className="text-sm font-medium">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() => setError(null)}
                                className="
        text-sm font-semibold
        text-red-700 hover:text-red-900
        dark:text-red-300 dark:hover:text-red-100
        transition
      "
                                aria-label="Dismiss error message"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div
                            className="
      mt-4 flex items-start justify-between gap-3
      rounded-md border px-4 py-3
      bg-green-50 border-green-300 text-green-800
      dark:bg-green-900/30 dark:border-green-700 dark:text-green-300
    "
                        >
                            <p className="text-sm font-medium">
                                {success}
                            </p>

                            <button
                                type="button"
                                onClick={() => setSuccess(null)}
                                className="
        text-sm font-semibold
        text-green-700 hover:text-green-900
        dark:text-green-300 dark:hover:text-green-100
        transition
      "
                                aria-label="Dismiss success message"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* Form */}
                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="eg. Finn Allen"
                                required
                                className="
                mt-1 w-full px-4 py-2 rounded-md border
                bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-1
                focus:ring-sky-500 dark:focus:ring-sky-400
              "
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email<span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="officer@edu.com"
                                required
                                className="
                mt-1 w-full px-4 py-2 rounded-md border
                bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-1
                focus:ring-sky-500 dark:focus:ring-sky-400
              "
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Password<span className="text-red-500">*</span>
                                </label>

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="
                  flex items-center gap-1 text-sm
                  text-gray-600 dark:text-gray-400
                  hover:text-gray-900 dark:hover:text-gray-200
                "
                                >
                                    {showPassword ? <LuEyeClosed /> : <LuEye />}
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="
                mt-1 w-full px-4 py-2 rounded-md border
                bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:outline-none focus:ring-1
                focus:ring-sky-500 dark:focus:ring-sky-400
              "
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="
              w-full py-2 rounded-md font-medium transition
              bg-blue-600 hover:bg-blue-700
              dark:bg-sky-600 dark:hover:bg-sky-700
              text-white disabled:opacity-60
            "
                        >
                            {submitting ? "Creating..." : "Create Officer"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateOfficer