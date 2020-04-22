import * as React from "react"
import * as style from "./style.scss"
import {connect} from "react-redux";
import {StoreInteface} from "../../stores/configureStore";
import {startGetAuthMe, startPostLogin} from "../../actions/auth";
import {Link, RouteComponentProps, withRouter} from "react-router-dom"
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {LoginForm} from "../../components/LoginForm/LoginForm";

interface ILoginPageState {
    email: string,
    password: string
}

class SignUpPage extends React.Component {
    render() {
        return (
            <div className={style.container}>
                <div className={style.content}>
                    <h1>WhenUCan.app</h1>
                    <div className={style.bottomInfo}>
                        <Link to={"/login"}>Already have account? Go to login.</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUpPage;