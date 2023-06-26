/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description hold schema helpers.
 */

import Realm from "realm";
import {convertObjectToLikeQuery, objectHasProperty} from "../helper/Utility";
import {deepCopy} from "../base/hook/app_hook";
import {setFavouriteProducts} from "../actions/dashboard/home";

export const PRODUCT_SCHEMA = "Product";
export const CATEGORY_SCHEMA = "Category";
export const PRODUCT_CATEGORY_SCHEMA = "Product_Category";
export const COUNTRY_DATA_SCHEMA = "Country_List";
export const STATE_DATA_SCHEMA = "State_List";
export const EXTRA_STATIC_DATA_SCHEMA = "Extra_Static_Data";
export const SERVER_SESSION_DETAILS_SCHEMA = "Server_Session_Details";
export const UOM_SCHEMA = "UOM_Details";
export const TAX_SCHEMA = "Tax_Details";
export const PAYMENT_SCHEMA = "Payment_Details";
export const CUSTOMER_SCHEMA = "Customer_Details";
export const CUSTOMER_DISPLAY_SCHEMA = "Customer_Display_Details";
export const ORDER_DETAILS_SCHEMA = "Order_Details_Schema";
export const HOLD_ORDER_SCHEMA = "Hold_Order_Schema";
export const DISCOUNT_DETAILS_SCHEMA = "Discount_Details_Schema";
export const TALUK_DATA_SCHEMA = "Taluk_List";
export const DISTRICT_DATA_SCHEMA = "District_List";
export const VILLAGE_DATA_SCHEMA = "Village_List";
export const FARM_DATA_SCHEMA = "Farm_List";
export const FAVOURITE_PRODUCT_SCHEMA = "Favourite_Product_Schema";
export const LOCAL_BODIES_DATA_SCHEMA = "Local_Bodies_List";
export const BLOCKS_DATA_SCHEMA = "Blocks_List";
export const GRAM_PANCHAYATS_DATA_SCHEMA = "Gram_Panchayats_List";


// All Schemas/Tables Structure And Definition In Realm
export const HoldOrderSchema = {
    name: HOLD_ORDER_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        stringData: "string",
    }
}

export const OrderDetailsSchema = {
    name: ORDER_DETAILS_SCHEMA,
    primaryKey: "orderId",
    properties: {
        orderId: "int",
        orderDetailsString: "string",
        sulaba_pos_order_id: "string",
        isOffline: "bool",
        isSynced: "bool",
        isFailed: "bool",
    }
}
export const DiscountDetailsSchema = {
    name: DISCOUNT_DETAILS_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string",
        discount: "int",
        description: "string",
        category_ids: "int[]",
    }
}
export const CustomerDisplaySchema = {
    name: CUSTOMER_DISPLAY_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        stringValue: "string",
    }
}
export const CustomerDetailsSchema = {
    name: CUSTOMER_SCHEMA,
    primaryKey: "id",
    properties: {
        name: "string",
        mobile: "string",
        state_id: "int",
        id: "int",
        email: "string",
        barcode: "string",
        street: "string",
        zip: "string",
        display_values: {type: "string", default: "{}"},
        country_id: "int",
        vat: "string",
        // property_account_position_id: "int",
        city: "string",
        // property_product_pricelist: "int",
        // write_date: "string",
        phone: "string",
        isOffline: "bool",
        isSynced: "bool",
        amount_total: "int",
        whatsapp_number: "string",
        farm_address: "string",
        // district: "string",
        // taluk: "string",
        district_id: "int",
        taluk_id: "int",
        // village_id: "int",
        village: "string",
        farm_land_area: "float",
        aadhaar_no: "string",
        pan_no: "string",
        // child_ids: "string"
        child_ids: {
            type: 'list',
            objectType: FARM_DATA_SCHEMA
        }
        // need a change
    }
}
export const PaymentDetailsSchema = {
    name: PAYMENT_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string",
        type: "string"
    }
}
export const TaxDetailsSchema = {
    name: TAX_SCHEMA,
    primaryKey: "id",
    properties: {
        amount_type: "string",
        children_tax_ids: "string",
        amount: "float",
        price_include: "bool",
        id: "int",
        name: "string",
        include_base_amount: "bool"
    }
}
export const UomDetailsSchema = {
    name: UOM_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string"
    }
}
export const ServerSessionDetailsSchema = {
    name: SERVER_SESSION_DETAILS_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        shopId: "int",
        shopName: "string",
        currencySymbol: "string",
        currencyId: "int",
        currencyPosition: "string",
        currencyDecimalPlaces: "int",
        sessionId: "int",
        loginNumber: "int",
        receiptHeader: "string",
        toInvoice: "bool",
        receiptFooter: "string",
        sessionStartAt: "string"
    }
}
export const ExtraStaticDataSchema = {
    name: EXTRA_STATIC_DATA_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        sync_order_limit: "int",
        order_prefix: "string"
    }
}
export const CountrySchema = {
    name: COUNTRY_DATA_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string",
        vat_label: "string"
    }
};
export const StateSchema = {
    name: STATE_DATA_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string"
    }
};
/**
 * @author Vipin Joshi
 * @since 05-07-2021
 * @description Taluk Schema.
 */
export const TalukSchema = {
    name: TALUK_DATA_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string",
        district_id: {
            type: 'object',
            objectType: DISTRICT_DATA_SCHEMA
        }
    }
};
/**
 * @author Vipin Joshi
 * @since 05-07-2021
 * @description District Schema.
 */
export const DistrictSchema = {
    name: DISTRICT_DATA_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string",
        state_id: {
            type: 'object',
            objectType: STATE_DATA_SCHEMA
        }
    }
};
/**
 * @author Vipin Joshi
 * @since 05-07-2021
 * @description Village Schema.
 */
export const VillageSchema = {
    name: VILLAGE_DATA_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string",
        gram_panchayat_id: {
            type: 'object',
            objectType: GRAM_PANCHAYATS_DATA_SCHEMA
        }
    }
};

/**
 * @author Lovesh Singh
 * @since 24-06-2022
 * @description Local Bodies Schema.
 */
export const LocalBodiesSchema = {
    name: LOCAL_BODIES_DATA_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string",
        district_id: {
            type: 'object',
            objectType: DISTRICT_DATA_SCHEMA
        }
    }
};

/**
 * @author Lovesh Singh
 * @since 24-06-2022
 * @description Blocks Schema.
 */
export const BlocksSchema = {
    name: BLOCKS_DATA_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string",
        district_id: {
            type: 'object',
            objectType: DISTRICT_DATA_SCHEMA
        }
    }
};

/**
 * @author Lovesh Singh
 * @since 24-06-2022
 * @description Gram Panchayats Schema.
 */
export const GramPanchayatsSchema = {
    name: GRAM_PANCHAYATS_DATA_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        name: "string",
        block_id: {
            type: 'object',
            objectType: BLOCKS_DATA_SCHEMA
        }
    }
};


