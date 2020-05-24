import {createMuiTheme} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import indigo from '@material-ui/core/colors/indigo';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#C2677B',
            main: '#AB304A',
            dark: '#80263d',
            contrastText: '#fff',
        },
        secondary: {
            light: '#BBC4CC',
            main: '#BBC4CC',
            dark: '#BBC4CC',
            contrastText: '#BBC4CC',
        },
        warning: {
            light: '#f7fff7',
            main: '#333533',
            dark: '#242423',
            contrastText: '#fff',
        }
    },
    typography: {
        fontSize: 15
    }
});