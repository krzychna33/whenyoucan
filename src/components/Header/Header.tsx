import * as React from "react";
import * as style from "./style.scss";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {startGetAuthMe, startLogout} from "../../actions/auth";
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {useDispatch, useSelector} from "react-redux";
import {StoreInteface} from "../../stores/configureStore";
import {AuthModal} from "../AuthModal/AuthModal";
import {HiUser} from "../HiUser/HiUser";
import {useEffect, useState} from "react";


export const Header: React.FC = () => {

    const authReducer: AuthReducerInterface = useSelector((store: StoreInteface) => store.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startGetAuthMe())
    }, [])

    return (
        <div className={style.header}>
            <Link to={"/"}><h1>WyC</h1></Link>
            {
                authReducer.user ?
                    <ul className={style.nav}>
                        <li>
                            <Link to={"/calendars"}>Calendars list</Link>
                        </li>
                        <li>
                            <HiUser user={authReducer.user}/>
                        </li>
                    </ul>
                :
                    <ul>
                        <li>
                            <AuthModal/>
                        </li>
                    </ul>

            }
        </div>
    )
}