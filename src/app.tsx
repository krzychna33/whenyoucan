import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/global.scss";
import AppRouter from "./routers/AppRouter";
import {ThemeProvider} from "@material-ui/core";
import {theme} from "./config/themeConfig";
import {Provider} from 'react-redux';
import configureStore from "./stores/configureStore";
import {setLoggedIn, setLoggedOut} from "./actions/auth";

const store = configureStore();

if (localStorage.token) {
    store.dispatch(setLoggedIn());
} else {
    store.dispatch(setLoggedOut());
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
        <AppRouter/>
        </Provider>
    </ThemeProvider>
    ,
    document.getElementById("app"),
);

