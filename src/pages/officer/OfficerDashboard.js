
import Navbar from "../../components/Navbar"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { fetchPlacementStats, fetchOpenJobs, fetchPendingRecruiters } from "../../services/OfficerService"
import { useEffect, useState } from "react"

import { notifySessionExpired } from "../../context/SessionContext"

const OfficerDashboard = () => {
  const [stats, setStats] = useState(null)
  const [pendingRecruiters, setPendingRecruiters] = useState([])
  const [jobDrives, setJobDrives] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          statsData,
          recruitersData,
          jobData
        ] = await Promise.all([
          fetchPlacementStats(),
          fetchPendingRecruiters(),
          fetchOpenJobs()
        ])

        setStats(statsData)
        setPendingRecruiters(recruitersData)
        setJobDrives(jobData)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const currentYear = new Date().getFullYear()
  
  let recruitersContent = (
    pendingRecruiters?.recruiters?.filter(item => 
      item?.recruitingYear === currentYear
    ) || []
  )

  const today = new Date().toDateString()

  let jobsContent = (
    jobDrives?.jobs?.filter(job => {
      const deadline = new Date(job.deadline)
      return deadline.toDateString() === today
    }) || []
  )

  return (
    <>
      <Navbar />
      <div className="p-10">

        <section>
          <h1 className="text-3xl font-fraunces text-gray-900 dark:text-gray-50">
            Placement Officer Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-200">
            Overview of placements, jobs, and student applications
          </p>
        </section>

        <section>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Students" value={loading ? "—" : stats?.students?.total} />
            <StatCard label="Active Job Drives" value={loading ? "—" : stats?.jobs?.open} />
            <StatCard label="Applications" value={loading ? "—" : stats?.applications?.totalApplications} />
            <StatCard label="Placed Students" value={loading ? "—" : stats?.students?.placed} />
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-4">
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-white p-6 min-h-48 dark:bg-gray-700 dark:border-gray-600">

                <h1 className="font-semibold mb-3 text-gray-100">Recruiters Verification Pending</h1>
                <div className="space-y-2">
                  {loading && <p className="text-gray-500 dark:text-gray-200">Loading...</p>}
                  {!loading && recruitersContent.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-200">No pending recruiters</p>
                  )}
                  {!loading && 
                  recruitersContent.map(item => <p key={item.id} className="text-gray-600 text-sm dark:text-gray-200">{item?.companyName}</p>)}
                  
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-white p-6 min-h-48 dark:bg-gray-700 dark:border-gray-600">
                <h1 className="font-semibold mb-3 dark:text-gray-100">Job drives with deadline as: {format(new Date(), "dd-MMM-yyyy")}</h1>
                <div className="space-y-2">
                  {loading && <p className="text-gray-500 dark:text-gray-200">Loading...</p>}
                  {!loading && jobsContent.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-200">No job drives with today's deadline</p>
                  )}
                  {!loading && 
                  jobsContent.map(job => <p key={job._id}className="text-gray-600 text-sm dark:text-gray-200">{job.companyName} - {job.title}</p>)}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 min-h-96 dark:bg-gray-700 dark:border-gray-600">
              <h1 className="font-semibold dark:text-gray-100">Quick Actions</h1>
              <div className="mt-4 space-y-3">
                <button className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-900">
                  Review Recruiter Requests
                </button>

                <button className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-900"
                onClick={() => navigate("/jobs")}>
                  View All Jobs
                </button>

                <button className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-900">
                  Placement Statistics
                </button>
                <button className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-900" onClick={() => navigate("create-student-account")}>
                  Create Student Account
                </button>
                <button className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-900 flex items-center justify-center" onClick={() => navigate("bulk-upload")}>
                  Students Account Creation - Bulk upload
                </button>
                <button className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-900" onClick={notifySessionExpired}>
                  Force Session Expire
                </button>
                
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

const StatCard = ({ label, value }) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-gray-700 dark:border-gray-600">
      <p className="text-sm text-gray-500 dark:text-gray-200">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-50">
        {value}
      </p>
    </div>
  );
}

export default OfficerDashboard