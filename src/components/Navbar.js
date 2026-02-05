import { Link } from "react-router-dom"
import useAuth from "../auth/useAuth"
import { useTheme } from "../context/ThemeContext"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()

    return (
        <nav 
        className="w-full bg-white/70  backdrop-blur-md border-b border-white/30 sticky top-0 z-40 rounded-3xl dark:bg-gray-700/70 dark:backdrop-blur-md border-gray/30"
        >
            <div className="px-3 py-3 flex items-center justify-between">

                {/* Logo / Brand */}
                <Link to="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Placement<span className="text-blue-600 dark:text-blue-400"> Portal</span>
                </Link>

                

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="mx-3 scale-150 hover:scale-[1.75] dark:text-white transition rounded-3xl"
                    >{theme === "dark" ? <MdOutlineLightMode/> : <MdOutlineDarkMode />}</button>
                    {!isAuthenticated ?
                        <>
                            <Link to="/login" className="px-5 py-2 rounded-3xl dark-btn transition">
                                Login
                            </Link>
                        </> : 
                        <>
                            <button className="dark-btn px-5 py-2 rounded-3xl transition" onClick={logout}>Logout</button>
                        </>
                    }
                </div>

            </div>
        </nav>
    )
}

export default Navbar