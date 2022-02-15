import UserContext from "./userContext";
import AuthService from "../../services/auth.service"
import { useState } from "react";
const UserState = (props) =>{
    const [user,setUser] = useState(AuthService.getCurrentUser())
    const updateUser=()=>{
        setUser(AuthService.getCurrentUser())
    }
    return (
        <UserContext.Provider value={{user,updateUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState