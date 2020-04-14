import * as React from "react";
import * as moment from "moment";
import * as style from "./style.scss"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {connect} from "react-redux";
import {StoreInteface} from "../../../stores/configureStore";
import {addNewAttendance} from "../../../actions/weeklyCalendar";
import {ReservedAttendances} from "../../../Interfaces/ReservedAttendances";
import {UserInterface} from "../../../Interfaces/userInterface";

interface IWeeklyCardViewProps {
    day: moment.Moment
    user: UserInterface,
    reservedAttendances: ReservedAttendances[],
    addNewAttendance: any
}

class WeeklyCardView extends React.Component<IWeeklyCardViewProps> {

    constructor(props: IWeeklyCardViewProps) {
        super(props);
    }

    renderHours = (): Array<any> => {
        const hoursArray: Array<any> = [];
        const hour = this.props.day.clone();
        hour.minutes(0);
        hour.seconds(0);
        for (let i: number = 0; i<24; i++) {
            const hourHook = hour.clone();
            let isSame = false;
            const reservedElements: any = [];
            let hasOwnAttendance = false;
            this.props.reservedAttendances.forEach((reservedTime: any) => {
                reservedTime.times.forEach((time: moment.Moment) => {
                    if (time.isSame(hour)) {
                        isSame = true;
                        if (reservedTime.user._id === this.props.user._id) {
                            hasOwnAttendance = true;
                        }
                        reservedElements.push(
                            <div className={style.reservationElement}>
                                <div
                                    className={style.reservationElement__userLetter}
                                >
                                    <div className={style.userName}>
                                        {reservedTime.user.firstName}
                                    </div>
                                    {reservedTime.user.firstName.substr(0,1)}
                                </div>
                            </div>
                        )
                    }
                })
            });
            if (!hasOwnAttendance) {
                reservedElements.push(
                    <div className={style.addNewReservation}
                         onClick={() => {
                             this.props.addNewAttendance(hourHook, this.props.user)
                         }}
                    >
                        <AddCircleIcon/>
                    </div>
                )
            }


            hoursArray.push(
                <div className={style.dailyHour}>
                    <div>
                        {
                            hour.format("HH:mm")
                        }
                    </div>
                    <div className={style.dailyHour__reservedElements}>
                        {
                            reservedElements
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
        addNewAttendance: (time: moment.Moment, user: UserInterface) => dispatch(addNewAttendance(time, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyCardView);