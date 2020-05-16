import * as moment from "moment";
import {
    ADD_NEW_ATTENDANCE,
    CLEAR_NEW_ATTENDANCES,
    GET_CALENDAR_ERROR,
    GET_CALENDAR_FETCH,
    GET_CALENDAR_SUCCESS
} from "./actions.const";
import {UserDAO} from "../api/auth";
import {getWeeklyCalendar} from "../api/weeklyCalendars";
import {WeeklyCalendarDao} from "../api/weeklyCalendars";
import {AxiosResponse} from "../Interfaces/AxiosResponse";


export const addNewAttendance = (time: moment.Moment, user: UserDAO) => {
    return {
        type: ADD_NEW_ATTENDANCE,
        data: {
            time, user
        }
    }
};

const getCalendarFetch = () => (
    {
        type: GET_CALENDAR_FETCH
    }
);

const getCalendarSuccess = (calendar: WeeklyCalendarDao) => (
    {
        type: GET_CALENDAR_SUCCESS,
        data: calendar
    }
);

const getCalendarError = () => (
    {
        type: GET_CALENDAR_ERROR
    }
);

export const startGetCalendar = (id: string) => {
    return (dispatch: any) => {
        dispatch(getCalendarFetch());
        return getWeeklyCalendar(id).then((response: AxiosResponse<WeeklyCalendarDao>) => {
            dispatch(getCalendarSuccess(response.data))
        }).catch(() => {
            dispatch(getCalendarError());
        })
    }
};

export const clearNewAttendances = () => (
    {
        type: CLEAR_NEW_ATTENDANCES
    }
)