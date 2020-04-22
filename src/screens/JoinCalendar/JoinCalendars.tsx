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
import {getWeeklyCalendar, postJoinCalendar} from "../../api/weeklyCalendars";
import classNames = require("classnames");
import {AuthModal} from "../../components/AuthModal/AuthModal";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

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
        getWeeklyCalendar(id).then((response: any) => {
            console.log(response.data)
            setCalendar(response.data)
        })
    }, []);

    const joinCalendar = () => {
        postJoinCalendar(id, "1234").then((response: any) => {
            if(response.status === 200) {
                alert("Joined");
            }
        }).catch((e) => {
            toast.error(e.data.message || "Unhandled error");
        })
    };

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <React.Fragment>
            {
                 calendar._id ?
                    <div className={style.wrapper}>
                        <div className={style.header}>
                            <Link to={"/"}><h1>WhenYouCan.app</h1></Link>
                            {
                                authReducer.user && <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
                            }

                        </div>
                        <div className={style.container}>
                            <div className={style.content}>
                                <h2>Hi {authReducer.user ? authReducer.user.firstName : "guest"}!</h2>
                                <div className={classNames({
                                    [style.guestInfo]: true,
                                    [style.guestInfo__hide]: authReducer.user
                                })}>
                                    <p>You have to be logged in to join calendar.</p>
                                    <AuthModal/>
                                </div>
                                <div className={classNames({
                                    [style.calendarJoin]: true,
                                    [style.calendarJoin__guest]: !authReducer.user
                                })}>
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