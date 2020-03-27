import * as React from "react";
import * as moment from "moment";
import {Moment} from "moment";
import * as _ from "lodash";
import * as style from "./style.scss"
import MonthlyDayCard from "./MonthlyDayCard/MonthlyDayCard";

interface ICalendarState {
    offset: number,
    monthPointer: moment.Moment,
    firstDayOfMonth?: number,
    daysInMonth?: number,
    prevMonth?: moment.Moment,
    nextMonth?: moment.Moment,
    prevMonthDaysCount?: number,
    nextMonthDaysCount?: number,
}

class MonthView extends React.Component<any, ICalendarState> {

    constructor(props: any) {
        super(props);
        this.state = {
            offset: 0,
            monthPointer: moment().startOf("month"),
            firstDayOfMonth: undefined,
            daysInMonth: undefined
        }
    }

    componentDidMount(): void {
        this.setFirstDayOfMonth();
        this.setDaysInMonth();
        this.setMonthsPointers(this.state.monthPointer)
    }

    setFirstDayOfMonth = () => {
        const day = this.state.monthPointer.isoWeekday();
        this.setState({
            firstDayOfMonth: day
        })
    };

    setDaysInMonth = () => {
        const days = this.state.monthPointer.daysInMonth();
        this.setState({
            daysInMonth: days
        })
    };

    getCurrentMonth = () => {
        const today = moment();
        let {offset} = this.state;
        if (offset < 0) {
            offset = offset * -1;
            today.subtract(offset, "month");
        } else {
            today.add(offset, "month");
        }
        this.setState({
            monthPointer: today.startOf("month")
        }, () => {
            this.setFirstDayOfMonth()
            this.setDaysInMonth();
            this.setMonthsPointers(this.state.monthPointer)
        });
    };

    setMonthsPointers = (today: Moment) => {
        const prevMonth = today.clone();
        const nextMonth = today.clone();
        prevMonth.subtract(1, "month");
        nextMonth.add(1, "month");
        const prevMonthDaysCount = prevMonth.daysInMonth();
        const nextMonthDaysCount = nextMonth.daysInMonth();
        this.setState({
            prevMonth,
            nextMonth,
            prevMonthDaysCount,
            nextMonthDaysCount
        })
    }

    increaseOffset = () => {
        this.setState({
            offset: this.state.offset + 1
        }, () => {
            this.getCurrentMonth();
        });
    };


    decreaseOffset = () => {
        this.setState({
            offset: this.state.offset - 1
        }, () => {
            this.getCurrentMonth();
        });
    };


    renderDays = (): Array<any> => {
        const days = [];
        let beforeCounter = 0;
        let monthDaysCounter = 1;
        let nextMonthCounter = 1;
        let firstDay = this.state.firstDayOfMonth;
        for (let i = 0; i < 42; i++) {
            if (firstDay - beforeCounter - 1 > 0) {
                beforeCounter++;
                days.push(
                    <MonthlyDayCard dayNumber={this.state.prevMonthDaysCount - this.state.firstDayOfMonth + 2 + i}/>
                )
            } else {
                if (monthDaysCounter <= this.state.daysInMonth) {
                    days.push(
                        <MonthlyDayCard dayNumber={monthDaysCounter}/>
                    );
                    monthDaysCounter++;
                } else {
                    days.push(
                        <MonthlyDayCard dayNumber={nextMonthCounter}/>
                    );
                    nextMonthCounter++;
                }
            }

        }
        return days;
    };


    render() {
        const grouppedDays = _.chunk(this.renderDays(), 7).map((group, index) => {
            return <div key={index}>{group}</div>
        });

        return (
            <div>
                <div>
                    <div>
                        <button
                            onClick={this.decreaseOffset}
                        >
                            PREVIOUS MONTH
                        </button>
                    </div>
                    <div>
                        {
                            this.state.monthPointer.format("MMMM YYYY")
                        }
                    </div>
                    <div>
                        <button
                            onClick={this.increaseOffset}
                        >
                            NEXT MONTH
                        </button>
                    </div>
                </div>
                <div className={style.tableContainer}>
                    {
                        this.state.firstDayOfMonth
                    }
                    <div className={style.monthView}>
                        {
                            grouppedDays
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MonthView;