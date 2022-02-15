import { useState, useEffect, useCallback,useContext } from "react"
import getFeed from "../services/feed.service"
import AuthService from "../services/auth.service"
import UserContext from "../contexts/userContext/userContext";
import Post from "../components/post"
import Typewriter from "typewriter-effect"
import  {useNavigate} from 'react-router-dom'


function Feed({ showToast }) {
    const [posts, setPost] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate()
    const {updateUser} = useContext(UserContext)


    const feed = useCallback(async () => {
        try {
            setisLoading(true)
            let feedData = await getFeed()
            setPost(feedData.data.posts)
            setisLoading(false)
        }
        catch (err) {
            setisLoading(false)
            let errorCode = err?.response?.status 
            if(errorCode && errorCode === 401){
                AuthService.logout()
                updateUser()
                showToast('error','Authentication Failed. Login Again Please!')    
                navigate('/login')
                return;
            }
            let error = err?.response?.data?.status ? err?.response?.data?.status : "Something went wrong"
            showToast('error', error)
        }

    }, [showToast,navigate,updateUser])

    useEffect(() => {
        if (AuthService.getCurrentUser()?.token) {
            feed()
        }
    }, [feed])

    const createPostArray = () => {
        let arrayList = []
        console.log(posts)
        posts.forEach(ele => {
            arrayList.push(<Post key={ele?._id} firstName={ele?.postedBy?.firstName} lastName={ele?.postedBy?.lastName} content={ele?.content} createdAt={ele?.createdAt} />)
        })
        if (arrayList.length>0) {
            return arrayList
        }
        else{
            return <h1 className="text-center m-3">No Posts found. Go follow someone</h1>
        }
    }
    return (
        <>
            {isLoading ? <h1 className="text-center m-3"><Typewriter options={{strings: ['Loading.....'],autoStart: true,loop: true,}} /></h1> : createPostArray()}
        </>
    )
}

export default Feed
