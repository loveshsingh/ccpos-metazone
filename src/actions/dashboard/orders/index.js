import {
    getAllOfflineOrders,
    getAllOnlineOrders, getAllOrders, getCustomerById, insertOrderData
} from "../../../storage/Schema_Helpers";
import {
    CLEAR_SELECTED_TAB,
    ERROR,
    LOADING, SET_ORDER_DIALOG_DATA,
    SET_ORDERS, SET_SELECTED_ORDER, SET_SELECTED_TAB, SUCCESS
} from "./types";
import {Constant} from "../../../helper/constant";
import {isNetworkAvailable} from "../../../helper/Utility";
import {OrderAPIService} from "../../../services/OrderAPIService";
import {localDBErrorHandler, voidHandler} from "../../../storage/DBErrorHandler";
import {handleOrderSyncCreateCustomerResponse, handleOrderSyncEditCustomerResponse} from "../home/customer";
import {syncOrderAPIErrorHandler} from "../../../network/NetworkErrorHandler";
import I18N from "../../../helper/translation";

const TAG = "ordersAction"


/**
 * @author Lovesh Singh.
 * @since 08-01-2022.
 * @description to set loading & its message.
 */
export const loading = (data: boolean, message?: string) => ({
    type: LOADING,
    payload: {data, message}
});

/**
 * @author Lovesh Singh.
 * @since 08-01-2022.
 * @description to set error.
 */
