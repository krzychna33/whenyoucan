import * as React from "react";
import {Link} from "react-router-dom";
import * as style from "./style.scss"

class Landing extends React.Component {
    render () {
        return (
            <div className={style.container}>
                <h1>WhenYouCan.app</h1>
                <Link to={"/calendars"}>Go To Calendars</Link>
            </div>
        )
    }
}

export default Landing;