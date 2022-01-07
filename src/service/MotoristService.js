import http from "./http-common"


const registerMotorist = data =>{
    return http.post("/apiv1/motorist/save", data);
}

const getMotorist = id =>{
    return http.get(`/apiv1/motorist/getDetails/${id}`);
}

const updateMotorist = data =>{
    return http.put("/apiv1/motorist/update", data);
}

const deleteMotorist = id =>{
    return http.delete(`/apiv1/motorist/${id}`);
}



export default {
    registerMotorist,
    getMotorist,
    updateMotorist,
    deleteMotorist,
};