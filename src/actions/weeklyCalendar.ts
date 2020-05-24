import * as moment from "moment";
import {
    ADD_NEW_ATTENDANCE,
    CLEAR_NEW_ATTENDANCES,
    GET_CALENDAR_ERROR,
    GET_CALENDAR_FETCH,
    GET_CALENDAR_SUCCESS,
    SET_USERS_COLORS
} from "./actions.const";
import {UserDAO} from "../api/auth";
import {getWeeklyCalendar} from "../api/weeklyCalendars";
import {WeeklyCalendarDao} from "../api/weeklyCalendars";
import {AxiosResponse} from "../Interfaces/AxiosResponse";
import {getRandomColor, getRandomColorList} from "../utils/utils";
import {UsersColors} from "../reducers/WeeklyCalendarReducer";


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



export const setUsersColors = (users: string[]) => {
    let usersColors: UsersColors = {}
    const colorList: string[] = getRandomColorList(users.length);
    users.forEach((user, index) => {
        usersColors[user] = colorList[index];
    })

    return {
        type: SET_USERS_COLORS,
        data: usersColors
    }
}