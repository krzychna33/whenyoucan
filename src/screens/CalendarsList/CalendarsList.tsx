import * as React from "react";
import {StoreInteface} from "../../stores/configureStore";
import {startGetAuthMe, startLogout} from "../../actions/auth";
import {connect} from "react-redux";
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {Button, Card, CardActions, CardContent, TextField} from "@material-ui/core";
import {Link, RouteComponentProps} from "react-router-dom";
import {getConnectedCalendars, getWeeklyCalendars, postCreateCalendar} from "../../api/weeklyCalendars";
import * as style from "./style.scss"
import {WeeklyCalendarDao} from "../../api/weeklyCalendars";
import {Header} from "../../components/Header/Header";

interface ICalendarsListProps extends RouteComponentProps {
    auth: AuthReducerInterface,
    startGetAuthMe(): any,
    startLogout(): any
}

interface ICalendarsListState {
    weeklyCalendars: WeeklyCalendarDao[],
    connectedWeeklyCalendars: WeeklyCalendarDao[],
    newCalendarName: string
}

class CalendarsList extends React.Component<ICalendarsListProps, ICalendarsListState> {

    constructor(props: ICalendarsListProps) {
        super(props);
        this.state = {
            weeklyCalendars: [],
            newCalendarName: "",
            connectedWeeklyCalendars: []
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

    createCalendar = () => {
        postCreateCalendar({name: this.state.newCalendarName}).then(() => {
            getWeeklyCalendars().then((response: any) => {
                this.setState({weeklyCalendars: response.data.results});
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
                                            <TextField id="standard-basic" label="Name" required
                                                       onChange={this.onNewCalendarNameChange}/>
                                        </div>
                                        <div>
                                            <Button variant="contained" color="primary"
                                                    onClick={this.createCalendar}>Add new</Button>
                                        </div>
                                    </form>
                                </div>
                                <div className={style.calendarsList}>
                                    {
                                        this.state.weeklyCalendars.map((calendar) => {
                                            return (
                                                <div>
                                                    <Card className={style.card}>
                                                        <CardContent>
                                                            <p>{calendar.name}</p>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Link to={`/calendar/${calendar._id}`}>
                                                                <Button size="small">View</Button>
                                                            </Link>
                                                        </CardActions>
                                                    </Card>
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
                                                this.state.connectedWeeklyCalendars.map((calendar) => {
                                                    return (
                                                        <div>
                                                            <Card className={style.card}>
                                                                <CardContent>
                                                                    <p>{calendar.name}</p>
                                                                </CardContent>
                                                                <CardActions>
                                                                    <Link to={`/calendar/${calendar._id}`}>
                                                                        <Button size="small">View</Button>
                                                                    </Link>
                                                                </CardActions>
                                                            </Card>
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