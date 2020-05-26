import * as React from "react";
import * as moment from "moment";
import * as style from "./style.scss"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {connect} from "react-redux";
import {StoreInteface} from "../../../stores/configureStore";
import {addNewAttendance, deleteNewAttendance} from "../../../actions/weeklyCalendar";
import {ReservedAttendances} from "../../../Interfaces/ReservedAttendances";
import {UserDAO} from "../../../api/auth";
import {Moment} from "moment";
import {UsersColors} from "../../../reducers/WeeklyCalendarReducer";
import classNames = require("classnames");
import AddIcon from '@material-ui/icons/Add';
import ErrorIcon from '@material-ui/icons/Error';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const ITEMS_TO_DISPLAY = 3;

interface IWeeklyCardViewProps {
    day: moment.Moment
    user: UserDAO,
    reservedAttendances: ReservedAttendances[],
    addNewAttendance(time: moment.Moment, user: UserDAO): any,
    deleteNewAttendance(time: moment.Moment, user: UserDAO): any,
    usersColors: UsersColors,
    usersCount: number
}

class WeeklyCardView extends React.Component<IWeeklyCardViewProps> {

    constructor(props: IWeeklyCardViewProps) {
        super(props);
    }

    handleNewAttendance = (event: { preventDefault: () => void; target: any; currentTarget: any; }, hourHook: moment.Moment, hasOwnAttendance: boolean) => {
        event.preventDefault();
        if (event.target === event.currentTarget && !hasOwnAttendance) {
            this.props.addNewAttendance(hourHook, this.props.user);
        }
    }

    handleAttendanceDelete = (hourHook: moment.Moment, hasOwnAttendance: boolean) => {
        if (hasOwnAttendance) {
            this.props.deleteNewAttendance(hourHook, this.props.user);
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
                                    {reservedTime.user.firstName.toUpperCase().substr(0, 1)}
                                </div>
                            </div>
                        )
                    }
                })
            });


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
                                reservedElements.map((item: any, index: number) => {
                                    if (index < ITEMS_TO_DISPLAY) {
                                        return item;
                                    }
                                })
                            }
                            {
                                reservedElements.length >= ITEMS_TO_DISPLAY+1 &&
                                <div
                                    key={"_" + reservedElements.length+1}
                                    className={style.lastReservationElement}>
                                    <div
                                        className={style.lastReservationElement__userLetter}
                                    >
                                        <div className={style.restUsers}>
                                            {reservedElements.map((item: any, index: number) => {
                                                if (index >= ITEMS_TO_DISPLAY) {
                                                    return item;
                                                }
                                            })}
                                        </div>
                                        +{reservedElements.length-ITEMS_TO_DISPLAY}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={style.dailyHour__notifications}>
                        {
                            !hasOwnAttendance &&
                            <div
                                key={i}
                                className={style.addNewReservation}
                                onClick={() => {
                                    this.props.addNewAttendance(hourHook, this.props.user)
                                }}
                            >
                                <AddCircleOutlineIcon/>
                            </div>
                        }
                        {
                            hasOwnAttendance &&
                            <div
                                key={i}
                                className={style.removeReservation}
                                onClick={() => {
                                    this.handleAttendanceDelete(hourHook, hasOwnAttendance);
                                }}
                            >
                                <RemoveCircleOutlineIcon/>
                            </div>
                        }
                        {
                            usersCount-hourUsers <= 0.5 * usersCount && usersCount-hourUsers != 0 ?
                            <span className={style.neededUsers}><AddIcon/> {usersCount-hourUsers}</span>:
                            <span className={style.neededUsers} style={{visibility: "hidden"}}><AddIcon/> {usersCount-hourUsers}</span>
                        }
                        {
                            usersCount-hourUsers <= 0.5 * usersCount && usersCount-hourUsers != 0 && !hasOwnAttendance ?
                                <span className={style.youLeftWarn}><ErrorIcon/></span>:
                                <span className={style.youLeftWarn}style={{visibility: "hidden"}}><ErrorIcon/></span>
                        }
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
                    <div className={classNames({
                        [style.header__dayName]: true,
                        [style.header__dayName__today]: this.props.day.isSame(moment(), 'day')
                    })}>
                        <span>{this.props.day.format("dddd")}</span>
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
        addNewAttendance: (time: moment.Moment, user: UserDAO) => dispatch(addNewAttendance(time, user)),
        deleteNewAttendance: (time: moment.Moment, user: UserDAO) => dispatch(deleteNewAttendance(time, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyCardView);