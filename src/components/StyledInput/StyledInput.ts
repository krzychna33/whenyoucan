import {TextField, withStyles} from "@material-ui/core";

export const StyledInput = withStyles({
    root: {
        '& input': {
            color: '#BBC4CC'
        },
        '& label': {
            color: '#BBC4CC',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#BBC4CC',
        }
    },
})(TextField);