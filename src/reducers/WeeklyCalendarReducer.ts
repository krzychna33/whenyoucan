import * as moment from "moment";
import {Moment} from "moment";
import {
    ADD_NEW_ATTENDANCE, CLEAR_NEW_ATTENDANCES,
    GET_CALENDAR_ERROR,
    GET_CALENDAR_FETCH,
    GET_CALENDAR_SUCCESS, SET_USERS_COLORS
} from "../actions/actions.const";
import {WeeklyCalendarDao} from "../api/weeklyCalendars";


export interface UsersColors {
    [key: string]: string
}

export interface WeeklyCalendarReducerInterface extends WeeklyCalendarDao{
    isLoading: boolean,
    newAttendances: Array<Moment>
    usersColors: UsersColors;
}

const weeklyCardReducerDefaultState: WeeklyCalendarReducerInterface = {
    _id: "",
    users: [],
    name: "",
    ownerId: "",
    isLoading: false,
    reservedAttendances: [],
    newAttendances: [],
    usersColors: {}
};

export default (state: WeeklyCalendarReducerInterface = weeklyCardReducerDefaultState, action: any) => {
    switch (action.type) {
        case GET_CALENDAR_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case GET_CALENDAR_SUCCESS:
            return {
                ...state,
                ...action.data,
                newAttendances: [],
                isLoading: false
            };
        case GET_CALENDAR_ERROR:
            return {
                ...state,
                isLoading: false
            };
        case ADD_NEW_ATTENDANCE:
            const reservedAttendances = state.reservedAttendances.map((attendance) => {
                if (action.data.user._id == attendance.user._id) {
                    return {
                        ...attendance,
                        times: [...attendance.times, action.data.time]
                    }
                }
                return attendance
            });
            return {
                ...state,
                reservedAttendances,
                newAttendances: [
                    ...state.newAttendances,
                    action.data.time
                ]
            };
        case CLEAR_NEW_ATTENDANCES:
            return {
                ...state,
                newAttendances: []
            }
        case SET_USERS_COLORS:
            return {
                ...state,
                usersColors: action.data
            }
        default:
            return state
    }
}
