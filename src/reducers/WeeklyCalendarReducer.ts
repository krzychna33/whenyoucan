import * as moment from "moment";
import {Moment} from "moment";
import {ADD_NEW_ATTENDANCE} from "../actions/actions.const";
import {ReservedAttendances} from "../Interfaces/ReservedAttendances";


export interface WeeklyCalendarReducerInterface {
    reservedAttendances: ReservedAttendances[],
    newAttendances: Array<Moment>

}

const weeklyCardReducerDefaultState: WeeklyCalendarReducerInterface = {
    reservedAttendances: [
        // {
        //     user: {
        //         _id: "23e23",
        //         firstName: "Błażej",
        //         lastName: "kk",
        //         email: "dssd@dwem.pl"
        //     },
        //     times: [
        //         moment("2020-03-25 17:00:00"),
        //         moment("2020-03-27 17:00:00"),
        //         moment("2020-03-27 18:00:00"),
        //         moment("2020-03-27 12:00:00")
        //     ]
        // },
        // {
        //     user: {
        //         _id: "2323",
        //         firstName: "Krzysiek",
        //         lastName: "kk",
        //         email: "sdsds@ww.pl"
        //     },
        //     times: [
        //         moment("2020-03-25 17:00:00"),
        //         moment("2020-03-23 18:00:00"),
        //         moment("2020-03-23 19:00:00"),
        //     ]
        // },
        // {
        //     user: {
        //         _id: "232323",
        //         firstName: "Laurka",
        //         lastName: "dsds",
        //         email: "dsds@ew.pl"
        //     },
        //     times: [
        //         moment("2020-03-25 17:00:00"),
        //         moment("2020-03-23 18:00:00"),
        //         moment("2020-03-23 19:00:00"),
        //         moment("2020-03-23 20:00:00"),
        //         moment("2020-03-23 21:00:00"),
        //         moment("2020-03-27 17:00:00"),
        //         moment("2020-03-27 18:00:00"),
        //         moment("2020-03-27 12:00:00")
        //     ]
        // }
    ],
    newAttendances: []
};

export default (state: WeeklyCalendarReducerInterface = weeklyCardReducerDefaultState, action: any) => {
    switch (action.type) {
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
