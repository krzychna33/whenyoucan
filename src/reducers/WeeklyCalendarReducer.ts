import * as moment from "moment";
import {Moment} from "moment";
import {
    ADD_NEW_ATTENDANCE,
    CLEAR_CALENDAR_CACHE_DATA,
    CLEAR_DELETED_ATTENDANCES,
    CLEAR_NEW_ATTENDANCES,
    DELETE_NEW_ATTENDANCE,
    GET_CALENDAR_ERROR,
    GET_CALENDAR_FETCH,
    GET_CALENDAR_SUCCESS,
    SET_USERS_COLORS
} from "../actions/actions.const";
import {WeeklyCalendarDao} from "../api/weeklyCalendars";


export interface UsersColors {
    [key: string]: string
}

export interface WeeklyCalendarReducerInterface extends WeeklyCalendarDao {
    isLoading: boolean,
    newAttendances: Array<Moment>,
    deletedAttendances: Array<Moment>
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
    deletedAttendances: [],
    usersColors: {}
};

export default (state: WeeklyCalendarReducerInterface = weeklyCardReducerDefaultState, action: any) => {
    switch (action.type) {
        case CLEAR_CALENDAR_CACHE_DATA:
            return weeklyCardReducerDefaultState;
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
                deletedAttendances: [],
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
                deletedAttendances: state.deletedAttendances.filter((attendance) => {
                    if (!attendance.isSame(action.data.time)) {
                        return attendance;
                    }
                }),
                newAttendances: state.deletedAttendances.find((item) => {
                    if (item.isSame(action.data.time)) {
                        return item
                    }
                }) ?
                    state.newAttendances :
                    [
                        ...state.newAttendances,
                        action.data.time
                    ]
            };
        case DELETE_NEW_ATTENDANCE:
            return {
                ...state,
                newAttendances: state.newAttendances.filter((attendance) => {
                    if (!attendance.isSame(action.data.time)) {
                        return attendance;
                    }
                }),
                deletedAttendances: state.newAttendances.find((item) => {
                    if (item.isSame(action.data.time)) {
                        return item
                    }
                }) ?
                    state.deletedAttendances :
                    [
                        ...state.deletedAttendances,
                        action.data.time
                    ],
                reservedAttendances: state.reservedAttendances.map((attendance) => {
                    if (action.data.user._id == attendance.user._id) {
                        return {
                            ...attendance,
                            times: attendance.times.filter((time) => {
                                const parsedTime = moment(time);
                                if (!parsedTime.isSame(action.data.time)) {
                                    return time;
                                }
                            })
                        }
                    }
                    return attendance
                })
            }
        case CLEAR_NEW_ATTENDANCES:
            return {
                ...state,
                newAttendances: []
            }
        case CLEAR_DELETED_ATTENDANCES:
            return {
                ...state,
                deletedAttendances: []
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
