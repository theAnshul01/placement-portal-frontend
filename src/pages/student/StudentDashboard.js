import { FaUserLarge } from "react-icons/fa6";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { format } from "date-fns"
import { Link } from "react-router-dom"


const StudentDashboard = () => {

  const [application, setApplications] = useState([])
  const [jobData, setJobData] = useState([])
  const [appliedJobsData, setAppliedJobsData] = useState([])

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {

        const [applicationApiResult, jobApiResult, appliedJobs] = await Promise.all([
          api.get("/api/student/applications"),
          api.get("/jobs"),
          api.get("/api/student/applications")
        ])

        setApplications(applicationApiResult?.data?.applications)
        setJobData(jobApiResult?.data?.jobs)
        setAppliedJobsData(appliedJobs?.data?.applications)
        console.log(appliedJobs?.data?.applications)

      } catch (error) {
        console.log(error?.response?.data?.message)
      }
    }

    fetchApplicationStatus()
  }, [])

  const appliedApplications = application.filter(application => application.status === "APPLIED")
  const shortlistedApplications = application.filter(application => application.status === "SHORTLISTED")
  const selectedApplications = application.filter(application => application.status === "SELECTED")
  const rejectedApplications = application.filter(application => application.status === "REJECTED")

  return (
    <>
      <Navbar />
      <div className='min-h-screen p-10 mx-auto'>
        <section className="flex items-center justify-between">
          <div>
            <h1 className='text-gray-900 dark:text-gray-50 text-3xl font-bold'> Student Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
              Jobs, job applications & student profile
            </p>
          </div>
          <div className="flex flex-col items-center">
            <button className="dark:bg-gray-800 bg-white p-3 rounded-full">
              <FaUserLarge className="text-gray-700 dark:text-gray-100 text-2xl" />
            </button>
            <p className="text-xs p-1 dark:text-gray-100">Profile</p>
          </div>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AppStatCard label="Applied" value={appliedApplications.length} />
          <AppStatCard label="Shortlisted" value={shortlistedApplications.length} />
          <AppStatCard label="Selected" value={selectedApplications.length} />
          <AppStatCard label="Rejected" value={rejectedApplications.length} />
        </section>

        {/* Job Section */}
        <section className="mt-8">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl">
            <h1 className="text-gray-900 dark:text-gray-50 mb-2">Active Job Drives</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {jobData.length === 0 ? <p className="text-gray-900 dark:text-gray-50 mb-2">No active job drives to show.</p> : 
              jobData.map(job => <Link to={`view-job/${job._id}`} key={job._id}><JobInfoCard  company={job.companyName} title={job.title} type={job.jobType} ctc={job.CTC} deadline={format(new Date(job.deadline), "dd-MMM-yyyy")} /></Link>
              )}
            </div>
          </div>
        </section>

        {/* Applied Job Section */}
        <section className="mt-8">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-xl">
            <h1 className="text-gray-900 dark:text-gray-50 mb-2">Applied Jobs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {appliedJobsData.length === 0 ? <p className="text-gray-900 dark:text-gray-50 mb-2">No applied job drives with current open status.</p> :
                appliedJobsData.map(item => <AppliedJobInfoCard key={item?.applicationId} company={item?.job?.companyName} title={item?.job?.title} ctc={item?.job?.CTC} status={item?.status} />
                )}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default StudentDashboard

const AppStatCard = ({ label = "Application", value = 23 }) => {
  return (
    <>
      <div className=" rounded-xl border bg-white shadow-sm text-gray-600 p-5 dark:bg-gray-700 dark:border-gray-600">
        <p className="text-sm text-gray-500 dark:text-gray-200">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">{value}</p>
      </div>
    </>
  )
}

const JobInfoCard = ({ company, title, type, ctc, deadline }) => {
  return (
    <div className="min-h-48 rounded-xl border bg-white shaodw-sm p-2 text-gray-600 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200 flex flex-col justify-between">
      <p className="text-gray-900 dark:text-white mb-1 font-semibold">{company}</p>
      <p>Role: {title} - {type}</p>
      <p>CTC: {ctc}</p>
      <p>Deadline: {deadline}</p>
      <button className="dark-btn btn text-sm mt-1">Apply Now</button>
    </div>
  )
}
const AppliedJobInfoCard = ({ company, title, ctc, status }) => {
  return (
    <div className="min-h-24 rounded-xl border bg-white shaodw-sm p-2 text-gray-600 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200 flex flex-col justify-end">
      <p className="text-gray-900 dark:text-white mb-1 font-semibold">{company}</p>
      <div className="text-sm font-light">
      <p>Role: {title}</p>
      <p>CTC: {ctc}</p>
      <p>Current status: {status}</p>
      </div>
    </div>
  )
}