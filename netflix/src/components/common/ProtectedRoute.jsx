import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
    const token = Cookies.get("token");

    console.log("Token from cookie:", token);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}