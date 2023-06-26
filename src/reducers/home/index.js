import {ERROR, LOADING, SESSION_ERROR, SESSION_SUCCESS, SET_AGENT, SUCCESS} from "../../actions/home/types";

/**
 * @author Vipin Joshi.
 * @since 03-12-2021.
 * @description home initial default state.
 */
const INITIAL_STATE = {
    loading: false,
    error: undefined,
    nurseries: [],
    agent: '',
}

/**
 * @author Vipin Joshi.
 * @since 03-12-2021.
 * @description Home state handler.
 * @see INITIAL_STATE
 */
const HomeReducer = (state = INITIAL_STATE, action) => {
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
                nurseries: INITIAL_STATE.nurseries,
                agent: INITIAL_STATE.agent
            }
        }
        case SET_AGENT: {
            return {
                ...state,
                agent: action.payload
            }
        }
        case SUCCESS: {
            return {
                ...state,
                nurseries: action.payload?.pos_config,
                error: undefined,
            }
        }
        case SESSION_SUCCESS: {
            return {
                ...state,
                error: undefined
            }
        }
        case SESSION_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default HomeReducer
