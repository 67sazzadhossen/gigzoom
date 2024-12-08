/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "../Component/Loading";


const PrivateRoute = ({ children }) => {
    const { user,loading } = useContext(AuthContext)
    if (loading) {
        return<Loading></Loading>
    }

    if (user) {
        return children
    } else {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }

    
};

export default PrivateRoute;