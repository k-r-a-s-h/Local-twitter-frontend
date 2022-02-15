import { useState,useEffect,useCallback,useContext } from 'react'
import { Card, Container, Row, Col, Form,Button } from 'react-bootstrap'
import Typewriter from 'typewriter-effect'
import UserService from '../services/user.service'
import FollowerService from '../services/follower.service'
import User from './user'
import UserContext from "../contexts/userContext/userContext";
import AuthService from '../services/auth.service'
import  {useNavigate} from 'react-router-dom'


function SearchUser({showToast}){
    const [search,setSearch] = useState('')
    const [hasSearched,setHasSearched] = useState(false)
    const [isValidSearch,setIsValidSearch] = useState(true)
    const [users,setUsers] = useState([])
    const [followers,setFollowers] = useState(new Set())
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate()
    const {updateUser} = useContext(UserContext)


    const getFollowers = useCallback(async()=>{
        try{
            let reponseFollowers = await FollowerService.getFollowers()
            let followersData = reponseFollowers.data.followers
            let setOfId = new Set();
            followersData.forEach(ele=>{
                setOfId.add(ele?._id)
            })
            setFollowers(setOfId)
        }
        catch(err){
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
    },[showToast,navigate,updateUser])

    const followUser = async(userId) =>{
        try{
            await FollowerService.createFollower(userId)
            let set = new Set(followers)
            set.add(userId)
            setFollowers(set)
            const obj = []
            users.forEach(ele=>{
                const obj1 = {...ele}
                if(ele?._id === userId){
                    obj1.isFollowing = true
                }
                obj.push(obj1)
            })
            setUsers(obj)
            showToast('success',"Followed Successfully")

        }
        catch(err){
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

    const unfollowUser = async(userId)=>{
        try{
            await FollowerService.deleteFollower(userId)
            let set = new Set(followers)
            set.delete(userId)
            setFollowers(set)
            const obj = []
            users.forEach(ele=>{
                const obj1 = {...ele}
                if(ele?._id === userId){
                    obj1.isFollowing = false
                }
                obj.push(obj1)
            })
            setUsers(obj)
            showToast('success',"Unfollowed Successfully")
        }
        catch(err){
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
    useEffect(()=>{
        getFollowers()
    },[getFollowers])

    const onChangeSearch = (event) =>{
        setSearch(event.target.value)
        setIsValidSearch(validateSearch(event.target.value))
    }
    const validateSearch = (data)=>{
        return data && data.length>0
    }
    const submit = async(event)=>{
        try{
            if(isValidSearch && search){
                setisLoading(true)
                let response = await UserService.searchUser(search)
                setisLoading(false)
                setHasSearched(true)
                let result = []
                response.data.results.forEach(ele=>{
                    const obj = {...ele}
                    obj.isFollowing = followers.has(ele?._id)
                    result.push(obj)
                }) 
                setUsers(result)
            }
            else{
                showToast('error','Please enter search query')
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
    const createUserList = ()=>{
        let arrayList = []
        users.forEach(ele=>{
            arrayList.push(<User key={ele?._id} id={ele?._id} firstName={ele?.firstName} lastName={ele?.lastName} email={ele?.email} isFollowing={ele?.isFollowing} followUser = {followUser} unfollowUser={unfollowUser}/>)
        })
        if(arrayList.length>0){
            return arrayList
        }
        else if(hasSearched){
            return <h1 className="text-center">No users found with search string</h1>           
        }
        
    }
    return(
        <>
        <Container>
            <Row>
                <Col>
                    <Card className='m-3'>
                        <Card.Body>
                            <Card.Title className="text-center">Search User</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Search User</Form.Label>
                                    <Form.Control type="text" placeholder="Enter any value" value={search} onChange={onChangeSearch} isInvalid = {!isValidSearch}/>
                                    <Form.Control.Feedback type="invalid">
                                        Enter some value to search
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" onClick={submit} disabled={isLoading}>
                                    Search
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container>
            {isLoading ? <h1 className="text-center m-3"><Typewriter options={{strings: ['Loading.....'],autoStart: true,loop: true,}} /></h1> :createUserList()}
        </Container>
        </>
    )
}

export default SearchUser