import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import ReduxThunk from 'redux-thunk';
import WeeklyCalendarReducer, {WeeklyCalendarReducerInterface} from "../reducers/WeeklyCalendarReducer";
import AuthReducer, {AuthReducerInterface} from "../reducers/AuthReducer";
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface StoreInteface {
    weeklyCalendar: WeeklyCalendarReducerInterface,
    authReducer: AuthReducerInterface
}

export default () => {
    const store = createStore(
        combineReducers({
            weeklyCalendar: WeeklyCalendarReducer,
            authReducer: AuthReducer
        }),
        composeEnhancers(applyMiddleware(ReduxThunk))
    );

    return store;
}