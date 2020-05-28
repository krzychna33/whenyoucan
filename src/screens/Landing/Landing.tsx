import * as React from "react";
import {Link} from "react-router-dom";
import * as style from "./style.scss"
import {Header} from "../../components/Header/Header";

class Landing extends React.Component {
    render () {
        return (
            <div className={style.container}>
                <Header/>
                <div className={style.content}>
                    <h1>New way to organize meeting with friends</h1>
                </div>
            </div>
        )
    }
}

export default Landing;