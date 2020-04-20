import * as React from "react";
import {useDispatch, useSelector} from 'react-redux'
import {StoreInteface} from "../../stores/configureStore";
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {useEffect, useState} from "react";
import {startGetAuthMe, startLogout} from "../../actions/auth";
import {startGetCalendar} from "../../actions/weeklyCalendar";
import {WeeklyCalendarReducerInterface} from "../../reducers/WeeklyCalendarReducer";
import {Button} from "@material-ui/core";
import * as style from "./style.scss";
import {getPublicWeeklyCalendar, postJoinCalendar} from "../../api/weeklyCalendars";

interface IPublicCalendar {
    _id: string,
    name: string
}

const JoinCalendar = (props: any) => {

    const authReducer: AuthReducerInterface = useSelector((store: StoreInteface) => store.authReducer);
    const [calendar, setCalendar] = useState<IPublicCalendar>({_id: undefined, name: undefined})
    const dispatch = useDispatch();

    const { match } = props;
    const {id} = match.params;

    useEffect(() => {
        dispatch(startGetAuthMe());
        getPublicWeeklyCalendar(id).then((response: any) => {
            console.log(response.data)
            setCalendar(response.data)
        })
    }, []);

    const joinCalendar = () => {
        postJoinCalendar(id, "1234").then((response: any) => {
            if(response.status === 200) {
                alert("Joined");
            } else {
                console.log(response.data);
            }
        })
    };

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <React.Fragment>
            {
                 calendar ?
                    <div className={style.wrapper}>
                        <div className={style.header}>
                            <h1>WhenYouCan.app</h1>
                            <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
                        </div>
                        <div className={style.container}>
                            <div className={style.content}>
                                <h2>Hi {authReducer.user ? authReducer.user.firstName : "guest"}</h2>
                                <div className={style.calendarJoin}>
                                    <h3>Join {calendar.name}!</h3>
                                    <Button variant="contained" color="primary"
                                            onClick={joinCalendar}>JOIN</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                 :
                <div>
                    Loading...
                </div>
            }
        </React.Fragment>

    )
};

export default JoinCalendar;