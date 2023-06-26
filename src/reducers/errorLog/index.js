import {
    ERROR,
    LOADING, REMOVE_ERROR_LOGS,
    SET_ERROR_LOGS,
    SET_SELECTED_ERROR_LOG,
    SET_SHOW_ERROR_LOG,
    SUCCESS
} from "../../actions/errorLog/types";

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description splash initial default state.
 */
const INITIAL_STATE = {
    loading: false,
    error: undefined,
    setShowErrorLog: false,
    errorLogs: [],
    selectedErrorLogDetail: {
        errorLog: undefined,
        index: -1
    },
}

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description Splash state handler.
 * @see INITIAL_STATE
 */
const ErrorLogReducer = (state = INITIAL_STATE, action) => {
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
        case SET_SHOW_ERROR_LOG: {
            return {
                ...state,
                setShowErrorLog: action.payload,
            }
        }
        case SET_SELECTED_ERROR_LOG: {
            return {
                ...state,
                selectedErrorLogDetail: {
                    errorLog: action.payload.errorLog,
                    index: action.payload.index
                }
            }
        }
        case SET_ERROR_LOGS: {
            const ErrorLogsResponse = JSON.parse(action.payload)
            return {
                ...state,
                errorLogs: ErrorLogsResponse,
            }
        }
        case REMOVE_ERROR_LOGS: {
            return {
                ...state,
                errorLogs: INITIAL_STATE.errorLogs,
            }
        }
        default: {
            return state;
        }
    }
}


export default ErrorLogReducer
