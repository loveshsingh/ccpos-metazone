import {NetworkConfiguration} from "../network/NetwrokConfiguration";
import {betterFetchDataFromAPI} from "../network/NetworkConnection";
import {closeSessionAPIErrorHandler, loginAPIErrorHandler, logoutAPIErrorHandler} from "../network/NetworkErrorHandler";
import Buffer from 'buffer';
import {setAuthAsyncStorage, setAuthDetailsAsyncStorage} from "../storage/getAuthAsyncStorage";
import AppConfig from "../base/AppConfig";

const API_URL = AppConfig.env?.apiUrl

/**
 * @author Vipin Joshi.
 * @since 25-11-2021.
 * @description to verify user credentials.
 */
const login = (username, password): Promise => {

    const loginRequestBase64 = Buffer.Buffer.from(
        JSON.stringify({
            "login": username,
            "pwd": password
        })).toString("base64")

    return new Promise((resolve, reject) => {
        setAuthAsyncStorage(loginRequestBase64);
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.LOGIN_API, "POST")
            .then(async res => {
                // this.refs.toast.show(res.message)
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                loginAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description to logout user.
 */
const logout = (): Promise => {

    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.LOGOUT_API, "POST")
            .then(async res => {
                // this.refs.toast.show(res.message)
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                logoutAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description to logout user.
 * @param shopId shop Id
 * @param normSeqNo normal Seq. No
 * @param compSeqNo complimentary Seq. No
 */
const closeSession = (shopId, normSeqNo, compSeqNo): Promise => {

    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.CLOSE_SESSION_API + `?config_id=${shopId}&seq_no=${+normSeqNo}&compl_seq_no=${+compSeqNo}`, "GET")
            .then(async res => {
                // this.refs.toast.show(res.message)
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                closeSessionAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 25-11-2021.
 * @description Auth API service provider.
 */
export const AuthAPIService = {
    login,
    logout,
    closeSession,
};
