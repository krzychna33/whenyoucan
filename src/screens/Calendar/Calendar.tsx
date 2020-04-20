import * as React from "react";
import WeekView from "../../components/WeekView/WeekView";
import {Button, TextField} from "@material-ui/core";
import * as style from "./style.scss"
import {connect} from "react-redux";
import {StoreInteface} from "../../stores/configureStore";
import {WeeklyCalendarReducerInterface} from "../../reducers/WeeklyCalendarReducer";
import {startGetAuthMe} from "../../actions/auth";
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {postPushAttendances} from "../../api/weeklyCalendars";
import {RouteComponentProps} from "react-router-dom"

interface MatchParams {
    id: string
}

interface ICalendarProps extends RouteComponentProps<MatchParams> {
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

    pushAttendances = () => {
        const {id} = this.props.match.params;
        postPushAttendances(id, {
            times: this.props.weeklyCalendar.newAttendances
        });
    };

    render() {
        return (
            <React.Fragment>
                {
                    !this.props.authReducer.isLoading && this.props.authReducer.user ?
                        <div className={style.container} style={{overflowX: 'hidden'}}>
                            <div
                                className={style.drawer}
                            >
                                <div className={style.roomInfo}>
                                    <h3>{this.props.weeklyCalendar.name}</h3>
                                    <TextField id="outlined-basic" label="Invite URL" variant="outlined"
                                               value={`whenyoucan.app${this.props.location.pathname}/join`}/>
                                </div>
                                <div className={style.yourAttendance}>
                                    <h3>{this.props.authReducer.user.firstName}</h3>
                                    <div className={style.addedAttendances}>
                                        <p>You have added {this.props.weeklyCalendar.newAttendances.length} attendance
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);