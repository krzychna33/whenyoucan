import * as React from "react";
import {Button} from "@material-ui/core";
import {useEffect, useState} from "react";
import * as ReactDOM from "react-dom";
import classNames = require("classnames");
import * as style from "./style.scss"
import LoginPage from "../../screens/LoginPage/LoginPage";
import {LoginForm} from "../LoginForm/LoginForm";
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {useDispatch, useSelector} from "react-redux";
import {StoreInteface} from "../../stores/configureStore";
import {startGetAuthMe} from "../../actions/auth";
import {Link} from "react-router-dom";
import {SignUpForm} from "../SignUpForm/SignUpForm";


const ModalTrigger = (props: any) => {
    return (
        <Button variant="contained" color="primary" onClick={() => {props.onClick()}}>Login</Button>
    )
};

const ModalContent = (props: any) => {

    const authReducer: AuthReducerInterface = useSelector((store: StoreInteface) => store.authReducer);
    const dispatch = useDispatch();

    const [currentScreen, setCurrentScreen] = useState("login");


    const closeByBackground = (event: any) => {
        event.preventDefault();
        if(event.target === event.currentTarget) {
            props.close()
        }
    };

    useEffect(() => {
        if (authReducer.isAuthenticated) {
            props.close();
            dispatch(startGetAuthMe());
        }
    }, [authReducer.isAuthenticated]);


    return ReactDOM.createPortal(
        <div className={classNames({
            [style.modalContainer]: true,
            ["animated fadeIn"]: true
        })}
        onClick={closeByBackground}
        >
            <div className={style.modalContent}>
                <div>
                    <div className={style.modalInnerContent}>
                        <h1>WhenYouCan.app</h1>
                        {
                            currentScreen === "login" ?
                                <div>
                                    <LoginForm/>
                                    <div className={style.bottomInfo}>
                                        <p onClick={() => setCurrentScreen("signUp")}>Psst... No accout? Create a new one here</p>
                                    </div>
                                </div> :
                                <div>
                                    <SignUpForm/>
                                    <div className={style.bottomInfo}>
                                        <p onClick={() => setCurrentScreen("login")}>Already have an account? Go login.</p>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

export const AuthModal = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <React.Fragment>
            <ModalTrigger onClick={() => {setIsOpen(true)}}/>
            {
                isOpen && <ModalContent close={() => {setIsOpen(false)}}/>
            }
        </React.Fragment>
    )
}