import http from "./http-common"

const changePassword = data =>{
    return http.put("/apiv1/attendant/updatePassword", data);
}

const getAttendantInfo = email =>{
    return http.get(`/apiv1/attendant/get/${email}`);
}

const getAttendant = id =>{
    return http.get(`/apiv1/attendant/getDetails/${id}`);
}

const updateAttendant = data =>{
    return http.put("/apiv1/attendant/update", data);
}



export default {
    changePassword,
    getAttendantInfo,
    getAttendant,
    updateAttendant
};