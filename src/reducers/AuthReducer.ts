import {UserInterface} from "../Interfaces/userInterface";
import {WeeklyCalendarReducerInterface} from "./WeeklyCalendarReducer";
import {
    GET_AUTH_ME_ERROR,
    GET_AUTH_ME_FETCH,
    GET_AUTH_ME_SUCCESS,
    POST_LOGIN_ERROR,
    POST_LOGIN_FETCH,
    POST_LOGIN_SUCCESS, SET_LOGGED_IN, SET_LOGGED_OUT
} from "../actions/actions.const";

export interface AuthReducerInterface {
    user?: UserInterface,
    isAuthenticated: boolean,
    isLoading: boolean
}

const authReducerDefaultState: AuthReducerInterface = {
    user: undefined,
    isAuthenticated: false,
    isLoading: false
};


export default (state: AuthReducerInterface = authReducerDefaultState, action: any) => {
    switch (action.type) {
        case POST_LOGIN_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case SET_LOGGED_IN:
        case POST_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true
            };
        case POST_LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false
            };
        case GET_AUTH_ME_FETCH:
            return {
                ...state,
                isLoading: true
            };
        case GET_AUTH_ME_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.data.user
            };
        case GET_AUTH_ME_ERROR:
            return {
                ...state,
                isLoading: false,
                user: null
            };
        case SET_LOGGED_OUT:
            return {
                ...state,
                isLoading: false,
                user: null,
                isAuthenticated: false
            };
        default:
            return state
    }
}