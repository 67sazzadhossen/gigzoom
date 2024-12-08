/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import Loading from "../Component/Loading";
import useRole from "../hooks/useRole";


const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole()
    if (isLoading) {
        return <Loading></Loading>
    }

    if (role === 'admin') {
        return children
    } else {
        <Navigate to={'/dashboard'}></Navigate>
    }
    
};

export default AdminRoute;