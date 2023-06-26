/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to handle application level apis.
 */
import {betterFetchDataFromAPI} from "../network/NetworkConnection";
import {webhookAPIErrorHandler} from "../network/NetworkErrorHandler";
import AppConfig from "../base/AppConfig";

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to send failed notification to slack.
 * @param payload requested Data.
 * @see dummy payload to cu
 */
const sendFailedOrderToSlack = (payload: any): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(AppConfig.env?.orderFailWebhookApiUrl, "POST", JSON.stringify(payload))
            .then(async res => {
                resolve(res)
            })
            .catch((err) => {
                webhookAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description App API service provider.
 */
export const AppAPIService = {
    sendFailedOrderToSlack
};
