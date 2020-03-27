import * as React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Calendar from "../screens/Calendar/Calendar";
import Landing from "../screens/Landing/Landing";


class AppRouter extends React.Component{
    render () {
        return (
            <Router>
                <Switch>
                    <Route path={"/"} exact={true}>
                        <Landing/>
                    </Route>
                    <Route path={"/calendar/:hash"}>
                        <Calendar/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default AppRouter;