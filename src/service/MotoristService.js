import http from "./http-common"
import authHeader from "./auth-header";


export function getAll(){
    return http.get("/apiv1/motorist/all",{ headers: authHeader() });
}

export function get(motoristId){
    return http.get(`/apiv1/motorist/${motoristId}`, { headers: authHeader() });
}

export function create(data){
    return http.post("/apiv1/motorist/create", data);
}

export function update(motoristId, data){
    return http.put(`/apiv1/motorist/update/${motoristId}`, data)
}

export function deleteMotorist(motoristId){
    return http.delete(`/apiv1/motorist/${motoristId}`);
}

export function deleteAll(){
    return http.delete(`/apiv1/motorist/removeAll`);
}



/* class MotoristService{
    getAll(){
        return http.get("/all");
    }

    get(motoristId){
        return http.get(`/${motoristId}`);
    }

    create(data){
        return http.post("/create", data);
    }

    update(motoristId, data){
        return http.put(`/update/${motoristId}`, data)
    }

    delete(motoristId){
        return http.delete(`/${motoristId}`);
    }

    deleteAll(){
        return http.delete(`/removeAll`);
    }
}

export default new MotoristService(); */