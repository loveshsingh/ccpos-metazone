import {deleteCustomerById, deleteFarmById, getCustomerById, insertCustomers} from "../storage/Schema_Helpers";
import {
    localDBErrorHandler, voidHandler
} from "../storage/DBErrorHandler";
import I18N from "../helper/translation";

// todo there is no use of this file

/*handleOfflineCustomerCreatedResponse = createdCustomer => {
    let customerOfflineId = createdCustomer.mobile_app_partner_offline_id // customer local id
    let customerOnlineId = createdCustomer.sulaba_partner_online_id // customer server id
    getCustomerById(customerOfflineId).then(offlineCustomer => {
        let tempCustomer = {}
        tempCustomer.id = customerOnlineId
        tempCustomer.isOffline = false
        tempCustomer.isSynced = true
        tempCustomer.name = offlineCustomer.name
        tempCustomer.mobile = offlineCustomer.mobile
        tempCustomer.state_id = offlineCustomer.state_id
        tempCustomer.email = offlineCustomer.email
        tempCustomer.barcode = offlineCustomer.barcode
        tempCustomer.street = offlineCustomer.street
        tempCustomer.zip = offlineCustomer.zip
        tempCustomer.display_values = offlineCustomer.display_values
        tempCustomer.country_id = offlineCustomer.country_id
        tempCustomer.vat = offlineCustomer.vat
        tempCustomer.city = offlineCustomer.city
        tempCustomer.phone = offlineCustomer.phone
        tempCustomer.amount_total = offlineCustomer.amount_total
        tempCustomer.whatsapp_number = offlineCustomer.whatsapp_number
        tempCustomer.aadhaar_no = offlineCustomer.aadhaar_no
        tempCustomer.pan_no = offlineCustomer.pan_no
        tempCustomer.district_id = offlineCustomer.district_id
        tempCustomer.taluk_id = offlineCustomer.taluk_id
        tempCustomer.village_id = offlineCustomer.village_id
        tempCustomer.farmLandArea = offlineCustomer.farm_land_area
        tempCustomer.farm_address = offlineCustomer.farm_address
        tempCustomer.child_ids = offlineCustomer.child_ids
        console.log('Offline created Customer')
        // need a change here also
        insertCustomers([tempCustomer]).then(response => {
            console.log("insert customer for offline created customer mapping")
            deleteCustomerById(parseInt(customerOfflineId)).then(response => {
                console.log("deleted customer for offline created customer mapping")
            })
        })
    })
}

handleOfflineCustomerChildCreatedResponse = createdCustomer => {
    let farmOfflineId = createdCustomer.mobile_child_offline_id // child local id
    let customerOnlineId = createdCustomer.sulaba_partner_online_id // customer online Id
    let farmOnlineId = createdCustomer.sulaba_child_online_id // child online id
    getCustomerById(customerOnlineId).then(localCustomer => {
        let farms = localCustomer.child_ids
        if (farms) {
            let farmIndex = farms.findIndex(farm => farm.id === farmOfflineId);
            if (farmIndex >= 0) {
                let localFarm = farms[farmIndex]
                localFarm.id = farmOnlineId
                localFarm.isOffline = false
                localFarm.isSynced = true
                console.log('Local Farm STart.....................');
                console.log(localFarm)
                console.log('Local Farm End.....................');
                localCustomer.child_ids = farms
                localCustomer.isOffline = false
                localCustomer.isSynced = true
                console.log('Local Customer Farms..................Start')
                console.log(localCustomer.child_ids)
                console.log('Local Customer Farms..................End')
            }
            deleteFarmById(farmOfflineId).then(response => {
                insertCustomers([localCustomer]).then(response => {
                    console.log("insert customer for child offline create")
                })
            })
        }
    })
}*/