/**
 * @author Vipin Joshi
 * @since 05-07-2021
 * @description Farm Schema.
 */
export const FarmSchema = {
    name: FARM_DATA_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        type: "string",
        name: "string",
        street: "string",
        street2: "string",
        city: "string",
        state_id: "int",
        zip: "string",
        taluk_id: "int",
        district_id: "int",
        gp_village_id: "int",
        country_id: "int",
        is_farmer: "bool",
        is_vendor: "bool",
        is_cash_vendor: "bool",
        is_meditator: "bool",
        isOffline: "bool",
        isSynced: "bool",
        local_body_id: "int",
        block_id: "int",
        gram_panchayat_id: "int",
        landmark: "string"
    }
};
export const CategorySchema = {
    name: CATEGORY_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        parent_id: {type: "string", default: "[]"},
        name: "string",
        product_count: {type: "int", default: 0},
        child_id: {type: "string", default: "[]"}
    }
};
export const ProductSchema = {
    name: PRODUCT_SCHEMA,
    primaryKey: "id",
    properties: {


        // description: { type: "string", default: "" },
        // pos_categ_id: { type: "string", default: "[]" },
        // standard_price: { type: "float", default: 0 },
        // lst_price: { type: "float", default: 0 },

        // product_tmpl_id: { type: "int", default: 0 },
        // tracking: { type: "string", default: "" },
        // categ_id: { type: "string", default: "[]" },


        // // default_code:"string",
        // description_sale: { type: "string", default: "[]" },

        id: "int",
        unit_price: "string",
        lst_price: "string",
        taxes_id: {type: "int?[]", default: []},
        barcode: {type: "string", default: ""},
        price_tax_inclusive: "string",
        uom_id: {type: "int", default: -1},
        display_name: "string",
        price_tax_exclusive: "string",
        image_url: "string",
        to_weight: "bool",
        pos_categ_id: "int",
        isFavourite: "bool",
        pos_custom_discount_id: {type: "string", default: "{}"}
    }
};

export const FavouriteProductSchema = {
    name: FAVOURITE_PRODUCT_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "int",
        unit_price: "string",
        lst_price: "string",
        taxes_id: {type: "int?[]", default: []},
        barcode: {type: "string", default: ""},
        price_tax_inclusive: "string",
        uom_id: {type: "int", default: -1},
        display_name: "string",
        price_tax_exclusive: "string",
        image_url: "string",
        to_weight: "bool",
        pos_categ_id: "int",
        isFavourite: "bool"
    }
};

export const ProductCategorySchema = {
    name: PRODUCT_CATEGORY_SCHEMA,
    primaryKey: "compositeKey",
    properties: {
        productId: "int",
        categoryId: "int",
        compositeKey: "string"
    }
};
/**
 * Setting database options for Realm.
 * This function defines the path, schema verion and all sub schemas (defined above) that needs to be included in the current Realm instance.
 */
const databaseOptions = {
    path: "odooMobikulPOS.realm",
    schema: [
        ProductSchema,
        CategorySchema,
        ProductCategorySchema,
        CountrySchema,
        StateSchema,
        TalukSchema,
        DistrictSchema,
        VillageSchema,
        FarmSchema,
        ExtraStaticDataSchema,
        ServerSessionDetailsSchema,
        UomDetailsSchema,
        TaxDetailsSchema,
        PaymentDetailsSchema,
        CustomerDisplaySchema,
        CustomerDetailsSchema,
        OrderDetailsSchema,
        DiscountDetailsSchema,
        HoldOrderSchema,
        FavouriteProductSchema,
        LocalBodiesSchema,
        BlocksSchema,
        GramPanchayatsSchema,
    ],
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true
}

// Setters(Insert Queries) for Adding/Inserting Data to Current Realm Instance.

/**
 * This function adds all the products in the supplied JSON Array/List to the current realm instance.
 * @param {*} productList // List of Products to be added in the realm instance
 */
export const insertAllProducts = (productList): Promise =>
    new Promise(async (resolve, reject) => {
        let FavouriteProducts
        await getAllFavouriteProducts().then(res => {
            FavouriteProducts = res
        })
        Realm.open(databaseOptions)
            .then(async realm => {
                await realm.write(async () => {
                    productList.forEach(element => {
                        if (typeof (element.pos_categ_id) != "number") {
                            element.pos_categ_id = -1
                        }
                        if (objectHasProperty(element, 'pos_custom_discount_id')) {
                            if (typeof (element.pos_custom_discount_id) === "boolean") {
                                element.pos_custom_discount_id = '{}'
                            } else {
                                element.pos_custom_discount_id = JSON.stringify(element.pos_custom_discount_id)
                            }
                        } else {
                            element.pos_custom_discount_id = '{}'
                        }
                        element.isFavourite = false
                        FavouriteProducts.map(fav => {
                            if (fav?.id === element?.id) {
                                element.isFavourite = true
                            }
                        })
                        realm.create(PRODUCT_SCHEMA, element, true)
                        // try {
                        //   insertProductWithCategory(element.id, element.pos_categ_id.split(','));
                        // } catch (error) {
                        //   console.log(error);
                        // }
                    })
                    resolve(productList)
                })
            })
            .catch(error => {
                console.log('Schema_Helpers.js insertAllProducts error  --> ', error)
                reject(error)
            });
    })

/**
 * @author Lovesh Singh.
 * @since 29-04-2022.
 * @description to insert favourite Product.
 * @param product product
 * @returns {Promise<unknown>}
 */
export const insertFavouriteProduct = (product): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                console.log('Schema_Helpers.js Favourite product  --> ', product)
                realm.create(FAVOURITE_PRODUCT_SCHEMA, product, true)
                resolve(product)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertFavouriteProduct error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Lovesh Singh.
 * @since 29-04-2022.
 * @description to delete favourite Product by id.
 * @param id productId
 * @returns {Promise<unknown>}
 */
export const deleteFavouriteProductById = (id): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                let obj = realm.objectForPrimaryKey(FAVOURITE_PRODUCT_SCHEMA, id)
                if (obj) {
                    realm.delete(obj)
                    resolve(true)
                } else {
                    resolve(false)
                }
            });
        }).catch(error => {
            console.log('Schema_Helpers.js deleteFavouriteProductById error  --> ', error)
            reject(error)
        })
    })


export const insertProductWithCategory = (productId, categoryIds): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions)
            .then(async realm => {
                await realm.write(async () => {
                    categoryIds.forEach(element => {
                        let obj = {
                            categoryId: Number(element),
                            entityId: productId,
                            compositeKey: productId + " " + element
                        };
                        let test = realm.create(PRODUCT_CATEGORY_SCHEMA, obj, true)
                    })
                    resolve(true)
                })
            })
            .catch(error => {
                console.log('Schema_Helpers.js insertProductWithCategory error  --> ', error)
                reject(error)
            });
    })

