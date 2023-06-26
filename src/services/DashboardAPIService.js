/**
 * @author Vipin Joshi.
 * @since 03-12-2021.
 * @description to handle dashboard screen apis.
 */
import {NetworkConfiguration} from "../network/NetwrokConfiguration";
import {betterFetchDataFromAPI} from "../network/NetworkConnection";
import {dashboardAPIErrorHandler, sessionAPIErrorHandler} from "../network/NetworkErrorHandler";
import AppConfig from "../base/AppConfig";

const API_URL = AppConfig.env?.apiUrl

/**
 * @author Vipin Joshi.
 * @since 03-12-2021.
 * @description to fetch dashboard API Data.
 */
const fetchDashboardData = (): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.DASHBOARD_API, "GET")
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                dashboardAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to fetch session API Data.
 */
const fetchShopSessionData = (shop): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.SHOP_SESSION_API + "?config_id=" + shop.id, "GET")
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                sessionAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 03-12-2021.
 * @description Dashboard API service provider.
 */
export const DashboardAPIService = {
    fetchDashboardData, fetchShopSessionData
};
