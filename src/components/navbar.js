import  { Navbar,Container,Nav }  from "react-bootstrap";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import UserContext from "../contexts/userContext/userContext";
import AuthService from '../services/auth.service'
import  {useNavigate} from 'react-router-dom'
function Navigation({showToast}){
    const {user,updateUser} = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = (e)=>{
        e.preventDefault()
        AuthService.logout()
        updateUser()
        showToast('success','Logged out successfully')
        navigate('/login')

    }
    const createNavComponents = ()=>{
        let list = []
        if(user){
            list.push(<Nav.Link key="Feed" as={Link} to="/feed">Feed </Nav.Link>)
            list.push(<Nav.Link key="Search user" as={Link} to="/searchuser">Search User </Nav.Link>)
            list.push(<Nav.Link key="CreatePost" as={Link} to="/newpost">Create post </Nav.Link>)
            list.push(<Nav.Link  key="logout" onClick={handleLogout}>Logout</Nav.Link>)
        }
        else{
            list.push(<Nav.Link key="login" as={Link} to="/login">Login</Nav.Link>)
            list.push(<Nav.Link key="sigup" as={Link} to="/signup">Signup</Nav.Link>)
        }
        return list
    }
    return(
        <Navbar collapseOnSelect expand="sm" variant = "dark" bg = "dark" sticky = "top">
            <Container>
                <Navbar.Brand as={Link} to="/">Local Twitter</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id = "responsive-navbar-nav" className="justify-content-end">
                    <Nav >
                        {createNavComponents()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation