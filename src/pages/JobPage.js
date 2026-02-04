import { useEffect, useState } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

const JobPage = () => {
    const [jobList, setJobList] = useState([])

    useEffect(()=>{
        const getList = async () => {
            try {
                const response = await api.get("/jobs")
                setJobList(response.data.jobs)
            } catch (error) {
                console.log(error?.response?.data?.message)
            }
        }

        getList()
    },[])

    const navigate = useNavigate()

    const handleGoBack = () => navigate(-1)

  return (
    <div className="bg-gray-50 p-5">
        <h1 className="text-gray-900 font-fraunces text-3xl font-semibold">Active Job Drives</h1>
        <button onClick={handleGoBack} className="text-sm"> &larr; Go Back</button>
        <ul className="bg-white p-5 rounded-xl ">
            {jobList.map((job, index) => <li key={job._id}>{index+1} -  {job.companyName} - {job.title} - {job.status}</li>)}
        </ul>
    </div>
  )
}

export default JobPage