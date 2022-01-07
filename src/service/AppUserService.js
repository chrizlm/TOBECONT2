import  axios from "axios";
import qs from 'qs';

import http from "./http-common"

import authHeader from "./auth-header";

const sendHeader ={
    headers: { 'content-type': 'application/x-www-form-urlencoded'}
}

const login = data => {
   /*
    const options = {

        method: 'POST',
        headers: {
            Accept: "application/json",
            'content-type': 'application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": '*',
        },
        data: qs.stringify(data),

    };
    return axios("http://localhost:8080/apiv1/appUser/login",options);

    */

    return http.post("/apiv1/appUser/login", data);
};

const refreshToken = () =>{
    return http.get("/apiv1/appUser/token/refresh");
}



/*
 const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        URL: "http://localhost:8080/apiv1/appUser/login"
    };
   return axios(options);
 */



export default {
    login,
    refreshToken,
};