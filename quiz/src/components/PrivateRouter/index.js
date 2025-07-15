import { Navigate, Outlet } from "react-router-dom";

function PrivateRouter() {

    const token = sessionStorage.getItem("token"); // Hoặc dùng localStorage
    const isLogin = !!token; // true nếu có token, false nếu không

    return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRouter;