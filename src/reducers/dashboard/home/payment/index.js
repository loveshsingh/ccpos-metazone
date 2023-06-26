import {
    DELETE_USED_PAYMENT_METHOD,
    ERROR,
    LOADING,
    ON_PRESS_PAYMENT_METHOD,
    ON_USED_PAYMENT_METHOD_DETAIL_DIALOG_BACK_PRESS,
    ON_USED_PAYMENT_METHOD_DETAIL_DIALOG_SUBMIT_PRESS,
    SELECT_USED_PAYMENT_METHOD, SET_CAN_MAKE_PAYMENT,
    SET_COLLECTED_AMOUNT,
    SET_DISCOUNT_REMARKS,
    SET_INVOICE_ORDER,
    SET_PAYMENT_METHODS,
    SET_TOTAL_CART_AMOUNT,
    SET_TOTAL_CART_APPLIED_DISCOUNT_AMOUNT, SET_TOTAL_COLLECTED_AMOUNT,
    SUCCESS
} from "../../../../actions/dashboard/home/payment/types";
import {deepCopy} from "../../../../base/hook/app_hook";
import I18N from "../../../../helper/translation";
import {Constant} from "../../../../helper/constant";
import {isArray} from "../../../../helper/Utility";

/**
 * @author Vipin Joshi.
 * @since 12-01-2022.
 * @description Payment Screen initial default state.
 */
const INITIAL_STATE = {
    loading: false,
    error: undefined,

    discountRemarks: undefined,
    paymentMethods: [],
    canMakePayment: false,
    invoiceOrder: false, // test this

    usedPaymentMethods: [],
    selectedUsedPaymentMethodDetail: {
        paymentMethod: undefined,
        index: -1
    },

    totalAppliedDiscount: 0,
    totalAmount: 0,

    totalCollected: 0,
    remainingAmount: 0,

    showPaymentMethodDetailDialog: false,
    paymentMethodDetailDialogEditMode: false,
}

/**
 * @author Vipin Joshi.
 * @since 12-01-2022.
 * @description Payment Screen state handler.
 * @see INITIAL_STATE
 */
const PaymentReducer = (state = INITIAL_STATE, action) => {
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
        case SET_DISCOUNT_REMARKS: {
            const remarks = action.payload
            return {
                ...state,
                discountRemarks: remarks ? remarks : INITIAL_STATE.discountRemarks,
            }
        }
        case SET_PAYMENT_METHODS: {
            return {
                ...state,
                paymentMethods: [...action.payload],
                usedPaymentMethods: INITIAL_STATE.usedPaymentMethods,
                selectedUsedPaymentMethodDetail: INITIAL_STATE.selectedUsedPaymentMethodDetail
            }
        }
        case SET_TOTAL_CART_AMOUNT: {
            return {
                ...state,
                totalAmount: +action.payload
            }
        }
        case SET_TOTAL_CART_APPLIED_DISCOUNT_AMOUNT: {
            return {
                ...state,
                totalAppliedDiscount: +action.payload
            }
        }
        case SET_COLLECTED_AMOUNT: {
            return setCollectedAmount(state, action)
        }
        case SET_TOTAL_COLLECTED_AMOUNT: {
            return setTotalCollectedAmount(state)
        }
        case SET_INVOICE_ORDER: {
            return {
                ...state,
                invoiceOrder: action.payload
            }
        }
        case SET_CAN_MAKE_PAYMENT: {
            return {
                ...state,
                canMakePayment: action.payload
            }
        }
        case ON_PRESS_PAYMENT_METHOD: {
            return onPressPaymentMethod(state, action)
        }
        case SELECT_USED_PAYMENT_METHOD: {
            return selectUsedPaymentMethod(state, action)
        }
        case DELETE_USED_PAYMENT_METHOD: {
            return deleteUsedPaymentMethod(state, action)
        }
        case ON_USED_PAYMENT_METHOD_DETAIL_DIALOG_BACK_PRESS: {
            return onUsedPaymentMethodDetailDialogBackPress(state, action)
        }
        case ON_USED_PAYMENT_METHOD_DETAIL_DIALOG_SUBMIT_PRESS: {
            return onUsedPaymentMethodDetailDialogSubmitPress(state, action)
        }
        default: {
            return state
        }
    }
}

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to handle payment method press event.
 * @param state current state.
 * @param action current action.
 * @returns {*} updated state.
 */
const onPressPaymentMethod = (state, action): any => {
    const paymentMethod = action.payload
    const callBack = action.callBack
    const existingUsedPaymentMethods = state.usedPaymentMethods
    console.log('Payment Method', JSON.stringify(paymentMethod))
    console.log('Discount Remarks:', state.discountRemarks)

    const usedPaymentMethod: any = {...deepCopy(paymentMethod)} // Recreating the base object as iterable object.

    if (+existingUsedPaymentMethods?.length > 0 && existingUsedPaymentMethods[0]?.name !== usedPaymentMethod?.name) {
        callBack?.call(this, false)
        return {
            ...state
        }
    }

    let amountCollected = ''
    if (usedPaymentMethod.type === 'bank' && (state.totalAmount - state.totalCollected) > 0) {
        amountCollected = state.totalAmount - state.totalCollected
    }
    usedPaymentMethod.amountCollected = amountCollected

    const usedPaymentMethods = [...state.usedPaymentMethods, usedPaymentMethod]
    const selectedUsedPaymentMethodDetail = {
        paymentMethod: {...usedPaymentMethod},
        index: usedPaymentMethods.length - 1
    }

    let tempTotalCollected = 0
    usedPaymentMethods.forEach(paymentMethod => tempTotalCollected += +paymentMethod.amountCollected)

    const canMakePayment = tempTotalCollected >= state.totalAmount

    console.log('Used Payment Method', JSON.stringify(usedPaymentMethod))
    console.log('Selected Used Payment Method', JSON.stringify(selectedUsedPaymentMethodDetail))
    callBack?.call(this, true)
    return {
        ...state,
        usedPaymentMethods: usedPaymentMethods,
        selectedUsedPaymentMethodDetail: selectedUsedPaymentMethodDetail,
        totalCollected: tempTotalCollected,
        canMakePayment: canMakePayment,
        showPaymentMethodDetailDialog: usedPaymentMethod.type !== I18N.t('Cash')
    }
}

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to add collected amount on selected usedPayment Method.
 * @param state current state.
 * @param action current action.
 * @returns {*} updated state.
 */
const setCollectedAmount = (state, action): any => {
    const {value, index} = action.payload

    const usedPaymentMethods = [...state.usedPaymentMethods]
    const existingPaymentMethod = {...usedPaymentMethods[index]}

    existingPaymentMethod.amountCollected = value
    usedPaymentMethods.splice(index, 1, existingPaymentMethod)

    let tempTotalCollected = 0
    usedPaymentMethods.forEach(paymentMethod => tempTotalCollected += +paymentMethod.amountCollected)

    const canMakePayment = tempTotalCollected >= state.totalAmount

    return {
        ...state,
        usedPaymentMethods: usedPaymentMethods,
        totalCollected: tempTotalCollected,
        canMakePayment: canMakePayment,
    }
}

/**
 * @author Lovesh Singh.
 * @since 05-03-2022.
 * @description to set total collected amount on selected usedPayment Method.
 * @param state current state.
 * @returns {*} updated state.
 */
const setTotalCollectedAmount = (state): any => {
    const usedPaymentMethods = [...state.usedPaymentMethods]

    let tempTotalCollected = 0
    usedPaymentMethods.forEach(paymentMethod => tempTotalCollected += +paymentMethod.amountCollected)

    const canMakePayment = tempTotalCollected >= state.totalAmount

    return {
        ...state,
        totalCollected: tempTotalCollected,
        canMakePayment: canMakePayment,
    }
}

/**
 * @author Vipin Joshi.
 * @since 17-02-2022.
 * @description to handle select used payment method event.
 * @param state current state.
 * @param action current action.
 * @returns {*} updated state.
 */
const selectUsedPaymentMethod = (state, action): any => {
    const {data, index} = action.payload
    const showPaymentMethodDetailDialog = data.type !== I18N.t('Cash')

    return {
        ...state,
        selectedUsedPaymentMethodDetail: {
            paymentMethod: {...data},
            index: index,
        },
        showPaymentMethodDetailDialog: showPaymentMethodDetailDialog,
        paymentMethodDetailDialogEditMode: showPaymentMethodDetailDialog
    }
}

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to delete Used Payment Method.
 * @param state current state.
 * @param action current action.
 * @returns {*} updated state.
 */
