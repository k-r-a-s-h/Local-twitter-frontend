import { Form, Button, Card, Container, Row, Col } from "react-bootstrap"
import { useState } from "react"
import AuthService from "../services/auth.service"
import UserContext from "../contexts/userContext/userContext";
import { useContext } from "react";
import  {useNavigate} from 'react-router-dom'



function Login({showToast}) {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [isValidEmail,setIsValidEmail] = useState(true)
    let [isValidPassword,setIsValidPassword] = useState(true)
    const [isLoading, setisLoading] = useState(false)

    const {updateUser} = useContext(UserContext)
    const navigate = useNavigate()
    let submit = async () => {
        if(isValidEmail && isValidPassword && password && email){
            //server call for token
            try{
                setisLoading(true)
                await AuthService.login(email,password)
                setisLoading(false)
                updateUser()
                navigate('/feed')
            }
            catch(err){
                setisLoading(false)
                let error = err.response.data.status ? err.response.data.status : "Something went wrong"
                showToast('error',error)
            }
           
        }
        else{
            showToast('error',"Please enter valid values for email & password")
        }
    }

    let onChangeEmail = (event) => {
        setEmail(event.target.value)
        setIsValidEmail( validateEmail(event.target.value))
    }

    let onChangePassword = (event) =>{
        setPassword(event.target.value)
        setIsValidPassword( validatePassword(event.target.value))
    }

    const validateEmail = (email)=>{   
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validatePassword = (password)=>{
        return password.length > 5
    }
    return ( 
        <Container>
            <Row>
                <Col>
                    <Card className="m-4">
                        <Card.Body>
                            <Card.Title className="text-center">Login</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={onChangeEmail} isInvalid = {!isValidEmail}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a valid email address.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={onChangePassword} isInvalid = {!isValidPassword} />
                                    <Form.Control.Feedback type="invalid">
                                        Mininum password length is 5
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" onClick={submit} disabled={isLoading}>
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login