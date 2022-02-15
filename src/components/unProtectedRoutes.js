import { Navigate,Outlet } from "react-router-dom";
import AuthService from "../services/auth.service"

const UnprotectedRoutes = ()=>{
    return AuthService.getCurrentUser()?.token ? <Navigate to="/feed"/> : <Outlet/>
}

export default UnprotectedRoutes
