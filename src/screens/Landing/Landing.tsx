import * as React from "react";
import {Link} from "react-router-dom";

class Landing extends React.Component {
    render () {
        return (
            <div>
                Landing Page
                <Link to={"/calendars"}>Go To Calendars</Link>
            </div>
        )
    }
}

export default Landing;