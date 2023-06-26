/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description to handle splash screen apis.
 */
import {NetworkConfiguration} from "../network/NetwrokConfiguration";
import {betterFetchDataFromAPI} from "../network/NetworkConnection";
import {splashAPIErrorHandler} from "../network/NetworkErrorHandler";
import AppConfig from "../base/AppConfig";

const API_URL = AppConfig.env?.apiUrl

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description to fetch Splash Screen Data.
 */
const fetchSplashData = (): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.SPLASH_DATA_API, "GET")
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                splashAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description Splash API service provider.
 */
export const SplashAPIService = {
    fetchSplashData,
};