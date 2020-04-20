import {ReservedAttendances} from "../ReservedAttendances";

export interface WeeklyCalendarDao {
    users: string[],
    name: string,
    ownerId: string,
    reservedAttendances: ReservedAttendances[]
}