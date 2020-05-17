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
import {Link, withRouter, RouteComponentProps} from "react-router-dom";
import {StyledInput} from "../../components/StyledInput/StyledInput";
import {Header} from "../../components/Header/Header";

interface IJoinCalendarProps extends RouteComponentProps {

}

interface IPublicCalendar {
    _id: string,
    name: string
}

const JoinCalendar: React.FC<IJoinCalendarProps> = (props: any) => {

    const [calendar, setCalendar] = useState<IPublicCalendar>({_id: undefined, name: undefined})
    const [pin, setPin] = useState("");
    const authReducer: AuthReducerInterface = useSelector((store: StoreInteface) => store.authReducer);
    const dispatch = useDispatch();

    const { match } = props;
    const {id} = match.params;

    useEffect(() => {
        dispatch(startGetAuthMe());
        getWeeklyCalendar(id).then((response: any) => {
            setCalendar(response.data)
        })
    }, []);

    const joinCalendar = () => {
        postJoinCalendar(id, pin).then((response: any) => {
            if(response.status === 200) {
                toast.success("Succesfully joined to calendar")
                props.history.push("/calendars")
            }
        }).catch((e) => {
            toast.error(e.data.message || "Unhandled error");
        })
    };

    return (
        <React.Fragment>
            {
                 calendar._id ?
                    <div className={style.wrapper}>
                        <Header/>
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
                                    <h3>Provide PIN & Join <span>{calendar.name}</span></h3>
                                    <StyledInput
                                        color="secondary"
                                        value={pin}
                                        label="PIN"
                                        required
                                        type={"password"}
                                        onChange={(e) => {setPin(e.target.value)}}/>
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

export default withRouter(JoinCalendar);