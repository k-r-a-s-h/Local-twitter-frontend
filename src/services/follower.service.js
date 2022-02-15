import axios from "axios";
import authHeader from "../helper/createAuthHeader";
const API_URL = process.env.REACT_APP_API_DOMAIN+"api/follow/";
const getFollowers = () => {
  return axios.get(API_URL,{headers : authHeader()});
}
const createFollower = (userId)=>{
    return axios.post(API_URL+userId,{},{headers : authHeader()})
}
const deleteFollower = (userId)=>{
    return axios.delete(API_URL+userId,{headers : authHeader()})
}
const exportObj = {
    getFollowers,createFollower,deleteFollower
}
export default exportObj