import * as React from "react";
import {useState, useRef} from "react";
import * as style from "./style.scss";
import {Button} from "@material-ui/core";
import {startLogout} from "../../actions/auth";
import {useDispatch} from "react-redux";
import {UserDAO} from "../../api/auth";
import classNames = require("classnames");

interface IHiUserProps {
    user: UserDAO
}

export const HiUser: React.FC<IHiUserProps> = (props: IHiUserProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const modalRef = useRef(null);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    const handleClick = () => {
        setIsOpen(!isOpen)
        console.log(modalRef.current.classList)
        if (modalRef.current.classList.contains(style.attachedModal__hidden)) {
            modalRef.current.classList.remove(style.attachedModal__hidden)
            setTimeout(() => {
                modalRef.current.classList.remove(style.attachedModal__visualHidden)
            }, 20)
        } else {
            modalRef.current.classList.add(style.attachedModal__visualHidden)
            modalRef.current.addEventListener("transitionend", () => {
                modalRef.current.classList.add(style.attachedModal__hidden)
            }, {
                capture: false,
                once: true,
                passive: false
            })
        }
    }


    return (
        <div className={style.hiUser}>
            <span onClick={() => handleClick()} className={style.trigger}>
                Hi {props.user.firstName}!
            </span>
            {
                <div className={classNames({
                    [style.attachedModal]: true,
                    [style.attachedModal__hidden]: true,
                    [style.attachedModal__visualHidden]: true,
                })} ref={modalRef}>
                    <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
                </div>
            }

        </div>
    )
}