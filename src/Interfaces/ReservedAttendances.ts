import {Moment} from "moment";
import {UserInterface} from "./userInterface";

export interface ReservedAttendances {
    user: UserInterface,
    times: Array<Moment>
}