export const insertCategories = (categories): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                categories.forEach(element => {
                    if (typeof (element.parent_id) == "boolean") {
                        element.parent_id = "-1"
                    } else if (typeof (element.parent_id) != "string") {
                        element.parent_id = JSON.stringify(element.parent_id)
                    }
                    if (typeof (element.child_id) == "boolean") {
                        element.child_id = ""
                    } else if (typeof (element.child_id) != "string") {
                        element.child_id = JSON.stringify(element.child_id)
                    }
                    realm.create(CATEGORY_SCHEMA, element, true)
                })
                resolve(categories)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertCategories error  --> ', error)
            reject(error)
        })
    })

export const insertCountries = (countries): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                countries.forEach(element => {

                    if (typeof (element.vat_label) == "boolean") {
                        element.vat_label = ""
                    } else if (typeof (element.vat_label) != "string") {
                        element.vat_label = JSON.stringify(element.vat_label)
                    }
                    realm.create(COUNTRY_DATA_SCHEMA, element, true)
                })
                resolve(countries)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertCountries error  --> ', error)
            reject(error)
        })
    })

export const insertStates = (states): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                states.forEach(element => {
                    realm.create(STATE_DATA_SCHEMA, element, true)
                })
                resolve(states)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertStates error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Vipin Joshi
 * @since 05-07-2021
 * @param talukes talkues JSON Array
 * @returns {Promise<unknown>}
 * @description To insert talukes.
 */
export const insertTalukes = (talukes): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                talukes.forEach(element => {
                    if (objectHasProperty(element, 'district_id')) {
                        if (!Array.isArray(element.district_id) || element.district_id.length !== 2) {
                        } else {
                            element.district_id = {
                                id: element.district_id[0],
                                name: element.district_id[1]
                            }
                        }
                    }
                    realm.create(TALUK_DATA_SCHEMA, element, true)
                })
                resolve(talukes)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertTalukes error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Vipin Joshi
 * @since 05-07-2021
 * @param districts JSON Array
 * @returns {Promise<unknown>}
 * @description To insert districts.
 */
export const insertDistricts = (districts): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                districts.forEach(element => {
                    if (objectHasProperty(element, 'state_id')) {
                        if (!Array.isArray(element.state_id) || element.state_id.length !== 2) {
                        } else {
                            element.state_id = {
                                id: element.state_id[0],
                                name: element.state_id[1]
                            }
                        }
                    }
                    realm.create(DISTRICT_DATA_SCHEMA, element, true)
                })
                resolve(districts)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertDistricts error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Vipin Joshi
 * @since 05-07-2021
 * @param villages JSON Array
 * @returns {Promise<unknown>}
 * @description To insert villages.
 */
export const insertVillages = (villages): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                villages.forEach(element => {
                    if (objectHasProperty(element, 'gram_panchayat_id')) {
                        if (!Array.isArray(element.gram_panchayat_id) || element.gram_panchayat_id.length !== 2) {
                        } else {
                            element.gram_panchayat_id = {
                                id: element.gram_panchayat_id[0],
                                name: element.gram_panchayat_id[1]
                            }
                        }
                    }
                    realm.create(VILLAGE_DATA_SCHEMA, element, true);
                })
                resolve(villages)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertVillages error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Lovesh Singh
 * @since 24-06-2022
 * @returns {Promise<unknown>}
 * @description To insert local bodies.
 * @param local_bodies
 */
export const insertLocalBodies = (local_bodies): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                local_bodies.forEach(element => {
                    if (objectHasProperty(element, 'district_id')) {
                        if (!Array.isArray(element.district_id) || element.district_id.length !== 2) {
                        } else {
                            element.district_id = {
                                id: element.district_id[0],
                                name: element.district_id[1]
                            }
                        }
                    }
                    realm.create(LOCAL_BODIES_DATA_SCHEMA, element, true);
                })
                resolve(local_bodies)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertLocalBodies error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Lovesh Singh
 * @since 24-06-2022
 * @returns {Promise<unknown>}
 * @description To insert blocks.
 * @param blocks
 */
export const insertBlocks = (blocks): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                blocks.forEach(element => {
                    if (objectHasProperty(element, 'district_id')) {
                        if (!Array.isArray(element.district_id) || element.district_id.length !== 2) {
                        } else {
                            element.district_id = {
                                id: element.district_id[0],
                                name: element.district_id[1]
                            }
                        }
                    }
                    realm.create(BLOCKS_DATA_SCHEMA, element, true);
                })
                resolve(blocks)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertBlocks error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Lovesh Singh
 * @since 24-06-2022
 * @returns {Promise<unknown>}
 * @description To insert gram panchayats.
 * @param gram_panchayats
 */
export const insertGramPanchayats = (gram_panchayats): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                gram_panchayats.forEach(element => {
                    if (objectHasProperty(element, 'block_id')) {
                        if (!Array.isArray(element.block_id) || element.block_id.length !== 2) {
                        } else {
                            element.block_id = {
                                id: element.block_id[0],
                                name: element.block_id[1]
                            }
                        }
                    }
                    realm.create(GRAM_PANCHAYATS_DATA_SCHEMA, element, true);
                })
                resolve(gram_panchayats)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertGramPanchayats error  --> ', error)
            reject(error)
        })
    })

export const insertExtraStaticData = (extraStaticData): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                await realm.create(EXTRA_STATIC_DATA_SCHEMA, extraStaticData, true)
                resolve(extraStaticData)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertExtraStaticData error  --> ', error)
            reject(error)
        })
    })

export const insertServerSessionDetails = (serverSessionDetails): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                serverSessionDetails.id = 0
                await realm.create(SERVER_SESSION_DETAILS_SCHEMA, serverSessionDetails, true)
                resolve(serverSessionDetails)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertServerSessionDetails error  --> ', error)
            reject(error)
        })
    })

export const insertUOMList = (uomList): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                uomList.forEach(element => {

                    if (typeof (element.id) == "boolean") {
                        element.id = 0
                    }

                    if (typeof (element.name) == "boolean") {
                        element.name = ""
                    } else if (typeof (element.name) != "string") {
                        element.name = JSON.stringify(element.name)
                    }
                    realm.create(UOM_SCHEMA, element, true)
                })
                resolve(uomList)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertUOMList error  --> ', error)
            reject(error)
        })
    })

export const insertTaxList = (taxList): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                taxList.forEach(element => {
                    if (typeof (element.amount_type) != "string") {
                        element.amount_type = JSON.stringify(element.amount_type)
                    }
                    if (typeof (element.children_tax_ids) != "string") {
                        element.children_tax_ids = JSON.stringify(element.children_tax_ids)
                    }
                    // noinspection JSTypeOfValues
                    if (typeof (element.amount) != "float") {
                        element.amount = parseFloat(JSON.stringify(element.amount))
                    }
                    if (typeof (element.price_include) != "boolean") {
                        element.price_include = false
                    }

                    if (typeof (element.name) != "string") {
                        element.name = JSON.stringify(element.name)
                    }

                    if (typeof (element.include_base_amount) != "boolean") {
                        element.include_base_amount = false
                    }
                    realm.create(TAX_SCHEMA, element, true)
                })
                resolve(taxList)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertTaxList error  --> ', error)
            reject(error)
        })
    })

