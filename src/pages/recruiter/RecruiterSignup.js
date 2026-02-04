import { useState } from "react"
import Navbar from "../../components/Navbar"
import { Link } from "react-router-dom"
import api from "../../api/api"
import ErrorStrip from "../../components/ErrorStrip"
import SuccessStrip from "../../components/SuccessStrip"

const RecruiterSignup = () => {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [recruitingYear, setRecruitingYear] = useState("")
    const [companyWebsite, setCompanyWebsite] = useState("")
    const [contactPerson, setContactPerson] = useState("")
    const [contactEmail, setContactEmail] = useState("")
    const [contactPhone, setContactPhone] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const handleSignUp = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const recruiterSignupDetails = {
            name: fullName,
            email: email,
            password: password,
            companyName: companyName,
            recruitingYear: recruitingYear,
            companyWebsite: companyWebsite,
            contactPerson: contactPerson,
            contactEmail: contactEmail,
            contactNumber: contactPhone
        }

        try {
            await api.post("/api/auth/recruiter/signup", recruiterSignupDetails)
            setSuccess("Sign up successful")
        } catch (error) {
            console.log("recruiter-signup error: ", error.stack)
            setError(error?.response?.data?.message || error?.message)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <>
            <Navbar />
            <SuccessStrip 
            message={success}
            onClose={() => {setSuccess(null)}}
            />
            <ErrorStrip 
            message={error}
            onClose={() => {setError(null)}}
            />

            <div className="min-h-screen flex items-center justify-center px-6 mt-2 py-3 bg-gray-50">
                <div className="bg-white max-w-2xl w-full p-8 rounded-lg shadow-md">
                    {/* heading */}
                    <h1 className="text-3xl font-bold text-gray-900 text-center">Recruiter Registration</h1>
                    {/* Subtitle */}
                    <p className="mt-2 text-sm text-center text-gray-600">
                        Complete the registration to take part in the institution’s campus placement process.
                    </p>

                    <form className="mt-3" onSubmit={handleSignUp}>
                        {/* ======= Name ========= */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 px-1">Full Name<span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter Full Name"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        {/* ======= Email ========= */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 px-1 mt-1">Email address<span className="text-red-600">*</span></label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter Full Name"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* ======= Password ========= */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 px-1 mt-1">Password<span className="text-red-600">*</span></label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Strong Password"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* ======= Company Name ========= */}
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 px-1 mt-1">Company Name<span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                id="company"
                                placeholder="Enter Company Name"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>

                        {/* ======= Recruiting Year ========= */}
                        <div>
                            <label htmlFor="year" className="block text-sm font-medium text-gray-700 px-1 mt-1">Recruiting Year<span className="text-red-600">*</span></label>
                            <input
                                type="number"
                                id="year"
                                min="2000"
                                max="2100"
                                placeholder="Enter Recruiting Year (YYYY)"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                                value={recruitingYear}
                                onChange={(e) => setRecruitingYear(e.target.value)}
                            />
                        </div>

                        {/* ======= Company Website ========= */}
                        <div>
                            <label htmlFor="website" className="block text-sm font-medium text-gray-700 px-1 mt-1">Company Website<span className="text-red-600">*</span></label>
                            <input
                                type="url"
                                id="website"
                                placeholder="https://company.com"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                                value={companyWebsite}
                                onChange={(e) => setCompanyWebsite(e.target.value)}
                            />
                        </div>

                        {/* ======= Contact Person ========= */}
                        <div>
                            <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 px-1 mt-1">Contact Person Full Name<span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                id="contact-name"
                                placeholder="Enter Contact Person Full Name"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                                value={contactPerson}
                                onChange={(e) => setContactPerson(e.target.value)}
                            />
                        </div>

                        {/* ======= Contact Person Email ========= */}
                        <div>
                            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 px-1 mt-1">Contact Person Email<span className="text-red-600">*</span></label>
                            <input
                                type="email"
                                id="contact-email"
                                placeholder="Enter Contact Person Email Address"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                            />
                        </div>

                        {/* ======= Contact Person Phone Number ========= */}
                        <div>
                            <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 px-1 mt-1">Contact Person Phone<span className="text-red-600">*</span></label>
                            <input
                                type="tel"
                                id="contact-phone"
                                placeholder="Enter Contact Person Phone Number"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                                required
                                value={contactPhone}
                                onChange={(e) => {setContactPhone(e.target.value)}}
                            />
                        </div>

                        {/* ======== sign up button ===== */}
                        <button className="w-full py-2 mt-4 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                            type="submit"
                        >
                            {isSubmitting ? "Submitting..." : "Sign up"}
                        </button>
                    </form>

                    <p className="text-sm mt-2"><span className="font-medium">Note:</span> All recruiter accounts require placement cell approval. <Link to="/loginpolicy" className="text-blue-600 hover:underline">See Recruiter Registration Policy</Link></p>

                    {/* ======== Footer Links ========= */}
                    <div className="mt-6 text-center text-sm text-gray-600">

                        

                        <p className="mt-1">Already registered?{" "} <Link to="/login" className=" text-blue-600 hover:underline">Sign in here</Link>.</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default RecruiterSignup