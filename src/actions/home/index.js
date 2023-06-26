import {ERROR, LOADING, SESSION_ERROR, SESSION_SUCCESS, SET_AGENT, SUCCESS} from "./types";
import {localDBErrorHandler, voidHandler} from "../../storage/DBErrorHandler";
import {
    deleteAllOrders, getAllOfflineOrders, getFromSessionDetails,
    insertDiscountData, insertServerSessionDetails
} from "../../storage/Schema_Helpers";
import {DashboardAPIService} from "../../services/DashboardAPIService";
import {setPosConfig} from "../../storage/getHomeAsyncStorage";
import {getAgentName, setSessionConfigStorage} from "../../storage/getAuthAsyncStorage";
import {showAlertDialog} from "../../helper/Utility";
import {debounce} from "../../base/hook/app_hook";
import {StorageColumn} from "../../storage";
import {clearServerSessionDetails, setServerSessionDetails} from "../auth";
import I18N from "../../helper/translation";

const TAG: string = 'HomeScreenAction :';

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to set loading.
 * @param data boolean true/ false
 * @returns {{payload: boolean, type: string}}
 */
export const loading = (data: boolean) => ({
    type: LOADING,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to set error.
 * @param data error data.
 * @returns {{payload: *, type: string}}
 */
export const error = (data: any) => ({
    type: ERROR,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to set success.
 * @param data dashboard api response data
 * @returns {{payload: *, type: string}}
 */
export const success = (data: any) => ({
    type: SUCCESS,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to set agent detail.
 * @param data agent detail.
 * @returns {{payload: string, type: string}}
 */
export const setAgent = (data: string) => ({
    type: SET_AGENT,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to set session success.
 * @param data api response data
 * @returns {{payload: *, type: string}}
 */
export const sessionSuccess = (data: any) => ({
    type: SESSION_SUCCESS,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to set session error.
 * @param data error data
 * @returns {{payload: *, type: string}}
 */
export const sessionError = (data: any) => ({
    type: SESSION_ERROR,
    payload: data
});

//async function use redux-thunk
/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to fetch home screen data.
 * @returns {(function(*): Promise<void>)|*}
 */
export const fetchHomeScreenData = (): void => async (dispatch) => {
    await dispatch(loading(true));
    await getFromSessionDetails().then(async (serverSessionDetails) => {
        await dispatch(setServerSessionDetails(serverSessionDetails))
    }, err => dispatch(clearServerSessionDetails()))
    await DashboardAPIService.fetchDashboardData().then(async (res) => {
        await handleDashboardAPIResponse(res)
        await getAgentName().then((agentName: string) => dispatch(setAgent(agentName)))
        await dispatch(success(res))
    }).catch((err) => {
        dispatch(error(err));
    }).finally(() => {
        dispatch(loading(false))
    })
};

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to handle dashboard api network response.
 * @param response network response.
 * @returns {Promise<void>}
 */
const handleDashboardAPIResponse = async (response: { pos_config: [] }): void => {
    const posConfig: { allowed_discounts: [] } = response.pos_config
    await setPosConfig(posConfig)

    posConfig[0]?.allowed_discounts?.forEach(value => { // Here we are picking only first coz same discount allowed to all nurseries.
        const discountDetail = {}
        discountDetail.id = value.id
        discountDetail.name = value.name
        discountDetail.discount = value.discount
        if (typeof value.description === 'string')
            discountDetail.description = value.description
        else
            discountDetail.description = ''
        discountDetail.category_ids = value.category_ids
        insertDiscountData(discountDetail).then(voidHandler, error => {
            localDBErrorHandler(error, I18N.t('RestartMsg'))
        })
    })
}

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to handle shop session api network response.
 * @param response network response.
 * @param shopData selected nursery details.
 * @returns {Promise<void>}
 */
const handleShopSessionAPIResponse = async (response, shopData): any => {

    await setSessionConfigStorage(response, shopData)

    const sessionId = response.session_id
    const serverSessionDetailsObj = {}
    serverSessionDetailsObj.id = 0
    serverSessionDetailsObj.shopId = shopData.id
    serverSessionDetailsObj.shopName = shopData.name
    serverSessionDetailsObj.currencySymbol = shopData.currency[0].symbol
    serverSessionDetailsObj.currencyId = shopData.currency[0].id
    serverSessionDetailsObj.currencyPosition = shopData.currency[0].position
    serverSessionDetailsObj.currencyDecimalPlaces = shopData.currency[0].decimal_places
    serverSessionDetailsObj.sessionId = sessionId
    serverSessionDetailsObj.loginNumber = response.login_number
    serverSessionDetailsObj.receiptHeader = response.config.receipt_header
    serverSessionDetailsObj.toInvoice = response.config.to_invoice
    serverSessionDetailsObj.receiptFooter = response.config.receipt_footer
    serverSessionDetailsObj.sessionStartAt = response.session_start_at

    await insertServerSessionDetails(serverSessionDetailsObj).then(voidHandler, error => {
        localDBErrorHandler(error, I18N.t('RestartMsg'))
    })

    return serverSessionDetailsObj;
}

//async function use redux-thunk
/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to resume nursery session.
 * @param shopData shop details.
 * @returns {(function(*=): Promise<void>)|*}
 */
export const resumeSession = (shopData) => async (dispatch) => {
    await dispatch(loading(true));
    await getFromSessionDetails(StorageColumn.SESSION_ID)
        .then(async previousSessionId => { // if any old session found.
            await syncSessionWithServer(shopData, dispatch, async (sessionDetail) => {
                if (previousSessionId !== sessionDetail.sessionId) { //If session Id changed.
                    await deleteAllOrders({online: true}) // than Delete only online orders.
                        .then(voidHandler, error => {
                            dispatch(sessionError(error))
                            localDBErrorHandler(error, I18N.t('RestartMsg'))
                        })
                }
            })
        }, async (error: Error) => { // If session not found, or created from somewhere else.
            await dispatch(loading(false))
            await syncSessionWithServer(shopData, dispatch)
        })
}

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to sync session with server
 * @param nursery selected nursery.
 * @param dispatch redux event dispatcher.
 * @param onSuccess callback onSuccess
 * @returns {(function(*): Promise<void>)|*}
 */
const syncSessionWithServer = async (nursery: any, dispatch: Function, onSuccess: Function) => {
    await dispatch(loading(true))
    await DashboardAPIService.fetchShopSessionData(nursery).then(async (res) => {
        const serverSessionDetails = await handleShopSessionAPIResponse(res, nursery)
        await dispatch(setServerSessionDetails(serverSessionDetails))
        await dispatch(sessionSuccess(res))
        await onSuccess?.call(this, serverSessionDetails)
    }).catch(async (err) => {
        await dispatch(sessionError(err));
    }).finally(() => {
        dispatch(loading(false))
    })
};

//async function use redux-thunk
/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to create nursery new session.
 * @param shopData shop details.
 * @param successCallback callback call on success
 * @returns {(function(*=): Promise<void>)|*}
 */
export const newSession = (shopData, successCallback: Function) => async (dispatch) => {
    await dispatch(loading(true))
    await getAllOfflineOrders().then(async offlineOrderList => {
        if (offlineOrderList?.length) { // If Offline Orders Found.
            //todo need to separate this alert dialog & remove debounce.
            showAlertDialog(I18N.t('OfflineOrdersFoundColonMsg') + offlineOrderList.length, I18N.t('OfflineSyncOrdersDescMsg'),
                [
                    {
                        text: I18N.t('SyncWithNewSessionButtonLabel'), style: "cancel",
                        onPress: debounce(() => {
                            // Delete only online orders.
                            deleteAllOrders({online: true}).then(() => {
                                syncSessionWithServer(shopData, dispatch, successCallback) // Continue to create session.
                            }, async error => {
                                await dispatch(sessionError(error))
                                await localDBErrorHandler(error, I18N.t('RestartMsg'))
                            })
                        })
                    },
                ])
        } else { // If No Offline Orders Found.
            // Delete all orders.
            await deleteAllOrders().then(() => {
                syncSessionWithServer(shopData, dispatch, successCallback) // Continue to create session.
            }, async error => {
                await dispatch(sessionError(error))
                await localDBErrorHandler(error, I18N.t('RestartMsg'))
            })
        }
    }, async error => {
        await dispatch(sessionError(error))
        await localDBErrorHandler(error, I18N.t('RestartMsg'))
    })
}