export const insertPaymentListDetails = (paymentList): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                paymentList.forEach(element => {
                    if (typeof (element.name) != "string") {
                        element.name = JSON.stringify(element.name)
                    }
                    if (typeof (element.type) != "string") {
                        element.type = JSON.stringify(element.type)
                    }
                    realm.create(PAYMENT_SCHEMA, element, true)
                })
                resolve(paymentList)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertPaymentListDetails error  --> ', error)
            reject(error)
        })
    })

export const insertCustomerDisplaykeys = (display_keys): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                let displayListString = JSON.stringify(display_keys)
                display_keys.id = 0
                display_keys.stringValue = displayListString
                await realm.create(CUSTOMER_DISPLAY_SCHEMA, display_keys, true)
                resolve(display_keys)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertCustomerDisplaykeys error  --> ', error)
            reject(error)
        })
    })

export const insertCustomers = (customerList): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                // noinspection JSTypeOfValues
                customerList.forEach(element => {
                    if (objectHasProperty(element, 'name')) {
                        if (typeof (element.name) != "string") {
                            element.name = JSON.stringify(element.name)
                        }
                    } else {
                        element.name = ''
                    }
                    if (objectHasProperty(element, 'mobile')) {
                        if (typeof (element.mobile) != "string") {
                            element.mobile = JSON.stringify(element.mobile)
                        }
                    } else {
                        element.mobile = ''
                    }

                    if (objectHasProperty(element, 'state_id')) {
                        if (typeof (element.state_id) == "boolean") {
                            element.state_id = -1
                        }
                        if (typeof (element.state_id) != "number") {
                            element.state_id = parseInt(JSON.stringify(element.state_id))
                        }
                    } else {
                        element.state_id = -1
                    }

                    if (objectHasProperty(element, 'email')) {
                        if (typeof (element.email) != "string") {
                            element.email = JSON.stringify(element.email)
                        }
                    } else {
                        element.email = ''
                    }

                    if (objectHasProperty(element, 'barcode')) {
                        if (typeof (element.barcode) != "string") {
                            element.barcode = JSON.stringify(element.barcode)
                        }
                    } else {
                        element.barcode = ''
                    }

                    if (objectHasProperty(element, 'street')) {
                        if (typeof (element.street) != "string") {
                            element.street = JSON.stringify(element.street)
                        }
                    } else {
                        element.street = ''
                    }

                    if (objectHasProperty(element, 'zip')) {
                        if (typeof (element.zip) != "string") {
                            element.zip = JSON.stringify(element.zip)
                        }
                    } else {
                        element.zip = ''
                    }

                    if (objectHasProperty(element, 'display_values')) {
                        if (typeof (element.display_values) != "string") {
                            element.display_values = JSON.stringify(element.display_values)
                        }
                    } else {
                        element.display_values = '{}'
                    }
                    if (objectHasProperty(element, 'country_id')) {
                        if (typeof (element.country_id) == "boolean") {
                            element.country_id = -1
                        }
                        if (typeof (element.country_id) != "number") {
                            element.country_id = parseInt(JSON.stringify(element.country_id))
                            if (isNaN(element.country_id)) {
                                element.country_id = -1
                            }
                        }
                    } else {
                        element.country_id = -1
                    }

                    if (objectHasProperty(element, 'vat')) {
                        if (typeof (element.vat) != "string") {
                            element.vat = JSON.stringify(element.vat)
                        }
                    } else {
                        element.vat = ''
                    }

                    if (objectHasProperty(element, 'city')) {
                        if (typeof (element.city) != "string") {
                            element.city = JSON.stringify(element.city)
                        }
                    } else {
                        element.city = ''
                    }

                    if (objectHasProperty(element, 'phone')) {
                        if (typeof (element.phone) != "string") {
                            element.phone = JSON.stringify(element.phone)
                        }
                    } else {
                        element.phone = ''
                    }
                    if (element.isSynced === undefined) {
                        element.isSynced = true
                    }
                    if (element.isOffline === undefined) {
                        element.isOffline = false
                    }
                    if (!objectHasProperty(element, 'amount_total')) {
                        element.amount_total = 0
                    }
                    if (objectHasProperty(element, 'whatsapp_number')) {
                        if (typeof (element.whatsapp_number) != "string") {
                            element.whatsapp_number = JSON.stringify(element.whatsapp_number)
                        }
                    } else {
                        element.whatsapp_number = ''
                    }
                    if (objectHasProperty(element, 'farm_address')) {
                        if (typeof (element.farm_address) != "string") {
                            element.farm_address = JSON.stringify(element.farm_address)
                        }
                    } else {
                        element.farm_address = ''
                    }
                    /*if (objectHasProperty(element, 'district')) {
                        if (typeof (element.district) != "string") {
                            element.district = JSON.stringify(element.district)
                        }
                    } else {
                        element.district = ''
                    }
                    if (objectHasProperty(element, 'taluk')) {
                        if (typeof (element.taluk) != "string") {
                            element.taluk = JSON.stringify(element.taluk)
                        }
                    } else {
                        element.taluk = ''
                    }*/
                    if (objectHasProperty(element, 'district_id')) {
                        // noinspection JSTypeOfValues
                        if (typeof (element.district_id) != "int") {
                            element.district_id = parseInt(element.district_id)
                            if (isNaN(element.district_id)) {
                                element.district_id = -1
                            }
                        }
                    } else {
                        element.district_id = -1
                    }
                    if (objectHasProperty(element, 'taluk_id')) {
                        // noinspection JSTypeOfValues
                        if (typeof (element.taluk_id) != "int") {
                            element.taluk_id = parseInt(element.taluk_id)
                            if (isNaN(element.taluk_id)) {
                                element.taluk_id = -1
                            }
                        }
                    } else {
                        element.taluk_id = -1
                    }
                    /*if (objectHasProperty(element, 'village_id')) {
                        if (typeof (element.village_id) != "int") {
                            element.village_id = parseInt(element.village_id)
                            if (isNaN(element.village_id)) {
                                element.village_id = -1
                            }
                        }
                    } else {
                        element.village_id = -1
                    }*/
                    if (objectHasProperty(element, 'village')) {
                        if (typeof (element.village) != "string") {
                            element.village = JSON.stringify(element.village)
                        }
                    } else {
                        element.village = ''
                    }

                    if (objectHasProperty(element, 'farm_land_area')) {
                        // noinspection JSTypeOfValues
                        if (typeof (element.farm_land_area) != "float") {
                            element.farm_land_area = +element.farm_land_area;
                        }
                    } else {
                        element.farm_land_area = 0.00
                    }
                    if (objectHasProperty(element, 'aadhaar_no')) {
                        if (typeof (element.aadhaar_no) != "string") {
                            element.aadhaar_no = JSON.stringify(element.aadhaar_no)
                        }
                    } else {
                        element.aadhaar_no = ''
                    }
                    if (objectHasProperty(element, 'pan_no')) {
                        if (typeof (element.pan_no) != "string") {
                            element.pan_no = JSON.stringify(element.pan_no)
                        }
                    } else {
                        element.pan_no = ''
                    }
                    // In case customer is offline created its child_ids value would be inside farm_list attribute.
                    if (objectHasProperty(element, 'farm_list')) {
                        element.child_ids = element.farm_list
                    }
                    if (objectHasProperty(element, 'child_ids')) {
                        if (!Array.isArray(element.child_ids)) {
                            element.child_ids = []
                            // do change here for customer
                            // element.child_ids = ""
                        } else {
                            element.child_ids.forEach(function (arrayItem) {
                                let name = arrayItem.name
                                if (typeof (name) != "string") {
                                    arrayItem.name = name + "";
                                }
                                let type = arrayItem.type
                                if (typeof (type) != "string") {
                                    arrayItem.type = type + "";
                                }
                                let street = arrayItem.street
                                if (typeof (street) != "string") {
                                    arrayItem.street = street + "";
                                }
                                let street2 = arrayItem.street2
                                if (typeof (street2) != "string") {
                                    arrayItem.street2 = street2 + "";
                                }
                                let city = arrayItem.city
                                if (typeof (city) != "string") {
                                    arrayItem.city = city + "";
                                }
                                if (objectHasProperty(arrayItem, 'zip')) {
                                    if (typeof (arrayItem.zip) != "string") {
                                        arrayItem.zip = JSON.stringify(arrayItem.zip)
                                    }
                                } else {
                                    arrayItem.zip = ""
                                }

                                let stateId = arrayItem.state_id
                                if (!Array.isArray(stateId)) {
                                    // noinspection JSTypeOfValues
                                    if (typeof (stateId) != "int") {
                                        stateId = parseInt(stateId)
                                        if (isNaN(stateId)) {
                                            stateId = -1
                                        }
                                    }
                                } else {
                                    stateId = +stateId[0]
                                }
                                arrayItem.state_id = stateId

                                let countryId = arrayItem.country_id
                                if (!Array.isArray(countryId)) {
                                    // noinspection JSTypeOfValues
                                    if (typeof (countryId) != "int") {
                                        countryId = parseInt(countryId)
                                        if (isNaN(countryId)) {
                                            countryId = -1
                                        }
                                    }
                                } else {
                                    countryId = +countryId[0]
                                }
                                arrayItem.country_id = countryId

                                let talukId = arrayItem.taluk_id
                                if (!Array.isArray(talukId)) {
                                    // noinspection JSTypeOfValues
                                    if (typeof (talukId) != "int") {
                                        talukId = parseInt(talukId)
                                        if (isNaN(talukId)) {
                                            talukId = -1
                                        }
                                    }
                                } else {
                                    talukId = +talukId[0]
                                }
                                arrayItem.taluk_id = talukId

                                let districtId = arrayItem.district_id
                                if (!Array.isArray(districtId)) {
                                    // noinspection JSTypeOfValues
                                    if (typeof (districtId) != "int") {
                                        districtId = parseInt(districtId)
                                        if (isNaN(districtId)) {
                                            districtId = -1
                                        }
                                    }
                                } else {
                                    districtId = +districtId[0]
                                }
                                arrayItem.district_id = districtId

                                let gpVillageId = arrayItem.gp_village_id
                                if (!Array.isArray(gpVillageId)) {
                                    // noinspection JSTypeOfValues
                                    if (typeof (gpVillageId) != "int") {
                                        gpVillageId = parseInt(gpVillageId)
                                        if (isNaN(gpVillageId)) {
                                            gpVillageId = -1
                                        }
                                    }
                                } else {
                                    gpVillageId = +gpVillageId[0]
                                }
                                arrayItem.gp_village_id = gpVillageId

                                let localBodyId = arrayItem.local_body_id
                                if (!Array.isArray(localBodyId)) {
                                    // noinspection JSTypeOfValues
                                    if (typeof (localBodyId) != "int") {
                                        localBodyId = parseInt(localBodyId)
                                        if (isNaN(localBodyId)) {
                                            localBodyId = -1
                                        }
                                    }
                                } else {
                                    localBodyId = +localBodyId[0]
                                }
                                arrayItem.local_body_id = localBodyId

                                let blockId = arrayItem.block_id
                                if (!Array.isArray(blockId)) {
                                    // noinspection JSTypeOfValues
                                    if (typeof (blockId) != "int") {
                                        blockId = parseInt(blockId)
                                        if (isNaN(blockId)) {
                                            blockId = -1
                                        }
                                    }
                                } else {
                                    blockId = +blockId[0]
                                }
                                arrayItem.block_id = blockId

                                let gramPanchayatId = arrayItem.gram_panchayat_id
                                if (!Array.isArray(gramPanchayatId)) {
                                    // noinspection JSTypeOfValues
                                    if (typeof (gramPanchayatId) != "int") {
                                        gramPanchayatId = parseInt(gramPanchayatId)
                                        if (isNaN(gramPanchayatId)) {
                                            gramPanchayatId = -1
                                        }
                                    }
                                } else {
                                    gramPanchayatId = +gramPanchayatId[0]
                                }
                                arrayItem.gram_panchayat_id = gramPanchayatId

                                if (objectHasProperty(arrayItem, 'landmark')) {
                                    if (typeof (arrayItem.landmark) != "string") {
                                        arrayItem.landmark = JSON.stringify(arrayItem.landmark)
                                    }
                                } else {
                                    arrayItem.landmark = ""
                                }

                                if (arrayItem.isSynced === undefined) {
                                    arrayItem.isSynced = true
                                }
                                if (arrayItem.isOffline === undefined) {
                                    arrayItem.isOffline = false
                                }
                                // │ state_id: [ 577, 'Andaman and Nicobar (IN)' ],
                                // │ country_id: [ 104, 'India' ],
                                // // │ taluk_id: false,
                                // // │ district_id: false,
                                // // │ village_id: false,
                            });
                            // do change here for customer
                            // element.child_ids = JSON.stringify(element.child_ids)
                        }
                    } else {
                        element.child_ids = []
                        // do change here for customer
                        // element.child_ids = ""
                    }
                    // console.log('---------------------------------Customer Element-----------------------------------')
                    // console.log(element)
                    // console.log('---------------------------------Customer Element End-----------------------------------')
                    realm.create(CUSTOMER_SCHEMA, element, true)
                    // need a change
                })
                resolve(customerList)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertCustomers error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Vipin Joshi.
 * @since 15-07-2021.
 * @description to insert Farms.
 * @param farmList
 * @returns {Promise<unknown>}
 */
