import axios from "axios";
import authHeader from "../helper/createAuthHeader";
const API_URL = process.env.REACT_APP_API_DOMAIN+"api/post/";
const createPost = (content) => {
  return axios.post(API_URL,{content},{headers : authHeader()});
}
const exportObj = {
    createPost
}
export default exportObj