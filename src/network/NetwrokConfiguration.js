/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description hold network configurations.
 */
export const NetworkConfiguration = {
    DEMO_USERNAME: "",
    DEMO_PASSWORD: "",
    BASIC_AUTH_KEY: 'Basic WVdSdGFXNDZZV1J0YVc0PTpZV1J0YVc0NllXUnRhVzQ9',
    // BASIC_AUTH_KEY: 'Basic bW9iaWxlcG9zYWRtaW46d2I1d1F6OTg3MjQzNmZyd2RrdSZeJXd0UEVxcEJ3', // NOT USABLE Live AUTH_KEY
    LOGIN_API: "/mobikul/pos/login",
    LOGOUT_API: "/mobikul/pos/logout", //Phase 1 API End Point
    // LOGOUT_API:"/mobikul/pos/signout",
    DASHBOARD_API: "/mobikul/pos/dashboard",
    SHOP_SESSION_API: "/mobikul/pos/session",
    SPLASH_DATA_API: "/mobikul/pos/splashdata",
    UOM_LIST_API: "/mobikul/pos/product/uom",
    TAX_LIST_API: "/mobikul/pos/taxes",
    PAYMENT_LIST_API: "/mobikul/pos/payment/method",
    CATEGORY_LIST_API: "/mobikul/pos/categories",
    PRODUCT_LIST_API: "/mobikul/pos/products",
    CUSTOMER_LIST_API: "/mobikul/pos/customers",
    // CREATE_CUSTOMER_API: "/mobikul/pos/customer/create",
    CREATE_CUSTOMER_API: "/isha/pos/customer/create",
    // UPDATE_CUSTOMER_API: "/mobikul/pos/customer/update/", // pass customer id as path param: /mobikul/pos/customer/update/<int:partner_id>
    UPDATE_CUSTOMER_API: "/isha/pos/customer/update",
    // SYNC_ORDER_API: "/mobikul/pos/sync/orders",
    SYNC_ORDER_API: "/isha/pos/sync/orders",
    CLOSE_SESSION_API: "/mobikul/pos/session/close",
}