export const insertFarms = (farmList): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                farmList.forEach(element => {
                    let name = element.name
                    if (typeof (name) != "string") {
                        element.name = name + "";
                    }
                    let type = element.type
                    if (typeof (type) != "string") {
                        element.type = type + "";
                    }
                    let street = element.street
                    if (typeof (street) != "string") {
                        element.street = street + "";
                    }
                    let street2 = element.street2
                    if (typeof (street2) != "string") {
                        element.street2 = street2 + "";
                    }
                    let city = element.city
                    if (typeof (city) != "string") {
                        element.city = city + "";
                    }
                    if (objectHasProperty(element, 'zip')) {
                        if (typeof (element.zip) != "string") {
                            element.zip = JSON.stringify(element.zip)
                        }
                    } else {
                        element.zip = ""
                    }

                    let stateId = element.state_id
                    if (!Array.isArray(stateId)) {
                        // noinspection JSTypeOfValues
                        if (typeof (stateId) != "int") {
                            stateId = parseInt(stateId)
                            if (isNaN(stateId)) {
                                stateId = -1
                            }
                        }
                    } else {
                        stateId = +stateId[0]
                    }
                    element.state_id = stateId

                    let countryId = element.country_id
                    if (!Array.isArray(countryId)) {
                        // noinspection JSTypeOfValues
                        if (typeof (countryId) != "int") {
                            countryId = parseInt(countryId)
                            if (isNaN(countryId)) {
                                countryId = -1
                            }
                        }
                    } else {
                        countryId = +countryId[0]
                    }
                    element.country_id = countryId

                    let talukId = element.taluk_id
                    if (!Array.isArray(talukId)) {
                        // noinspection JSTypeOfValues
                        if (typeof (talukId) != "int") {
                            talukId = parseInt(talukId)
                            if (isNaN(talukId)) {
                                talukId = -1
                            }
                        }
                    } else {
                        talukId = +talukId[0]
                    }
                    element.taluk_id = talukId

                    let districtId = element.district_id
                    if (!Array.isArray(districtId)) {
                        // noinspection JSTypeOfValues
                        if (typeof (districtId) != "int") {
                            districtId = parseInt(districtId)
                            if (isNaN(districtId)) {
                                districtId = -1
                            }
                        }
                    } else {
                        districtId = +districtId[0]
                    }
                    element.district_id = districtId

                    let villageId = element.village_id
                    if (!Array.isArray(villageId)) {
                        // noinspection JSTypeOfValues
                        if (typeof (villageId) != "int") {
                            villageId = parseInt(villageId)
                            if (isNaN(villageId)) {
                                villageId = -1
                            }
                        }
                    } else {
                        villageId = +villageId[0]
                    }
                    element.village_id = villageId

                    if (element.isSynced === undefined) {
                        element.isSynced = true
                    }
                    if (element.isOffline === undefined) {
                        element.isOffline = false
                    }
                    // │ state_id: [ 577, 'Andaman and Nicobar (IN)' ],
                    // │ country_id: [ 104, 'India' ],
                    // // │ taluk_id: false,
                    // // │ district_id: false,
                    // // │ village_id: false,
                    realm.create(FARM_DATA_SCHEMA, element, true)
                })
                resolve(farmList)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertFarms error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Vipin Joshi.
 * @since 15-07-2021.
 * @description to get Farm by id.
 * @param farmId
 * @returns {Promise<unknown>}
 */
