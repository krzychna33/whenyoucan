import {StyledInput} from "../StyledInput/StyledInput";
import {Button} from "@material-ui/core";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {startPostLogin} from "../../actions/auth";
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {StoreInteface} from "../../stores/configureStore";
import * as style from "./style.scss"

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(startPostLogin(email, password));
    };

    return (
        <form className={style.form}>
            <div>
                <StyledInput color="secondary" value={email} label="Email" required onChange={(e) => {setEmail(e.target.value)}}/>
                <StyledInput color="secondary" value={password} label="Password" type="password" required onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
        </form>
    )
}