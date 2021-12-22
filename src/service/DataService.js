import http from "./http-common"

const getLocData = () => {
    return http.get("/apiv1/booking/locdata");
};

const getParkingData = locationName => {
    return http.get(`/apiv1/booking/parkingdata/${locationName}`);
};



export default {
    getLocData,
    getParkingData,
};