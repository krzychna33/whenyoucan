import {httpRequestHandler} from "../utils/httpRequestHandler";
import {ReservedAttendances} from "../Interfaces/ReservedAttendances";

export const getWeeklyCalendars = () => {
    const token = localStorage.getItem('token')
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

export const getWeeklyCalendar = (id: string) => {
    const token = localStorage.getItem('token')
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise( (resolve, reject) => {
        httpRequestHandler.get(`weekly-calendars/${id}`, options).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};

export const postPushAttendances = (id: string, body: any) => {
    const token = localStorage.getItem('token')
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise( (resolve, reject) => {
        httpRequestHandler.post(`weekly-calendars/push-attendances/${id}`, body, options).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};

export const postCreateCalendar = (body: any) => {
    const token = localStorage.getItem('token')
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise( (resolve, reject) => {
        httpRequestHandler.post(`weekly-calendars`, body, options).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};

export const postJoinCalendar = (id: string, pin: string) => {
    const token = localStorage.getItem('token')
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise( (resolve, reject) => {
        httpRequestHandler.post(`weekly-calendars/join/${id}`, {pin}, options).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};

export const getPublicWeeklyCalendar = (id: string) => {
    console.log("FFFF")
    return new Promise( (resolve, reject) => {
        httpRequestHandler.get(`weekly-calendars/public/${id}`).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};