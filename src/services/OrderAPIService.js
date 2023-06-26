/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to handle order apis.
 */
import {NetworkConfiguration} from "../network/NetwrokConfiguration";
import {betterFetchDataFromAPI} from "../network/NetworkConnection";
import {syncOrderAPIErrorHandler} from "../network/NetworkErrorHandler";
import AppConfig from "../base/AppConfig";

const API_URL = AppConfig.env?.apiUrl

/**
 * @author Vipin Joshi.
 * @since 07-01-2022.
 * @description to create customer.
 * @param payload requested Data.
 */
const syncOrders = (payload: any): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.SYNC_ORDER_API, "POST", JSON.stringify(payload))
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                syncOrderAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description Order API service provider.
 */
export const OrderAPIService = {
    syncOrders
};
