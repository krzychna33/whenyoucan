import * as React from "react";
import * as style from "./style.scss"

interface IMonthlyDayCardProps {
    dayNumber: number
}

class MonthlyDayCard extends React.Component<IMonthlyDayCardProps> {

    render () {
        return (
            <div className={style.monthlyDayCard}>
                {this.props.dayNumber}
            </div>
        )
    }
}

export default MonthlyDayCard;