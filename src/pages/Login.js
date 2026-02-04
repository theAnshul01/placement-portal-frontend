import { useNavigate, Link } from "react-router-dom"
import useAuth from "../auth/useAuth"
import { getRedirectPathByRole } from "../auth/roleRedirectMap"
import Navbar from "../components/Navbar"
import { useState } from "react"
import ErrorStrip from "../components/ErrorStrip"


const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const loginDetails = {
      email: email,
      password: password
    }

    try {
      const loggedInUser = await login(loginDetails)
      const redirectPath = getRedirectPathByRole(loggedInUser?.role)
      navigate(redirectPath, { replace: true })
    } catch (error) {
      console.log("login error: ", error.stack)
      setError(error?.response?.data?.message || error?.message)
    } finally {
      setSubmitting(false)
    } 
  }


  return (
    <>
      {/* Top navigation bar */}
      <Navbar />

      <ErrorStrip 
        message={error}
        onClose={() => setError(null)}
      />

      {/* Page wrapper */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        {/* Login card container */}
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Login to Placement Portal
          </h2>

          {/* subtitle */}
          <p className="mt-2 text-sm text-gray-600 text-center">
            Access your dashboard using your credentials
          </p>

          {/* Form wrapper */}
          <form className="mt-8 space-y-5" onSubmit={handleLogin}>

            {/* ========== Email field ========= */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email Address<span className="text-red-600">*</span></label>
              <input
                type="email"
                placeholder="you@college.edu"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                id="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                autoComplete="false"
                autoFocus
                required
              />
            </div>

            {/* ======= Password Field ====== */}
            <div>
              <div className="flex gap-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password">
                  Password<span className="text-red-600">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="
                flex items-center
                text-sm font-light
               text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? "🙈(hide)" : "👁️(show)"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                id="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                autoComplete="false"
                required
              />

            </div>

            {/* ==== Login Button ==== */}
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Forgot your password?{" "}
              <Link to="/loginpolicy" className="text-blue-600 hover:underline">
                Reset here
              </Link>
            </p>

            <p className="mt-1">Don't have an account?{" "} <Link to="/loginpolicy" className=" text-blue-600 hover:underline">Register yourself</Link>.</p>
          </div>

        </div>

      </div>
    </>
  )
}

export default Login