import * as moment from "moment";
import {ADD_NEW_ATTENDANCE} from "./actions.const";
import {UserInterface} from "../Interfaces/userInterface";


export const addNewAttendance = (time: moment.Moment, user: UserInterface) => {
    return {
        type: ADD_NEW_ATTENDANCE,
        data: {
            time, user
        }
    }
};