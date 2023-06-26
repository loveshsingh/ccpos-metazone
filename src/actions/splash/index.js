import {ERROR, LOADING, SUCCESS} from "./types";
import {SplashAPIService} from "../../services/SplashAPIService";
import {objectHasProperty} from "../../helper/Utility";
import {localDBErrorHandler, voidHandler} from "../../storage/DBErrorHandler";
import {
    insertCountries,
    insertDistricts,
    insertExtraStaticData,
    insertTalukes,
    insertVillages,
    insertStates, insertLocalBodies, insertBlocks, insertGramPanchayats
} from "../../storage/Schema_Helpers";
import I18N from "../../helper/translation";

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description to set loading.
 */
export const loading = (data: boolean) => ({
    type: LOADING,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description to set error.
 */
export const error = (data: any) => ({
    type: ERROR,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description to set success.
 */
export const success = (data: any) => ({
    type: SUCCESS,
    payload: data
});

//async function use redux-thunk
/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description to fetch Splash data.
 * @returns {(function(*): Promise<void>)|*}
 */
export const fetchSplashData = (): void => async (dispatch) => {
    await dispatch(loading(true));
    await SplashAPIService.fetchSplashData().then(async (res) => {
        await handleSplashAPIResponse(res)
        await dispatch(success(res))
    }).catch((err) => {
        dispatch(error(err));
    }).finally(() => {
        dispatch(loading(false))
    })
};

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description to handle Splash API Response.
 */
const handleSplashAPIResponse = async (response): void => {
    let extraStaticData = {}
    extraStaticData.id = 0
    extraStaticData.sync_order_limit = objectHasProperty(response, 'syc_order_limit') ? response.syc_order_limit : (objectHasProperty(response, 'sync_order_limit') ? response.sync_order_limit : 5)
    extraStaticData.order_prefix = objectHasProperty(response, 'order_prefix') ? response.order_prefix : I18N.t('ORDER_PREFIX_LABEL_FOR_SERVER')
    await insertExtraStaticData(extraStaticData).then(voidHandler, error => {
        localDBErrorHandler(error, I18N.t('RestartMsg'))
    })

    if (objectHasProperty(response, 'countries')) {
        await insertCountries(response.countries).then(voidHandler, error => {
            localDBErrorHandler(error, I18N.t('RestartMsg'))
        })
    }

    if (objectHasProperty(response, 'district')) { // District should always be added before state.
        await insertDistricts(response.district).then(voidHandler, error => {
            localDBErrorHandler(error, I18N.t('RestartMsg'))
        })
    }

    if (objectHasProperty(response, 'states')) {
        await insertStates(response.states).then(voidHandler, error => {
            localDBErrorHandler(error,I18N.t('RestartMsg'))
        })
    }

    if (objectHasProperty(response, 'taluk')) {
        await insertTalukes(response.taluk).then(voidHandler, error => {
            localDBErrorHandler(error, I18N.t('RestartMsg'))
        })
    }

    if (objectHasProperty(response, 'village')) {
        await insertVillages(response.village).then(voidHandler, error => {
            localDBErrorHandler(error, I18N.t('RestartMsg'))
        })
    }

    if (objectHasProperty(response, 'local_body')) {
        await insertLocalBodies(response.local_body).then(voidHandler, error => {
            localDBErrorHandler(error, I18N.t('RestartMsg'))
        })
    }

    if (objectHasProperty(response, 'block')) {
        await insertBlocks(response.block).then(voidHandler, error => {
            localDBErrorHandler(error, I18N.t('RestartMsg'))
        })
    }

    if (objectHasProperty(response, 'gram_panchayat')) {
        await insertGramPanchayats(response.gram_panchayat).then(voidHandler, error => {
            localDBErrorHandler(error, I18N.t('RestartMsg'))
        })
    }
}
