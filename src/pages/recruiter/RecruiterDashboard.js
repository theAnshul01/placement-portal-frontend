import { FaUserLarge } from "react-icons/fa6"
import { FaRegPenToSquare } from "react-icons/fa6";
import Navbar from "../../components/Navbar"
import { useNavigate } from "react-router-dom"

const RecruiterDashboard = () => {
  const navigate = useNavigate()

  const jobposting = () => navigate("post-job")
  const viewjobs = () => navigate("view-jobs")

  return (
    <>
      <Navbar />
      <div className="px-4 py-4">
        <div className="mx-2 mt-2 ">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className=' text-gray-800 dark:text-gray-50 '>
              <h1 className="text-2xl">Recruiter Dashboard</h1>
              <p className="text-sm dark:text-gray-300">Welcome recruiter to the placement portal</p>
            </div>
            <div>
              {/* Profile icon */}
              <button className="bg-gray-50 dark:bg-gray-700 rounded-full p-3"
                onClick={() => navigate("profile")}
              >
                <FaUserLarge className="text-gray-800 dark:text-gray-50 text-3xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Job Related Actions */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard label="Post Job" onClick={jobposting} />
          <ActionCard label="Action - Posted Jobs" onClick={viewjobs} />
        </div>
        
      </div>
    </>
  )
}

export default RecruiterDashboard

const ActionCard = ({label, onClick}) => {
  return (
    <>
      <div className="dark:bg-gray-600 dark:text-white bg-white text-gray-800 px-4 py-3 rounded-md cursor-pointer" onClick={onClick}>
        <p className="font-medium mb-2">{label}</p>
          <p className="text-gray-600 dark:text-gray-200"><FaRegPenToSquare /></p>
      </div>
    </>
  )
}