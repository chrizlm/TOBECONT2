import axios from "axios";
const API_URL = "http://localhost:8080";

const register = (motoristID, firstName, lastName, email, gender, password) =>{
    return axios.post(API_URL + "/apiv1/motorist/save", {
        motoristID,
        firstName,
        lastName,
        email,
        gender,
        password,
    });
};

const login = (username, password) =>{
    return axios.post(API_URL + "/api/login", {
        username,
        password,
    }).then((response) => {
        if(response.data.accessToken){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () =>{
    localStorage.removeItem("user");
};

const getCurrentUser = () =>{
    return JSON.parse(localStorage.getItem("user"));
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
}



