import {UserInterface} from "../Interfaces/userInterface";
import {WeeklyCalendarReducerInterface} from "./WeeklyCalendarReducer";

export interface AuthReducerInterface {
    user: UserInterface
}

const authReducerDefaultState: AuthReducerInterface = {
    user: {
        id: 1,
        name: "Krzysiek Surażyński"
    }
};


export default (state: AuthReducerInterface = authReducerDefaultState, action: any) => {
    switch (action.type) {
        default:
            return state
    }
}