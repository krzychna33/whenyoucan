import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/global.scss";
import AppRouter from "./routers/AppRouter";
import {ThemeProvider} from "@material-ui/core";
import {theme} from "./config/themeConfig";
import {Provider} from 'react-redux';
import configureStore from "./stores/configureStore";

const store = configureStore();

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
        <AppRouter/>
        </Provider>
    </ThemeProvider>
    ,
    document.getElementById("app"),
);

