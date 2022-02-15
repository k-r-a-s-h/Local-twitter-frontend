import { useState,useContext } from 'react'
import {Container,Row,Form,Card,Col,Button} from 'react-bootstrap'
import PostService from '../services/post.service'
import AuthService from '../services/auth.service'
import UserContext from "../contexts/userContext/userContext";
import  {useNavigate} from 'react-router-dom'

function CreatePost({showToast}) {
    const [post,setPost] = useState("")
    const [isValidPost,setIsValidPost] = useState(true)
    const [isLoading, setisLoading] = useState(false)
    const {updateUser} = useContext(UserContext)


    const navigate = useNavigate()

    const onChangePost = (event)=>{
        setPost(event.target.value)
        setIsValidPost(validatePost(event.target.value))
    }

    const validatePost = (data)=>{
        return data && data.length>0 
    }

    const submit = async(event)=>{
        try{
            if(isValidPost && post){
                setisLoading(true)
                await PostService.createPost(post)
                setisLoading(false)
                //show status 
                showToast('success',"Post created successfully")
                navigate('/feed')
            }
            else{
                showToast('error','Please enter some value for post')
            }
        }
        catch(err){
            setisLoading(false)
            let errorCode = err?.response?.status 
            if(errorCode && errorCode === 401){
                AuthService.logout();
                updateUser()
                showToast('error','Authentication Failed. Login Again Please!')    
                navigate('/login')
                return;
            }
            let error = err?.response?.data?.status ? err?.response?.data?.status : "Something went wrong"
            showToast('error',error)
        }
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Card className="m-3">
                        <Card.Body>
                            <Card.Title className="text-center">Write A New Post</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Enter Some Post</Form.Label>
                                    <Form.Control as="textarea" rows={4} value={post} onChange={onChangePost} isInvalid={!isValidPost}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter some content
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" onClick={submit} disabled={isLoading}>
                                    Post
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CreatePost