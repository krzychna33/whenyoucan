import * as React from "react";
import WeekView from "../../components/WeekView/WeekView";
import {Button, TextField} from "@material-ui/core";
import * as style from "./style.scss"
import {connect} from "react-redux";
import {StoreInteface} from "../../stores/configureStore";
import {WeeklyCalendarReducerInterface} from "../../reducers/WeeklyCalendarReducer";
import {startGetAuthMe} from "../../actions/auth";
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {CalendarUser, getCalendarUsers, postPushAttendances} from "../../api/weeklyCalendars";
import {RouteComponentProps} from "react-router-dom"
import {clearNewAttendances} from "../../actions/weeklyCalendar";

interface MatchParams {
    id: string
}

interface ICalendarProps extends RouteComponentProps<MatchParams> {
    classes: any,
    weeklyCalendar: WeeklyCalendarReducerInterface,

    startGetAuthMe(): any,

    clearNewAttendances(): any,

    authReducer: AuthReducerInterface
}

interface ICalendarState {
    calendarUsers: CalendarUser[]
}

class Calendar extends React.Component<ICalendarProps, ICalendarState> {

    constructor(props: ICalendarProps) {
        super(props);
        this.state = {
            calendarUsers: []
        }

    }

    componentDidMount(): void {
        const {id} = this.props.match.params;

        this.props.startGetAuthMe();
        getCalendarUsers(id).then((response) => {
            this.setState({calendarUsers: response.data.results})
        })
    }

    pushAttendances = () => {
        const {id} = this.props.match.params;
        postPushAttendances(id, {
            times: this.props.weeklyCalendar.newAttendances
        }).then(() => {
            this.props.clearNewAttendances();
        });
    };

    render() {
        const {weeklyCalendar, authReducer} = this.props;

        return (
            <React.Fragment>
                {
                    !this.props.authReducer.isLoading && this.props.authReducer.user ?
                        <div className={style.container} style={{overflowX: 'hidden'}}>
                            <div
                                className={style.drawer}
                            >
                                <div className={style.roomInfo}>
                                    <div>
                                        <h3>{weeklyCalendar.name}</h3>
                                        <div className={style.roomInfo__singleInfo}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Invite URL"
                                                variant="outlined"
                                                value={`${process.env.APP_URL}${this.props.location.pathname}/join`}/>
                                        </div>
                                        {
                                            weeklyCalendar.ownerId === authReducer.user._id &&
                                            <div className={style.roomInfo__singleInfo}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="PIN"
                                                    variant="outlined"
                                                    value={`${weeklyCalendar.pin}`}/>
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        <div>
                                            {
                                                this.state.calendarUsers.map((user) => (
                                                    <span className={style.calendarUser}>
                                                            {user.firstName} {user.lastName} {user._id === weeklyCalendar.ownerId &&
                                                    <i className="far fa-star"></i>}
                                                        </span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className={style.yourAttendance}>
                                    <h3>{this.props.authReducer.user.firstName}</h3>
                                    <div className={style.addedAttendances}>
                                        <p>You have added {weeklyCalendar.newAttendances.length} attendance
                                            items.</p>
                                        <div>
                                            <Button variant="contained" color="primary" onClick={this.pushAttendances}>
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        clearNewAttendances: () => dispatch(clearNewAttendances())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);