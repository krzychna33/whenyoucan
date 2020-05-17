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
import {Link, RouteComponentProps} from "react-router-dom"
import {clearNewAttendances, setUsersColors, startGetCalendar} from "../../actions/weeklyCalendar";
import classNames = require("classnames");
import {UtilsReducerInterface} from "../../reducers/UtilsReducer";

interface MatchParams {
    id: string
}

interface ICalendarProps extends RouteComponentProps<MatchParams> {
    classes: any,
    weeklyCalendar: WeeklyCalendarReducerInterface,
    startGetAuthMe(): any,
    clearNewAttendances(): any,
    startGetCalendar(id: string): any
    setUsersColors(users: string[]): any
    authReducer: AuthReducerInterface,
    utilsReducer: UtilsReducerInterface
}

interface ICalendarState {
    calendarUsers: CalendarUser[]
}

class Calendar extends React.Component<ICalendarProps, ICalendarState> {

    private fixedApplyBtn = React.createRef<HTMLDivElement>();

    constructor(props: ICalendarProps) {
        super(props);
        this.state = {
            calendarUsers: []
        }
    }

    componentDidMount(): void {
        const {id} = this.props.match.params;
        this.props.startGetCalendar(id).then(() => {
            this.props.setUsersColors(this.props.weeklyCalendar.users);
        });
        this.props.startGetAuthMe();
        getCalendarUsers(id).then((response) => {
            this.setState({calendarUsers: response.data.results})
        })
    }

    componentDidUpdate(prevProps: Readonly<ICalendarProps>, prevState: Readonly<ICalendarState>, snapshot?: any): void {
        if (prevProps.weeklyCalendar.newAttendances.length !== this.props.weeklyCalendar.newAttendances.length) {
            this.animateFixedApplyBtn();
        }
    }

    private animateFixedApplyBtn = () => {
        console.log(this.fixedApplyBtn.current)

        this.fixedApplyBtn.current.classList.add("animated")
        this.fixedApplyBtn.current.classList.add("pulse")
        this.fixedApplyBtn.current.addEventListener("animationend", this.fixedApplyBtnHandleAnimationEnd)
    }

    private fixedApplyBtnHandleAnimationEnd = () => {
        this.fixedApplyBtn.current.classList.remove("animated")
        this.fixedApplyBtn.current.classList.remove("pulse")
        this.fixedApplyBtn.current.removeEventListener("animationend", this.fixedApplyBtnHandleAnimationEnd)
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
        const {weeklyCalendar, authReducer, utilsReducer} = this.props;

        return (
            <React.Fragment>
                {
                    !this.props.authReducer.isLoading && this.props.authReducer.user ?
                        <div className={style.container} style={{overflowX: 'hidden'}}>
                            <div
                                className={classNames({
                                    [style.drawer]: true,
                                    [style.drawer__hidden]: !utilsReducer.isLeftMenuOpen
                                })}
                            >
                                <div>
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
                                                    this.state.calendarUsers.map((user, index) => (
                                                        <span
                                                            key={index}
                                                            className={style.calendarUser}
                                                            style={{backgroundColor: weeklyCalendar.usersColors[user._id]}}
                                                        >
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
                                    <div className={style.links}>
                                        <Link to={"/calendars"}><p><i className="fas fa-chevron-circle-right"/>Back to Calendars List</p></Link>
                                    </div>
                                </div>
                            </div>
                            <div
                                ref={this.fixedApplyBtn}
                                className={classNames({
                                    [style.applyAttendance]: true
                                })}
                                onClick={this.pushAttendances}
                            >
                                Apply ({weeklyCalendar.newAttendances.length})
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
        weeklyCalendar: state.weeklyCalendar,
        utilsReducer: state.utilsReducer
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        startGetAuthMe: () => dispatch(startGetAuthMe()),
        clearNewAttendances: () => dispatch(clearNewAttendances()),
        startGetCalendar: (id: string) => dispatch(startGetCalendar(id)),
        setUsersColors: (users: string[]) => dispatch(setUsersColors(users))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);