const deleteUsedPaymentMethod = (state, action): any => {
    const {index} = action.payload
    console.log('deleteUsedPaymentMethod Index: ', index)

    // const existingUsedPaymentMethods = [...state.usedPaymentMethods]
    const existingUsedPaymentMethods = []
    // existingUsedPaymentMethods.splice(index, 1)

    let i = 0
    state.usedPaymentMethods.forEach((usedPaymentMethod: any) => {
        if (i !== index) {
            existingUsedPaymentMethods.push(usedPaymentMethod)
        }
        i++
    })


    let selectedPaymentMethod = INITIAL_STATE.selectedUsedPaymentMethodDetail?.paymentMethod
    let selectedPaymentMethodIndex = INITIAL_STATE.selectedUsedPaymentMethodDetail?.index

    if (existingUsedPaymentMethods.length > 0) {
        selectedPaymentMethodIndex = existingUsedPaymentMethods.length - 1
        selectedPaymentMethod = {...existingUsedPaymentMethods[selectedPaymentMethodIndex]}
    }

    let tempTotalCollected = 0.0
    existingUsedPaymentMethods.forEach(paymentMethod => tempTotalCollected += +paymentMethod.amountCollected)

    const canMakePayment = tempTotalCollected >= state.totalAmount

    console.log('Existing USed Payment Methods', JSON.stringify(existingUsedPaymentMethods))

    return {
        ...state,
        usedPaymentMethods: existingUsedPaymentMethods,
        selectedUsedPaymentMethodDetail: {
            paymentMethod: selectedPaymentMethod,
            index: selectedPaymentMethodIndex
        },
        totalCollected: tempTotalCollected,
        canMakePayment: canMakePayment,
    }
}

/**
 * @author Vipin Joshi.
 * @since 17-01-2022.
 * @description to handle used payment method detail dialog back press event.
 * @param state current state.
 * @param action current action.
 * @returns {*} updated state.
 */
const onUsedPaymentMethodDetailDialogBackPress = (state, action): any => {
    const existingUsedPaymentMethods = [...state.usedPaymentMethods]
    const existingSelectedUsedPaymentMethodDetail: { paymentMethod: any, index: number } = {...state.selectedUsedPaymentMethodDetail}

    existingUsedPaymentMethods.splice(existingSelectedUsedPaymentMethodDetail.index, 1)

    let lastItemIndex = existingUsedPaymentMethods.length - 1
    let selectedPaymentMethod = undefined
    if (lastItemIndex >= 0) {
        selectedPaymentMethod = {...existingUsedPaymentMethods[lastItemIndex]}
    } else { // if got index out of range than reset to Initial state index.
        lastItemIndex = INITIAL_STATE.selectedUsedPaymentMethodDetail.index
    }


    // Check for validate button will become visible or keep hidden.
    let tempTotalCollected = 0.0
    existingUsedPaymentMethods.forEach(paymentMethod => tempTotalCollected += +paymentMethod.amountCollected)

    const canMakePayment = tempTotalCollected >= state.totalAmount

    return {
        ...state,
        showPaymentMethodDetailDialog: false,
        usedPaymentMethods: existingUsedPaymentMethods,
        selectedUsedPaymentMethodDetail: {
            paymentMethod: selectedPaymentMethod,
            index: lastItemIndex
        },
        totalCollected: tempTotalCollected,
        canMakePayment: canMakePayment,
    }
}

/**
 * @author Vipin Joshi.
 * @since 17-01-2022.
 * @description to handle used payment method detail dialog submit press event.
 * @param state current state.
 * @param action current action.
 * @returns {*} updated state.
 */
const onUsedPaymentMethodDetailDialogSubmitPress = (state, action): any => {
    const existingUsedPaymentMethods = [...state.usedPaymentMethods]
    const existingSelectedUsedPaymentMethodDetail: { paymentMethod: any, index: number } = {...state.selectedUsedPaymentMethodDetail}

    const existingPaymentMethod = {...existingUsedPaymentMethods[existingSelectedUsedPaymentMethodDetail.index]}
    existingPaymentMethod.paymentDetails = action.payload

    existingUsedPaymentMethods.splice(existingSelectedUsedPaymentMethodDetail.index, 1, existingPaymentMethod)

    return {
        ...state,
        showPaymentMethodDetailDialog: false,
        usedPaymentMethods: existingUsedPaymentMethods,
        selectedUsedPaymentMethodDetail: {
            paymentMethod: existingPaymentMethod,
            index: existingSelectedUsedPaymentMethodDetail.index
        },
        paymentMethodDetailDialogEditMode: false
    }
}

export default PaymentReducer
