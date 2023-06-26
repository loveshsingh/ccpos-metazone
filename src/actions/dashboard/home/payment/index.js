import {
    DELETE_USED_PAYMENT_METHOD,
    ERROR,
    LOADING,
    ON_PRESS_PAYMENT_METHOD,
    ON_USED_PAYMENT_METHOD_DETAIL_DIALOG_BACK_PRESS, ON_USED_PAYMENT_METHOD_DETAIL_DIALOG_SUBMIT_PRESS,
    SELECT_USED_PAYMENT_METHOD, SET_CAN_MAKE_PAYMENT,
    SET_COLLECTED_AMOUNT,
    SET_DISCOUNT_REMARKS,
    SET_INVOICE_ORDER,
    SET_PAYMENT_METHODS,
    SET_TOTAL_CART_AMOUNT,
    SET_TOTAL_CART_APPLIED_DISCOUNT_AMOUNT, SET_TOTAL_COLLECTED_AMOUNT,
    SET_USED_PAYMENT_METHODS,
    SUCCESS,
} from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getLastOrderId, getOrderPrefix, getPaymentList, insertOrderData} from "../../../../storage/Schema_Helpers";
import {localDBErrorHandler, voidHandler} from "../../../../storage/DBErrorHandler";
import {HomeAsyncStorage} from "../../../../storage/getHomeAsyncStorage";
import {AuthAsyncStorage} from "../../../../storage/getAuthAsyncStorage";
import {
    convertDate,
    generateOrderSerialNo,
    isArray,
    isNetworkAvailable,
    isOrderComplimentary
} from "../../../../helper/Utility";
import {StorageKeyConstants} from "../../../../constants/StorageKeyConstants";
import {Constant} from "../../../../helper/constant";
import {OrderAPIService} from "../../../../services/OrderAPIService";
import {invalidResponseHandler, webhookAPIErrorHandler} from "../../../../network/NetworkErrorHandler";
import {handleOrderSyncCreateCustomerResponse, handleOrderSyncEditCustomerResponse} from "../customer";
import {AppAPIService} from "../../../../services/AppAPIService";
import I18N from "../../../../helper/translation";
import AppConfig from "../../../../base/AppConfig";
import {StorageConstant} from "../../../../storage";

const TAG: string = 'PaymentScreenAction :';

/**
 * @author Vipin Joshi.
 * @since 12-01-2022.
 * @description to set loading.
 * @param data boolean true/ false
 * @returns {{payload: boolean, type: string}}
 */
