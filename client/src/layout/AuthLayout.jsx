import { Navigate, Outlet } from "react-router";
import { useNavigate } from "react-router";
import Navbar from "../component/Navbar";


const AuthLayout = () => {
    const access_token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    if (!localStorage.getItem("access_token")) {
        return <Navigate to="/signIn" />
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )

}

export default AuthLayout