import * as React from "react";
import * as moment from "moment";
import * as style from "./style.scss"
import WeeklyCardView from "./WeeklyCardView/WeeklyCardView";
import Button from '@material-ui/core/Button';

interface IWeekViewState {
    offset: number,
    weekPointer: moment.Moment
}

class WeekView extends React.Component<any, IWeekViewState> {

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
            days.push(
                <WeeklyCardView day={dayCopy.add(i, "day")}/>
            )
        }
        return days;
    }

    render() {
        return (
            <div className={style.container}>
                <div className={style.header}>
                    <div>
                        <Button variant="contained" onClick={this.decreaseOffset} color={"primary"}>PREVIOUS WEEK</Button>
                    </div>
                    <div>
                        {
                            this.state.weekPointer.format("MMMM YYYY")
                        }
                    </div>
                    <div>
                        <Button variant="contained" onClick={this.increaseOffset} color={"primary"}>NEXT WEEK</Button>
                    </div>
                </div>
                <div className={style.weekView}>
                    {this.renderDays()}
                </div>
            </div>
        )
    }
}

export default WeekView;