import {
    CLEAR_SERVER_SESSION_DETAILS,
    ERROR,
    LOADING,
    SERVER_SESSION_DETAILS,
    SUCCESS
} from "../../actions/auth/types";

/**
 * @author Vipin Joshi.
 * @since 25-11-2021.
 * @description auth initial default state.
 */
const INITIAL_STATE = {
    loading: false,
    error: undefined,
    sessionDetails: undefined,
}

/**
 * @author Vipin Joshi.
 * @since 25-11-2021.
 * @description auth state handler.
 * @see INITIAL_STATE
 */
const AuthReducer = (state = INITIAL_STATE, action) => {
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
        case SERVER_SESSION_DETAILS: {
            return {
                ...state,
                sessionDetails: action.payload
            }
        }
        case CLEAR_SERVER_SESSION_DETAILS: {
            return {
                ...state,
                sessionDetails: INITIAL_STATE.sessionDetails
            }
        }
        default: {
            return state;
        }
    }
}

export default AuthReducer
