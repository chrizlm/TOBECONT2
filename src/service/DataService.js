import http from "./http-common"

const getFreeSpace = parkingLotName =>{
    return http.get(`/apiv1/booking/freeSpace/${parkingLotName}`);
}

const getOccupiedSpaces = parkingLotName =>{
    return http.get(`/apiv1/booking/occupiedSpaces/${parkingLotName}`);
}

const getLocData = () => {
    return http.get("/apiv1/booking/locdata");
};

const getParkingData = locationName => {
    return http.get(`/apiv1/booking/parkingdata/${locationName}`);
};



export default {
    getFreeSpace,
    getOccupiedSpaces,
    getLocData,
    getParkingData,
};