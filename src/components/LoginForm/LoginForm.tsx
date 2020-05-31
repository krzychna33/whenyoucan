import {StyledInput} from "../StyledInput/StyledInput";
import {Button} from "@material-ui/core";
import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {startPostLogin, startPostLoginFacebook} from "../../actions/auth";
import * as style from "./style.scss"
import {postLoginFacebook} from "../../api/auth";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(startPostLogin(email, password));
    };

    const handleFbLogin = () => {
        FB.login((result) => {
            console.log(result)
            console.log(result.authResponse.accessToken)
            console.log(result.authResponse.userID)
            dispatch(startPostLoginFacebook(result.authResponse.accessToken, result.authResponse.userID));
        },{scope: 'public_profile,email,user_birthday'})
    }

    return (
        <form className={style.form}>
            <div>
                <StyledInput color="secondary" value={email} label="Email" required onChange={(e) => {setEmail(e.target.value)}}/>
                <StyledInput color="secondary" value={password} label="Password" type="password" required onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
            <Button variant="contained" color="primary" onClick={handleFbLogin}>Login via Facebook</Button>
            <p className={style.fbOff}>Facebook login temporary not working due to facebook app review</p>

        </form>
    )
}