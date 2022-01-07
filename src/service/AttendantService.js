import http from "./http-common"


const getAttendant = id =>{
    return http.get(`/apiv1/attendant/getDetails/${id}`);
}

const updateAttendant = data =>{
    return http.put("/apiv1/attendant/update", data);
}



export default {
    getAttendant,
    updateAttendant
};