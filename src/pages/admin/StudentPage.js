import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../api/api"
import Navbar from "../../components/Navbar"

const StudentPage = () => {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get("/api/admin/students")
                setStudents(response.data.students || [])
            } catch (err) {
                setError("Failed to fetch students")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchStudents()
    }, [])

    const filteredStudents = students.filter(s => s?.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <>
            <Navbar />

            <div
                className="
          min-h-screen px-6 py-8
          bg-gray-50 dark:bg-gray-900
        "
            >
                <div className="max-w-3xl mx-auto">
                    {/* Heading */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1
                                className="text-2xl font-bold text-gray-900 dark:text-gray-100"
                            >
                                Students
                            </h1>

                            <p
                                className="mt-1 text-sm text-gray-600 dark:text-gray-400"
                            >
                                List of all registered students
                            </p>
                        </div>
                        {/* search bar */}
                        <div className="w-full max-w-xs">
                            <input
                                id="search"
                                name="search"
                                type="text"
                                placeholder="Search by student name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="
      mt-1 w-full px-3 py-2 rounded-md border
      bg-white dark:bg-gray-900
      border-gray-300 dark:border-gray-700
      text-gray-900 dark:text-gray-100
      placeholder-gray-400 dark:placeholder-gray-500
      focus:outline-none focus:ring-1
      focus:ring-sky-500 dark:focus:ring-sky-400
    "
                            />
                        </div>
                    </div>

                    {/* States */}
                    {loading && (
                        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                            Loading students...
                        </p>
                    )}

                    {error && (
                        <div
                            className="
                mt-6 rounded-md border px-4 py-3
                bg-red-50 border-red-300 text-red-800
                dark:bg-red-900/30 dark:border-red-700 dark:text-red-300
              "
                        >
                            {error}
                        </div>
                    )}

                    {!loading && !error && filteredStudents.length === 0 && (
                        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
                            No students found.
                        </p>
                    )}

                    {/* student List */}
                    {!loading && !error && students.length > 0 && (
                        <ul className="mt-6 space-y-3">
                            {filteredStudents.map((student) => (
                                <li key={student._id}>
                                    <Link
                                        to={`/admin/students/${student._id}`}
                                        className="
                      block rounded-lg border px-4 py-3 transition
                      bg-white border-gray-200
                      hover:bg-gray-50 hover:border-gray-300
                      dark:bg-gray-800 dark:border-gray-700
                      dark:hover:bg-gray-700/50 dark:hover:border-gray-600
                    "
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p
                                                    className="
                            font-medium
                            text-gray-900 dark:text-gray-100
                          "
                                                >
                                                    {student.name}
                                                </p>
                                                <p
                                                    className="
                            text-sm
                            text-gray-600 dark:text-gray-400
                          "
                                                >
                                                    {student.email}
                                                </p>
                                            </div>


                                            <span
                                                className="
                          text-sm
                          text-sky-600 dark:text-sky-400
                        "      
                                            >
                                                <span className="text-green-700 dark:text-green-600 mr-3">{student.isActive ? "Active" : "Inactive"}</span>
                                                View more →
                                                
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}

export default StudentPage