export const loading = (data: boolean) => ({
    type: LOADING,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 12-01-2022.
 * @description to set error.
 * @param data error data.
 * @returns {{payload: *, type: string}}
 */
export const error = (data: any) => ({
    type: ERROR,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 12-01-2022.
 * @description to set success.
 * @param data dashboard api response data
 * @returns {{payload: *, type: string}}
 */
export const success = (data: any) => ({
    type: SUCCESS,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 13-01-2022.
 * @description to set discount remarks.
 * @param data discount comment: reason of discount.
 * @returns {{payload: *, type: string}}
 */
export const setDiscountRemarks = (data: string) => ({
    type: SET_DISCOUNT_REMARKS,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 13-01-2022.
 * @description to set payment methods.
 * @param data payment methods
 * @returns {{payload: *, type: string}}
 */
export const setPaymentMethods = (data: []) => ({
    type: SET_PAYMENT_METHODS,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to set used payment methods.
 * @param data payment methods
 * @returns {{payload: *, type: string}}
 */
export const setUsedPaymentMethods = (data: []) => ({
    type: SET_USED_PAYMENT_METHODS,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to handle on press payment method event.
 * @param data payment methods
 * @param callBack press event callback
 * @returns {{payload: *, type: string}}
 */
export const onPressPaymentMethod = (data: any, callBack: Function) => ({
    type: ON_PRESS_PAYMENT_METHOD,
    payload: data,
    callBack: callBack
})

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to set collected amount on a selected used payment method
 * @param data collected amount.
 * @returns {{payload: *, type: string}}
 */
export const setCollectedAmount = (data: { value: number, index: number }) => ({
    type: SET_COLLECTED_AMOUNT,
    payload: data
})

/**
 * @author Lovesh Singh.
 * @since 05-03-2022.
 * @description to set total collected amount on a selected used payment method
 * @param data collected amount.
 * @returns {{payload: *, type: string}}
 */
export const setTotalCollectedAmount = (data: { value: number, index: number }) => ({
    type: SET_TOTAL_COLLECTED_AMOUNT,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to set total cart amount.
 * @param data total cart amount including tax.
 * @returns {{payload: *, type: string}}
 */
export const setTotalCartAmount = (data: any) => ({
    type: SET_TOTAL_CART_AMOUNT,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to set total cart discount amount.
 * @param data total cart applied discount amount.
 * @returns {{payload: *, type: string}}
 */
export const setTotalAppliedDiscountAmount = (data: any) => ({
    type: SET_TOTAL_CART_APPLIED_DISCOUNT_AMOUNT,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to select used Payment method
 * @param data collected amount.
 * @returns {{payload: *, type: string}}
 */
export const selectUsedPaymentMethod = (data: { data: any, index: number }) => ({
    type: SELECT_USED_PAYMENT_METHOD,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to delete used Payment method
 * @param data collected amount.
 * @returns {{payload: *, type: string}}
 */
export const deleteUsedPaymentMethod = (data: { data: any, index: number }) => ({
    type: DELETE_USED_PAYMENT_METHOD,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 14-01-2022.
 * @description to set current invoice is order invoice.
 * @param data true/false
 * @returns {{payload: *, type: string}}
 */
export const setInvoiceOrder = (data: boolean) => ({
    type: SET_INVOICE_ORDER,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to set current can make payment manually.
 * @param data true/false
 * @returns {{payload: *, type: string}}
 */
export const setCanMakePayment = (data: boolean) => ({
    type: SET_CAN_MAKE_PAYMENT,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 17-01-2022.
 * @description to handle used payment method detail dialog back press event.
 * @param data no use : undefined
 * @returns {{payload: *, type: string}}
 */
export const onUsedPaymentMethodDetailDialogBackPress = (data: any) => ({
    type: ON_USED_PAYMENT_METHOD_DETAIL_DIALOG_BACK_PRESS,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 17-01-2022.
 * @description to handle used payment method detail dialog submit press event.
 * @param data no use : undefined
 * @returns {{payload: *, type: string}}
 */
export const onUsedPaymentMethodDetailDialogSubmitPress = (data: any) => ({
    type: ON_USED_PAYMENT_METHOD_DETAIL_DIALOG_SUBMIT_PRESS,
    payload: data
})

//async function use redux-thunk
/**
 * @author Vipin Joshi.
 * @since 14-01-2022.
 * @description to load initial data from local db.
 * @returns {(function(*): Promise<void>)|*}
 * @param sessionDetails current session details.
 * @param cartItems current cart Items.
 */
export const loadData = (sessionDetails: any, cartItems: []) => async (dispatch) => {
    await dispatch(loading(true))
    await dispatch(setInvoiceOrder(sessionDetails?.toInvoice))
    await loadDataFromDB(dispatch).catch((err) => {
        dispatch(error(err));
    }).finally(() => {
        dispatch(loading(false))
    })
}

/**
 * @author Vipin Joshi.
 * @description to load initial data from db.
 * @param dispatch redux event dispatcher.
 */
const loadDataFromDB = async (dispatch) => {
    let paymentMethods: [] = []
    let shopId = ''
    await getPaymentList().then((savedPaymentMethods: []) => paymentMethods = [...savedPaymentMethods], commonDataErrorHandler)
    await AuthAsyncStorage.getShopIdAsyncStorage().then((currentShopId) => shopId = currentShopId)
    await HomeAsyncStorage.getPosConfig().then((posConfig: []) => {
        const allowPaymentMethods = []
        const currentShopConfig: { allow_payment_method_ids: [] } = posConfig.find((posConfig: any) => +posConfig.id === +shopId)

        if (currentShopConfig) {
            const allowPaymentMethodIds: [] = currentShopConfig.allow_payment_method_ids

            if (isArray(allowPaymentMethodIds)) {
                allowPaymentMethodIds.forEach(methodId => {

                    const allowedPaymentMethod = paymentMethods.find(paymentItem => +methodId === +paymentItem.id)
                    if (allowedPaymentMethod) {
                        allowPaymentMethods.push(allowedPaymentMethod)
                    }

                })
            }

        }

        dispatch(setPaymentMethods(allowPaymentMethods))
    })
}

/**
 * @author Vipin Joshi.
 * @since 14-01-2022.
 * @description to remove code redundancy.
 * @param error error object.
 */
const commonDataErrorHandler = (error): void => {
    localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to place order.
 * @returns {(function(*): Promise<void>)|*}
 */
export const placeOrder = (orderDetails: {
    usedPaymentMethods: [], cartProducts: [], isComplimentary: boolean, sessionDetails: any,
    totalAmount: number, totalCollected: number, isInvoiceOrder: boolean, selectedCustomer: any,
    purpose: string, discountRemarks: string, typeOfPlantation: string, howDidYouKnowAboutUs: string,
    farmLandArea: string
}, successCallback, errorCallback) => async (dispatch) => {

    const {
        usedPaymentMethods, cartProducts, isComplimentary,
        sessionDetails,
        totalAmount, totalCollected,
        isInvoiceOrder,
        selectedCustomer,
        purpose, discountRemarks, typeOfPlantation, howDidYouKnowAboutUs, farmLandArea
    } = orderDetails

    const {shopId, sessionId, loginNumber, currencyDecimalPlaces} = sessionDetails

    await dispatch(loading(true))

    await getLastOrderId().then(async lastOrderId => {
        await getOrderPrefix().then(async orderPrefix => {
            await AsyncStorage.getItem(StorageKeyConstants.SESSION_CONFIG_SHOP_SHORT_NAME, async (err, nurseryShortName) => {

                let tempSessionId = sessionId.toString()
                let tempLoginNumber = loginNumber.toString()
                let orderPaymentMethodArray = []
                let orderedProductArray = []

                for (let index = 0; index <= (5 - tempSessionId.length); index++) {
                    tempSessionId = '0' + tempSessionId
                }
                for (let index = 0; index <= (3 - tempLoginNumber.length); index++) {
                    tempLoginNumber = '0' + tempLoginNumber
                }
                await usedPaymentMethods.forEach(paymentMethod => {
                    const tempPaymentObject = {}
                    tempPaymentObject.amount = parseFloat(parseFloat(paymentMethod.amountCollected).toFixed(currencyDecimalPlaces))
                    tempPaymentObject.payment_id = paymentMethod.id

                    let paymentDetails = paymentMethod.paymentDetails
                    if (paymentDetails) {
                        Object.keys(paymentDetails).forEach(key => {
                            tempPaymentObject[key] = paymentDetails[key]
                        })
                    }

                    orderPaymentMethodArray.push(tempPaymentObject)
                })

                const tempCartProductList = cartProducts
                const isComplementary = isComplimentary

                for (let cartProductIndex = 0; cartProductIndex < tempCartProductList.length; cartProductIndex++) {
                    const element = tempCartProductList[cartProductIndex];
                    let tempProductData = {}
                    tempProductData.display_name = element.display_name
                    tempProductData.product_id = element.id
                    tempProductData.price_unit = element.price_tax_exclusive

                    // if an order complimentary than add price total & subtotal = 0 coz there total product price discount will be added.
                    tempProductData.price_subtotal = isComplementary ? 0 : parseFloat(parseFloat(element.price_tax_exclusive - element.applied_discount_value) * parseFloat(element.cartQty))
                    tempProductData.price_subtotal_incl = isComplementary ? 0 : parseFloat(parseFloat(element.price_tax_inclusive - element.applied_discount_value) * parseFloat(element.cartQty))
                    tempProductData.qty = element.cartQty
                    if (!isComplementary) {
                        tempProductData.discount = 0
                        if ('discountPercent' in element) {
                            tempProductData.discount = (parseFloat(element.discountPercent) / 100) * parseFloat(element.price_tax_exclusive) * parseFloat(element.cartQty)
                        }
                    }
                    //above discount ignored, applying new here
                    // if an order complimentary than add discount same as product unit rate.
                    tempProductData.discount = isComplementary ? +element.price_tax_exclusive : element.applied_discount_value
                    let tempId = Object.assign(cartProductIndex)
                    tempProductData.id = tempId.toString()
                    orderedProductArray.push(tempProductData)
                }
                let today = Math.round((new Date()).getTime() / 1000)

                const tempOrderData = {}
                tempOrderData.payment_ids = orderPaymentMethodArray
                tempOrderData.lines = orderedProductArray
                tempOrderData.id = `${tempSessionId}-${tempLoginNumber}-${today}`
                tempOrderData.name = `${orderPrefix} ${tempSessionId}-${tempLoginNumber}-${today}`
                tempOrderData.amount_paid = totalCollected
                tempOrderData.amount_total = totalAmount

                let partnerId = false
                let partnerName = false
                let partnerPhone = false
                if (selectedCustomer) {
                    partnerId = selectedCustomer.id
                    partnerName = selectedCustomer.name
                    partnerPhone = selectedCustomer.phone
                }
                tempOrderData.partner_id = partnerId
                tempOrderData.partner_name = partnerName
                tempOrderData.partner_phone = partnerPhone
                tempOrderData.to_invoice = isInvoiceOrder
                tempOrderData.amount_return = parseFloat(parseFloat(totalCollected) - parseFloat(totalAmount))
                tempOrderData.creation_date = convertDate(new Date(), Constant.FORMAT_yyyy_MMH_dd_hh_mm_ss)
                tempOrderData.purpose_id = purpose
                tempOrderData.discount_remarks = discountRemarks
                if (typeOfPlantation) {
                    tempOrderData.type_of_plantation = typeOfPlantation
                }
                if (howDidYouKnowAboutUs) {
                    tempOrderData.how_did_you_know_about_us = howDidYouKnowAboutUs
                }
                if (farmLandArea) {
                    tempOrderData.farm_land_area = farmLandArea
                }

                let orderRealmObject = {}
                orderRealmObject.orderId = lastOrderId + 1
                let seqNoProperty = StorageKeyConstants.SESSION_CONFIG_NORMAL_SEQUENCE_NO
                if (isOrderComplimentary(tempOrderData)) {
                    seqNoProperty = StorageKeyConstants.SESSION_CONFIG_COMPLEMENT_SEQUENCE_NO
                }

                await AsyncStorage.getItem(seqNoProperty, async (err, sequenceNo) => {
                    const seqNo = +sequenceNo + 1 // increment seq no & save after successfully saved.
                    tempOrderData.reference_seq_no = generateOrderSerialNo((seqNo).toString(), nurseryShortName)
                    orderRealmObject.orderDetailsString = JSON.stringify(tempOrderData)

                    await isNetworkAvailable().then(isOnline => { // always resolving so dont need to handle errors
                        if (isOnline) {
                            return placeOrderOnline(dispatch, selectedCustomer, tempOrderData, shopId, sessionId, orderRealmObject, seqNoProperty, seqNo, successCallback, errorCallback)
                        } else {
                            return placeOrderOffline(dispatch, orderRealmObject, seqNoProperty, seqNo, successCallback, errorCallback)
                        }
                    })
                })
            })
        }, (error) => {
            placeOrderDBErrorhandler(dispatch, error, errorCallback)
        })
    }, (error) => {
        placeOrderDBErrorhandler(dispatch, error, errorCallback)
    })
}


/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to place online order.
 * @param dispatch Redux state dispatcher.
 * @param selectedCustomer selected customer object.
 * @param tempOrderData Order Object.
 * @param shopId Current ShopId.
 * @param sessionId Current SessionId.
 * @param orderRealmObject Local DB Order Object.
 * @param seqProperty Seq No Property Name, Normal, Complimentary
 * @param seqNo New Seq No for specified property.
 * @param successCallback callback called when all operation successfully happened
 * @param errorCallback callback called when there is any error.
 */
const placeOrderOnline = async (dispatch, selectedCustomer, tempOrderData, shopId, sessionId, orderRealmObject, seqProperty, seqNo, successCallback, errorCallback): void => {
    let offlineCreatedCustomerRequestData = []
    let offlineEditedCustomerRequestData = []
    // This should be added on while sync orders.
    if (selectedCustomer.isOffline) {
        // tempOrderData.is_offline_customer_order = true;
        const customer = {...selectedCustomer}
        let customerData = {
            // "id": customer.id,
            "zip": customer.zip,
            "city": customer.city,
            "barcode": customer.barcode,
            "vat": customer.vat,
            "phone": customer.phone,
            "street": customer.street,
            "state_id": customer.state_id >= 0 ? customer.state_id : false,
            "country_id": customer.country_id >= 0 ? customer.country_id : false,
            "name": customer.name,
            "email": customer.email,
            "aadhaar_no": customer.aadhaar_no,
            "pan_no": customer.pan_no,
            // "taluk": customer.taluk,
            // "district": customer.district,
            "taluk_id": customer.taluk_id >= 0 ? customer.taluk_id : false,
            "district_id": customer.district_id >= 0 ? customer.district_id : false,
            // "village_id": customer.village_id,
            "village": customer.village,
            "farm_land_area": customer.farm_land_area,
            "whatsapp_number": customer.whatsapp_number,
            "comment": customer.farm_address, // temporarily using comment field to store farm address
            // need a change here as well
        }

        let filteredFarmList = []
        // let farmList = customer.farm_list;
        let farmList = (customer.farm_list && customer.farm_list.length > 0 ? customer.farm_list :
                (customer.child_ids && customer.child_ids.length > 0 ? customer.child_ids : [])
        ) // farm List data can come in both keys.
        let counter = new Date().getTime()
        await farmList.forEach(farm => { // filtering farms for update and add required properties.
            if (farm.isOffline) {
                let localFarm = {
                    "type": farm.type,
                    "name": farm.name,
                    "street": farm.street,
                    "street2": farm.street2,
                    "city": farm.city,
                    "state_id": farm.state_id >= 0 ? farm.state_id : false,
                    "zip": farm.zip,
                    "taluk_id": farm.taluk_id >= 0 ? farm.taluk_id : false,
                    "district_id": farm.district_id >= 0 ? farm.district_id : false,
                    "gp_village_id": farm.gp_village_id >= 0 ? farm.gp_village_id : false,
                    "country_id": farm.country_id >= 0 ? farm.country_id : false,
                    "is_farmer": farm.is_farmer,
                    "is_vendor": farm.is_vendor,
                    "is_cash_vendor": farm.is_cash_vendor,
                    "is_meditator": farm.is_meditator,
                    "local_body_id": farm.local_body_id >= 0 ? farm.local_body_id : false,
                    "block_id": farm.block_id >= 0 ? farm.block_id : false,
                    "gram_panchayat_id": farm.gram_panchayat_id >= 0 ? farm.gram_panchayat_id : false,
                    "landmark": farm.landmark
                }
                let requiredProperty = "is_child_edited_in_offline"
                if (!farm.isSynced) { // if network request required local ids than add here.
                    requiredProperty = "is_child_created_in_offline"
                    if (!farm.id || farm.id === -1) {
                        farm.id = counter++;
                    }
                }
                localFarm.id = farm.id
                localFarm[requiredProperty] = true
                filteredFarmList.push(localFarm)
            }
        })
        customerData.child_ids = filteredFarmList

        let property;
        if (customer.isSynced) {
            // customerData.id = customer.id
            property = 'is_offline_edited_customer_order'
            offlineEditedCustomerRequestData.push({
                "id": customer.id,
                "details": customerData
            })
        } else {
            property = 'is_offline_created_customer_order'
            offlineCreatedCustomerRequestData.push({
                "id": customer.id,
                "details": customerData
            })
        }
        tempOrderData[property] = true
    }

    let tempOrderRequestData = []
    tempOrderRequestData.push(tempOrderData)
    let requestObject = {
        "config_id": Number(shopId),
        "session_id": sessionId,
        "orders": tempOrderRequestData,
    }
    if (offlineCreatedCustomerRequestData.length > 0) {
        requestObject.offline_created_customer_details = offlineCreatedCustomerRequestData
    } else if (offlineEditedCustomerRequestData.length > 0) {
        requestObject.offline_edited_customer_details = offlineEditedCustomerRequestData
    }

    console.log("Request Object: ", requestObject)
    return OrderAPIService.syncOrders(requestObject).then(async (res) => {
        await handleOrderSyncAPIResponse(dispatch, res, orderRealmObject, tempOrderData, seqProperty, seqNo, successCallback, errorCallback)
        await dispatch(success(res))
    }).catch((err) => {
        dispatch(error(err));
        errorCallback?.call(this, err, (acceptFailed) => {
            if (acceptFailed)
                handleOrderSyncAPIError(dispatch, orderRealmObject, seqProperty, seqNo, successCallback, errorCallback)
        })
    }).finally(() => {
        dispatch(loading(false))
    })
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to handle order sync api response.
 * @param dispatch Redux state dispatcher.
 * @param res api response
 * @param orderRealmObject Local DB Order Object.
 * @param tempOrderData OrderDetail Object
 * @param seqNoProperty Seq No Property Name, Normal, Complimentary
 * @param seqNo New Seq No for specified property.
 * @param successCallback callback called when all operation successfully happened
 * @param errorCallback callback called when there is any error.
 */
const handleOrderSyncAPIResponse = (dispatch, res, orderRealmObject, tempOrderData, seqNoProperty, seqNo, successCallback, errorCallback): void => {
    if (res.code === 201) {
        res.order.forEach(value => {
            orderRealmObject.sulaba_pos_order_id = value;
        })
        orderRealmObject.isOffline = false
        orderRealmObject.isFailed = false
        if (res.success && res.success === true) {
            orderRealmObject.isSynced = res.order.toString().toLowerCase().includes(tempOrderData.name.toLowerCase())
        } else {
            orderRealmObject.isSynced = false
        }
        AsyncStorage.setItem(seqNoProperty, String(seqNo))// Online: on success sync, update sequence number on selected property.
        insertOrderData(orderRealmObject).then(orderDataFromRealm => {
            handleOrderSyncCreateCustomerResponse(res)
            handleOrderSyncEditCustomerResponse(res)

            successCallback?.call(this, orderDataFromRealm)
        }, error => {
            if (!error.message) {
                error.message = I18N.t('SomethingWentWrongTryAfterSomeTimeMsg')
            }
            errorCallback?.call(this, error)
            localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
        })
    } else {
        //send payload to webhook
        errorCallback?.call(this)
        invalidResponseHandler(res)
        handleOrderSyncAPIError(dispatch, orderRealmObject, seqNoProperty, seqNo, successCallback, errorCallback)
        // AsyncStorage.setItem(StorageConstant.FAILED_ORDER, JSON.stringify(orderRealmObject))
        sendOrderPayloadOnOrderFailed(orderRealmObject)
    }
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to handle order sync api error
 * @param dispatch Redux state dispatcher.
 * @param orderRealmObject local DB Realm Object
 * @param seqProperty Seq No Property Name, Normal, Complimentary
 * @param seqNo New Seq No for specified property.
 * @param successCallback callback called when all operation successfully happened
 * @param errorCallback callback called when there is any error.
 */
const handleOrderSyncAPIError = (dispatch, orderRealmObject, seqProperty, seqNo, successCallback, errorCallback): void => {
    orderRealmObject.isFailed = true
    placeOrderOffline(dispatch, orderRealmObject, seqProperty, seqNo, successCallback, errorCallback)
    sendOrderPayloadOnOrderFailed(orderRealmObject)
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to place offline order.
 * @param dispatch Redux state dispatcher.
 * @param orderLocalDBPayload Local DB Order Object.
 * @param seqNoProperty Seq No Property Name, Normal, Complimentary
 * @param seqNo New Seq No for specified property.
 * @param successCallback callback called when all operation successfully happened
 * @param errorCallback callback called when there is any error.
 */
const placeOrderOffline = (dispatch, orderLocalDBPayload, seqNoProperty, seqNo, successCallback, errorCallback): void => {
    orderLocalDBPayload.isOffline = true
    orderLocalDBPayload.isSynced = false
    orderLocalDBPayload.sulaba_pos_order_id = ''
    orderLocalDBPayload.isFailed = !!orderLocalDBPayload.isFailed

    insertOrderData(orderLocalDBPayload).then(orderDataFromRealm => {
        AsyncStorage.setItem(seqNoProperty, String(seqNo)) // Offline: on success insertion, update sequence number on selected property.
        successCallback?.call(this, orderDataFromRealm)
    }, error => {
        if (!error.message) {
            error.message = I18N.t('SomethingWentWrongTryAfterSomeTimeMsg')
        }

        errorCallback?.call(this, error)
        localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
    }).finally(() => {
        dispatch(loading(false))
    })
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description common db error handler for order placing
 */
const placeOrderDBErrorhandler = (dispatch, error, errorCallback): void => {
    dispatch(loading(false))
    localDBErrorHandler(error, I18N.t('RestartMsg'))
    errorCallback?.call(this, error)
}

/**
 * @author Vipin Joshi.
 * @since 04-12-2021.
 * @description to trigger slack webhook on order failure.
 * @see https://slack.com/intl/en-in/help/articles/202288908-Format-your-messages To customize payload message
 */
const sendOrderPayloadOnOrderFailed = (payload): void => {
    AsyncStorage.getItem(StorageKeyConstants.SESSION_CONFIG_SHOP_NAME, (err, nursery) => {
        const orderDetails = JSON.parse(payload.orderDetailsString)
        const id = orderDetails.name
        const amount = orderDetails.amount_total
        const refNo = orderDetails.reference_seq_no
        const title = AppConfig.env?.orderFailWebhookTitle
        const orderDetailList = "1. *Nursery Name:* " + nursery +
            "\n 2. *Id:* " + id +
            "\n 3. *Amount:* " + amount +
            "\n 4. *Ref-no:* " + refNo
        const codeBlock = "\n\n*Request Payload*\n```" + JSON.stringify(payload) + "```"
        const requestPayload = {
            text: `${title}${orderDetailList}${codeBlock}`
        }
        AppAPIService.sendFailedOrderToSlack(requestPayload).then(voidHandler).catch((err) => webhookAPIErrorHandler(err))
    })
}