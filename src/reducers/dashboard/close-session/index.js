import {
    LOADING,
    ERROR,
    SUCCESS,
    SET_ORDERS_SUMMARY
} from "../../../actions/dashboard/close-session/types";

/**
 * @author Lovesh Singh.
 * @since 11-01-2022.
 * @description dashboard order initial default state.
 */
const INITIAL_STATE = {
    loading: false,
    loadingMessage: undefined,
    error: undefined,
    ordersSummary: undefined,
}

/**
 * @author Lovesh Singh.
 * @since 17-01-2022.
 * @description Close Session state handler.
 * @see INITIAL_STATE
 */
const CloseSessionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                loading: action.payload.data,
                loadingMessage: action.payload.message,
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
                error: undefined
            }
        }
        case SET_ORDERS_SUMMARY: {
            return {
                ...state,
                ordersSummary: action.payload
            }
        }
        default: {
            return state;
        }
    }
}


export default CloseSessionReducer;