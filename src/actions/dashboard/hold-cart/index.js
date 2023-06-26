import {
    ERROR,
    LOADING, REMOVE_HOLD_CART, SET_HOLD_CARTS, SET_HOLD_PRODUCTS, SET_SELECTED_CART,
    SUCCESS
} from "./types";
import {
    deleteHoldOrderById,
    getAllHoldOrders,
} from "../../../storage/Schema_Helpers";
import {setCartProducts, setComplimentary, setPurpose} from "../home";
import {selectCustomer} from "../home/customer";
import {localDBErrorHandler} from "../../../storage/DBErrorHandler";
import I18N from "../../../helper/translation";
import {isString} from "../../../helper/Utility";

/**
 * @author Lovesh Singh.
 * @since 13-01-2022.
 * @description to set loading & its message.
 */
export const loading = (data: boolean, message?: string) => ({
    type: LOADING,
    payload: {data, message}
});

/**
 * @author Lovesh Singh.
 * @since 13-01-2022.
 * @description to set error.
 */
export const error = (data: any) => ({
    type: ERROR,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 13-01-2022.
 * @description to set success.
 */
export const success = (data: any) => ({
    type: SUCCESS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 13-01-2022.
 * @description to set hold carts.
 */
export const SetHoldCarts = (data: any) => ({
    type: SET_HOLD_CARTS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 13-01-2022.
 * @description to set hold products.
 */
export const SetHoldProducts = (data: any) => ({
    type: SET_HOLD_PRODUCTS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 13-01-2022.
 * @description to set selected hold cart.
 */
export const SetSelectedCart = (data: { cart: any, index: any }) => ({
    type: SET_SELECTED_CART,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 13-01-2022.
 * @description to remove hold cart.
 */
export const RemoveHoldCart = (data: any) => ({
    type: REMOVE_HOLD_CART,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 13-01-2022.
 * @description to fetch hold carts.
 */
export const getHoldCarts = () => async (dispatch) => {
    dispatch(loading(true))
    await getAllHoldOrders()
        .then(holdOrders => {
            dispatch(SetHoldCarts(holdOrders))
        }).catch((err) => {
            dispatch(error(err));
        }).finally(() => {
            dispatch(loading(false))
        })
}


/**
 * @author Lovesh Singh.
 * @since 14-01-2022.
 * @description to delete hold orders according to id.
 * @param orderId order id.
 */
export const deleteHoldCart = (orderId: string) => async (dispatch) => {
    dispatch(loading(true))
    await deleteHoldOrderById(orderId)
        .then(success => {
            dispatch(RemoveHoldCart(orderId))
        }, (err) => {
            localDBErrorHandler(err, I18N.t('SomethingWentWrongTryAfterSomeTimeMsg'))
            dispatch(error(err))
        }).finally(() => {
            dispatch(loading(false))
        })
}

/**
 * @author Lovesh Singh.
 * @since 14-01-2022.
 * @description to add hold order to cart.
 * @param holdCarts holdCarts.
 * @param selectedCustomer selectedCustomer.
 * @param selectedPurpose selected purpose
 * @param complimentary is complimentary selected
 */
export const addToCart = (holdCarts, selectedCustomer, selectedPurpose, complimentary) => async (dispatch) => {
    dispatch(setCartProducts([...holdCarts]))
    dispatch(selectCustomer(selectedCustomer))
    dispatch(setPurpose(selectedPurpose))
    dispatch(setComplimentary(complimentary))
}

/**
 * @author Lovesh Singh.
 * @since 24-01-2022.
 * @description to move hold cart to order cart.
 * @param selectedHoldCart selected HoldCart.
 */
export const moveHoldCartToOrderCart = (selectedHoldCart) => async (dispatch) => {
    let selectedHoldCartDetail = selectedHoldCart?.cart?.stringData
    if (isString(selectedHoldCartDetail)) {
        selectedHoldCartDetail = JSON.parse(selectedHoldCartDetail)
    }
    await dispatch(addToCart(selectedHoldCartDetail?.holdProductList, selectedHoldCartDetail?.customerData, selectedHoldCartDetail?.purpose_id, selectedHoldCartDetail?.complimentary))
    await dispatch(deleteHoldCart(+selectedHoldCart?.cart.id))
}



