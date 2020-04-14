import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {StoreInteface} from "../stores/configureStore";


const PrivateRoute = ({isAuthenticated, component: Component, ...rest}: any) => (
    <Route {...rest}
           render={(props: any) => (
               isAuthenticated ? (
                   <div>
                       <Component {...props}/>
                   </div>
               ) : (
                   <Redirect to="/login" />
               )
           )}
    />
);
const mapStateToProps = (state: StoreInteface) => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);