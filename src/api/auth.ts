import {httpRequestHandler} from "../utils/httpRequestHandler";

export const postLogin = (email: string, password: string) => {
    return new Promise( (resolve, reject) => {
        httpRequestHandler.post('/auth/login', {
            email,
            password
        }).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};

export const getAuthMe = () => {
    const token = localStorage.getItem('token')
    console.log(token)
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise( (resolve, reject) => {
        httpRequestHandler.get('/auth/me', options).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};

export const deleteAuthLogout = () => {
    const token = localStorage.getItem('token')
    const options = {
        headers: {"x-auth": `${token}`}
    };

    return new Promise( (resolve, reject) => {
        httpRequestHandler.delete('/auth/logout', options).then((response) => {
            resolve(response);
        }).catch((e) => {
            reject(e.response);
        })
    });
};