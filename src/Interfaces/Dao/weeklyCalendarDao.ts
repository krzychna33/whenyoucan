import {ReservedAttendances} from "../ReservedAttendances";

export interface WeeklyCalendarDao {
    _id: string,
    users: string[],
    name: string,
    ownerId: string,
    pin?: string,
    reservedAttendances: ReservedAttendances[]
}