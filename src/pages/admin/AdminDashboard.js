import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../api/api"

const AdminDashboard = () => {
    const navigate = useNavigate()
    const [stats, setStats] = useState([])

    useEffect(()=>{
        const fetchStats = async () => {
            try {
                const response = await api.get("/api/officer/statistics/overview")
                setStats(response.data)
            } catch (error) {
                const msg = error?.response?.data?.message
                throw new Error(msg || "Failed to load placement stats");
            }
        }

        fetchStats()
    },[])

    return (
        <>
            <Navbar />
            <div>
                {/* Header */}
                <div className="mt-2 ml-2">
                    <h1 className="text-3xl text-gray-800 dark:text-white p-3">Admin Dashboard</h1>
                </div>

                {/* Hero Section */}
                <div className="">
                    <div className="grid grid-cols-12 gap-4  text-gray-800  dark:text-gray-50 ">
                        {/* Placement Stats */}
                        <div className="col-span-8 bg-white dark:bg-gray-700 mt-2 ml-2 p-3 rounded-md">
                            <h1 className="text-center text-xl font-medium">Placement Statistics Overview</h1>
                            <div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4">
                                    <StatCard label="Total Students" value={stats?.students?.total} />
                                    <StatCard label="Active Job Drives" value={stats?.jobs?.open} />
                                    <StatCard label="Applications" value={stats?.applications?.totalApplications} />
                                    <StatCard label="Placed Students" value={stats?.students?.placed} />
                                </div>
                            </div>
                            <p className="p-3 text-blue-600 text-sm hover:underline dark:text-blue-500 inline-block hover:translate-x-1">View more &rarr;</p>

                        </div>
                        {/* Quick Actions */}
                        <div className="col-span-4 px-6 py-4 bg-white dark:bg-gray-700 mt-2 ml-2 p-3 rounded-md">
                            <h1 className="text-center text-xl font-medium">Quick Actions</h1>
                            <div className="mt-2 px-4 py-2 text-sm flex flex-col items-center justify-start space-y-2">
                                <button className="w-full rounded-md px-2 py-1 border hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600" onClick={()=>navigate("create-officer")}>Create Officer</button>
                                <button className="w-full rounded-md px-2 py-1 border hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600" onClick={()=>navigate("/officer/recruiter-verification")}>View Recruiters</button>
                                <button className="w-full rounded-md px-2 py-1 border hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600" onClick={()=>navigate("/officer/verify-recruiter")}>Verify Recruiter</button>
                                <button className="w-full rounded-md px-2 py-1 border hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600" onClick={() => navigate("/officer/password-reset-email")}>Send Reset Password Email</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation - Officers and Students */}
                <div className="flex items-center justify-center gap-10 text-gray-800 dark:text-gray-50 ml-2 mt-2 p-4 bg-white dark:bg-gray-700 rounded-md">
                    <button className="dark-btn btn" onClick={() => navigate("view-officers")}>View Officers</button>
                    <button className="dark-btn btn" onClick={() => navigate("view-students")}>View Students</button>
                </div>
                

            </div>
        </>
    )
}

export default AdminDashboard

const StatCard = ({ label = "Selected", value = 25 }) => {
    return (
        <div className="border border-gray-200 dark:border-gray-600 mx-2 px-4 py-6 rounded-md space-y-2">
            <p className="dark:text-gray-200 text-gray-700">{label}</p>
            <p className="text-gray-900 dark:text-white font-semibold">{value}</p>
        </div>
    )
}