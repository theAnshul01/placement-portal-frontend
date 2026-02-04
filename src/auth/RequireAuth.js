import { Navigate , Outlet} from "react-router-dom";
import useAuth from "./useAuth";
import FullPageLoader from "../components/FullPageLoader";

const RequireAuth = () => {
    const { isAuthenticated, isLoading } = useAuth()

    if(isLoading) return <FullPageLoader />
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

  return <Outlet/>
}

export default RequireAuth