/*handleOfflineCustomerEditedResponse = createdCustomer => {
    // both ids would be same here coz customer already created earlier.
    let customerOldID = createdCustomer.mobile_partner_online_id //old ID/ customer local id
    let customerNewID = createdCustomer.sulaba_partner_online_id // new ID/ customer server id

    getCustomerById(customerOldID).then(offlineCustomer => {
        let tempCustomer = {}
        tempCustomer.id = customerNewID
        tempCustomer.isOffline = false
        tempCustomer.isSynced = true
        tempCustomer.name = offlineCustomer.name
        tempCustomer.mobile = offlineCustomer.mobile
        tempCustomer.state_id = offlineCustomer.state_id
        tempCustomer.email = offlineCustomer.email
        tempCustomer.barcode = offlineCustomer.barcode
        tempCustomer.street = offlineCustomer.street
        tempCustomer.zip = offlineCustomer.zip
        tempCustomer.display_values = offlineCustomer.display_values
        tempCustomer.country_id = offlineCustomer.country_id
        tempCustomer.vat = offlineCustomer.vat
        tempCustomer.city = offlineCustomer.city
        tempCustomer.phone = offlineCustomer.phone
        tempCustomer.amount_total = offlineCustomer.amount_total
        tempCustomer.whatsapp_number = offlineCustomer.whatsapp_number
        tempCustomer.aadhaar_no = offlineCustomer.aadhaar_no
        tempCustomer.pan_no = offlineCustomer.pan_no
        tempCustomer.district_id = offlineCustomer.district_id
        tempCustomer.taluk_id = offlineCustomer.taluk_id
        tempCustomer.village_id = offlineCustomer.village_id
        tempCustomer.farmLandArea = offlineCustomer.farm_land_area
        tempCustomer.farm_address = offlineCustomer.farm_address
        tempCustomer.child_ids = offlineCustomer.child_ids
        // need a change here also
        insertCustomers([tempCustomer]).then(response => {
            console.log("insert customer for offline edited customer mapping")
        })
    }) // not required.
}

handleOfflineCustomerChildEditedResponse = createdCustomer => {
    let farmOfflineId = createdCustomer.mobile_child_offline_id // child local id
    let customerOnlineId = createdCustomer.sulaba_partner_online_id // customer online Id
    let farmOnlineId = createdCustomer.sulaba_child_online_id // child online id

    getCustomerById(customerOnlineId).then(localCustomer => {
        let farms = localCustomer.child_ids;
        if (farms) {
            let farmIndex = farms.findIndex(farm => farm.id === farmOfflineId);
            if (farmIndex >= 0) {
                let localFarm = farms[farmIndex]
                localFarm.id = farmOnlineId
                localFarm.isOffline = false
                localFarm.isSynced = true
                console.log('Local Farm STart.....................');
                console.log(localFarm)
                console.log('Local Farm End.....................');
                localCustomer.child_ids = farms
                localCustomer.isOffline = false
                localCustomer.isSynced = true
                console.log('Local Customer Farms..................Start')
                console.log(localCustomer.child_ids)
                console.log('Local Customer Farms..................End')
            }
            console.log('Local Customer..................Start')
            console.log(localCustomer)
            console.log('Local Customer..................End')
            deleteFarmById(farmOfflineId).then(response => {
                insertCustomers([localCustomer]).then(response => {
                    console.log("insert customer for child offline edit")
                })
            })
        }
    })

}*/

/**
 * @author Vipin Joshi.
 * @since 16-07-2021.
 * @description handle create customer api response.
 */
export const handleCreateCustomerResponse = (onlineCreatedCustomerMapping, childOnlineCreatedCustomerMapping, localCustomer, callback?: Function): void => {
    console.log('Enter Method Start....................')
    console.log(onlineCreatedCustomerMapping)
    console.log(childOnlineCreatedCustomerMapping)

    onlineCreatedCustomerMapping.forEach((createdCustomer) => {
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
            callback(tempCustomer);
        }, error => {
            localDBErrorHandler(error, I18N.t('CustomerSyncedButNotInsertedMsg'))
        })
    })
}

/**
 * @author Vipin Joshi.
 * @since 16-07-2021.
 * @description handle edit customer api response.
 */
export const handleEditCustomerResponse = (onlineEditedCustomerMapping, childOnlineEditedCustomerMapping, localCustomer, callback?: Function): void => {
    console.log('Enter Method Start....................')
    console.log(onlineEditedCustomerMapping)
    console.log(childOnlineEditedCustomerMapping)

    onlineEditedCustomerMapping.forEach((createdCustomer) => {
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
            callback(tempCustomer, customerOfflineId);
        }, error => {
            localDBErrorHandler(error, I18N.t('CustomerSyncedButNotInsertedMsg'))
        })
    })
}

/**
 * @author Vipin Joshi.
 * @since 16-07-2021.
 * @description handle order sync api customer response for create customer.
 */
export const handleOrderSyncCreateCustomerResponse = (offlineCreatedCustomerMapping, childOfflineCreatedCustomerMapping) => {
    console.log('Enter Method Start....................')
    console.log(offlineCreatedCustomerMapping)
    console.log(childOfflineCreatedCustomerMapping)

    offlineCreatedCustomerMapping.forEach((createdCustomer) => {
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
 * @since 16-07-2021.
 * @description handle order sync api customer response for edit customer.
 */
export const handleOrderSyncEditCustomerResponse = (offlineEditedCustomerMapping, childOfflineEditedCustomerMapping) => {
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
