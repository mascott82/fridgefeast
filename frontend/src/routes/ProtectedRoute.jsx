import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({currentUser}) => {
    console.log("currentUser", currentUser)
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;