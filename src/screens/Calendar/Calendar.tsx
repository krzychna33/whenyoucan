import * as React from "react";
import WeekView from "../../components/WeekView/WeekView";
import {Button, TextField} from "@material-ui/core";
import * as style from "./style.scss"
import {connect} from "react-redux";
import {StoreInteface} from "../../stores/configureStore";
import {WeeklyCalendarReducerInterface} from "../../reducers/WeeklyCalendarReducer";
import {startGetAuthMe} from "../../actions/auth";
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {CalendarUser, getCalendarUsers, postPushAttendances, postUpdateAttendances} from "../../api/weeklyCalendars";
import {Link, RouteComponentProps} from "react-router-dom"
import {
    clearCalendarCacheData,
    clearDeletedAttendances,
    clearNewAttendances,
    setUsersColors,
    startGetCalendar,
} from "../../actions/weeklyCalendar";
import classNames = require("classnames");
import {UtilsReducerInterface} from "../../reducers/UtilsReducer";
import {disconnectSubscriber, subscribeToAttendanceEvent} from "../../sockets/calendar";
import {toast, Slide} from "react-toastify";
import {NewAttendancesNotify} from "../../components/NewAttendancesNotify/NewAttendacnesNotify";

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

    clearDeletedAttendances(): any

    clearCalendarCacheData(): any,

    authReducer: AuthReducerInterface,
    utilsReducer: UtilsReducerInterface
}

interface ICalendarState {
    calendarUsers: CalendarUser[],
    newAttendancesNotify: boolean,
    shouldRefresh: boolean
}

class Calendar extends React.Component<ICalendarProps, ICalendarState> {

    private fixedApplyBtn = React.createRef<HTMLDivElement>();

    constructor(props: ICalendarProps) {
        super(props);
        this.state = {
            calendarUsers: [],
            newAttendancesNotify: false,
            shouldRefresh: false
        }
    }

    componentWillUnmount(): void {
        const {id} = this.props.match.params;
        disconnectSubscriber(id);
        this.props.clearCalendarCacheData();
    }

    componentDidMount(): void {
        const {id} = this.props.match.params;
        this.props.startGetCalendar(id)
            .then(() => {
                this.props.setUsersColors(this.props.weeklyCalendar.users);
                return this.props.startGetAuthMe();
            })
            .then(() => {

                if (!this.props.weeklyCalendar.users.find((userId) => {
                    if (userId === this.props.authReducer.user._id) {
                        return userId;
                    }
                })) {
                    this.props.history.push(`/calendar/${id}/join`);
                }

                subscribeToAttendanceEvent({
                    userId: this.props.authReducer.user._id,
                    calendarId: id
                }, () => {
                    if (!this.state.newAttendancesNotify) {
                        this.setState({newAttendancesNotify: true}, () => {
                            toast(
                                <NewAttendancesNotify onRefresh={() => {
                                    this.props.startGetCalendar(id).then(() => {
                                        this.setState({shouldRefresh: false})
                                    })
                                }}/>,
                                {
                                    transition: Slide,
                                    position: "top-center",
                                    hideProgressBar: true,
                                    className: style.toastStyle,
                                    autoClose: 5000,
                                    onClose: () => {
                                        this.setState({newAttendancesNotify: false})
                                    }
                                });
                        })
                    }
                    this.setState({shouldRefresh: true})
                })

            });

        getCalendarUsers(id).then((response) => {
            this.setState({calendarUsers: response.data.results})
        });
    }

    componentDidUpdate(prevProps: Readonly<ICalendarProps>, prevState: Readonly<ICalendarState>, snapshot?: any): void {
        if (prevProps.weeklyCalendar.newAttendances.length !== this.props.weeklyCalendar.newAttendances.length) {
            this.animateFixedApplyBtn();
        }
    }

    private animateFixedApplyBtn = () => {
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
        const userId = this.props.authReducer.user._id;
        if (this.props.weeklyCalendar.newAttendances.length > 0 || this.props.weeklyCalendar.deletedAttendances.length > 0) {
            postUpdateAttendances(id, {
                times: this.props.weeklyCalendar.reservedAttendances.find((reservedAttendance) => {
                    if (reservedAttendance.user._id === userId) {
                        return reservedAttendance
                    }
                }).times
            }).then(() => {
                this.props.clearNewAttendances();
                this.props.clearDeletedAttendances();
            })
            // postPushAttendances(id, {
            //     times: this.props.weeklyCalendar.newAttendances
            // }).then(() => {
            //     this.props.clearNewAttendances();
            // });
        }
    };

