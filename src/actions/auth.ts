import {
    RegisterUserDao,
    RegisterUserDto,
    deleteAuthLogout,
    getAuthMe,
    postLogin,
    postRegister,
    UserDAO,
    postLoginFacebook,
    LoginFacebookDAO
} from "../api/auth";
import {
    GET_AUTH_ME_ERROR,
    GET_AUTH_ME_FETCH,
    GET_AUTH_ME_SUCCESS,
    POST_LOGIN_ERROR,
    POST_LOGIN_FACEBOOK_ERROR,
    POST_LOGIN_FACEBOOK_FETCH,
    POST_LOGIN_FACEBOOK_SUCCESS,
    POST_LOGIN_FETCH,
    POST_LOGIN_SUCCESS,
    POST_SIGNUP_ERROR,
    POST_SIGNUP_FETCH,
    POST_SIGNUP_SUCCESS,
    SET_LOGGED_IN,
    SET_LOGGED_OUT
} from "./actions.const";
import {toast} from "react-toastify";
import {AxiosResponse, AxiosError} from "axios";
import {showErrorMessage, showErrorsArray} from "../utils/utils";

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
        return postLogin({email, password}).then((response) => {
            localStorage.setItem('token', response.data.token);
            dispatch(postLoginSuccess());
        }).catch((e) => {
            showErrorMessage(e.data.message);
            dispatch(postLoginError());
        })
    }
};

const getAuthMeError = () => (
    {
        type: GET_AUTH_ME_ERROR
    }
);

const getAuthMeSuccess = (user: UserDAO) => (
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
    return (dispatch: any) => {
        dispatch(getAuthMeFetch());
        return getAuthMe().then((response) => {
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

export const postSignUpFetch = () => ({
    type: POST_SIGNUP_FETCH
});

export const postSignUpSuccess = () => ({
    type: POST_SIGNUP_SUCCESS
});

export const postSignUpError = () => ({
    type: POST_SIGNUP_ERROR
});


export const startPostSignUp = (data: RegisterUserDto) => {
    return (dispatch: any) => {
        dispatch(postSignUpFetch());
        return postRegister(data).then((response: AxiosResponse<RegisterUserDao>) => {
            localStorage.setItem("token", response.data.token);
            dispatch(postSignUpSuccess());
            toast.success("You have been successfully registered");
        }).catch((e) => {
            showErrorsArray(e.data.errors);
            dispatch(postSignUpError())
        })
    }
};

export const postLoginFacebookFetch = () => ({
    type: POST_LOGIN_FACEBOOK_FETCH
});

export const postLoginFacebookSuccess = () => ({
    type: POST_LOGIN_FACEBOOK_SUCCESS
});

export const postLoginFacebookError = () => ({
    type: POST_LOGIN_FACEBOOK_ERROR
});

export const startPostLoginFacebook = (access_token: string, user_id: string) => {
    return (dispatch: any) => {
        dispatch(postLoginFacebookFetch());
        postLoginFacebook({access_token, user_id}).then((response: AxiosResponse<LoginFacebookDAO>) => {
            localStorage.setItem('token', response.data.token);
            dispatch(postLoginFacebookSuccess());
        }).catch((e) => {
            showErrorMessage(e.data.message);
            dispatch(postLoginFacebookError());
        })
    }
}
