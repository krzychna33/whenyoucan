import * as io from "socket.io-client";

const socket = io.connect(process.env.API_URL);

export const disconnectSubscriber = (calendarId: string) => {
    socket.emit('LEAVE_ROOM', {calendarId});
}

export const subscribeToAttendanceEvent = ({userId, calendarId}: any, callback: CallableFunction) => {
    socket.emit("join", {userId, calendarId}, (err: any) => {
        if (err) {
            throw new Error("Error while join socket room")
        }
    })

    socket.on("IO_TYPE_NEW_ATTENDANCE", (args: any) => {
        if (userId !== args.userId) {
            callback()
        }
    })
}