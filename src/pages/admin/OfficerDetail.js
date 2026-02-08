import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../api/api"
import Navbar from "../../components/Navbar"


const OfficerDetail = () => {
    const { userId } = useParams()
    const [officers, setOfficers] = useState([])
    const [reason, setReason] = useState("")
    const [button, setButton] = useState(false)

    useEffect(()=>{
        const fetchOfficer = async () => {
            try {
                const response = await api.get("/api/admin/officers")
                setOfficers(response.data.officers)
            } catch (error) {
                console.log(error)
            }
        }

        fetchOfficer()
    },[button])

    const officer = officers.filter(o => o._id === userId)

    const handleDeactivate = async () => {
        try {
            if(reason.length === 0){
                return;
            }
            const payload = {
                reason
            }
            const response = await api.patch(`/api/admin/officers/${userId}/deactivate`, payload)
            setReason("")
            setButton(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    const handleActivate = async () => {
        try {
            const payload = {
                reason
            }
            const response = await api.patch(`/api/admin/officers/${userId}/reactivate`, payload)
            console.log(response)
            setReason("")
            setButton(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <Navbar/>
          <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50 dark:bg-gray-900">
              <div className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md">
                  {/* Heading */}
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      officer Details
                  </h1>

                  {/* Basic Info */}
                  <div className="mt-4 space-y-1 text-sm">
                      <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Name:</span> {officer[0]?.name}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Email:</span> {officer[0]?.email}
                      </p>
                  </div>

                  {/* Meta Info */}
                  <div className="mt-4 flex items-center justify-between text-sm">
                      <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">Role:</span> {officer[0]?.role}
                      </p>
                      <p
                          className={`font-medium ${officer[0]?.isActive
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                              }`}
                      >
                          {officer[0]?.isActive ? "Active" : "Inactive"}
                      </p>
                  </div>

                  {/* Reason Input */}
                  <div className="mt-6">
                      <label
                          htmlFor="reason"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                          Reason
                      </label>
                      <input
                          id="reason"
                          type="text"
                          placeholder="Reason for activation / deactivation"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
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
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span className="text-red-500">*</span>Reason is mandatory for deactivation
                      </p>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                      {officer[0]?.isActive ? (
                          <button
                              onClick={handleDeactivate}
                              className="
                w-full rounded-md py-2 font-medium transition
                bg-red-600 hover:bg-red-700
                text-white
              "
                          >
                              Deactivate
                          </button>
                      ) : (
                          <button
                              onClick={handleActivate}
                              className="
                w-full rounded-md py-2 font-medium transition
                bg-green-600 hover:bg-green-700
                text-white
              "
                          >
                              Activate
                          </button>
                      )}
                  </div>
              </div>
          </div>
      </>
  )
}

export default OfficerDetail