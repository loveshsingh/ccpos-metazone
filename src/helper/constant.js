/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description hold app constants.
 */

import {width} from "./Utility";
import I18N from "./translation";

export const Constant = {

    ITEMS_PER_PAGE: 10000,
    DEFAULT_USER_NAME: '',
    DEFAULT_PASSWORD: '',

    HORIZONTAL_PROGRESS_HEIGHT: 6,
    HORIZONTAL_PROGRESS_WIDTH: width / 4,
    // SPLASH_DEFAULT_TIMEOUT: 2000,
    TEXT_SIZE_BIG: 25,
    INDIA_COUNTRY_ID: 104,
    TAMIL_NADU_STATE_ID: 607,

    ORDER_SUM_50000: 50000,
    ORDER_SUM_200k: 200000,

    DEFAULT_NURSERY_SHORT_NAME: 'XXX',
    DEFAULT_PRODUCT_CART_QTY: 0,
    TAB_OFFLINE: 'offline',
    TAB_ONLINE: 'online',
    FARM_LAND_VALUE: 'farmland',
    FORMAT_YYYY_MM_DD: 'YYYY-MM-DD',
    FORMAT_yyyy_MMH_dd_hh_mm_ss: 'yyyy-MM-dd hh:mm:ss',
    FORMAT_DD_MM_yyyy: 'DD/MM/yyyy',
    FORMAT_hh_mm_ss: 'hh:mm:ss',
    STAGING: 'staging',
    ORDER_PREFIX_LABEL_FOR_SERVER: "mobikulPos",
    ANIMATION_DURATION: 300,

    //Sentry Constants

    SENTRY_ORG: 'isha-foundation-y7',
    SENTRY_PROJECT: 'cauvery-calling-pos',
    SENTRY_AUTH_TOKEN: 'a2219fea2906445cade86cd41ebdbef4de704a4774c8426db3449434c5e73b5b',
    SENTRY_DSN: 'https://bfe515ddf8fd4b22ac7f2c833c43d476@o1220128.ingest.sentry.io/6365077',


    // Value Constants....................... Don't touch these value will impact on API
    Home: 'home',
    Marriage: 'marriage',
    Other: 'other',
    FarmLand: 'farmland',
    General: 'general',

    FarmLandQuestion1Option1Value: 'farmer_mobilization',
    FarmLandQuestion1Option2Value: 'direct_visit',
    FarmLandQuestion2Option1Value: 'block_plantation',
    FarmLandQuestion2Option2Value: 'boundary_plantation',

    // Value Constants...................... END.
}

export const Purposes = [
    // {name: I18N.t('PurposeHomeLabel'), id: Constant.Home},
    // {name: I18N.t('PurposeMarriageLabel'), id: Constant.Marriage},
    // {name: I18N.t('PurposeOtherEventsLabel'), id: Constant.Other},
    // {name: I18N.t('PurposeFarmlandLabel'), id: Constant.FarmLand},
    {name: I18N.t('PurposeFarmlandLabel'), id: Constant.FarmLand},
    {name: I18N.t('PurposeHomeLabel'), id: Constant.Home},
    {name: I18N.t('PurposeGeneralLabel'), id: Constant.General},
]

export const FarmLandQuestion1Data = [
    {
        name: I18N.t('FarmLandQuestion1Option1'),
        id: Constant.FarmLandQuestion1Option1Value
    }, {
        name: I18N.t('FarmLandQuestion1Option2'),
        id: Constant.FarmLandQuestion1Option2Value
    }
]

export const FarmLandQuestion2Data = [{
    name: I18N.t('FarmLandQuestion2Option1'),
    id: Constant.FarmLandQuestion2Option1Value
}, {
    name: I18N.t('FarmLandQuestion2Option2'),
    id: Constant.FarmLandQuestion2Option2Value
}]


