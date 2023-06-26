import {
    ERROR,
    LOADING, SET_AGENT_DETAIL,
    SUCCESS
} from "../../../actions/dashboard/view-more/types";

/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description view more initial default state.
 */
const INITIAL_STATE = {
    loading: false,
    error: undefined,
    agentDetail: {},
}

/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description View More state handler.
 * @see INITIAL_STATE
 */
const ViewMoreReducer = (state = INITIAL_STATE, action) => {
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
                error: action.payload,
                agent: INITIAL_STATE.agent
            }
        }
        case SUCCESS: {
            return {
                ...state,
                error: undefined,
            }
        }
        case SET_AGENT_DETAIL: {
            return {
                ...state,
                agentDetail: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default ViewMoreReducer