    copyInvitation = () => {
        const inviteText = `Hi! Join to my calendar at ${process.env.APP_URL}${this.props.location.pathname}/join?pin=1234 ! Calendar PIN: ${this.props.weeklyCalendar.pin}`;
        navigator.clipboard.writeText(inviteText).then(() => {
            toast.success("Copied invitation to clipboard!")
        });
    }

    render() {
        const {weeklyCalendar, authReducer, utilsReducer} = this.props;

        return (
            <React.Fragment>
                {
                    !this.props.weeklyCalendar.isLoading &&  !this.props.authReducer.isLoading && this.props.authReducer.user ?
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
                                            <div className={style.roomInfoHeader}>
                                                <h3>{weeklyCalendar.name}</h3>
                                                <i className={classNames({
                                                    ["fas fa-sync-alt"]: true,
                                                    ["animated pulse infinite"]: this.state.shouldRefresh
                                                })}
                                                   onClick={() => {
                                                       const {id} = this.props.match.params;
                                                       this.props.startGetCalendar(id).then(() => {
                                                           this.setState({shouldRefresh: false})
                                                       })
                                                   }}
                                                />
                                            </div>
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
                                            {
                                                weeklyCalendar.ownerId === authReducer.user._id &&
                                                <div className={style.roomInfo__singleInfo}>
                                                    <Button color={"primary"} onClick={this.copyInvitation}>Copy
                                                        Invitation</Button>
                                                </div>
                                            }
                                            {
                                                weeklyCalendar.description &&
                                                <div className={style.roomInfo__description}>
                                                    <h4>Description</h4>
                                                    <p>{weeklyCalendar.description}</p>
                                                </div>
                                            }
                                            <div className={style.roomInfo__description}>
                                                <h4>Expected Users</h4>
                                                <p><span>{weeklyCalendar.expectedUsersCount ? `Minimum ${weeklyCalendar.expectedUsersCount} people`: "All people connected with calendar"}</span></p>
                                            </div>
                                        </div>
                                        <div className={style.roomInfo__users}>
                                            <h4>Users</h4>
                                            {
                                                this.state.calendarUsers.map((user, index) => (
                                                    <span
                                                        key={index}
                                                        className={style.calendarUser}
                                                        style={{backgroundColor: weeklyCalendar.usersColors[user._id]}}
                                                    >
                                                            {user.firstName} {user.lastName} {user._id === weeklyCalendar.ownerId &&
                                                    <i className="far fa-star"/>}
                                                        </span>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div className={style.yourAttendance}>
                                        <h3>{this.props.authReducer.user.firstName}</h3>
                                        <div className={style.addedAttendances}>
                                            <p>Added {weeklyCalendar.newAttendances.length} attendance
                                                items.</p>
                                            <p>Removed {weeklyCalendar.deletedAttendances.length} attendance
                                                items.</p>
                                            <div>
                                                <Button
                                                    variant={weeklyCalendar.newAttendances.length > 0 || weeklyCalendar.deletedAttendances.length > 0 ? "contained" : "outlined"}
                                                    color={"primary"}
                                                    onClick={this.pushAttendances}
                                                    className={style.disabledBtn}
                                                >
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.links}>
                                        <Link to={"/calendars"}><p><i className="fas fa-chevron-circle-right"/>Back to
                                            Calendars List</p></Link>
                                    </div>
                                </div>
                            </div>
                            <div
                                ref={this.fixedApplyBtn}
                                className={classNames({
                                    [style.applyAttendance__disabled]: weeklyCalendar.newAttendances.length == 0 && weeklyCalendar.deletedAttendances.length == 0,
                                    [style.applyAttendance]: true
                                })}
                                onClick={this.pushAttendances}
                            >
                                <div className={classNames({
                                    [style.applyAttendance__plus]: true,
                                    [style.applyAttendance__plus__show]: weeklyCalendar.newAttendances.length > 0
                                })}>
                                    +{weeklyCalendar.newAttendances.length}
                                </div>
                                <div className={classNames({
                                    [style.applyAttendance__minus]: true,
                                    [style.applyAttendance__minus__show]: weeklyCalendar.deletedAttendances.length > 0
                                })}>
                                    -{weeklyCalendar.deletedAttendances.length}
                                </div>
                                <p>Apply</p>
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
        setUsersColors: (users: string[]) => dispatch(setUsersColors(users)),
        clearDeletedAttendances: () => dispatch(clearDeletedAttendances()),
        clearCalendarCacheData: () => dispatch(clearCalendarCacheData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);