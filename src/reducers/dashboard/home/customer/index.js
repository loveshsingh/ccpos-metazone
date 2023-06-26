import {
    ERROR,
    LOADING,
    SET_CUSTOMERS,
    SET_CUSTOMER_DISPLAY_KEYS,
    SET_STATES,
    SET_COUNTRIES,
    SUCCESS, SELECT_CUSTOMER, SET_CREATED_CUSTOMER, SET_SEARCH, DESELECT_CUSTOMER
} from "../../../../actions/dashboard/home/customer/types";
import {RESET_REDUCER_STATE_FOR_NEW_ORDER} from "../../../../actions/dashboard/home/customer/types";

/**
 * @author Vipin Joshi.
 * @since 04-01-2022.
 * @description Customer initial default state.
 */
const INITIAL_STATE = {
    loading: false,
    error: undefined,
    customers: [],
    customerColumns: undefined, // customer Display keys.
    states: [],
    countries: [],
    search: '',
    selectedCustomer: undefined //selected customer for payment purpose.
}

/**
 * @author Vipin Joshi.
 * @since 04-01-2022.
 * @description Customer state handler.
 * @see INITIAL_STATE
 */
const CustomerReducer = (state = INITIAL_STATE, action) => {
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
        case SET_SEARCH: {
            return {
                ...state,
                search: action.payload
            }
        }
        case SET_CUSTOMERS: {
            return {
                ...state,
                customers: [...action.payload],
            }
        }
        case SET_CUSTOMER_DISPLAY_KEYS: {
            return {
                ...state,
                customerColumns: {...action.payload}
            }
        }
        case SET_COUNTRIES: {
            return {
                ...state,
                countries: [...action.payload],
            }
        }
        case SET_STATES: {
            return {
                ...state,
                states: [...action.payload],
            }
        }
        case SELECT_CUSTOMER: {
            return {
                ...state,
                selectedCustomer: action.payload
            }
        }
        case DESELECT_CUSTOMER: {
            return {
                ...state,
                selectedCustomer: INITIAL_STATE.selectedCustomer,
            }
        }
        case SET_CREATED_CUSTOMER: {
            const customers = [...state.customers]
            customers.unshift(action.payload)
            return {
                ...state,
                customers: customers
            }
        }
        case RESET_REDUCER_STATE_FOR_NEW_ORDER: {
            return resetReducerStateForNewOrder(state, action)
        }
        default: {
            return state
        }
    }
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to reset reducer state for placing new orders.
 * @param state current reducer state.
 * @param action current reducer action.
 */
const resetReducerStateForNewOrder = (state, action): void => {
    return {
        ...state,
        selectedCustomer: INITIAL_STATE.selectedCustomer,
    }
}

export default CustomerReducer
