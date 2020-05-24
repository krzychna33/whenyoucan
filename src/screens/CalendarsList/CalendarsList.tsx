import * as React from "react";
import {StoreInteface} from "../../stores/configureStore";
import {startGetAuthMe, startLogout} from "../../actions/auth";
import {connect} from "react-redux";
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {Button, Card, CardActions, CardContent, TextField} from "@material-ui/core";
import {Link, RouteComponentProps} from "react-router-dom";
import {
    deleteCalendar,
    DeleteCalendarResponse,
    getConnectedCalendars,
    getWeeklyCalendars,
    postCreateCalendar, postDisconnectCalendar
} from "../../api/weeklyCalendars";
import * as style from "./style.scss"
import {WeeklyCalendarDao} from "../../api/weeklyCalendars";
import {Header} from "../../components/Header/Header";
import {showErrorsArray} from "../../utils/utils";
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from "@material-ui/core/IconButton";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

interface ICalendarsListProps extends RouteComponentProps {
    auth: AuthReducerInterface,

    startGetAuthMe(): any,

    startLogout(): any
}

interface ICalendarsListState {
    weeklyCalendars: WeeklyCalendarDao[],
    connectedWeeklyCalendars: WeeklyCalendarDao[],
    newCalendarName: string,
    newCalendarDescription: string,
    newCalendarPin: string
}

class CalendarsList extends React.Component<ICalendarsListProps, ICalendarsListState> {

    constructor(props: ICalendarsListProps) {
        super(props);
        this.state = {
            weeklyCalendars: [],
            newCalendarName: "",
            connectedWeeklyCalendars: [],
            newCalendarDescription: "",
            newCalendarPin: "1234"
        }
    }

    componentDidMount(): void {
        getWeeklyCalendars().then((response: any) => {
            if (response.status === 200) {
                this.setState(
                    {weeklyCalendars: response.data.results}
                );
            }
        });
        getConnectedCalendars().then((response: any) => {
            if (response.status === 200) {
                this.setState({
                    connectedWeeklyCalendars: response.data.results
                })
            }
        })

    }

    handleLogout = () => {
        this.props.startLogout().then(() => {
            this.props.history.push("/login");
        })
    };

    onNewCalendarNameChange = (e: any) => {
        this.setState({
            newCalendarName: e.target.value
        })
    };

    onNewCalendarDescriptionChange = (e: any) => {
        this.setState({
            newCalendarDescription: e.target.value
        })
    };

    onNewCalendarPinChange = (e: any) => {
        this.setState({
            newCalendarPin: e.target.value
        })
    };

    createCalendar = () => {
        postCreateCalendar({
            name: this.state.newCalendarName,
            description: this.state.newCalendarDescription,
            pin: this.state.newCalendarPin
        }).then(() => {
            getWeeklyCalendars()
                .then((response: any) => {
                    this.setState({weeklyCalendars: response.data.results});
                })
        })
            .catch((e) => {
                showErrorsArray(e.data.errors);
            })
    }

    deleteCalendar = (id: string) => {
        deleteCalendar(id)
            .then((response) => {
                this.setState({
                    weeklyCalendars: this.state.weeklyCalendars.filter(calendar => {
                        if (calendar._id != id) {
                            return calendar;
                        }
                    })
                })
            })
    }

    disconnectCalendar = (id: string) => {
        postDisconnectCalendar(id)
            .then((response) => {
                this.setState({
                    connectedWeeklyCalendars: this.state.connectedWeeklyCalendars.filter(calendar => {
                        if (calendar._id != id) {
                            return calendar;
                        }
                    })
                })
            })
    }


    render() {
        const {auth} = this.props;
        return (
            <React.Fragment>
                <Header/>
                {
                    !auth.isLoading && auth.user ?
                        <div className={style.container}>
                            <div className={style.content}>
                                <h2>Your own calendars</h2>
                                <div className={style.addCalendar}>
                                    <form>
                                        <div>
                                            <div className={style.addCalendar__1stLine}>
                                                <TextField
                                                    id="name"
                                                    label="Name"
                                                    required
                                                    onChange={this.onNewCalendarNameChange}
                                                    value={this.state.newCalendarName}
                                                />
                                                <TextField
                                                    id="pin"
                                                    label="PIN"
                                                    onChange={this.onNewCalendarPinChange}
                                                    value={this.state.newCalendarPin}
                                                />
                                            </div>
                                            <div className={style.addCalendar__2ndLine}>
                                                <TextField
                                                    id="description"
                                                    label="Short description"
                                                    onChange={this.onNewCalendarDescriptionChange}
                                                    value={this.state.newCalendarDescription}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Button variant="contained" color="primary"
                                                    onClick={this.createCalendar}>Add new</Button>
                                        </div>
                                    </form>
                                </div>
                                <div className={style.calendarsList}>
                                    {
                                        this.state.weeklyCalendars.map((calendar, index) => {
                                            return (
                                                <div key={index}>
                                                    <div className={style.card}>
                                                        <div className={style.card__head}>
                                                            <h4>{calendar.name}</h4>
                                                            <p>{calendar.description}</p>
                                                        </div>
                                                        <div className={style.card__body}>
                                                            <Link to={`/calendar/${calendar._id}`}>
                                                                <Button size="small">View</Button>
                                                            </Link>
                                                            <ConfirmModal
                                                                onApprove={() => {
                                                                    this.deleteCalendar(calendar._id)
                                                                }}
                                                                label={"label"}
                                                                content={"Do you really want to delete it?"}
                                                                approveButton={"Delete"}
                                                            >
                                                                <IconButton><DeleteIcon/></IconButton>
                                                            </ConfirmModal>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    this.state.connectedWeeklyCalendars.length > 0 &&
                                    <div>
                                        <h2>Connected calendars</h2>
                                        <div className={style.calendarsList}>
                                            {
                                                this.state.connectedWeeklyCalendars.map((calendar, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className={style.card}>
                                                                <div className={style.card__head}>
                                                                    <h4>{calendar.name}</h4>
                                                                    <p>{calendar.description}</p>
                                                                </div>
                                                                <div className={style.card__body}>
                                                                    <Link to={`/calendar/${calendar._id}`}>
                                                                        <Button size="small">View</Button>
                                                                    </Link>
                                                                    <ConfirmModal
                                                                        onApprove={() => {
                                                                            this.disconnectCalendar(calendar._id)
                                                                        }}
                                                                        label={"label"}
                                                                        content={"Do you really want to left this calendar?"}
                                                                        approveButton={"Left"}
                                                                    >
                                                                        <IconButton><ClearIcon/></IconButton>
                                                                    </ConfirmModal>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                }

                            </div>
                        </div> :
                        <div>
                            <p>Loading...</p>
                        </div>
                }
            </React.Fragment>

        )
    }
}

const mapStateToProps = (state: StoreInteface) => {
    return {
        auth: state.authReducer
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        startGetAuthMe: () => dispatch(startGetAuthMe()),
        startLogout: () => dispatch(startLogout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarsList);