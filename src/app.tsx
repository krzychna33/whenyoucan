import "core-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/global.scss";
import AppRouter from "./routers/AppRouter";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#880e4f',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: green,
    },
    typography: {
        fontSize: 18
    }
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <AppRouter/>
    </ThemeProvider>
    ,
    document.getElementById("app"),
);

