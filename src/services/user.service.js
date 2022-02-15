import axios from "axios";
import authHeader from "../helper/createAuthHeader";
const API_URL = process.env.REACT_APP_API_DOMAIN+"api/user?q=";
const searchUser = (content) => {
  return axios.get(API_URL+content,{headers : authHeader()});
}
const exportObj = {
    searchUser
}
export default exportObj