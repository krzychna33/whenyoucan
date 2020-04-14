import {deleteAuthLogout, getAuthMe, postLogin} from "../api/auth";
import {
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FETCH,
    POST_LOGIN_ERROR,
    GET_AUTH_ME_ERROR,
    GET_AUTH_ME_SUCCESS, GET_AUTH_ME_FETCH, SET_LOGGED_IN, SET_LOGGED_OUT, DELETE_LOGOUT_FETCH
} from "./actions.const";


const postLoginSuccess = () => (
    {
        type: POST_LOGIN_SUCCESS
    }
);

const postLoginFetch = () => (
    {
        type: POST_LOGIN_FETCH
    }
);

const postLoginError = () => (
    {
        type: POST_LOGIN_ERROR
    }
);


export const startPostLogin = (email: string, password: string) => {
    return (dispatch: any) => {
        dispatch(postLoginFetch());
        return postLogin(email, password).then((response: any) => {
            localStorage.setItem('token', response.data.token);
            dispatch(postLoginSuccess());
        }).catch((e) => {
            dispatch(postLoginError());
        })
    }
};

const getAuthMeError = () => (
    {
        type: GET_AUTH_ME_ERROR
    }
);

const getAuthMeSuccess = (user: any) => (
    {
        type: GET_AUTH_ME_SUCCESS,
        data: {
            user
        }
    }
);

const getAuthMeFetch = () => (
    {
        type: GET_AUTH_ME_FETCH
    }
);

export const startGetAuthMe = () => {
    getAuthMeFetch();
    return (dispatch: any) => {
        dispatch(getAuthMeFetch());
        return getAuthMe().then((response: any) => {
            dispatch(getAuthMeSuccess(response.data));
        }).catch((e) => {
            dispatch(getAuthMeError());
        })
    }
};

export const setLoggedIn = () => ({
    type: SET_LOGGED_IN
});

export const setLoggedOut = () => ({
    type: SET_LOGGED_OUT
});

export const startLogout = () => {
    return (dispatch: any) => {
        return deleteAuthLogout().then(() => {
            localStorage.removeItem('token');
            dispatch(setLoggedOut());
        });
    }
};
