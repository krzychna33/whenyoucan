import * as React from "react";
import * as moment from "moment";
import * as style from "./style.scss"
import AddCircleIcon from '@material-ui/icons/AddCircle';

interface IWeeklyCardViewProps {
    day: moment.Moment;
}

interface IWeeklyCardViewState {
    reservedTimes: any
}



class WeeklyCardView extends React.Component<IWeeklyCardViewProps, IWeeklyCardViewState> {

    constructor(props: IWeeklyCardViewProps) {
        super(props);
        this.state = {
            reservedTimes: [
                {
                    user: "Błażej",
                    times: [
                        moment("2020-03-25 17:00:00"),
                        moment("2020-03-27 17:00:00"),
                        moment("2020-03-27 18:00:00"),
                        moment("2020-03-27 12:00:00")
                    ]
                },
                {
                    user: "Krzysiek",
                    times: [
                        moment("2020-03-25 17:00:00"),
                        moment("2020-03-23 18:00:00"),
                        moment("2020-03-23 19:00:00"),
                        moment("2020-03-23 20:00:00"),
                        moment("2020-03-23 21:00:00"),
                        moment("2020-03-27 17:00:00"),
                        moment("2020-03-27 18:00:00"),
                        moment("2020-03-27 12:00:00")
                    ]
                },
                {
                    user: "Laurka",
                    times: [
                        moment("2020-03-25 17:00:00"),
                        moment("2020-03-23 18:00:00"),
                        moment("2020-03-23 19:00:00"),
                        moment("2020-03-23 20:00:00"),
                        moment("2020-03-23 21:00:00"),
                        moment("2020-03-27 17:00:00"),
                        moment("2020-03-27 18:00:00"),
                        moment("2020-03-27 12:00:00")
                    ]
                }
            ]
        }
    }

    renderHours = (): Array<any> => {
        const hoursArray: Array<any> = [];
        const hour = this.props.day.clone();
        hour.minutes(0);
        hour.seconds(0);
        for (let i: number = 0; i<24; i++) {
            let isSame = false;
            const reservedElements: any = [];
            this.state.reservedTimes.forEach((reservedTime: any) => {
                reservedTime.times.forEach((time: moment.Moment) => {
                    if (time.isSame(hour)) {
                        isSame = true;
                        reservedElements.push(
                            <div className={style.reservationElement}>
                                <div
                                    className={style.reservationElement__userLetter}
                                >
                                    <div className={style.userName}>
                                        {reservedTime.user}
                                    </div>
                                    {reservedTime.user.substr(0,1)}
                                </div>
                            </div>
                        )
                    }
                })
            });
            reservedElements.push(<div className={style.addNewReservation}><AddCircleIcon/></div>)

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

export default WeeklyCardView;