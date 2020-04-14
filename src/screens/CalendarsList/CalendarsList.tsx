import * as React from "react";
import {StoreInteface} from "../../stores/configureStore";
import {setLoggedOut, startGetAuthMe, startLogout} from "../../actions/auth";
import {connect} from "react-redux";
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {Button, Card, CardContent, CardActions} from "@material-ui/core";
import {Link, RouteComponentProps} from "react-router-dom";
import {getWeeklyCalendars} from "../../api/weeklyCalendars";


interface ICalendarsListProps extends RouteComponentProps {
    auth: AuthReducerInterface,
    startGetAuthMe(): any,
    startLogout(): any
}

interface ICalendarsListState {
    weeklyCalendars: any[]
}

class CalendarsList extends React.Component<ICalendarsListProps, ICalendarsListState> {

    constructor(props: ICalendarsListProps) {
        super(props);
        this.state = {
            weeklyCalendars: []
        }
    }
    componentDidMount(): void {
        this.props.startGetAuthMe();
        getWeeklyCalendars().then((response: any) => {
            this.setState({weeklyCalendars: response.data.results});
        })
    }

    handleLogout = () => {
        this.props.startLogout().then(() => {
            this.props.history.push("/login");
        })
    };

    render() {
        const {auth} = this.props;
        return (
            <React.Fragment>
                {
                    !auth.isLoading && auth.user ?
                    <div>
                        <div>
                            <h3>Hi {auth.user.firstName}!</h3>
                            <Button variant="contained" color="primary" onClick={this.handleLogout}>Logout</Button>
                        </div>
                        <h1>Your calendars</h1>
                        {
                            this.state.weeklyCalendars.map((calendar) => {
                                return (
                                    <Card>
                                        <CardContent>
                                            <p>{calendar.name}</p>
                                        </CardContent>
                                        <CardActions>
                                            <Link to={`/calendar/${calendar._id}`}>
                                                <Button size="small">View</Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                )
                            })
                        }
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