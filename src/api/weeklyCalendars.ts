import {httpRequestHandler} from "../utils/httpRequestHandler";
import {ReservedAttendances} from "../Interfaces/ReservedAttendances";
import {AxiosError, AxiosPromise, AxiosResponse} from "axios";


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

export interface WeeklyCalendarDao {
    _id: string,
    users: string[],
    name: string,
    ownerId: string,
    pin?: string,
    reservedAttendances: ReservedAttendances[]
}

export const getWeeklyCalendar = (id: string) => {
    const token = localStorage.getItem('token')
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise( (resolve, reject) => {
        httpRequestHandler.get<AxiosResponse<WeeklyCalendarDao>>(`weekly-calendars/${id}`, options).then((response) => {
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

export const getConnectedCalendars = () => {
    const token = localStorage.getItem('token')
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise( (resolve, reject) => {
        httpRequestHandler.get(`weekly-calendars/connected`, options).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};

export interface CalendarUser {
    email: string,
    firstName: string,
    lastName: string,
    _id: string
}

export interface CalendarUsersDAO {
    results: CalendarUser[]
}

export const getCalendarUsers = (calendarId: string): AxiosPromise<CalendarUsersDAO> => {
    const token = localStorage.getItem('token')
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise( (resolve, reject) => {
        httpRequestHandler.get<CalendarUsersDAO>(`weekly-calendars/${calendarId}/users`, options).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
}