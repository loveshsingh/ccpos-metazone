import {
    deleteAllOrders,
    getAllOrders, getFromSessionDetails
} from "../../../storage/Schema_Helpers";
import {
    ERROR,
    LOADING,
    SET_ORDERS_SUMMARY, SUCCESS
} from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StorageKeyConstants} from "../../../constants/StorageKeyConstants";
import {AuthAPIService} from "../../../services/AuthAPIService";
import {clearServerSessionDetails, setServerSessionDetails} from "../../auth";
import {setPosConfigForClose} from "../../../storage/getHomeAsyncStorage";
import {localDBErrorHandler} from "../../../storage/DBErrorHandler";
import {syncAllOfflineOrders} from "../orders";
import {convertDate} from "../../../helper/Utility";
import I18N from "../../../helper/translation";
import {Constant} from "../../../helper/constant";
import {deSelectCustomer} from "../home/customer";
import {resetPurpose} from "../home";

/**
 * @author Lovesh Singh.
 * @since 17-01-2022.
 * @description to set loading & its message.
 */
export const loading = (data: boolean, message?: string) => ({
    type: LOADING,
    payload: {data, message}
});

/**
 * @author Lovesh Singh.
 * @since 17-01-2022.
 * @description to set error.
 */
export const error = (data: any) => ({
    type: ERROR,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 17-01-2022.
 * @description to set success.
 */
export const success = (data: any) => ({
    type: SUCCESS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 17-01-2022.
 * @description to set orders summary.
 */
export const SetOrdersSummary = (data: any) => ({
    type: SET_ORDERS_SUMMARY,
    payload: data
});


/**
 * @author Lovesh Singh.
 * @since 17-01-2022.
 * @description to fetch orders.
 * todo remove comments...
 * todo fix method redundancy.
 */
export const fetchOrdersSummary = () => async (dispatch) => {
    dispatch(loading(true))
    const orderSummary = {}
    await getAllOrders()
        .then(orderList => {
            if (orderList.length > 0) {
                for (let i = 0; i < orderList.length; i++) {
                    const orderItem = orderList[i]
                    const orderDetail = JSON.parse(orderItem?.orderDetailsString)
                    const orderDate = orderDetail?.creation_date
                    const orderAmount = +orderDetail.amount_total
                    const formattedDate = convertDate(new Date(orderDate), Constant.FORMAT_yyyy_MMH_dd_hh_mm_ss).format(Constant.FORMAT_YYYY_MM_DD);

                    if (!orderSummary[formattedDate]) { // if date not found than assign an array to new date key.
                        orderSummary[formattedDate] = []
                    }
                    const data = {
                        totalAmount: orderAmount
                    }
                    orderSummary[formattedDate].push(data)
                }

            }
            dispatch(SetOrdersSummary(orderSummary))
        }).catch((err) => {
            dispatch(error(err));
        }).finally(() => {
            dispatch(loading(false))
        })
}

/**
 * @author Lovesh Singh.
 * @since 19-01-2021.
 * @description to close nursery session.
 * @returns {(function(*=): Promise<void>)|*}
 * @param orderDetail for shopData and SessionDetails
 * @param successCallback
 * @param errorCallback
 */
export const closeSession = (orderDetail: { shopData: number, sessionDetails: any }, successCallback, errorCallback) => async (dispatch) => {
    await getFromSessionDetails().then(async (serverSessionDetails) => {
        await dispatch(setServerSessionDetails(serverSessionDetails))
        await dispatch(syncAllOfflineOrders.bind(this, orderDetail, (shopId)=>{
                    fetchCloseSessionData(successCallback,dispatch,shopId)
                }, errorCallback, dispatch))
    },err => localDBErrorHandler(err))
}


/**
 * @author Lovesh Singh.
 * @since 18-01-2022.
 * @param shopId
 * @param successCallback
 * @param dispatch
 * @description to close session.
 */
const fetchCloseSessionData = (successCallback, dispatch, shopId): void => {
    dispatch(loading(true))
    AsyncStorage.getItem(StorageKeyConstants.SESSION_CONFIG_NORMAL_SEQUENCE_NO, (err, normSeqNo) => {
        AsyncStorage.getItem(StorageKeyConstants.SESSION_CONFIG_COMPLEMENT_SEQUENCE_NO, (err, compSeqNo) => {
            AuthAPIService.closeSession(shopId, normSeqNo, compSeqNo).then(async (res) => {
                await handleCloseSessionAPIResponse(res)
                await dispatch(success(res))
            }).catch((err) => {
                dispatch(error(err));
            }).finally(async () => {
                dispatch(loading(false))
                successCallback?.call(this)
                await dispatch(clearServerSessionDetails)
                await dispatch(deSelectCustomer())
                await dispatch(resetPurpose())
            })
        })
    })
}

/**
 * @author Lovesh Singh.
 * @since 19-01-2021.
 * @description to handle close session api response.
 */
const handleCloseSessionAPIResponse = async (response: any): void => {
    await deleteAllOrders().then(async () => {
        let posConfig = response?.pos_config
        await setPosConfigForClose(posConfig)
    }, (err) => {
        dispatch(error(err))
        localDBErrorHandler.bind(this, error, I18N.t("RestartMsg"))
    })
}

