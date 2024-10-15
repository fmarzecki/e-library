import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {

    const userRole = localStorage.getItem('userRole');

    if (allowedRoles.includes(userRole)) {
        return children;
    }
    else {
        return <Navigate to="/noaccess" />
    }
}

export default ProtectedRoute;