export const error = (data: any) => ({
    type: ERROR,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 11-01-2022.
 * @description to set success.
 */
export const success = (data: any) => ({
    type: SUCCESS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 11-01-2022.
 * @description to set orders.
 */
export const SetOrders = (data: any) => ({
    type: SET_ORDERS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 11-01-2022.
 * @description to set selected tab.
 */
export const SetSelectedTab = (data: any) => ({
    type: SET_SELECTED_TAB,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 24-01-2022.
 * @description to clear selected tab.
 */
export const clearSelectedTab = (data: any) => ({
    type: CLEAR_SELECTED_TAB,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 11-01-2022.
 * @description to set selected order.
 */
export const SetSelectedOrder = (data: { order: any, index: any }) => ({
    type: SET_SELECTED_ORDER,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 24-01-2022.
 * @description to set orders dialog data.
 */
export const SetOrderDialogData = (data: any) => ({
    type: SET_ORDER_DIALOG_DATA,
    payload: data
});


/**
 * @author Lovesh Singh.
 * @since 11-01-2022.
 * @description to fetch orders according to selected Tab.
 * todo remove comments...
 * todo fix method redundancy.
 */
export const SelectOrderListTab = (selectedTab: string) => async (dispatch) => {
    dispatch(loading(true))
    if (selectedTab === Constant.TAB_ONLINE) {
        await getAllOnlineOrders()
            .then(onlineOrders => {
                dispatch(SetOrders(onlineOrders))
            }).catch((err) => {
                dispatch(error(err));
            }).finally(() => {
                dispatch(loading(false))
            })
    } else {
        await getAllOfflineOrders()
            .then(offlineOrders => {
                dispatch(SetOrders(offlineOrders))
            }).catch((err) => {
                dispatch(error(err));
            }).finally(() => {
                dispatch(loading(false))
            })
    }
}



/**
 * @author Lovesh Singh.
 * @since 17-01-2022.
 * @description to fetch orders.
 * todo remove comments...
 * todo fix method redundancy.
 */
export const fetchAllOrders = () => async (dispatch) => {
    dispatch(loading(true))
    await getAllOrders()
        .then(orderList => {
            if (orderList.length > 0) {
                let orderDialogData = []
                for (let i = 0; i < orderList.length; i++) {
                    const orderItem = orderList[i]

                    const orderDetailData = {}
                    orderDetailData.orderId = orderItem.orderId
                    orderDetailData.posOrderId = orderItem.sulaba_pos_order_id
                    orderDetailData.isOffline = orderItem.isOffline
                    orderDetailData.isSynced = orderItem.isSynced

                    orderDetailData.detail = JSON.parse(orderItem.orderDetailsString)

                    orderDialogData.push(orderDetailData)
                }
            dispatch(SetOrderDialogData(orderDialogData))
            }
        }).catch((err) => {
            dispatch(error(err));
        }).finally(() => {
            dispatch(loading(false))
        })
}


/**
 * @author Lovesh Singh.
 * @since 21-01-2022.
 * @description to sync offline orders.
 */
export const syncOfflineOrders = (orderDetail: any, successCallback: ()=>void, errorCallback: (error: Error)=>void) => (dispatch) =>
    syncAllOfflineOrders(orderDetail, successCallback, errorCallback, dispatch)


/**
 * @author Lovesh Singh.
 * @since 19-01-2022.
 * @description to sync all offline orders.
 */
export const syncAllOfflineOrders = (orderDetail: any, successCallback, errorCallback, dispatch): void => {
    isNetworkAvailable().then((isOnline) => {
        if (isOnline === true) {
            dispatch(loading(true))
            getAllOfflineOrders().then((offlineOrders) => {
                const {shopId, sessionId} = orderDetail?.sessionDetails

                let tempOrderRequestData = []
                let offlineCreatedCustomerRequestData = []
                let offlineEditedCustomerRequestData = []
                let orderCount = 0;

                const tempCartProductList = offlineOrders
                if (tempCartProductList && tempCartProductList.length > 0) {
                    tempCartProductList.forEach(order => {
                        const element = JSON.parse(order?.orderDetailsString);
                        let customerId = element?.partner_id
                        getCustomerById(customerId).then(customer => {
                            if (customer.isOffline) {
                                let customerData = {
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
                                    "taluk_id": customer.taluk_id >= 0 ? customer.taluk_id : false,
                                    "district_id": customer.district_id >= 0 ? customer.district_id : false,
                                    // "village_id": customer.village_id,
                                    "village": customer.village,
                                    "farm_land_area": customer.farm_land_area,
                                    "whatsapp_number": customer.whatsapp_number,
                                    "comment": customer.farm_address, // temporarily using comment field to store farm address
                                }
                                let filteredFarmList = []
                                let farmList = customer.child_ids;
                                // need a change here as well
                                farmList.forEach(farm => { // filtering farms for update and add required properties.
                                    if (farm.isOffline) {
                                        // noinspection DuplicatedCode
                                        const localFarm = {
                                            "id": farm.id,
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
                                        }
                                        localFarm[requiredProperty] = true
                                        filteredFarmList.push(localFarm)
                                    }
                                });
                                customerData.child_ids = filteredFarmList

                                let property;
                                if (customer.isSynced) { // that means customer recently created online.
                                    property = 'is_offline_edited_customer_order'
                                    offlineEditedCustomerRequestData.push({
                                        "id": customer.id,
                                        "details": customerData
                                    })
                                } else { // for offline created customers.
                                    property = 'is_offline_created_customer_order'
                                    offlineCreatedCustomerRequestData.push({
                                        "id": customer.id,
                                        "details": customerData
                                    })
                                }
                                element[property] = true
                            }
                            tempOrderRequestData.push(element);

                            if (++orderCount === tempCartProductList.length) {
                                let requestObject = {
                                    "config_id": Number(shopId),
                                    "session_id": sessionId,
                                    "orders": tempOrderRequestData
                                }
                                if (offlineCreatedCustomerRequestData.length > 0) {
                                    requestObject.offline_created_customer_details = offlineCreatedCustomerRequestData
                                }
                                if (offlineEditedCustomerRequestData.length > 0) {
                                    requestObject.offline_edited_customer_details = offlineEditedCustomerRequestData
                                }

                                console.log("Sync order : ", requestObject)

                                return OrderAPIService.syncOrders(requestObject).then(async (res) => {
                                    await handleOrderSyncAllAPIResponse(dispatch, res, tempCartProductList, successCallback, errorCallback, shopId)
                                    await dispatch(success(res))
                                }).catch((err) => {
                                    dispatch(error(err));
                                    errorCallback?.call(this, err)
                                    handleOrderSyncAPIError(dispatch, err, requestObject)
                                }).finally(() => {
                                    dispatch(loading(false))
                                })
                            }
                        }, (error) => {
                            localDBErrorHandler(error, errorCallback)
                        })
                    })
                } else { // If there are no orders to sync.
                    console.log("...............NO ORDERS TO SYNC................")
                    successCallback?.call(this, shopId)
                    dispatch(loading(false))
                }

            }, (error) => {
                localDBErrorHandler(dispatch, error, errorCallback)
            })
        } else {
            console.log(I18N.t('NoInternetConnectivityMsg')) //todo
        }
    })
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to handle order sync api response.
 * @param dispatch Redux state dispatcher.
 * @param res api response
 * @param tempCartProductList OrderDetail Object
 * @param shopId
 * @param successCallback callback called when all operation successfully happened
 * @param errorCallback callback called when there is any error.
 */
const handleOrderSyncAllAPIResponse = (dispatch, res, tempCartProductList, successCallback, errorCallback, shopId): void => {
    if (res.code === 201) {
        tempCartProductList.forEach(element => {
            res.order.forEach(value => {
                if (value === JSON.parse(element?.orderDetailsString).name) {
                    let tempObject = {}
                    tempObject.orderId = element.orderId;
                    tempObject.orderDetailsString = element?.orderDetailsString;
                    tempObject.isOffline = false;
                    tempObject.isFailed = false;
                    tempObject.isSynced = true
                    tempObject.sulaba_pos_order_id = value;
                    insertOrderData(tempObject).then(voidHandler, error => {
                        localDBErrorHandler(error, I18N.t('OrdersSyncedButNotInsertedMsg'))
                    })
                }
            })
        })
        handleOrderSyncCreateCustomerResponse(res)
        handleOrderSyncEditCustomerResponse(res)

        successCallback?.call(this, shopId)
        console.log(TAG, 'All Offline Orders Are synced Successfully')
    } else {
        //send payload to webhook
        errorCallback?.call(this)
    }
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to handle order sync api error
 * @param dispatch Redux state dispatcher.
 * @param err Error Object.
 * @param orderPayload Failed Order Payload.
 * @param orderRealmObject local DB Realm Object
 */
const handleOrderSyncAPIError = (dispatch, err, orderPayload, orderRealmObject): void => {
    syncOrderAPIErrorHandler(err)
    // AsyncStorage.setItem(StorageConstant.FAILED_ORDER, JSON.stringify(orderPayload))
}