export const getFarmById = (farmId): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let farmList = realm.objects(FARM_DATA_SCHEMA).filtered('id == ' + farmId)
            resolve(JSON.parse(JSON.stringify(farmList[0])))
        }).catch(error => {
            console.log('Schema_Helpers.js getFarmById error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Vipin Joshi.
 * @since 16-07-2021.
 * @description to delete Farm by id.
 * @param id farmId
 * @returns {Promise<unknown>}
 */
export const deleteFarmById = (id): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                let obj = realm.objectForPrimaryKey(FARM_DATA_SCHEMA, id)
                if (obj) {
                    realm.delete(obj)
                    resolve(true)
                } else {
                    resolve(false)
                }
            });
        }).catch(error => {
            console.log('Schema_Helpers.js deleteFarmById error  --> ', error)
            reject(error)
        })
    })

export const insertDiscountData = (discountData): Promise =>
    new Promise(async (resolve, reject) => {     // change here
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                console.log('Schema_Helpers.js DiscountData  --> ', discountData)
                realm.create(DISCOUNT_DETAILS_SCHEMA, discountData, true)
                resolve(discountData)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertDiscountData error  --> ', error)
            reject(error)
        })
    })

export const insertOrderData = (orderData): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                console.log('Schema_Helpers.js orderData  --> ', orderData)
                realm.create(ORDER_DETAILS_SCHEMA, orderData, true)
                resolve(orderData)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertOrderData error  --> ', error)
            reject(error)
        })
    })

export const insertHoldOrderData = (holdOrderData): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                realm.create(HOLD_ORDER_SCHEMA, holdOrderData, true)
                resolve(holdOrderData)
            })
        }).catch(error => {
            console.log('Schema_Helpers.js insertHoldOrderData error  --> ', error)
            reject(error)
        })
    })

// Getters for fetching data from current Realm Instance
export const getAllDiscounts = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let discountList = realm.objects(DISCOUNT_DETAILS_SCHEMA)
            resolve(discountList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllDiscounts error  --> ', error)
            reject(error)
        })
    })

export const getAllCategories = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let categoryList = realm.objects(CATEGORY_SCHEMA)
            resolve(categoryList)
        }).catch(error => {
            console.log('Schema_Helpers.js getAllCategories error  --> ', error)
            reject(error)
        })
    })

export const getProductsForCategory = (categoryId): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let productList = realm.objects(PRODUCT_SCHEMA)
            if (categoryId === 0) {
                resolve(productList)
            } else {
                let filteredResultList = []
                productList.forEach(product => {
                    switch (typeof (product.pos_categ_id)) {
                        case 'string': {
                            const productCatArray = JSON.parse(product.pos_categ_id)
                            if (productCatArray.includes(categoryId)) {
                                filteredResultList.push(product)
                            }
                        }
                            break
                        case 'number': {
                            if (product.pos_categ_id === parseInt(categoryId.toString())) {
                                filteredResultList.push(product)
                            }
                        }
                            break
                        default:
                            break
                    }
                })
                resolve(filteredResultList)
            }
        })
            .catch(error => {
                console.log('Schema_Helpers.js getProductsForCategory error  --> ', error)
                reject(error)
            })
    })

export const getAllProducts = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let productList = realm.objects(PRODUCT_SCHEMA)
            resolve(productList)
        }).catch(error => {
            console.log('Schema_Helpers.js getAllProducts error --> ', error)
            reject(error)
        })
    })

