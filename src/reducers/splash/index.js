import {ERROR, LOADING, SUCCESS} from "../../actions/splash/types";

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description splash initial default state.
 */
const INITIAL_STATE = {
    loading: false,
    error: undefined
}

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description Splash state handler.
 * @see INITIAL_STATE
 */
const SplashReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case SUCCESS: {
            return {
                ...state,
                error: undefined,
            }
        }
        default: {
            return state;
        }
    }
}

export default SplashReducer
