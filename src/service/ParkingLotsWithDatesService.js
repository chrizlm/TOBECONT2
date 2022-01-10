import http from "./http-common"

const getAll = () => {
    return http.get("/apiv1/parkanddate/all");
};

const get = date => {
    return http.get(`/apiv1/parkanddate/get/${date}`);
};

const addDateToParkingLot = data => {
    return http.post("/apiv1/parkanddate/dates/addtoparklot", data);
};

const getParkingData = locationName => {
    return http.get(`/apiv1/parkanddate/getByLocation/${locationName}`);
};



export default {
    getAll,
    get,
    addDateToParkingLot,
    getParkingData,
};