import * as React from "react";
import WeekView from "../../Components/WeekView/WeekView";
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Button
} from "@material-ui/core";
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import * as style from "./style.scss"
import {connect} from "react-redux";
import {UserInterface} from "../../Interfaces/userInterface";
import {StoreInteface} from "../../stores/configureStore";
import {WeeklyCalendarReducerInterface} from "../../reducers/WeeklyCalendarReducer";

const drawerWidth = 320;

const useStyles = (theme: Theme) => (
    {
        root: {
            display: 'flex',
            maxWidth: '100vw',
            height: '100vh'
        },
        toolbar: theme.mixins.toolbar,
    }
);

interface ICalendarProps {
    classes: any,
    user: UserInterface,
    weeklyCalendar: WeeklyCalendarReducerInterface
}

class Calendar extends React.Component<ICalendarProps>{
    constructor(props: ICalendarProps) {
        super(props);
    }

    render () {
        const {classes} = this.props;
        return (
            <div className={classes.root} style={{overflowX: 'hidden'}}>

                <Drawer
                    className={style.drawer}
                    variant="permanent"
                    classes={{
                        paper: style.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={style.roomInfo}>
                        <h3>Room #1,</h3>
                        <p>Owner: Krzysztof Surażyński</p>
                    </div>
                    <div  className={style.yourAttendance}>
                        <h3>{this.props.user.name}</h3>
                        <p>You have added {this.props.weeklyCalendar.newAttendances.length} attendance items.</p>
                        <Button variant="contained" color="secondary">
                            Apply
                        </Button>
                    </div>
                </Drawer>
                <main
                    className={style.content}
                >
                    <WeekView/>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreInteface) => {
    return {
        user: state.authReducer.user,
        weeklyCalendar: state.weeklyCalendar
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Calendar));