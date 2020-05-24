import * as React from "react";
import * as moment from "moment";
import * as style from "./style.scss"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {connect} from "react-redux";
import {StoreInteface} from "../../../stores/configureStore";
import {addNewAttendance} from "../../../actions/weeklyCalendar";
import {ReservedAttendances} from "../../../Interfaces/ReservedAttendances";
import {UserDAO} from "../../../api/auth";
import {Moment} from "moment";
import {UsersColors} from "../../../reducers/WeeklyCalendarReducer";
import classNames = require("classnames");

interface IWeeklyCardViewProps {
    day: moment.Moment
    user: UserDAO,
    reservedAttendances: ReservedAttendances[],
    addNewAttendance: any,
    usersColors: UsersColors,
    usersCount: number
}

class WeeklyCardView extends React.Component<IWeeklyCardViewProps> {

    constructor(props: IWeeklyCardViewProps) {
        super(props);
    }

    handleNewAttendance = (event: { preventDefault: () => void; target: any; currentTarget: any; }, hourHook: any, hasOwnAttendance: boolean) => {
        event.preventDefault();
        if (event.target === event.currentTarget && !hasOwnAttendance) {
            this.props.addNewAttendance(hourHook, this.props.user);
        }
    }

    renderHours = (): Array<any> => {
        const hoursArray: Array<any> = [];
        const hour = this.props.day.clone();
        const {usersCount} = this.props;
        hour.minutes(0);
        hour.seconds(0);
        for (let i: number = 0; i < 24; i++) {
            const hourHook = hour.clone();
            let isSame = false;
            const reservedElements: any = [];
            let hasOwnAttendance = false;
            let hourUsers = 0;
            this.props.reservedAttendances.forEach((reservedTime: any, index) => {
                reservedTime.times.forEach((time: string) => {
                    const parsedTime: Moment = moment(time);
                    if (parsedTime.isSame(hour)) {
                        isSame = true;
                        hourUsers++;
                        if (reservedTime.user._id === this.props.user._id) {
                            hasOwnAttendance = true;
                        }
                        reservedElements.push(
                            <div
                                key={"_" + index}
                                className={style.reservationElement}>
                                <div
                                    className={style.reservationElement__userLetter}
                                    style={{backgroundColor: this.props.usersColors[reservedTime.user._id]}}
                                >
                                    <div className={style.userName}>
                                        {reservedTime.user.firstName}
                                    </div>
                                    {reservedTime.user.firstName.substr(0, 1)}
                                </div>
                            </div>
                        )
                    }
                })
            });
            if (!hasOwnAttendance) {
                reservedElements.push(
                    <div
                        key={i}
                        className={style.addNewReservation}
                        onClick={() => {
                            this.props.addNewAttendance(hourHook, this.props.user)
                        }}
                    >
                        <AddCircleOutlineIcon/>
                    </div>
                )
            }


            hoursArray.push(
                <div
                    key={i}
                    className={classNames({
                        [style.dailyHour]: true,
                        [style.goodDailyHour]: hourUsers === usersCount
                    })}
                >
                    <div
                        className={classNames({
                            [style.hourCursor]: !hasOwnAttendance,
                            [style.goodHour]: hourUsers === usersCount
                        })}
                        onClick={(event) => this.handleNewAttendance(event, hourHook, hasOwnAttendance)}
                    >
                        {
                            hour.format("HH:mm")
                        }
                    </div>
                    <div className={style.dailyHour__workingElements}>
                        <div className={style.dailyHour__reservedElements}>
                            {
                                reservedElements
                            }
                        </div>
                    </div>
                </div>
            )
            hour.add(1, "hour");
        }

        return hoursArray;
    }

    render() {
        return (
            <div className={style.weeklyCardView}>
                <div className={style.header}>
                    <div className={style.header__dayName}>
                        {
                            this.props.day.format("dddd")
                        }
                    </div>
                    <div className={style.header__dayNo}>
                        {
                            this.props.day.format("DD")
                        }
                    </div>
                </div>
                <div className={style.dailyHours}>
                    {
                        this.renderHours()
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreInteface) => {
    return {
        user: state.authReducer.user
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addNewAttendance: (time: moment.Moment, user: UserDAO) => dispatch(addNewAttendance(time, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyCardView);