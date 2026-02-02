import { useNavigate } from "react-router-dom"
import useAuth from "../auth/useAuth"
import { getRedirectPathByRole } from "../auth/roleRedirectMap"


const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleMockLogin = () => {
    const userData = {
      id: "1",
      email: "student@test.com",
      role: "OFFICER"
    }

    login(userData)

    const redirectPath = getRedirectPathByRole(userData.role)
    navigate(redirectPath, {replace: true})
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-semibold text-green-500 my-2">Login Page</h1>
      <button
        onClick={handleMockLogin}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Mock Login
      </button>
    </div>
  )
}

export default Login