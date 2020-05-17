import * as React from "react";
import * as moment from "moment";
import * as style from "./style.scss"
import WeeklyCardView from "./WeeklyCardView/WeeklyCardView";
import Button from '@material-ui/core/Button';
import {connect} from "react-redux"
import {WeeklyCalendarReducerInterface} from "../../reducers/WeeklyCalendarReducer";
import {StoreInteface} from "../../stores/configureStore";
import {ReservedAttendances} from "../../Interfaces/ReservedAttendances";
import {withRouter, RouteComponentProps, Link} from "react-router-dom";
import {Moment} from "moment";
import {CalendarViewHeader} from "../CalendarViewHeader/CalendarViewHeader";

interface MatchParams {
    id: string
}

interface IWeekViewState {
    offset: number,
    weekPointer: moment.Moment
}

interface IWeekViewProps extends RouteComponentProps<MatchParams>{
    weeklyCalendar: WeeklyCalendarReducerInterface
}

class WeekView extends React.Component<IWeekViewProps, IWeekViewState> {

    constructor(props: any) {
        super(props);
        this.state = {
            offset: 0,
            weekPointer: moment().startOf("week").add(1, 'day')
        }
    }


    setCurrentWeek = () => {
        const today = moment();
        let {offset} = this.state;
        if (offset < 0) {
            offset = offset * -1;
            today.subtract(offset, "week");
        } else {
            today.add(offset, "week");
        }
        this.setState({
            weekPointer: today.startOf("week").add(1, 'day')
        }, () => {

        });
    };

    increaseOffset = () => {
        this.setState({
            offset: this.state.offset + 1
        }, () => {
            this.setCurrentWeek();
        });
    };


    decreaseOffset = () => {
        this.setState({
            offset: this.state.offset - 1
        }, () => {
            this.setCurrentWeek();
        });
    };

    renderDays = (): Array<any> => {
        const days = [];
        const {weekPointer} = this.state;


        for (let i: number = 0; i<7; i++) {
            let dayCopy = weekPointer.clone();
            dayCopy.add(i, "day");
            const dataToSend: ReservedAttendances[] = this.props.weeklyCalendar.reservedAttendances.map((userData) => {
                const times = userData.times.filter((time) => {
                    const parsedTime: Moment = moment(time);
                    if (parsedTime.isSame(dayCopy, "day")) {
                        return time;
                    }
                });
                return {
                    ...userData,
                    times
                }
            });


            days.push(
                <WeeklyCardView
                    key={i}
                    day={dayCopy}
                    reservedAttendances={dataToSend}
                    usersColors={this.props.weeklyCalendar.usersColors}
                    usersCount={this.props.weeklyCalendar.users.length}
                />
            )
        }
        return days;
    }

    render() {
        return (
            <div className={style.container}>
                <CalendarViewHeader
                    decreaseOffset={this.decreaseOffset}
                    increaseOffset={this.increaseOffset}
                    weekPointer={this.state.weekPointer}
                />
                <div className={style.weekView}>
                    {this.renderDays()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreInteface) => {
    return {
        weeklyCalendar: state.weeklyCalendar
    }
};


export default withRouter(connect(mapStateToProps)(WeekView));