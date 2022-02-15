import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Post from "./components/post";
import Signup from "./components/signup";
import Feed from "./components/feed";
import UserState from "./contexts/userContext/userState";
import CreatePost from "./components/createPost";
import SearchUser from "./components/searchUser";
import ProtectedRoutes from "./components/protectedRoutes";
import UnprotectedRoutes from "./components/unProtectedRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from "./components/landingPage";
import NotFound from "./components/notFound";


function App() {
  const showToast = (type,message,statusCode) =>{
    if(type === 'success'){
      toast.success(message, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
      return
    }
    if(type === 'error'){
      toast.error(message, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
        return
    }
  }
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
        />
        <UserState>
          <Navbar showToast={showToast}/>
          <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
            <Route element={<UnprotectedRoutes/>}>
              <Route path="/login" element={<Login showToast={showToast}/>}></Route>
              <Route path="/signup" element={<Signup showToast={showToast}/>}></Route>
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/post" element={<Post showToast={showToast}/>}></Route>
              <Route path="/feed" element={<Feed showToast={showToast}/>}></Route>
              <Route path="/newpost" element={<CreatePost showToast={showToast}/>}></Route >
              <Route path="/searchuser" element={<SearchUser showToast={showToast}/>}></Route>
            </Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </UserState>
      </BrowserRouter>
    </div>
  );
}

export default App;
