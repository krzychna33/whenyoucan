import {httpRequestHandler} from "../utils/httpRequestHandler";

export const getWeeklyCalendars = () => {
    const token = localStorage.getItem('token')
    console.log(token);
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise( (resolve, reject) => {
        httpRequestHandler.get('/weekly-calendars/own', options).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};