import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../../api/api"
import Navbar from "../../components/Navbar"


const WithdrawApplication = () => {
    const { applicationId } = useParams()
    const navigate = useNavigate()
    const [appDetails, setAppDetails] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get("/api/student/applications")
                setAppDetails(response?.data?.applications)
            } catch (error) {
                console.log(error)
            }
        }

        fetchJobs()
    }, [])
    
    const filteredApp = appDetails?.find(application => application.applicationId === applicationId)
    const job = filteredApp?.job
    

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8">
                <div className="max-w-4xl mx-auto">

                    {/* Card */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">

                        {/* Header */}
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                {job?.companyName}
                            </h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {job?.title}
                            </p>
                        </div>

                        {/* Job Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Job Type</p>
                                <p className="text-gray-900 dark:text-gray-100">
                                    {job?.jobType}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Location</p>
                                <p className="text-gray-900 dark:text-gray-100">
                                    {job?.location}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">CTC</p>
                                <p className="text-gray-900 dark:text-gray-100">
                                    {job?.CTC}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Status</p>
                                <span
                                    className={`
                                    inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full
                                    ${job?.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                        }
                                `}
                                >
                                    {job?.status}
                                </span>
                            </div>

                            
                        </div>

                        {/* Actions */}
                        <div className="pt-4 flex justify-end">
                            <button
                                className="
                                px-5 py-2 text-sm font-medium rounded-md
                                bg-sky-600 hover:bg-sky-700
                                text-white transition
                                focus:outline-none focus:ring-2 focus:ring-sky-500
                            "
                                onClick={()=>setIsOpen(true)}
                            >
                                Withdraw Application
                            </button>
                        </div>

                    </section>
                </div>
            </div>
            {isOpen && 
            <WithdrawConfirmationModal 
            onClose={()=>setIsOpen(false)} 
                withdraw={async () => {
                    try {
                        await api.patch(`/api/student/applications/${applicationId}/withdraw`)
                        navigate("/student")
                    } catch (error) {
                        console.log(error)
                    }
                }}
            />
}
        </>
    )
}

export default WithdrawApplication

const WithdrawConfirmationModal = ({onClose, withdraw}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        withdraw()
    }

    return(
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}/>

            {/* Modal */}
            <div className="relative px-4 py-6 rounded-xl shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-50 flex flex-col items-center justify-center space-y-3">
                <p>Are you confirmed to withdraw the application?</p>
                <p>There is no going back once withdrawn.</p>
                <button className="border border-red-500 bg-red-100 dark:bg-red-700 text-red-800 dark:text-white btn" onClick={handleSubmit}>Withdraw Application</button>
            </div>

            </div>

        </>
    )
}