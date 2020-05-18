import * as React from "react";
import * as style from "./style.scss";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {Moment} from "moment";
import {useDispatch} from "react-redux";
import {switchLeftMenu} from "../../actions/utils";

interface ICalendarViewHeader {
    decreaseOffset (): any,
    increaseOffset (): any,
    weekPointer: Moment
}

export const CalendarViewHeader: React.FC<ICalendarViewHeader> = (props: ICalendarViewHeader) => {

    const dispatch = useDispatch();

    return (
        <div
            className={style.bar}
        >
            <div className={style.appToolbar}>
                <div className={style.menuSwitcher}>
                    <i
                        className="fas fa-bars"
                        onClick={() => dispatch(switchLeftMenu())}
                    />
                </div>
                <div className={style.weekNav}>
                    <div>
                        <Button variant="contained" onClick={props.decreaseOffset} color={"primary"} className={style.prevButton}>
                            <i className="fas fa-chevron-circle-right"/>
                        </Button>
                    </div>
                    <div>
                        {
                            props.weekPointer.format("MMMM YYYY")
                        }
                    </div>
                    <div>
                        <Button variant="contained" onClick={props.increaseOffset} color={"primary"}>
                            <i className="fas fa-chevron-circle-right"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}