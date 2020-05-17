import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import ReduxThunk from 'redux-thunk';
import WeeklyCalendarReducer, {WeeklyCalendarReducerInterface} from "../reducers/WeeklyCalendarReducer";
import AuthReducer, {AuthReducerInterface} from "../reducers/AuthReducer";
import UtilsReducer, {UtilsReducerInterface} from "../reducers/UtilsReducer";
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface StoreInteface {
    weeklyCalendar: WeeklyCalendarReducerInterface,
    authReducer: AuthReducerInterface,
    utilsReducer: UtilsReducerInterface
}

export default () => {
    const store = createStore(
        combineReducers({
            weeklyCalendar: WeeklyCalendarReducer,
            authReducer: AuthReducer,
            utilsReducer: UtilsReducer
        }),
        composeEnhancers(applyMiddleware(ReduxThunk))
    );

    return store;
}