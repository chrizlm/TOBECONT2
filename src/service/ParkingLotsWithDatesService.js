import http from "./http-common"

const getAll = () => {
    return http.get("/apiv1/parkanddate/all");
};

const getByDateOnly = date => {
    return http.get(`/apiv1/parkanddate/get/${date}`);
};

const addDateToParkingLot = data => {
    return http.post("/apiv1/parkanddate/dates/addtoparklot", data);
};

const getParkingData = locationName => {
    return http.get(`/apiv1/parkanddate/getByLocation/${locationName}`);
};

///get/bylocanddate
const getParkingDataSearch = data => {
    return http.post("/apiv1/parkanddate/get/bylocanddate", data);
};


export default {
    getAll,
    getByDateOnly,
    addDateToParkingLot,
    getParkingData,
    getParkingDataSearch,
};