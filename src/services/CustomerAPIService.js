/**
 * @author Vipin Joshi.
 * @since 13-12-2021.
 * @description to handle customer apis.
 */
import {NetworkConfiguration} from "../network/NetwrokConfiguration";
import {betterFetchDataFromAPI} from "../network/NetworkConnection";
import {customerAPIErrorHandler, customerListAPIErrorHandler} from "../network/NetworkErrorHandler";
import AppConfig from "../base/AppConfig";

const API_URL = AppConfig.env?.apiUrl

/**
 * @author Vipin Joshi.
 * @since 13-12-2021.
 * @description to fetch customers API Data.
 */
const fetchCustomers = (shopId: any, offset: number, perPage: number): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.CUSTOMER_LIST_API + `?config_id=${shopId}&offset=${offset}&limit=${perPage}`, "GET")
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                customerListAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 07-01-2022.
 * @description to create customer.
 * @param payload requested Data.
 */
const createCustomer = (payload: any): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.CREATE_CUSTOMER_API, "POST", JSON.stringify(payload))
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                customerAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 08-01-2022.
 * @description to update customer.
 * @param payload requested Data.
 */
const updateCustomer = (payload: any): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.UPDATE_CUSTOMER_API, "PUT", JSON.stringify(payload))
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                customerAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 13-12-2021.
 * @description Customer API service provider.
 */
export const CustomerAPIService = {
    fetchCustomers, createCustomer, updateCustomer
};
