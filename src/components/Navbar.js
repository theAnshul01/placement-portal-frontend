import { Link } from "react-router-dom"
import useAuth from "../auth/useAuth"

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth()

    return (
        <nav className="w-full bg-white/70  backdrop-blur-md border-b border-white/30 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-between">

                {/* Logo / Brand */}
                <Link to="/" className="text-xl font-bold text-gray-900">
                    Placement<span className="text-blue-600"> Portal</span>
                </Link>

                

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {!isAuthenticated ?
                        <>
                            <Link to="/login" className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                                Login
                            </Link>
                        </> : 
                        <>
                            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded text-white transition" onClick={logout}>Logout</button>
                        </>
                    }
                </div>

            </div>
        </nav>
    )
}

export default Navbar