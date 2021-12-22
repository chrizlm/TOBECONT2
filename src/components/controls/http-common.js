import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/api/motorist",
    headers: {
        "Cotent-type":"application/json"
    }
});