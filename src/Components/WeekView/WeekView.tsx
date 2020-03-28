import * as React from "react";
import * as moment from "moment";
import * as style from "./style.scss"
import WeeklyCardView from "./WeeklyCardView/WeeklyCardView";
import Button from '@material-ui/core/Button';
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import {connect} from "react-redux"
import {WeeklyCalendarReducerInterface} from "../../reducers/WeeklyCalendarReducer";
import {StoreInteface} from "../../stores/configureStore";
import {ReservedAttendances} from "../../Interfaces/ReservedAttendances";

interface IWeekViewState {
    offset: number,
    weekPointer: moment.Moment
}

interface IWeekViewProps {
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
                    if (time.isSame(dayCopy, "day")) {
                        return time;
                    }
                });
                return {
                    ...userData,
                    times
                }
            });


            days.push(
                <WeeklyCardView day={dayCopy} reservedAttendances={dataToSend}/>
            )
        }
        return days;
    }

    render() {
        return (
            <div className={style.container}>
                <AppBar
                    className={style.bar}
                >
                    <Toolbar className={style.appToolbar}>
                        <div>
                            <Button variant="contained" onClick={this.decreaseOffset} color={"secondary"}>PREVIOUS WEEK</Button>
                        </div>
                        <div>
                            {
                                this.state.weekPointer.format("MMMM YYYY")
                            }
                        </div>
                        <div>
                            <Button variant="contained" onClick={this.increaseOffset} color={"secondary"}>NEXT WEEK</Button>
                        </div>
                    </Toolbar>
                </AppBar>
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

export default connect(mapStateToProps)(WeekView);