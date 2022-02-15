import axios from "axios";
import authHeader from "../helper/createAuthHeader";
const API_URL = process.env.REACT_APP_API_DOMAIN+"api/feed/";
const getFeed = () => {
  return axios.get(API_URL,{headers : authHeader()});
}

export default getFeed