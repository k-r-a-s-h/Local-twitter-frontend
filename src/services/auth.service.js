import axios from "axios";
const API_URL = process.env.REACT_APP_API_DOMAIN+"api/";
const signup = (firstName,lastName, email, password) => {
  return axios.post(API_URL + "signup", {
    firstName,
    lastName,
    email,
    password
  })
  .then((response)=>{
      console.log(response)
      return response.data
  })
}
const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
        console.log(response)
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    })

}

const logout = () => {
  localStorage.removeItem("user");
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
}

const exportObj = {
    signup,
    login,
    logout,
    getCurrentUser,
  };
export default exportObj