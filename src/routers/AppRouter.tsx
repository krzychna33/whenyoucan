import * as React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Calendar from "../screens/Calendar/Calendar";
import Landing from "../screens/Landing/Landing";
import LoginPage from "../screens/LoginPage/LoginPage";
import CalendarsList from "../screens/CalendarsList/CalendarsList";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";


class AppRouter extends React.Component{
    render () {
        return (
            <Router>
                <Switch>
                    <Route path={"/"} exact={true}>
                        <Landing/>
                    </Route>
                    <PrivateRoute path={"/calendar/:id"} component={Calendar}/>
                    <PrivateRoute path={"/calendars"} component={CalendarsList}/>
                    <PublicRoute path={"/login"} component={LoginPage}/>
                </Switch>
            </Router>
        )
    }
}

export default AppRouter;