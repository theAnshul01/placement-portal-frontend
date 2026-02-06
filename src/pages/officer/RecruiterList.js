import { useEffect, useState } from 'react'
import api from '../../api/api'
import Navbar from '../../components/Navbar'


const RecruiterList = () => {
    const [verified, setVerified] = useState([])
    const [unverified, setUnverified] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedYear, setSelectedYear] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                setIsLoading(true)

                const [unverified, verified] = await Promise.all([
                    api.get("/api/officer/recruiters/unverified"),
                    api.get("/api/officer/recruiters/verified"),
                ])

                setUnverified(unverified.data.recruiters)
                setVerified(verified.data.recruiters)

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchRecruiters()
    }, [])

    const normalize = (value) => {
        return value?.toLowerCase().includes(searchTerm.toLowerCase())
    }

    const filteredUnverified =
        unverified.filter(r => {
            const yearMatch = selectedYear === "all" || String(r.recruitingYear) === selectedYear
            const searchMatch = normalize(r.companyName)

            return yearMatch && searchMatch
        })
    const filteredVerified =
        verified.filter(r => {
            const yearMatch = selectedYear === "all" || String(r.recruitingYear) === selectedYear
            const searchMatch = normalize(r.companyName)

            return yearMatch && searchMatch
        })

    return (
        <>
            <Navbar />
            <div className="min-h-screen px-6 py-8 bg-gray-50 dark:bg-gray-900">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-600 dark:text-gray-300 text-sm animate-pulse">
                            Loading recruiters…
                        </p>
                    </div>
                ) : (
                    <div className="max-w-5xl mx-auto space-y-8">

                        {/* Search + Filter Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                            {/* Search */}
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Search by company name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="
                                        w-full
                                        px-4 py-2 text-sm
                                        rounded-md
                                        border border-gray-300 dark:border-gray-600
                                        bg-white dark:bg-gray-800
                                        text-gray-900 dark:text-gray-100
                                        placeholder-gray-400 dark:placeholder-gray-500
                                        focus:outline-none focus:ring-2 focus:ring-sky-500
                                    "
                                />
                            </div>

                            {/* Year Filter */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600 dark:text-gray-300">
                                    Recruiting Year
                                </label>

                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="
                                        px-3 py-2 text-sm
                                        rounded-md
                                        border border-gray-300 dark:border-gray-600
                                        bg-white dark:bg-gray-800
                                        text-gray-900 dark:text-gray-100
                                        focus:outline-none focus:ring-2 focus:ring-sky-500
                                    "
                                >
                                    <option value="all">All</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                            </div>
                        </div>

                        {/* Unverified Section */}
                        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    Unverified Recruiters
                                </h2>
                            </div>

                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {unverified.length === 0 ? (
                                    <li className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        No unverified recruiters found.
                                    </li>
                                ) : (
                                    filteredUnverified.map(recruiter => (
                                        <li
                                            key={recruiter.id}
                                            className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-between"
                                        >
                                            <p>{recruiter.companyName} </p>
                                            <p className='bg-gray-50 dark:bg-gray-900 rounded-md p-2'>{recruiter.recruitingYear}</p>
                                        </li>

                                    ))
                                )}
                            </ul>
                        </section>

                        {/* Verified Section */}
                        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    Verified Recruiters
                                </h2>
                            </div>

                            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                {verified.length === 0 ? (
                                    <li className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        No verified recruiters found.
                                    </li>
                                ) : (
                                    filteredVerified.map(recruiter => (
                                        <li
                                            key={recruiter.id}
                                            className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-between"
                                        >
                                            <p>{recruiter.companyName} </p>
                                            <p className='bg-gray-50 dark:bg-gray-900 rounded-md p-2'>{recruiter.recruitingYear}</p>
                                        </li>

                                    ))
                                )}
                            </ul>
                        </section>

                    </div>
                )}
            </div>
        </>
    )
}

export default RecruiterList