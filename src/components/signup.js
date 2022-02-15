import AuthService from '../services/auth.service'
import {Container,Row,Col,Card,Form,Button } from 'react-bootstrap'
import { useState } from 'react'
import  {useNavigate} from 'react-router-dom'

function Signup ({showToast}){

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [firstName,setFirstName] = useState('')
    let [lastName,setLastName]= useState('')
    let [isValidEmail,setIsValidEmail] = useState(true)
    let [isValidPassword,setIsValidPassword] = useState(true)
    let [isValidFirstName,setIsValidFirstName] =useState(true)
    let [isValidLastName,setIsValidLastName] = useState(true)
    const [isLoading, setisLoading] = useState(false)

    const navigate = useNavigate()

    let onChangeEmail = (event) => {
        setEmail(event.target.value)
        setIsValidEmail( validateEmail(event.target.value))
    }

    let onChangePassword = (event) =>{
        setPassword(event.target.value)
        setIsValidPassword( validatePassword(event.target.value))
    }

    let onChangeFirstName = (event) => {
        setFirstName(event.target.value)
        setIsValidFirstName( validateName(event.target.value) )
    }

    let onChangeLastName = (event)=>{
        setLastName(event.target.value)
        setIsValidLastName( validateName(event.target.value) )
    }

    let submit = async()=>{
        if(isValidEmail && isValidFirstName && isValidLastName && isValidPassword && email && password && firstName && lastName){
            try{
                setisLoading(true)
                let data = await AuthService.signup(firstName,lastName,email,password)
                setisLoading(false)
                showToast('success',data.status)
                navigate('/login')
            }
            catch(err){
                setisLoading(false)
                let error = err?.response?.data?.status ? err?.response?.data?.status  : "Something went wrong"
                showToast('error',error)
            }
        }
        else{
            showToast('error','Enter valid values for all the fields')
        }
    }
    const validateEmail = (email)=>{   
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const validatePassword = (password)=>{
        return password.length > 5
    }

    const validateName = (name)=>{
        return name.length >= 1
    }
    return(
        <Container>
            <Row>
                <Col>
                    <Card className='m-4'>
                        <Card.Body>
                            <Card.Title className="text-center">Signup</Card.Title>
                            <Form>
                            <Form.Group className="mb-3" >
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={onChangeFirstName} isInvalid = {!isValidFirstName}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter first name    
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={onChangeLastName} isInvalid = {!isValidLastName}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter last name
                                    </Form.Control.Feedback>
                                </Form.Group>
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
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Signup