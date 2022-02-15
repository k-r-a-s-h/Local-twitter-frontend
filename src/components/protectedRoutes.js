import { Navigate,Outlet } from "react-router-dom";
import AuthService from "../services/auth.service"

const ProtectedRoutes = ()=>{
    return AuthService.getCurrentUser()?.token ? <Outlet/> : <Navigate to="login"/>
}

export default ProtectedRoutes
