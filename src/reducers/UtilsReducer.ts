import {SWITCH_LEFT_MENU} from "../actions/actions.const";

export interface UtilsReducerInterface {
    isLeftMenuOpen: boolean
}

const UtilsReducerDefaultState: UtilsReducerInterface = {
    isLeftMenuOpen: false
}

export default (state: UtilsReducerInterface = UtilsReducerDefaultState, action: any) => {
    switch (action.type) {
        case SWITCH_LEFT_MENU:
            return {
                ...state,
                isLeftMenuOpen: !state.isLeftMenuOpen
            }
        default:
            return state;
    }
}