export const getAllFavouriteProducts = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let productList = realm.objects(FAVOURITE_PRODUCT_SCHEMA)
            resolve(productList)
        }).catch(error => {
            console.log('Schema_Helpers.js getAllFavouriteProducts error --> ', error)
            reject(error)
        })
    })


export const getAllCountries = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let countryList = realm.objects(COUNTRY_DATA_SCHEMA)
            resolve(countryList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllCountries error  --> ', error)
            reject(error)
        })
    })

export const getAllStates = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let stateList = realm.objects(STATE_DATA_SCHEMA).sorted('name', false)
            resolve(stateList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllStates error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Vipin Joshi
 * @since 05-07-2021
 * @returns {Promise<unknown>}
 * @description To get all talukes.
 */
export const getAllTalukes = (districtId?: number): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let talukList = realm.objects(TALUK_DATA_SCHEMA)
            if (districtId) {
                talukList = talukList.filtered("district_id.id == $0", districtId)
            }
            resolve(talukList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllTalukes error  --> ', error)
            reject(error);
        })
    })

/**
 * @author Vipin Joshi
 * @since 05-07-2021
 * @returns {Promise<unknown>}
 * @description To get all districts.
 */
export const getAllDistricts = (stateId?: number): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let districtList = realm.objects(DISTRICT_DATA_SCHEMA)
            if (stateId) {
                districtList = districtList.filtered("state_id.id == $0", stateId)
            }
            resolve(districtList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllDistricts error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Lovesh Singh
 * @since 24-06-2022
 * @returns {Promise<unknown>}
 * @description To get all local bodies.
 */
export const getAllLocalBodies = (districtId?: number): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let localBodyList = realm.objects(LOCAL_BODIES_DATA_SCHEMA)
            if (districtId) {
                localBodyList = localBodyList.filtered("district_id.id == $0", districtId)
            }
            resolve(localBodyList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllLocalBodies error  --> ', error)
            reject(error);
        })
    })

/**
 * @author Lovesh Singh
 * @since 24-06-2022
 * @returns {Promise<unknown>}
 * @description To get all block.
 */
export const getAllBlocks = (districtId?: number): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let blockList = realm.objects(BLOCKS_DATA_SCHEMA)
            if (districtId) {
                blockList = blockList.filtered("district_id.id == $0", districtId)
            }
            resolve(blockList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllBlocks error  --> ', error)
            reject(error);
        })
    })

/**
 * @author Lovesh Singh
 * @since 24-06-2022
 * @returns {Promise<unknown>}
 * @description To get all gram panchayats.
 */
export const getAllGramPanchayats = (blockId?: number): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let gramPanchayatList = realm.objects(GRAM_PANCHAYATS_DATA_SCHEMA)
            if (blockId) {
                gramPanchayatList = gramPanchayatList.filtered("block_id.id == $0", blockId)
            }
            resolve(gramPanchayatList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllGramPanchayats error  --> ', error)
            reject(error);
        })
    })

/**
 * @author Vipin Joshi
 * @since 27-09-2021
 * @returns {Promise<unknown>}
 * @description To get district by id.
 */
export const getDistrictById = (districtId: number): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let districtList = realm.objects(DISTRICT_DATA_SCHEMA).filtered("id == $0", districtId)
            if (districtList.length <= 0) {
                reject(new Error('No data found.'))
            }
            resolve(districtList[0])
        }).catch(error => {
            console.log('Schema_Helpers.js getDistrictById error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Vipin Joshi
 * @since 05-07-2021
 * @returns {Promise<unknown>}
 * @description To get all villages.
 */
export const getAllVillages = (gramPanchayatId?: number): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let villageList = realm.objects(VILLAGE_DATA_SCHEMA)
            if (gramPanchayatId) {
                villageList = villageList.filtered("gram_panchayat_id.id == $0", gramPanchayatId)
            }
            resolve(villageList)
        }).catch(error => {
            console.log('Schema_Helpers.js getAllVillages error  --> ', error)
            reject(error)
        })
    })

export const getSyncOrderLimitCount = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let syncCountList = realm.objects(EXTRA_STATIC_DATA_SCHEMA).filtered('id == 0')
            resolve(syncCountList[0].sync_order_limit)

        }).catch(error => {
            console.log('Schema_Helpers.js getSyncOrderLimitCount error  --> ', error)
            reject(error)
        })
    })

export const getOrderPrefix = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let syncCountList = realm.objects(EXTRA_STATIC_DATA_SCHEMA).filtered('id == 0')
            resolve(syncCountList[0].order_prefix)

        }).catch(error => {
            console.log('Schema_Helpers.js getOrderPrefix error  --> ', error)
            reject(error)
        })
    })

export const getFromSessionDetails = (property?): Promise =>
    new Promise(async (resolve, reject) => {
        /*if (typeof property != "string") {
            reject(new Error('Invalid data type of Key. Try wrapping key name as string'))
        } else {*/
        Realm.open(databaseOptions).then(async realm => {
            let serverSessionDetailList = realm.objects(SERVER_SESSION_DETAILS_SCHEMA).filtered('id == 0')
            if (serverSessionDetailList.length > 0) {
                let objectElement = serverSessionDetailList[0]
                if (property) {
                    objectElement = objectElement[property];
                }
                if (objectElement !== undefined) {
                    resolve(objectElement)
                } else {
                    reject(new Error('Key not Found. They Key you are looking for is not defined in the given object.'))
                }
            } else { // If no previous session found (e.g.: Create session on another device & trying to close in another without resuming.)
                reject(new Error('No previous session detail found on this device, you can either resume session or logout.'))
            }
        }).catch(error => {
            console.log('Schema_Helpers.js getFromSessionDetails error  --> ', error)
            reject(error)
        })
        // }
    })

export const getUOMList = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let uomList = realm.objects(UOM_SCHEMA)
            resolve(uomList)

        }).catch(error => {
            console.log('Schema_Helpers.js getUOMList error  --> ', error)
            reject(error)
        })
    })

export const getUOMNameFromId = (id): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let uomList = realm.objects(UOM_SCHEMA).filtered('id == ' + id)
            resolve(uomList[0]['name'])

        }).catch(error => {
            console.log('Schema_Helpers.js getUOMList error  --> ', error)
            reject(error)
        })
    })

export const getTaxList = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let taxList = realm.objects(TAX_SCHEMA)
            resolve(taxList)

        }).catch(error => {
            console.log('Schema_Helpers.js getTaxList error  --> ', error)
            reject(error)
        })
    })

export const getTaxObjectFromId = (idValue): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let taxList = realm.objects(TAX_SCHEMA).filtered('id == ' + idValue)
            resolve(taxList[0])

        }).catch(error => {
            console.log('Schema_Helpers.js getTaxListFromProperty error  --> ', error)
            reject(error)
        })
    })

