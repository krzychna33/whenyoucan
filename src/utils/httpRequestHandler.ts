import axios from "axios";

export const httpRequestHandler = axios.create({
    baseURL: `http://localhost:3000/`,
    timeout: 0,
    headers: {"Content-Type": "application/json", "Accept": "*/*"}
});

