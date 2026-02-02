import { Navigate , Outlet} from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = () => {
    const { isAuthenticated } = useAuth()

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

  return <Outlet/>
}

export default RequireAuth