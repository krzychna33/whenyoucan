import * as React from "react";
import WeekView from "../../Components/WeekView/WeekView";
import {Button, Drawer} from "@material-ui/core";
import {Theme, withStyles} from '@material-ui/core/styles';
import * as style from "./style.scss"
import {connect} from "react-redux";
import {UserInterface} from "../../Interfaces/userInterface";
import {StoreInteface} from "../../stores/configureStore";
import {WeeklyCalendarReducerInterface} from "../../reducers/WeeklyCalendarReducer";
import {startGetAuthMe} from "../../actions/auth";
import {AuthReducerInterface} from "../../reducers/AuthReducer";

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
    weeklyCalendar: WeeklyCalendarReducerInterface,
    startGetAuthMe(): any,
    authReducer: AuthReducerInterface
}

class Calendar extends React.Component<ICalendarProps> {

    constructor(props: ICalendarProps) {
        super(props);
    }

    componentDidMount(): void {
        this.props.startGetAuthMe();
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                {
                    !this.props.authReducer.isLoading && this.props.authReducer.user ?
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
                                <div className={style.yourAttendance}>
                                    <h3>{this.props.authReducer.user.firstName}</h3>
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
                        </div> :
                        <div>
                            Loading...
                        </div>
                }
            </React.Fragment>

        )
    }
}

const mapStateToProps = (state: StoreInteface) => {
    return {
        authReducer: state.authReducer,
        weeklyCalendar: state.weeklyCalendar
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        startGetAuthMe: () => dispatch(startGetAuthMe()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Calendar));