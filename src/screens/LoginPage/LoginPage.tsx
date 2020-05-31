import * as React from "react"
import * as style from "./style.scss"
import {connect} from "react-redux";
import {StoreInteface} from "../../stores/configureStore";
import {startGetAuthMe, startPostLogin} from "../../actions/auth";
import {Link, RouteComponentProps, withRouter} from "react-router-dom"
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {LoginForm} from "../../components/LoginForm/LoginForm";

interface ILoginPageProps extends RouteComponentProps {
    authReducer: AuthReducerInterface,
    startPostLogin(email: string, password: string): any,
    startGetAuthMe(): any
}

interface ILoginPageState {
    email: string,
    password: string
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
    render() {
        return (
            <div className={style.container}>
                <div className={style.content}>
                    <Link to={"/"}><h1>WhenYouCan.app</h1></Link>
                    <LoginForm/>
                    <div className={style.bottomInfo}>
                        <Link to={"/signup"}>Psst... No accout? Create a new one here</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreInteface) => {
    return {
        authReducer: state.authReducer
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        startGetAuthMe: () => dispatch(startGetAuthMe())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));