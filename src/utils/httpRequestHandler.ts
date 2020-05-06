import axios from "axios";

export const httpRequestHandler = axios.create({
    baseURL: `${process.env.API_URL}/`,
    timeout: 0,
    headers: {"Content-Type": "application/json", "Accept": "*/*"}
});

