import * as React from "react"
import {TextField, Button, withStyles} from "@material-ui/core";
import * as style from "./style.scss"
import {connect} from "react-redux";
import {StoreInteface} from "../../stores/configureStore";
import {startGetAuthMe, startLogout, startPostLogin} from "../../actions/auth";
import {withRouter, RouteComponentProps, Link} from "react-router-dom"
import {AuthReducerInterface} from "../../reducers/AuthReducer";
import {StyledInput} from "../../components/StyledInput/StyledInput";

interface ILoginPageProps extends RouteComponentProps{
    authReducer: AuthReducerInterface,
    startPostLogin(email: string, password: string): any,
    startGetAuthMe(): any
}

interface ILoginPageState {
    email: string,
    password: string
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

    handleLogin = () => {
        const {email, password} = this.state;
        this.props.startPostLogin(email, password).then(() => {
            if (this.props.authReducer.isAuthenticated){
                this.props.history.push('/calendars')
            }
        });
    };

    onEmailChange = (e: any) => {
        this.setState({
            email: e.target.value
        });
    };

    onPasswordChange = (e: any) => {
        this.setState({
            password: e.target.value
        });
    };

    render() {
        return (
            <div className={style.container}>
                <div className={style.form}>
                    <form>
                        <h1>WhenUCan.app</h1>
                        <div>
                            <StyledInput color="secondary" label="Email" required onChange={this.onEmailChange}/>
                            <StyledInput color="secondary" label="Password" type="password" required onChange={this.onPasswordChange}/>
                        </div>
                        <Button variant="contained" color="primary" onClick={this.handleLogin}>Login</Button>
                    </form>
                    <div className={style.signupCall}>
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
        startPostLogin: (email: string, password: string) => dispatch(startPostLogin(email, password)),
        startGetAuthMe: () => dispatch(startGetAuthMe())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));