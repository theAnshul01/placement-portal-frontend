import useAuth from "../auth/useAuth"

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth()

  let content = isAuthenticated &&
    (
      <>
        <p className="text-gray-700 mb-2">
          Logged in as: <strong>{user.email}</strong>
          <br />
          Role: <strong>{user.role}</strong>
        </p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </>
    )


  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Home</h2>
      {content}
    </div>
  )
}

export default Home