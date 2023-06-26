import {
    CLEAR_SELECTED_TAB, SET_ORDER_DIALOG_DATA,
    SET_ORDERS, SET_SELECTED_ORDER, SET_SELECTED_TAB
} from "../../../actions/dashboard/orders/types";
import {ERROR, LOADING, SUCCESS} from "../../../actions/dashboard/home/types";

/**
 * @author Lovesh Singh.
 * @since 11-01-2022.
 * @description dashboard order initial default state.
 */
const INITIAL_STATE = {
    loading: false,
    loadingMessage: undefined,
    error: undefined,
    selectedTab: undefined,
    orders: [],
    selectedOrderDetail: {
        order: undefined,
        index: -1
    },
    orderDialogData : []
}

/**
 * @author Lovesh Singh.
 * @since 08-01-2022.
 * @description Dashboard Order state handler.
 * @see INITIAL_STATE
 */
const OrderReducer = (state = INITIAL_STATE, action) => {
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
        case SET_SELECTED_ORDER: {
            return {
                ...state,
                selectedOrderDetail: {
                    order: action.payload.order,
                    index: action.payload.index
                }
            }
        }
        case SET_ORDERS: {
            return setOrders(state, action)
        }
        case SET_ORDER_DIALOG_DATA: {
            return {
                ...state,
                orderDialogData: action.payload
            }
        }
        case SET_SELECTED_TAB: {
            const selectedOrderDetail = state.selectedOrderDetail
            return {
                ...state,
                selectedTab: action.payload,
                selectedOrderDetail: state.selectedTab === action.payload ? selectedOrderDetail : INITIAL_STATE.selectedOrderDetail
            }
        }
        case CLEAR_SELECTED_TAB: {
            return {
                ...state,
                selectedTab: INITIAL_STATE.selectedTab,
                selectedOrderDetail: INITIAL_STATE.selectedOrderDetail
            }
        }
        default: {
            return state
        }
    }
}

/**
 * @author Lovesh Singh.
 * @since 21-01-2022.
 * @description to set orders.
 */
const setOrders = (state, action): any => {
    const orders = [...action.payload]
    let selectedOrder


    if (!state.selectedOrderDetail || (state.selectedOrderDetail.index === -1 && orders.length > 0)) {
        selectedOrder = orders[0]
    }


    return {
        ...state,
        orders: orders,
        selectedOrderDetail: {
            order: selectedOrder ? selectedOrder : state.selectedOrderDetail.order,
            index: selectedOrder ? 0 : state.selectedOrderDetail.index
        }
    }
}

export default OrderReducer;