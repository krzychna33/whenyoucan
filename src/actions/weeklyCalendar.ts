import * as moment from "moment";
import {ADD_NEW_ATTENDANCE, GET_CALENDAR_ERROR, GET_CALENDAR_FETCH, GET_CALENDAR_SUCCESS} from "./actions.const";
import {UserInterface} from "../Interfaces/userInterface";
import {getWeeklyCalendar} from "../api/weeklyCalendars";
import {WeeklyCalendarDao} from "../Interfaces/Dao/weeklyCalendarDao";


export const addNewAttendance = (time: moment.Moment, user: UserInterface) => {
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
        return getWeeklyCalendar(id).then((response: any) => {
            dispatch(getCalendarSuccess(response.data))
        }).catch(() => {
            dispatch(getCalendarError());
        })
    }
};