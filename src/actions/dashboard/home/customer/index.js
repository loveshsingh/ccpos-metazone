import {
    ERROR,
    LOADING,
    SET_CUSTOMERS,
    SUCCESS,
    SET_COUNTRIES,
    SET_STATES,
    SET_CUSTOMER_DISPLAY_KEYS,
    SELECT_CUSTOMER, SET_CREATED_CUSTOMER, SET_SEARCH, DESELECT_CUSTOMER
} from "./types";
import {
    deleteCustomerById, deleteFarmById,
    getAllCountries,
    getAllCustomers,
    getAllStates, getCustomerById, getCustomerDisplayKeyObject, insertCustomers
} from "../../../../storage/Schema_Helpers";
import {localDBErrorHandler, voidHandler} from "../../../../storage/DBErrorHandler";
import {CustomerAPIService} from "../../../../services/CustomerAPIService";
import {RESET_REDUCER_STATE_FOR_NEW_ORDER} from "./types";
import I18N from "../../../../helper/translation";

const TAG: string = 'CustomerScreenAction :';

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to set loading.
 * @param data boolean true/ false
 * @returns {{payload: boolean, type: string}}
 */
export const loading = (data: boolean) => ({
    type: LOADING,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to set error.
 * @param data error data.
 * @returns {{payload: *, type: string}}
 */
export const error = (data: any) => ({
    type: ERROR,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 07-12-2021.
 * @description to set success.
 * @param data dashboard api response data
 * @returns {{payload: *, type: string}}
 */
export const success = (data: any) => ({
    type: SUCCESS,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 05-01-2022.
 * @description to set customers.
 */
export const setSearch = (data: string) => ({
    type: SET_SEARCH,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 05-01-2022.
 * @description to set customers.
 */
export const setCustomers = (data: any) => ({
    type: SET_CUSTOMERS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 21-01-2022.
 * @description to clear customers.
 */
export const deSelectCustomer = (data: any) => ({
    type: DESELECT_CUSTOMER,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 05-01-2022.
 * @description to set countries.
 */
export const setCountries = (data: any) => ({
    type: SET_COUNTRIES,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 05-01-2022.
 * @description to set states.
 */
export const setStates = (data: any) => ({
    type: SET_STATES,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 05-01-2022.
 * @description to set customer display keys.
 */
export const setCustomerDisplayKeys = (data: any) => ({
    type: SET_CUSTOMER_DISPLAY_KEYS,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 07-01-2022.
 * @description to set selected customer.
 */
export const selectCustomer = (data: any) => ({
    type: SELECT_CUSTOMER,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 07-01-2022.
 * @description to set created customer.
 */
export const setCreatedCustomer = (data: any) => ({
    type: SET_CREATED_CUSTOMER,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to reset some property of reducer to place new order.
 */
export const resetReducerStateForNewOrder = (data: any) => ({
    type: RESET_REDUCER_STATE_FOR_NEW_ORDER,
    payload: data
});


/**
 * @author Vipin Joshi.
 * @since 07-01-2022.
 * @description to filter customers.
 */
export const filterCustomers = (data: { search: any }) => (dispatch) => {
    getAllCustomers(data.search).then(customers => dispatch(setCustomers(customers)), commonDataErrorHandler)
};

//async function use redux-thunk
/**
 * @author Vipin Joshi.
 * @since 05-01-2022.
 * @description to load initial data from local db.
 * @returns {(function(*): Promise<void>)|*}
 */
export const loadData = () => async (dispatch) => {
    await dispatch(loading(true))
    await loadDataFromDB(dispatch).catch((err) => {
        dispatch(error(err));
    }).finally(() => {
        dispatch(loading(false))
    })
}

/**
 * @author Vipin Joshi.
 * @since 05-01-2022.
 * @description to load initial data from db.
 * @param dispatch redux event dispatcher.
 */
const loadDataFromDB = async (dispatch) => {
    await getCustomerDisplayKeyObject().then(customerDisplayKeyObject => dispatch(setCustomerDisplayKeys(JSON.parse(customerDisplayKeyObject.stringValue))), commonDataErrorHandler)
    await getAllCustomers().then(customers => dispatch(setCustomers(customers)), commonDataErrorHandler)
    await getAllCountries().then(countries => dispatch(setCountries(countries)), commonDataErrorHandler)
    await getAllStates().then(states => dispatch(setStates(states)), commonDataErrorHandler)
}

/**
 * @author Vipin Joshi.
 * @since 05-01-2022.
 * @description to remove code redundancy.
 * @param error error object.
 */
const commonDataErrorHandler = (error): void => {
    localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 07-01-2022
 * @description To create online customer.
 * @param customer customer detail.
 */
export const createCustomerOnline = (customer) => async (dispatch) => {
    await dispatch(loading(true))
    const payload = await getCreateCustomerPayload(customer)

    await CustomerAPIService.createCustomer(payload).then(async (res) => {
        console.log("Create Customer online response: ", res)
        await handleCreateCustomerAPIResponse(dispatch, res, customer)
        await dispatch(success(res))
    }).catch((err) => {
        dispatch(error(err));
    }).finally(() => {
        dispatch(loading(false))
    })
}

/**
 * @author Vipin Joshi.
 * @since 08-01-2022
 * @description To create offline customer.
 * @param customer customer detail.
 */
export const createCustomerOffline = (customer) => async (dispatch) => {
    await dispatch(loading(true))

    const customers = []
    if (customer.id === -1) {
        customer.id = new Date().getTime()
    }
    customer.isSynced = false
    customer.isOffline = true

    let counter = 0;
    customer.farm_list.forEach(farm => {
        if (!farm.id || farm.id === -1) {
            farm.id = +(`${customer.id}${counter++}`)
        }
    });

    customers.push(customer)

    return await insertCustomers(customers)
        .then(value => {
            return customer
        }, error => {
            localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
        })
        .finally(() => {
            dispatch(loading(false))
        })
}

/**
 * @author Vipin Joshi.
 * @since 08-01-2022
 * @description To update customer online.
 * @param customer customer detail.
 */
export const updateCustomerOnline = (customer) => async (dispatch) => {
    await dispatch(loading(true))

    const payload = await getUpdateCustomerPayload(customer)

    await CustomerAPIService.updateCustomer(payload).then(async (res) => {
        await handleUpdateCustomerAPIResponse(dispatch, res, customer)
        await dispatch(success(res))
    }).catch((err) => {
        dispatch(error(err));
    }).finally(() => {
        dispatch(loading(false))
    })
}

/**
 * @author Vipin Joshi.
 * @since 08-01-2022
 * @description To update customer offline.
 * @param customer customer detail.
 */
export const updateCustomerOffline = (customer) => async (dispatch) => {
    await dispatch(loading(true))

    const customers = []
    const currentTime = new Date().getTime()
    if (customer.id === -1) {
        customer.id = currentTime
    }
    customer.isOffline = true
    // isSynced value remain unchanged to identify whether it is earlier already synced with server on not

    let counter = 0
    customer.farm_list.forEach(farm => {
        if (!farm.id || farm.id === -1) {
            farm.id = +(`${currentTime}${counter++}`)
        }
    });

    customers.push(customer)

    return await insertCustomers(customers)
        .then(value => {
            return customer
        }, error => {
            localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
        }).finally(() => {
            dispatch(loading(false))
        })
}

/**
 * @author Vipin Joshi.
 * @since 07-01-2022
 * @param customer details.
 * @description to get create customer request payload.
 * @return create customer request payload.
 */
const getCreateCustomerPayload = (customer): any => {
    if (customer.id === -1) {
        customer.id = new Date().getTime();
    }
    let customerId = customer.id
    let customerData = {
        "zip": customer.zip,
        "city": customer.city,
        "barcode": customer.barcode,
        "vat": customer.vat,
        "phone": customer.phone,
        "street": customer.street,
        "state_id": customer.state_id,
        "country_id": customer.country_id,
        "name": customer.name,
        "email": customer.email,
        "aadhaar_no": customer.aadhaar_no,
        "pan_no": customer.pan_no,
        // "taluk": customer.taluk,
        // "district": customer.district,
        "taluk_id": customer.taluk_id,
        "district_id": customer.district_id,
        // "village_id": customer.village_id,
        "village": customer.village,
        "farm_land_area": customer.farm_land_area,
        "whatsapp_number": customer.whatsapp_number,
        "comment": customer.farm_address, // temporarily using comment field to store farm address
        // need a change here
    }

    let filteredFarmList = []
    let farmList = customer.farm_list
    // need a change here as well
    let counter = 0
    let farmId = new Date().getTime();
    farmList.forEach(farm => { // filtering farms for update and add required properties.
        if (farm.isOffline) {
            if (!farm.id || farm.id === -1) {
                farm.id = +(farmId + "" + counter++)
            }
            let localFarm = {
                "id": farm.id,
                "type": farm.type,
                "name": farm.name,
                "street": farm.street,
                "street2": farm.street2,
                "city": farm.city,
                "state_id": farm.state_id,
                "zip": farm.zip,
                "taluk_id": farm.taluk_id,
                "district_id": farm.district_id,
                "gp_village_id": farm.gp_village_id,
                "country_id": farm.country_id,
                "is_farmer": farm.is_farmer,
                "is_vendor": farm.is_vendor,
                "is_cash_vendor": farm.is_cash_vendor,
                "is_meditator": farm.is_meditator,
                "local_body_id": farm.local_body_id,
                "block_id": farm.block_id,
                "gram_panchayat_id": farm.gram_panchayat_id,
                "landmark": farm.landmark
            }
            let requiredProperty = "is_child_edited_in_offline"
            if (!farm.isSynced) { // if network request required local ids than add here.
                requiredProperty = "is_child_created_in_offline"
            }
            localFarm[requiredProperty] = true
            filteredFarmList.push(localFarm)
        }
    })
    customerData.child_ids = filteredFarmList

    const requestBody = {
        "online_created_customer_details": [
            {"id": customerId, "details": customerData}
        ],
    }
    console.log('Request Body................Start')
    console.log(requestBody)
    console.log('Request Body................End')

    return requestBody
}

/**
 * @author Vipin Joshi.
 * @since 08-01-2022
 * @param customer details.
 * @description to get update customer request payload.
 * @return update customer request payload.
 */
const getUpdateCustomerPayload = (customer): any => {
    const customerId = customer.id
    const customerData = {
        "zip": customer.zip,
        "city": customer.city,
        "barcode": customer.barcode,
        "vat": customer.vat,
        "phone": customer.phone,
        "street": customer.street,
        "state_id": customer.state_id,
        "country_id": customer.country_id,
        "name": customer.name,
        "email": customer.email,
        "aadhaar_no": customer.aadhaar_no,
        "pan_no": customer.pan_no,
        // "taluk": customer.taluk,
        // "district": customer.district,
        "taluk_id": customer.taluk_id,
        "district_id": customer.district_id,
        // "village_id": customer.village_id,
        "village": customer.village,
        "farm_land_area": customer.farm_land_area,
        "whatsapp_number": customer.whatsapp_number,
        "comment": customer.farm_address, // temporarily using comment field to store farm address
        // need a change here
    }

    const filteredFarmList = [] // hold only offline status farms.
    const farmList = customer.farm_list

    let counter = 0
    let farmId = new Date().getTime();
    farmList.forEach(farm => { // filtering farms for update and add required properties.
        if (farm.isOffline) {
            if (!farm.id || farm.id === -1) {
                farm.id = +(`${farmId}${counter++}`)
            }

            const localFarm = {
                "id": farm.id,
                "type": farm.type,
                "name": farm.name,
                "street": farm.street,
                "street2": farm.street2,
                "city": farm.city,
                "state_id": farm.state_id,
                "zip": farm.zip,
                "taluk_id": farm.taluk_id,
                "district_id": farm.district_id,
                "gp_village_id": farm.gp_village_id,
                "country_id": farm.country_id,
                "is_farmer": farm.is_farmer,
                "is_vendor": farm.is_vendor,
                "is_cash_vendor": farm.is_cash_vendor,
                "is_meditator": farm.is_meditator,
                "local_body_id": farm.local_body_id,
                "block_id": farm.block_id,
                "gram_panchayat_id": farm.gram_panchayat_id,
                "landmark": farm.landmark
            }
            let requiredProperty = "is_child_edited_in_offline"
            if (!farm.isSynced) { // if network request required local ids than add here.
                requiredProperty = "is_child_created_in_offline"
            }
            localFarm[requiredProperty] = true
            filteredFarmList.push(localFarm)
        }
    });
    customerData.child_ids = filteredFarmList

    const requestBody = {
        "online_edited_customer_details": [
            {"id": customerId, "details": customerData}
        ],
    }

    //.................
    console.log('Request Body................Start')
    console.log(requestBody)
    console.log('Request Body................End')

    return requestBody
}

/**
 * @author Vipin Joshi.
 * @since 07-01-2022
 * @param dispatch redux event dispatcher.
 * @param response api response.
 * @param localCustomer customer detail saved in mobile.
 * @description to handle customer create api response.
 */
const handleCreateCustomerAPIResponse = async (dispatch, response: { sulaba_online_created_customer_mapping: any, sulaba_child_online_created_customer_mapping: any }, localCustomer): void => {
    const onlineCreatedCustomerMapping = response.sulaba_online_created_customer_mapping
    const childOnlineCreatedCustomerMapping = response.sulaba_child_online_created_customer_mapping

    console.log('Enter Method Start....................')
    console.log(onlineCreatedCustomerMapping)
    console.log(childOnlineCreatedCustomerMapping)

    await onlineCreatedCustomerMapping.forEach((createdCustomer) => {
        console.log('Inside For each..................................................')
        let customerOfflineId = createdCustomer.mobile_app_partner_offline_id // customer local id
        let customerOnlineId = createdCustomer.sulaba_partner_online_id // customer server id
        console.log(customerOfflineId)
        console.log(customerOnlineId)

        console.log('Local Customer......................')
        console.log(localCustomer)
        let tempCustomer = {}
        tempCustomer.id = customerOnlineId
        tempCustomer.isOffline = false
        tempCustomer.isSynced = true
        tempCustomer.name = localCustomer.name
        tempCustomer.mobile = localCustomer.mobile
        tempCustomer.state_id = localCustomer.state_id
        tempCustomer.email = localCustomer.email
        tempCustomer.barcode = localCustomer.barcode
        tempCustomer.street = localCustomer.street
        tempCustomer.zip = localCustomer.zip
        tempCustomer.display_values = localCustomer.display_values
        tempCustomer.country_id = localCustomer.country_id
        tempCustomer.vat = localCustomer.vat
        tempCustomer.city = localCustomer.city
        tempCustomer.phone = localCustomer.phone
        tempCustomer.amount_total = localCustomer.amount_total
        tempCustomer.whatsapp_number = localCustomer.whatsapp_number
        tempCustomer.aadhaar_no = localCustomer.aadhaar_no
        tempCustomer.pan_no = localCustomer.pan_no
        tempCustomer.district_id = localCustomer.district_id
        tempCustomer.taluk_id = localCustomer.taluk_id
        // tempCustomer.village_id = localCustomer.village_id
        tempCustomer.village = localCustomer.village
        tempCustomer.farm_land_area = localCustomer.farm_land_area
        // tempCustomer.farm_address = localCustomer.farm_address
        let farms = localCustomer.farm_list;
        tempCustomer.child_ids = farms
        console.log('Offline created Customer..................................')
        console.log('Customer before adding details..................................')
        console.log(tempCustomer)
        console.log('Customer details end.........................')

        console.log('Farms.........................')
        console.log(farms)
        console.log('Farms......................... End')

        let localFarmsIds = []
        // Updating farms details
        let customerChildMapping = childOnlineCreatedCustomerMapping.filter((childDetail) => childDetail.sulaba_partner_online_id === customerOnlineId);
        console.log('Child Mapping Start.......................')
        console.log(customerChildMapping)
        console.log('Child Mapping Start....................... End')
        customerChildMapping.forEach((childMapping) => {
            let farmOfflineId = childMapping.mobile_child_offline_id // child local id
            // let childCustomerOnlineId = childMapping.sulaba_partner_online_id // child-customer online Id
            let farmOnlineId = childMapping.sulaba_child_online_id // child online id
            if (farms) {
                let farmIndex = farms.findIndex(farm => farm.id === farmOfflineId);
                if (farmIndex >= 0) {
                    let localFarm = farms[farmIndex]
                    localFarmsIds.push(localFarm.id) //saving local ids for remove purpose.
                    localFarm.id = farmOnlineId
                    localFarm.isOffline = false
                    localFarm.isSynced = true
                    tempCustomer.child_ids = farms
                }
            }
        })

        console.log('Updated Customer...................................Start')
        console.log(tempCustomer)
        console.log('Updated Customer...................................End')

        // need a change here also
        insertCustomers([tempCustomer]).then(response => {
            console.log("insert customer for offline created customer mapping")
            deleteCustomerById(parseInt(customerOfflineId)).then(response => {
                console.log("deleted customer for offline created customer mapping")
                console.log('Farms id for delete......................... Start')
                console.log(localFarmsIds)
                console.log('Farms id for delete......................... End')
                localFarmsIds.forEach(id => {
                    deleteFarmById(id).then(voidHandler, error => {
                        localDBErrorHandler(error, I18N.t('CustomerSyncedButNotInsertedMsg'))
                    })
                })
            }, error => {
                localDBErrorHandler(error, I18N.t('CustomerSyncedButNotInsertedMsg'))
            })
            dispatch(selectCustomer(tempCustomer))
        }, error => {
            localDBErrorHandler(error, I18N.t('CustomerSyncedButNotInsertedMsg'))
        })
    })
}

/**
 * @author Vipin Joshi.
 * @since 08-01-2022
 * @param dispatch redux event dispatcher.
 * @param response api response.
 * @param localCustomer customer detail saved in mobile.
 * @description to handle customer update api response.
 */
const handleUpdateCustomerAPIResponse = async (dispatch, response: { sulaba_online_edited_customer_mapping: any, sulaba_child_online_edited_customer_mapping: any }, localCustomer): void => {
    const onlineEditedCustomerMapping = response.sulaba_online_edited_customer_mapping
    const childOnlineEditedCustomerMapping = response.sulaba_child_online_edited_customer_mapping
    console.log('Enter Method Start....................')
    console.log(onlineEditedCustomerMapping)
    console.log(childOnlineEditedCustomerMapping)

    await onlineEditedCustomerMapping.forEach((createdCustomer) => {
        console.log('Inside For each..................................................')
        // both ids would be same here coz customer already created earlier.
        let customerOfflineId = createdCustomer.mobile_partner_online_id // customer local id
        let customerOnlineId = createdCustomer.sulaba_partner_online_id // customer server id
        console.log(customerOfflineId)
        console.log(customerOnlineId)
        console.log('Local Customer......................')
        console.log(localCustomer)
        let tempCustomer = {}
        tempCustomer.id = customerOnlineId
        tempCustomer.isOffline = false
        tempCustomer.isSynced = true
        tempCustomer.name = localCustomer.name
        tempCustomer.mobile = localCustomer.mobile
        tempCustomer.state_id = localCustomer.state_id
        tempCustomer.email = localCustomer.email
        tempCustomer.barcode = localCustomer.barcode
        tempCustomer.street = localCustomer.street
        tempCustomer.zip = localCustomer.zip
        tempCustomer.display_values = localCustomer.display_values
        tempCustomer.country_id = localCustomer.country_id
        tempCustomer.vat = localCustomer.vat
        tempCustomer.city = localCustomer.city
        tempCustomer.phone = localCustomer.phone
        tempCustomer.amount_total = localCustomer.amount_total
        tempCustomer.whatsapp_number = localCustomer.whatsapp_number
        tempCustomer.aadhaar_no = localCustomer.aadhaar_no
        tempCustomer.pan_no = localCustomer.pan_no
        tempCustomer.district_id = localCustomer.district_id
        tempCustomer.taluk_id = localCustomer.taluk_id
        // tempCustomer.village_id = localCustomer.village_id
        tempCustomer.village = localCustomer.village
        tempCustomer.farm_land_area = localCustomer.farm_land_area
        tempCustomer.farm_address = localCustomer.farm_address
        let farms = localCustomer.farm_list;
        tempCustomer.child_ids = farms
        console.log('Offline created Customer..................................')
        console.log('Customer before adding details..................................')
        console.log(tempCustomer)
        console.log('Customer details end.........................')

        console.log('Farms.........................')
        console.log(farms)
        console.log('Farms......................... End')

        let localFarmsIds = []
        // Updating farms details
        let customerChildMapping = childOnlineEditedCustomerMapping.filter((childDetail) => childDetail.sulaba_partner_online_id === customerOnlineId);
        console.log('Child Mapping Start.......................')
        console.log(customerChildMapping)
        console.log('Child Mapping Start....................... End')
        customerChildMapping.forEach((childMapping) => {
            let farmOfflineId = childMapping.mobile_child_offline_id // child local id
            // let childCustomerOnlineId = childMapping.sulaba_partner_online_id // child-customer online Id
            let farmOnlineId = childMapping.sulaba_child_online_id // child online id
            if (farms) {
                let farmIndex = farms.findIndex(farm => farm.id === farmOfflineId || farm.id === farmOnlineId); // farm could be match with online (for edit) id or offline id (for newly created)
                if (farmIndex >= 0) {
                    let localFarm = farms[farmIndex]
                    if (!localFarm.isSynced) { // Farm will synced only if its earlier created.
                        localFarmsIds.push(localFarm.id) //saving local ids for remove purpose.
                    }
                    localFarm.id = farmOnlineId
                    localFarm.isOffline = false
                    localFarm.isSynced = true
                    tempCustomer.child_ids.splice(farmIndex, 1, localFarm) //replacing old local farm with new farm.
                }
            }
        })

        console.log('Updated Customer...................................Start')
        console.log(tempCustomer)
        console.log('Updated Customer...................................End')

        // need a change here also
        insertCustomers([tempCustomer]).then(response => {
            console.log("insert customer for offline created customer mapping")

            console.log('Farms id for delete......................... Start')
            console.log(localFarmsIds)

            console.log('Farms id for delete......................... End')
            localFarmsIds.forEach(id => {
                deleteFarmById(id).then(voidHandler, error => {
                    localDBErrorHandler(error, I18N.t('CustomerSyncedButNotInsertedMsg'))
                })
            })
            dispatch(selectCustomer(tempCustomer))
        }, error => {
            localDBErrorHandler(error, I18N.t('CustomerSyncedButNotInsertedMsg'))
        })
    })
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description handle order sync api created customer response.
 */
export const handleOrderSyncCreateCustomerResponse = async (response: { sulaba_offline_created_customer_mapping: any, sulaba_child_offline_created_customer_mapping: any }): void => {
    const offlineCreatedCustomerMapping = response.sulaba_offline_created_customer_mapping
    const childOfflineCreatedCustomerMapping = response.sulaba_child_offline_created_customer_mapping

    console.log('Enter Method Start....................')
    console.log(offlineCreatedCustomerMapping)
    console.log(childOfflineCreatedCustomerMapping)

    await offlineCreatedCustomerMapping.forEach((createdCustomer) => {
        console.log('Inside For each..................................................')
        let customerOfflineId = createdCustomer.mobile_app_partner_offline_id // customer local id
        let customerOnlineId = createdCustomer.sulaba_partner_online_id // customer server id
        console.log(customerOfflineId)
        console.log(customerOnlineId)
        getCustomerById(customerOfflineId).then(localCustomer => {
            console.log('Local Customer......................')
            console.log(localCustomer)
            let tempCustomer = {}
            tempCustomer.id = customerOnlineId
            tempCustomer.isOffline = false
            tempCustomer.isSynced = true
            tempCustomer.name = localCustomer.name
            tempCustomer.mobile = localCustomer.mobile
            tempCustomer.state_id = localCustomer.state_id
            tempCustomer.email = localCustomer.email
            tempCustomer.barcode = localCustomer.barcode
            tempCustomer.street = localCustomer.street
            tempCustomer.zip = localCustomer.zip
            tempCustomer.display_values = localCustomer.display_values
            tempCustomer.country_id = localCustomer.country_id
            tempCustomer.vat = localCustomer.vat
            tempCustomer.city = localCustomer.city
            tempCustomer.phone = localCustomer.phone
            tempCustomer.amount_total = localCustomer.amount_total
            tempCustomer.whatsapp_number = localCustomer.whatsapp_number
            tempCustomer.aadhaar_no = localCustomer.aadhaar_no
            tempCustomer.pan_no = localCustomer.pan_no
            tempCustomer.district_id = localCustomer.district_id
            tempCustomer.taluk_id = localCustomer.taluk_id
            // tempCustomer.village_id = localCustomer.village_id
            tempCustomer.village = localCustomer.village
            tempCustomer.farm_land_area = localCustomer.farm_land_area
            tempCustomer.farm_address = localCustomer.farm_address
            let farms = localCustomer.child_ids;
            tempCustomer.child_ids = farms
            console.log('Offline created Customer..................................')
            console.log('Customer before adding details..................................')
            console.log(tempCustomer)
            console.log('Customer details end.........................')

            console.log('Farms.........................')
            console.log(farms)
            console.log('Farms......................... End')

            let localFarmsIds = []
            // Updating farms details
            let customerChildMapping = childOfflineCreatedCustomerMapping.filter((childDetail) => childDetail.sulaba_partner_online_id === customerOnlineId);
            console.log('Child Mapping Start.......................')
            console.log(customerChildMapping)
            console.log('Child Mapping Start....................... End')
            customerChildMapping.forEach((childMapping) => {
                let farmOfflineId = childMapping.mobile_child_offline_id // child local id
                // let childCustomerOnlineId = childMapping.sulaba_partner_online_id // child-customer online Id
                let farmOnlineId = childMapping.sulaba_child_online_id // child online id
                if (farms) {
                    let farmIndex = farms.findIndex(farm => farm.id === farmOfflineId);
                    if (farmIndex >= 0) {
                        let localFarm = farms[farmIndex]
                        localFarmsIds.push(localFarm.id) //saving local ids for remove purpose.
                        localFarm.id = farmOnlineId
                        localFarm.isOffline = false
                        localFarm.isSynced = true
                        tempCustomer.child_ids = farms
                    }
                }
            })

            console.log('Updated Customer...................................Start')
            console.log(tempCustomer)
            console.log('Updated Customer...................................End')

            // need a change here also
            insertCustomers([tempCustomer]).then(response => {
                console.log("insert customer for offline created customer mapping")
                deleteCustomerById(parseInt(customerOfflineId)).then(response => {
                    console.log("deleted customer for offline created customer mapping")
                    console.log('Farms id for delete......................... Start')
                    console.log(localFarmsIds)
                    console.log('Farms id for delete......................... End')
                    localFarmsIds.forEach(id => {
                        deleteFarmById(id).then(voidHandler, error => {
                            localDBErrorHandler(error, I18N.t('OrdersSyncedButNotInsertedMsg'))
                        })
                    })
                }, error => {
                    localDBErrorHandler(error, I18N.t('OrdersSyncedButNotInsertedMsg'))
                })
            }, error => {
                localDBErrorHandler(error, I18N.t('OrdersSyncedButNotInsertedMsg'))
            })
        }, error => {
            localDBErrorHandler(error, I18N.t('OrdersSyncedButNotInsertedMsg'))
        })
    })
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description handle order sync api edited customer response.
 */
export const handleOrderSyncEditCustomerResponse = async (response: { sulaba_offline_edited_customer_mapping: any, sulaba_child_offline_edited_customer_mapping: any }): void => {
    const offlineEditedCustomerMapping = response.sulaba_offline_edited_customer_mapping
    const childOfflineEditedCustomerMapping = response.sulaba_child_offline_edited_customer_mapping

    console.log('Enter Method Start....................')
    console.log(offlineEditedCustomerMapping)
    console.log(childOfflineEditedCustomerMapping)

    offlineEditedCustomerMapping.forEach((createdCustomer) => {
        console.log('Inside For each..................................................')
        // both ids would be same here coz customer already created earlier.
        let customerOfflineId = createdCustomer.mobile_partner_online_id // customer local id
        let customerOnlineId = createdCustomer.sulaba_partner_online_id // customer server id
        console.log(customerOfflineId)
        console.log(customerOnlineId)
        getCustomerById(customerOfflineId).then(localCustomer => {
            console.log('Local Customer......................')
            console.log(localCustomer)
            let tempCustomer = {}
            tempCustomer.id = customerOnlineId
            tempCustomer.isOffline = false
            tempCustomer.isSynced = true
            tempCustomer.name = localCustomer.name
            tempCustomer.mobile = localCustomer.mobile
            tempCustomer.state_id = localCustomer.state_id
            tempCustomer.email = localCustomer.email
            tempCustomer.barcode = localCustomer.barcode
            tempCustomer.street = localCustomer.street
            tempCustomer.zip = localCustomer.zip
            tempCustomer.display_values = localCustomer.display_values
            tempCustomer.country_id = localCustomer.country_id
            tempCustomer.vat = localCustomer.vat
            tempCustomer.city = localCustomer.city
            tempCustomer.phone = localCustomer.phone
            tempCustomer.amount_total = localCustomer.amount_total
            tempCustomer.whatsapp_number = localCustomer.whatsapp_number
            tempCustomer.aadhaar_no = localCustomer.aadhaar_no
            tempCustomer.pan_no = localCustomer.pan_no
            tempCustomer.district_id = localCustomer.district_id
            tempCustomer.taluk_id = localCustomer.taluk_id
            // tempCustomer.village_id = localCustomer.village_id
            tempCustomer.village = localCustomer.village
            tempCustomer.farm_land_area = localCustomer.farm_land_area
            tempCustomer.farm_address = localCustomer.farm_address
            let farms = localCustomer.child_ids;
            tempCustomer.child_ids = farms
            console.log('Offline created Customer..................................')
            console.log('Customer before adding details..................................')
            console.log(tempCustomer)
            console.log('Customer details end.........................')

            console.log('Farms.........................')
            console.log(farms)
            console.log('Farms......................... End')

            let localFarmsIds = []
            // Updating farms details
            let customerChildMapping = childOfflineEditedCustomerMapping.filter((childDetail) => childDetail.sulaba_partner_online_id === customerOnlineId);
            console.log('Child Mapping Start.......................')
            console.log(customerChildMapping)
            console.log('Child Mapping Start....................... End')
            customerChildMapping.forEach((childMapping) => {
                let farmOfflineId = childMapping.mobile_child_offline_id // child local id
                // let childCustomerOnlineId = childMapping.sulaba_partner_online_id // child-customer online Id
                let farmOnlineId = childMapping.sulaba_child_online_id // child online id
                if (farms) {
                    let farmIndex = farms.findIndex(farm => farm.id === farmOfflineId || farm.id === farmOnlineId); // farm could be match with online (for edit) id or offline id (for newly created)
                    if (farmIndex >= 0) {
                        let localFarm = farms[farmIndex]
                        if (!localFarm.isSynced) { // Farm will synced only if its earlier created.
                            localFarmsIds.push(localFarm.id) //saving local ids for remove purpose.
                        }
                        localFarm.id = farmOnlineId
                        localFarm.isOffline = false
                        localFarm.isSynced = true
                        tempCustomer.child_ids.splice(farmIndex, 1, localFarm) //replacing old local farm with new farm.
                    }
                }
            })

            console.log('Updated Customer...................................Start')
            console.log(tempCustomer)
            console.log('Updated Customer...................................End')

            // need a change here also
            insertCustomers([tempCustomer]).then(response => {
                console.log("insert customer for offline created customer mapping")

                console.log('Farms id for delete......................... Start')
                console.log(localFarmsIds)
                console.log('Farms id for delete......................... End')
                localFarmsIds.forEach(id => {
                    deleteFarmById(id).then(voidHandler, error => {
                        localDBErrorHandler(error, I18N.t('OrdersSyncedButNotInsertedMsg'))
                    })
                })
            }, error => {
                localDBErrorHandler(error, I18N.t('OrdersSyncedButNotInsertedMsg'))
            })
        }, error => {
            localDBErrorHandler(error, I18N.t('OrdersSyncedButNotInsertedMsg'))
        })
    })
}
