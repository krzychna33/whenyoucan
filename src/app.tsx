import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/global.scss";
import * as style from "./styles/global.scss";
import AppRouter from "./routers/AppRouter";
import {ThemeProvider} from "@material-ui/core";
import {theme} from "./config/themeConfig";
import {Provider} from 'react-redux';
import configureStore from "./stores/configureStore";
import {setLoggedIn, setLoggedOut} from "./actions/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();

if (localStorage.token) {
    store.dispatch(setLoggedIn());
} else {
    store.dispatch(setLoggedOut());
}


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <ToastContainer
                position="bottom-right"
            />
            <AppRouter/>
        </Provider>
    </ThemeProvider>
    ,
    document.getElementById("app"),
);

