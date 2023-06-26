import {ERROR, LOADING, SUCCESS} from "../../../actions/dashboard/home/types";
import {
    REMOVE_HOLD_CART,
    SET_HOLD_CARTS,
    SET_HOLD_PRODUCTS,
    SET_SELECTED_CART
} from "../../../actions/dashboard/hold-cart/types";

/**
 * @author Lovesh Singh.
 * @since 13-01-2022.
 * @description hold cart initial default state.
 */
const INITIAL_STATE = {
    loading: false,
    loadingMessage: undefined,
    error: undefined,
    holdCarts: [],
    selectedCartDetail: {
        cart: undefined,
        index: -1
    },
}



/**
 * @author Lovesh Singh.
 * @since 13-01-2022.
 * @description hold cart state handler.
 * @see INITIAL_STATE
 */
const HoldCartReducer = (state = INITIAL_STATE, action) => {
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
        case SET_SELECTED_CART: {
            return {
                ...state,
                selectedCartDetail: {
                    cart: action.payload.cart,
                    index: action.payload.index
                }
            }
        }
        case SET_HOLD_CARTS: {
            return setHoldCarts(state, action)
        }
        case SET_HOLD_PRODUCTS: {
            const holdCarts = [...state.holdCarts,action.payload]
            return {
                ...state,
                holdCarts,
                selectedCartDetail: {
                    cart: (holdCarts.length > 0) ? holdCarts[0] : INITIAL_STATE.selectedCartDetail.cart,
                    index: (holdCarts.length > 0) ? 0 : INITIAL_STATE.selectedCartDetail.index
            },
            }
        }
        case REMOVE_HOLD_CART: {
            return removeHoldCart(state, action)
        }
        default: {
            return state;
        }
    }
}

const setHoldCarts = (state, action): any => {
    const holdCarts = [...action.payload]
    let selectedHoldItem;

    if (!state.selectedCartDetail || (state.selectedCartDetail.index === -1 && holdCarts.length > 0)) {
        selectedHoldItem = holdCarts[0]
    }


    return {
        ...state,
        holdCarts,
        selectedCartDetail: {
            cart: selectedHoldItem ? selectedHoldItem : state.selectedCartDetail.cart,
            index: selectedHoldItem ? 0 : state.selectedCartDetail.index
        }
    }
}

const removeHoldCart = (state, action): any => {
    const deleteId = action.payload
    let tempHoldCart = state.holdCarts
    let selectedHoldItem;


    if (deleteId) {
        tempHoldCart.splice(state.selectedCartDetail.index, 1)
        state.selectedCartDetail = INITIAL_STATE.selectedCartDetail;
    }


    if (!state.selectedCartDetail || (state.selectedCartDetail.index === -1 && tempHoldCart.length > 0)) {
        selectedHoldItem = tempHoldCart[0]
    }


    return {
        ...state,
        holdCarts: [...tempHoldCart],
        selectedCartDetail: {
            cart: selectedHoldItem ? selectedHoldItem : state.selectedCartDetail.cart,
            index: selectedHoldItem ? 0 : state.selectedCartDetail.index
        }
    }
}


export default HoldCartReducer
