import api from "../../api/api"
import Navbar from "../../components/Navbar"
import { useState } from "react"
import SuccessStrip from "../../components/SuccessStrip"
import ErrorStrip from "../../components/ErrorStrip"

const StudentAccount = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [rollNo, setRollNo] = useState("")
    const [branch, setBranch] = useState("")
    const [cgpa, setCgpa] = useState("")
    const [skillsInput, setSkillsInput] = useState("")
    const [skills, setSkills] = useState([])
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            name: name,
            email: email,
            rollNumber: rollNo,
            branch: branch,
            cgpa: cgpa,
            skills: skills
        }

        try {
            const response = await api.post("/api/officer/students/createNew", payload)
            console.log(response.data)
            setSuccess("Student Created Successfully.")
        } catch (error) {
            console.log(error?.response?.data?.message)
            console.log(error)
            setError(error?.response?.data?.message)
        }
    }

    return (
        <>
            <Navbar />
            <SuccessStrip 
                message={success}
                onClose={()=>{setSuccess("")}}
            />
            <ErrorStrip 
                message={error}
                onClose={()=>{setError("")}}
            />
            <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-gray-100">
                <div className="px-6 py-4 w-full max-w-md rounded-md bg-white dark:bg-gray-700">
                    <h1 className="text-center my-3 mx-2 text-2xl font-medium">Create Student Account</h1>
                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

                        {/* ======== Name Field ========== */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium">Name</label>
                            <input
                                className="mt-1 w-full rounded-md px-4 py-2 bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-600"
                                type="text"
                                id="name"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        {/* ======== Email Field ========== */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">Email</label>
                            <input
                                className="mt-1 w-full rounded-md px-4 py-2 bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-600"
                                type="email"
                                id="email"
                                placeholder="student@edu.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        {/* ======== Roll Number Field ========== */}
                        <div>
                            <label htmlFor="roll" className="block text-sm font-medium">Roll Number</label>
                            <input
                                className="mt-1 w-full rounded-md px-4 py-2 bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-600"
                                type="text"
                                id="roll"
                                placeholder="U26MEXXX"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                required
                            />
                        </div>
                        {/* ======== Branch Field ========== */}
                        <div>
                            <label htmlFor="branch" className="block text-sm font-medium">Branch</label>
                            <select className="select-field" id="branch" 
                                value={branch}
                                required
                                onChange={(e) => setBranch(e.target.value)}
                            >
                                <option value="" disabled>Select a branch</option>
                                <option value="CSE">CSE</option>
                                <option value="ECE">ECE</option>
                                <option value="EE">EE</option>
                                <option value="ME">ME</option>
                                <option value="CE">CE</option>
                                <option value="AI">AI</option>
                                <option value="ChE">ChE</option>
                            </select>
                        </div>
                        {/* ======== CGPA Field ========== */}
                        <div>
                            <label htmlFor="cgpa" className="block text-sm font-medium">CGPA <span className="text-xs">(10-based)</span></label>
                            <input
                                className="mt-1 w-full rounded-md px-4 py-2 bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-600"
                                type="number" min={0} max={10} step={.01}
                                value={cgpa}
                                onChange={(e) => setCgpa(Number(e.target.value))}
                                placeholder="8.56"
                            />
                        </div>
                        {/* ======== Skills Field ========== */}
                        <div>
                            <label htmlFor="skills" className="block text-sm font-medium">Skills</label>
                            <input
                                className="mt-1 w-full rounded-md px-4 py-2 bg-white dark:text-gray-300 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-600"
                                type="text"
                                id="skills"
                                placeholder="React, Express, AWS, Redis"
                                value={skillsInput}
                                onChange={(e) => {
                                    const value = e.target.value
                                    setSkillsInput(value)
                                    setSkills(
                                        value.split(",")
                                            .map(skill => skill.trim())
                                            .filter(Boolean)
                                    )
                                }}
                            />
                        </div>

                        {/* ===== button ======= */}
                        <button className="w-full dark-btn btn" type="submit">Submit</button>
                        
                    </form>
                </div>
            </div>
        </>
    )
}

export default StudentAccount