export const getPaymentList = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let paymentList = realm.objects(PAYMENT_SCHEMA)
            resolve(paymentList)

        }).catch(error => {
            console.log('Schema_Helpers.js getPaymentList error  --> ', error)
            reject(error)
        })
    })

export const getPaymentObjectFromId = (idValue): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let paymentList = realm.objects(PAYMENT_SCHEMA).filtered('id == ' + idValue)
            resolve(paymentList[0])

        }).catch(error => {
            console.log('Schema_Helpers.js getPaymentListFromProperty  error --> ', error)
            reject(error)
        })
    })

export const getCustomerDisplayKeyObject = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let displayKeyList = realm.objects(CUSTOMER_DISPLAY_SCHEMA).filtered('id == 0')
            resolve(displayKeyList[0])

        }).catch(error => {
            console.log('Schema_Helpers.js getCustomerDisplayKeyObject error  --> ', error)
            reject(error)
        })

    })

/**
 * @author Vipin Joshi.
 * @param search search Param could be a single string or Object holding a Map of String for multiple param.
 * <p>Search String Only search for name, for more than search use Object Key as db column-name & their value</p>
 * @param limit number of records.
 * @returns {Promise<unknown>}
 */
export const getAllCustomers = (search: string | { [key: string]: string | number | boolean } = "", limit: number = 20): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let customerObject = realm.objects(CUSTOMER_SCHEMA)

            let searchQuery = ""
            let searchParamType = typeof search;

            if (searchParamType === "string") {
                searchQuery += "phone LIKE[c] \"*" + search + "*\""
                searchQuery += " OR mobile LIKE[c] \"*" + search + "*\""
            } else if (searchParamType === "object") { // means have multiple search Param.
                searchQuery = convertObjectToLikeQuery(search, "*", "*", " || ")
            }

            // console.log(searchQuery)
            customerObject = customerObject.filtered(
                searchQuery +
                " LIMIT(" + limit + ")"
            )

            resolve(deepCopy(customerObject))
        }).catch(error => {
            console.log('Schema_Helpers.js getAllCustomers error  --> ', error);
            reject(error)
        })
    })

export const getCustomerById = (customerIdToFind): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let customerList = realm.objects(CUSTOMER_SCHEMA).filtered('id == ' + customerIdToFind)
            resolve(deepCopy(customerList[0]))

        }).catch(error => {
            console.log('Schema_Helpers.js getCustomerById error  --> ', error)
            reject(error)
        })
    })

export const getAllOnlineOrders = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let query = realm.objects(ORDER_DETAILS_SCHEMA).filtered('isOffline == false')
            let onlineOrderList = Array.from(query)
            resolve(onlineOrderList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllOfflineOrders error  --> ', error)
            reject(error)
        })
    })

export const getAllOfflineOrders = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let query = realm.objects(ORDER_DETAILS_SCHEMA).filtered('isOffline == true')
            let offlineOrderList = Array.from(query)
            resolve(offlineOrderList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllOfflineOrders error  --> ', error)
            reject(error)
        })
    })

export const getAllOrders = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let query = realm.objects(ORDER_DETAILS_SCHEMA)
            let orderList = Array.from(query)
            resolve(orderList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllOrders error  --> ', error)
            reject(error)
        })
    })

export const getLastOrderId = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let orderList = realm.objects(ORDER_DETAILS_SCHEMA)
            if (orderList?.length > 0) {
                resolve(orderList[orderList.length - 1].orderId)
            } else {
                resolve(0)
            }
        }).catch(error => {
            console.log('Schema_Helpers.js getLastOrderId error  --> ', error)
            reject(error)
        })
    })

export const getLastCustomerId = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let customerList = realm.objects(CUSTOMER_SCHEMA)
            if (customerList.length > 0) {
                resolve(customerList[customerList.length - 1].id)
            } else {
                resolve(0)
            }
        }).catch(error => {
            console.log('Schema_Helpers.js getLastCustomerId error  --> ', error)
            reject(error)
        })
    })

export const getAllHoldOrders = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let query = realm.objects(HOLD_ORDER_SCHEMA).sorted("id")
            let holdOrderList = Array.from(query)
            resolve(holdOrderList)

        }).catch(error => {
            console.log('Schema_Helpers.js getAllHoldOrders error  --> ', error)
            reject(error)
        })
    })

export const getLastHoldOrderId = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            let holdOrderList = realm.objects(HOLD_ORDER_SCHEMA)
            if (holdOrderList.length > 0) {
                resolve(holdOrderList[holdOrderList.length - 1].id)
            } else {
                resolve(0)
            }
        }).catch(error => {
            console.log('Schema_Helpers.js getLastHoldOrderId error  --> ', error)
            reject(error)
        })
    })

export const deleteHoldOrderById = (id): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                try {
                    const obj = realm.objectForPrimaryKey(HOLD_ORDER_SCHEMA, id)
                    if (obj) {
                        realm.delete(obj)
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                } catch (err) {
                    reject(err)
                }
            })
        }).catch(error => {
            console.log('Schema_Helpers.js deleteHoldOrderById error --> ', error)
            reject(error)
        })
    })

export const deleteCustomerById = (id): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                let obj = realm.objectForPrimaryKey(CUSTOMER_SCHEMA, id)
                if (obj) {
                    realm.delete(obj)
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        }).catch(error => {
            console.log('Schema_Helpers.js error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Vipin Joshi.
 * @since 13-07-2021.
 * @returns {Promise<unknown>}
 * @description To clear all orders.
 * <p>
 *     online = true - delete online orders.
 * </p>
 */
export const deleteAllOrders = (filter?: { online: boolean }): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                let filterString = undefined
                if (filter?.online) { //delete only online orders.
                    filterString = 'isOffline == false'
                }

                let objects = filterString ? realm.objects(ORDER_DETAILS_SCHEMA).filtered(filterString) : realm.objects(ORDER_DETAILS_SCHEMA)
                if (objects) {
                    realm.delete(objects)
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        }).catch(error => {
            console.log('Schema_Helpers.js deleteAllOrders error  --> ', error)
            reject(error)
        })
    })

/**
 * @author Vipin Joshi.
 * @since 19-08-2021.
 * @returns {Promise<boolean>} true when there is objects to delete otherwise false.
 * @description To clear all customers.
 */
export const deleteAllCustomers = (): Promise =>
    new Promise(async (resolve, reject) => {
        Realm.open(databaseOptions).then(async realm => {
            realm.write(async () => {
                let objects = realm.objects(CUSTOMER_SCHEMA)
                if (objects) {
                    realm.delete(objects)
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        }).catch(error => {
            console.log('Schema_Helpers.js deleteAllCustomers error  --> ', error)
            reject(error)
        })
    })

/**
 * This line actually creates a realm object that will have all the schemas as per our definitions.
 */
export default new Realm(databaseOptions)
