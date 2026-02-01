import useAuth from "../auth/useAuth"

const Home = () => {
  const { user, isAuthenticated, login, logout } = useAuth()

  return (
    <div>
        <h2 className="text-2xl font-bold mb-2">Home</h2>

        {isAuthenticated ? (
          <>
            <p className="text-gray-700 mb-2">
              Logged in as: <strong>{user.email}</strong>
              <br/>
              Role: <strong>{user.role}</strong>
            </p>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={ () => login({
              id: "1",
              email: "student@test.com",
              role: "STUDENT"
            })}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Mock Login
          </button>
        )}
    </div>
  )
}

export default Home