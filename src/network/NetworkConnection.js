/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description network request manager.
 */
import {NetworkConfiguration} from './NetwrokConfiguration';
import {StorageKeyConstants} from '../constants/StorageKeyConstants';
import {Alert} from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
import {isNetworkAvailable} from "../helper/Utility";
import {getAuthAsyncStorage} from "../storage/getAuthAsyncStorage";
import I18N from "../helper/translation";

export const serializeJSON = function (data) {
    if (typeof data != "string") {

        let rr = Object.keys(data)
            .map(function (keyName) {
                return encodeURIComponent(keyName) + "=" + data[keyName];
            })
            .join("&");
        return rr;
    } else {
        return data;
    }
};

/**
 * @deprecated
 * @param url
 * @param method
 * @param body
 * @param requestHeaders
 * @return {Promise<unknown>}
 * @see betterFetchDataFromAPI
 */
/*export const fetchDataFromAPI = (url, method, body, requestHeaders = {}) => new Promise((resolve, reject) => { // needs body here
    isNetworkAvailable().then(isConnected => {
        if (isConnected) {
            requestHeaders['Authorization'] = NetworkConfiguration.BASIC_AUTH_KEY;
            AsyncStorage.getItem(StorageKeyConstants.AGENT_LOGIN_HEADER).then(loginKey => {
                if (loginKey && loginKey.length > 0) {
                    requestHeaders['Login'] = loginKey
                }
                requestHeaders['Accept'] = '*!/!*'
                requestHeaders['content-type'] = 'text/plain'

                console.log('NetworkConnection.js url -->', url);
                console.log('NetworkConnection.js method -->', method);
                console.log('NetworkConnection.js requestHeaders -->', requestHeaders);
                console.log('NetworkConnection.js body -->', body);


                return fetch(url, {
                    method: method,
                    headers: requestHeaders,
                    body: body
                })
                    .then(response => {
                        console.log('NetworkConnection.js Raw Response -->', response)
                        if (response.status == 200) {
                            return response.json();
                        } else {
                            reject(response)
                        }
                    })
                    .then(responseJson => {
                        console.log('NetworkConnection.js JSON Response -->', responseJson)
                        resolve(responseJson)
                    })
                    .catch(error => {
                        console.log("Neeraj" + error.message);
                        // reject(error)
                    })

            })
        } else {
            Alert.alert(
                StringConstants.NetworkUnavailableMsg,
                StringConstants.noInternetConnectivityMsg,
                [
                    {
                        text: StringConstants.CancelButtonLabel, style: "cancel", onPress: () => {
                            resolve({"success": false, "message": "Network Error."});
                        }
                    },
                    {
                        text: StringConstants.RetryButtonLabel,
                        style: "cancel",
                        onPress: () => {
                            fetchDataFromAPI(url, method, body, requestHeaders).then(response => {
                                resolve(response)
                            });
                        }
                    },
                ],
                {cancelable: false}
            )
        }
    })
})*/

/**
 * @author Vipin Joshi.
 * @since 23-08-2021.
 * @param url API request url.
 * @param method request method.
 * @param body request body.
 * @param requestHeaders request headers.
 * @returns {Promise<unknown>} promise.
 */
export const betterFetchDataFromAPI = (url, method, body, requestHeaders = {}) => new Promise((resolve, reject) => { // needs body here
    isNetworkAvailable().then(isConnected => {
        if (isConnected) {
            requestHeaders['Authorization'] = NetworkConfiguration.BASIC_AUTH_KEY;
            getAuthAsyncStorage().then(res => {
                let loginHeader = res.loginHeader;
                if (loginHeader && loginHeader.length > 0) {
                    requestHeaders['Login'] = loginHeader
                }
                requestHeaders['Accept'] = '*/*'
                requestHeaders['content-type'] = 'text/plain'

                console.log('NetworkConnection.js url -->', url);
                console.log('NetworkConnection.js method -->', method);
                console.log('NetworkConnection.js requestHeaders -->', requestHeaders);
                console.log('NetworkConnection.js body -->', body);


                return fetchWithTimeout(url, {
                    method: method,
                    headers: requestHeaders,
                    body: body,
                    timeout: /*url.includes(NetworkConfiguration.SHOP_SESSION_API) ? 1 :*/ 35000 // 35 seconds.
                })
                    .then(response => {
                        console.log('NetworkConnection.js Raw Response -->', response)
                        let statusCode = +response.status;
                        if (statusCode < 300) { // If success than execute other response.
                            console.log("response success")
                            resolve(response.json())
                            // return response.json();
                        } /*else if (isRetryAllow(url)) {
                            console.log("retry allow...................")
                            showNetworkRetryDialog(response.status + "  " + response.statusText, StringConstants.somethingWentWrong,
                                () => {
                                    reject({"success": false, "message": statusCode + ": " + response.statusText});
                                }, () => {
                                    betterFetchDataFromAPI(url, method, body, requestHeaders).then(response => {
                                        resolve(response)
                                    });
                                },
                                {cancelable: false})
                        }*/ else {
                            console.log("reject ....................")
                            reject(response)
                        }
                    })
                    /*.then(responseJson => {
                        console.log('NetworkConnection.js JSON Response -->', responseJson)
                        resolve(responseJson)
                    })*/
                    .catch(error => { // To handle error.
                        console.log("Neeraj" + error.message);

                        let title = 'Something went wrong'
                        let description = 'Unknown Error.'

                        if (error.name === 'AbortError') { // if request timeout.
                            title = 'Request timeout'
                            description = 'Server out of reachable.'
                            error.message = I18N.t('InternetConnectionProblemMsg')
                        }

                        reject({...error, status: NetworkStatus.REQUEST_TIMEOUT, statusText: title})
                        /*showNetworkRetryDialog(title, description,
                            () => {
                                reject({"success": false, "message": description});
                            }, () => {
                                betterFetchDataFromAPI(url, method, body, requestHeaders).then(response => {
                                    resolve(response)
                                });
                            },
                            {cancelable: false})*/
                    })
            })
        } else {
            reject({status: NetworkStatus.REQUEST_TIMEOUT, statusText: "Network Error"})
            /*showNetworkRetryDialog(StringConstants.NetworkUnavailableMsg, StringConstants.noInternetConnectivityMsg,
                () => {
                    resolve({"success": false, "message": "Network Error."});
                }, /!*() => {
                    betterFetchDataFromAPI(url, method, body, requestHeaders).then(response => {
                        resolve(response)
                    });
                },*!/ {cancelable: false});*/
        }
    })
})

/**
 * @author Vipin Joshi.
 * @since 23-08-2021.
 * @param resource resource url
 * @param options request options.
 * @returns {Promise<*>} promise.
 * @description fetch request with Request options.
 * <p> default timeout will be set for 8 seconds.</p>
 */
export const fetchWithTimeout = async (resource, options: RequestOption = {}) => {
    console.log("fetch With Timeout Called........................")
    const {timeout = 8000} = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);

    return response;
}

/**
 * @author Vipin Joshi.
 * @since 23-08-2021.
 * @description network request options.
 */
interface RequestOption {
    method: string,
    headers: {},
    body: string,
    timeout: number
}

/**
 * @author Vipin Joshi.
 * @since 23-08-2021.
 * @param url resource url.
 * @returns {boolean} true when to show retry dialog.
 */
const isRetryAllow = (url: string): boolean => {
    return url.includes(NetworkConfiguration.SYNC_ORDER_API)/* || url.includes(NetworkConfiguration.CLOSE_SESSION_API)*/
}

export const NetworkStatus = {
    REQUEST_TIMEOUT: 408
}
