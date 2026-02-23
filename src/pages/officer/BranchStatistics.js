import { useEffect, useState } from "react"
import api from "../../api/api"
import Navbar from "../../components/Navbar"
import SessionExpiredBanner from "../../components/SessionExpiredBanner"

const BranchStatistics = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await api.get("/api/officer/statistics/branchwise")
                setData(response.data)
            } catch (err) {
                console.error("Error fetching branch statistics:", err)
                setError(err?.response?.data?.message || err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchStatistics()
    }, [])

    return (
        <>
            <Navbar />
            <SessionExpiredBanner />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8 transition-colors">

                <div className="max-w-7xl mx-auto">

                    {/* ================= HEADER ================= */}
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Placement Analytics Dashboard
                    </h1>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Branch-wise and overall placement statistics
                    </p>

                    {/* ================= SUMMARY CARDS ================= */}
                    {data && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

                            {/* Total Branches */}
                            <StatCard
                                title="Total Branches"
                                value={data.totalBranches}
                                color="blue"
                            />

                            {/* Total Students */}
                            <StatCard
                                title="Total Students"
                                value={data.totalStudents}
                                color="indigo"
                            />

                            {/* Total Placed */}
                            <StatCard
                                title="Total Placed"
                                value={data.totalPlaced}
                                color="green"
                            />

                            {/* Overall Placement % */}
                            <StatCard
                                title="Overall Placement %"
                                value={`${data.overallPlacementPercentage}%`}
                                color={data.overallPlacementPercentage > 0 ? "green" : "red"}
                            />

                        </div>
                    )}

                    {/* ================= CONTENT ================= */}
                    <div className="mt-10">

                        {loading && (
                            <div className="text-center text-gray-600 dark:text-gray-300">
                                Loading statistics...
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-4 py-3 rounded-md">
                                {error}
                            </div>
                        )}

                        {data && (
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors">
                                <table className="min-w-full text-sm text-left">
                                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                        <tr>
                                            <th className="px-6 py-3">Branch</th>
                                            <th className="px-6 py-3">Total</th>
                                            <th className="px-6 py-3">Placed</th>
                                            <th className="px-6 py-3">Unplaced</th>
                                            <th className="px-6 py-3">Placement %</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data.branches.map((branch, index) => (
                                            <tr
                                                key={index}
                                                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                                    {branch.branch}
                                                </td>

                                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                                    {branch.totalStudents}
                                                </td>

                                                <td className="px-6 py-4 text-green-600 dark:text-green-400 font-medium">
                                                    {branch.placedStudents}
                                                </td>

                                                <td className="px-6 py-4 text-red-600 dark:text-red-400 font-medium">
                                                    {branch.unplacedStudents}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                                                        ${branch.placementPercentage > 0
                                                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                                : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                                            }`}
                                                    >
                                                        {branch.placementPercentage}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}

export default BranchStatistics


// ================= REUSABLE STAT CARD =================
const StatCard = ({ title, value, color }) => {

    const colorMap = {
        blue: "text-blue-600 dark:text-blue-400",
        green: "text-green-600 dark:text-green-400",
        red: "text-red-600 dark:text-red-400",
        indigo: "text-indigo-600 dark:text-indigo-400"
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
            </h2>
            <p className={`text-3xl font-bold mt-2 ${colorMap[color]}`}>
                {value}
            </p>
        </div>
    )
}