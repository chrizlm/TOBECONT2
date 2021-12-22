import  axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080";

const getParkingContent = () =>{
    return axios.get(API_URL + "/apiv1/parkingLot/all", );
};

const getMotoristContent = () =>{
    return axios.get(API_URL + "/apiv1/motorist/all", { headers: authHeader()});
};

export default {
    getParkingContent,
    getMotoristContent,
};
