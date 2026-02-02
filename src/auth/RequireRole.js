import { Navigate, Outlet } from "react-router-dom";
import useAuth from '../auth/useAuth'


const RequireRole = ({ allowedRoles }) => {
    const { user } = useAuth()

    const hasAccess = allowedRoles.includes(user.role)

    if(!hasAccess){
        return <Navigate to="/unauthorized" replace/>
    }

  return <Outlet />
}

export default RequireRole