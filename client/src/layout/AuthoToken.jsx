import { Outlet } from "react-router";
import { Navigate } from "react-router"


const AuthoToken = () => {
  if (localStorage.getItem("access_token")) {
    return (
        <Navigate to="/"/>
    )
  }
  return (
    <Outlet />
  );
}

export default AuthoToken