/**
 * @author Vipin Joshi.
 * @since 13-12-2021.
 * @description to handle product apis.
 */
import {NetworkConfiguration} from "../network/NetwrokConfiguration";
import {betterFetchDataFromAPI} from "../network/NetworkConnection";
import {
    categoryListAPIErrorHandler, paymentListAPIErrorHandler, productListAPIErrorHandler,
    taxListAPIErrorHandler, uomListAPIErrorHandler
} from "../network/NetworkErrorHandler";
import AppConfig from "../base/AppConfig";
import {paymentMethodsLoading} from "../actions/dashboard/home";

const API_URL = AppConfig.env?.apiUrl

/**
 * @author Vipin Joshi.
 * @since 13-12-2021.
 * @description to fetch payment methods API Data.
 */
const fetchPaymentMethods = async (dispatch, shopId: string): Promise => {
    await dispatch(paymentMethodsLoading(true))
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.PAYMENT_LIST_API + `?config_id=${shopId}`, "GET")
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                paymentListAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 13-12-2021.
 * @description to fetch tax API Data.
 */
const fetchTaxDetails = (shopId: string): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.TAX_LIST_API + `?config_id=${shopId}`, "GET")
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                taxListAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 13-12-2021.
 * @description to fetch product uom API Data.
 */
const fetchProductUOMData = (shopId: string): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.UOM_LIST_API + `?config_id=${shopId}`, "GET")
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                uomListAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 13-12-2021.
 * @description to fetch product categories API Data.
 */
const fetchProductCategories = (shopId: string, offset: number, perPage: number): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.CATEGORY_LIST_API + `?config_id=${shopId}&offset=${offset}&limit=${perPage}`, "GET")
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                categoryListAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 13-12-2021.
 * @description to fetch products API Data.
 */
const fetchProducts = (shopId: string, offset: number, perPage: number): Promise => {
    return new Promise((resolve, reject) => {
        betterFetchDataFromAPI(API_URL + NetworkConfiguration.PRODUCT_LIST_API + `?config_id=${shopId}&offset=${offset}&limit=${perPage}`, "GET")
            .then(async res => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
            .catch((err) => {
                productListAPIErrorHandler(err)
                reject(err)
            })
    })
}

/**
 * @author Vipin Joshi.
 * @since 13-12-2021.
 * @description Product API service provider.
 */
export const ProductAPIService = {
    fetchPaymentMethods, fetchTaxDetails, fetchProductUOMData, fetchProductCategories, fetchProducts
};
