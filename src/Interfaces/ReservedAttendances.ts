import {UserDAO} from "../api/auth";

export interface ReservedAttendances {
    user: UserDAO,
    times: Array<string>
}