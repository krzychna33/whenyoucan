import * as moment from "moment";
import {Moment} from "moment";
import {
    ADD_NEW_ATTENDANCE,
    GET_CALENDAR_ERROR,
    GET_CALENDAR_FETCH,
    GET_CALENDAR_SUCCESS
} from "../actions/actions.const";
import {ReservedAttendances} from "../Interfaces/ReservedAttendances";
import {WeeklyCalendarDao} from "../Interfaces/Dao/weeklyCalendarDao";


export interface WeeklyCalendarReducerInterface extends WeeklyCalendarDao{
    isLoading: boolean,
    newAttendances: Array<Moment>
}

const weeklyCardReducerDefaultState: WeeklyCalendarReducerInterface = {
    users: [],
    name: "",
    ownerId: "",
    isLoading: false,
    reservedAttendances: [],
    newAttendances: []
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
        default:
            return state
    }
}
