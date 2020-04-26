import {httpRequestHandler} from "../utils/httpRequestHandler";
import {AxiosError, AxiosPromise, AxiosResponse} from "axios";

export interface ErrorDAO {
    message: string
}

export interface LoginDTO {
    email: string,
    password: string
}

export interface LoginDAO {
    token: string
}

export const postLogin = ({email, password}: LoginDTO): AxiosPromise<LoginDAO> => {
    return new Promise((resolve, reject) => {
        httpRequestHandler.post<LoginDAO>('/auth/login', {
            email,
            password
        }).then((response) => {
            response.data.token;
            resolve(response);
        }).catch((e: AxiosError<ErrorDAO>) => {
            reject(e.response);
        })
    });
};

export interface UserDAO {
    _id: string,
    email: string,
    firstName: string,
    lastName: string
}

export const getAuthMe = (): AxiosPromise<UserDAO> => {
    const token = localStorage.getItem('token')
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise((resolve, reject) => {
        httpRequestHandler.get<UserDAO>('/auth/me', options)
            .then((response) => {
                resolve(response);
            }).catch((e: AxiosError<ErrorDAO>) => {
            reject(e.response);
        })
    });
};

export interface LogoutDAO {
    message: string
}

export const deleteAuthLogout = (): AxiosPromise<LogoutDAO> => {
    const token = localStorage.getItem('token');
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise((resolve, reject) => {
        httpRequestHandler.delete<LogoutDAO>('/auth/logout', options).then((response) => {
            resolve(response);
        }).catch((e: AxiosError<ErrorDAO>) => {
            reject(e.response);
        })
    });
};


export interface RegisterUserDto {
    email: string,
    password: string,
    lastName: string,
    firstName: string
}

export interface RegisterUserDao {
    token: string
}

export const postRegister = ({email, password, firstName, lastName}: RegisterUserDto) => {
    return new Promise((resolve, reject) => {
        httpRequestHandler.post<RegisterUserDao>('/auth/register', {
            email,
            password,
            firstName,
            lastName
        }).then((response: AxiosResponse<RegisterUserDao>) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};

export interface LoginFacebookDTO {
    access_token: string,
    user_id: string
}

export const postLoginFacebook = ({access_token, user_id}: LoginFacebookDTO) => {
    return new Promise((resolve, reject) => {
        httpRequestHandler.post<RegisterUserDao>('/auth/facebook-login', {
            access_token,
            user_id
        }).then((response: AxiosResponse<any>) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};