import {StyledInput} from "../StyledInput/StyledInput";
import {Button} from "@material-ui/core";
import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {startPostSignUp} from "../../actions/auth";
import * as style from "./style.scss"
import {toast} from "react-toastify";

export const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const dispatch = useDispatch();

    const handleSignUp = () => {
        if (password !== repeatPassword) {
            return toast.error("Passwords does not match!");
        }
        dispatch(startPostSignUp({email, password, firstName, lastName}));
    };

    return (
        <form className={style.form}>
            <div>
                <StyledInput color="secondary" value={firstName} label="Name" required
                             onChange={(e) => {setFirstName(e.target.value)}}
                />
                <StyledInput color="secondary" value={lastName} label="Last Name" required
                             onChange={(e) => {setLastName(e.target.value)}}
                />
                <StyledInput color="secondary" value={email} label="Email" required
                             onChange={(e) => {setEmail(e.target.value)}}
                />
                <StyledInput color="secondary" value={password} label="Password" type="password" required
                             onChange={(e) => {setPassword(e.target.value)}}
                />
                <StyledInput color="secondary" value={repeatPassword} label="Repeat Password" type="password" required
                             onChange={(e) => {setRepeatPassword(e.target.value)}}
                />
            </div>
            <Button variant="contained" color="primary" onClick={handleSignUp}>Create account</Button>
        </form>
    )
};