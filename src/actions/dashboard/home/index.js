import {
    ADD_PRODUCT_TO_CART,
    APPLY_CART_PRODUCT_DISCOUNT,
    CATEGORY_LOADING,
    CLEAR_PRODUCT_CART,
    CUSTOMER_LOADING,
    ENABLE_FAVOURITE_PRODUCTS,
    ERROR,
    FILTER_FAVOURITE_PRODUCTS,
    FILTER_PRODUCTS,
    LOADING,
    PAYMENT_METHODS_LOADING,
    PRESS_CART_FEATURE_DELETE_KEY,
    PRESS_CART_FEATURE_NUMERIC_KEY,
    PRESS_PRODUCT_CATEGORY,
    PRESS_PRODUCT_CATEGORY_BREADCRUMB,
    PRODUCT_LOADING, RESET_FARM_DETAILS, RESET_PURPOSE,
    RESET_REDUCER_STATE_FOR_NEW_ORDER,
    SELECT_CART_FEATURE_ACTION,
    SELECT_CART_PRODUCT,
    SET_AVAILABLE_PRODUCT_DISCOUNT,
    SET_CART_PRODUCTS,
    SET_COMPLIMENTARY, SET_FARM_DETAILS,
    SET_FAVOURITE_PRODUCTS,
    SET_LIMIT_50,
    SET_PRODUCT_CATEGORIES,
    SET_PRODUCTS, SET_PURPOSE,
    SET_TAX_LIST,
    SET_TOTAL_CART_DISCOUNT_PRICE,
    SET_TOTAL_CART_PRICE,
    SET_UOM_LIST,
    SHOW_AVAILABLE_PRODUCT_DISCOUNT_DIALOG, SHOW_PURPOSE_DIALOG,
    SUCCESS
} from "./types";
import {
    deleteFavouriteProductById,
    getAllCategories, getAllDiscounts, getAllFavouriteProducts,
    getAllProducts, getLastHoldOrderId,
    getTaxList, getUOMList,
    insertAllProducts,
    insertCategories, insertCustomerDisplaykeys, insertCustomers, insertFavouriteProduct, insertHoldOrderData,
    insertPaymentListDetails,
    insertTaxList, insertUOMList
} from "../../../storage/Schema_Helpers";
import {ProductAPIService} from "../../../services/ProductAPIService";
import {Constant} from "../../../helper/constant";
import {localDBErrorHandler, voidHandler} from "../../../storage/DBErrorHandler";
import {CustomerAPIService} from "../../../services/CustomerAPIService";
import {SetHoldProducts} from "../hold-cart";
import {deSelectCustomer} from "./customer";
import I18N from "../../../helper/translation";

/**
 * @author Vipin Joshi.
 * @since 09-12-2021.
 * @description to set loading & its message.
 */
export const loading = (data: boolean, message?: string) => ({
    type: LOADING,
    payload: {data, message}
});

/**
 * @author Lovesh Singh.
 * @since 16-02-2022.
 * @description to set category loading & its message.
 */
export const categoryLoading = (data: boolean, message?: string) => ({
    type: CATEGORY_LOADING,
    payload: {data, message}
});

/**
 * @author Lovesh Singh.
 * @since 16-02-2022.
 * @description to set product loading & its message.
 */
export const productLoading = (data: boolean, message?: string) => ({
    type: PRODUCT_LOADING,
    payload: {data, message}
});

/**
 * @author Lovesh Singh.
 * @since 16-02-2022.
 * @description to set customer loading & its message.
 */
export const customerLoading = (data: boolean, message?: string) => ({
    type: CUSTOMER_LOADING,
    payload: {data, message}
});

/**
 * @author Lovesh Singh.
 * @since 16-02-2022.
 * @description to set payment methods loading & its message.
 */
export const paymentMethodsLoading = (data: boolean, message?: string) => ({
    type: PAYMENT_METHODS_LOADING,
    payload: {data, message}
});

/**
 * @author Vipin Joshi.
 * @since 09-12-2021.
 * @description to set error.
 */
export const error = (data: any) => ({
    type: ERROR,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 09-12-2021.
 * @description to set success.
 */
export const success = (data: any) => ({
    type: SUCCESS,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to set Tax List.
 */
export const setTaxList = (data: any) => ({
    type: SET_TAX_LIST,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to set UOM List.
 */
export const setUOMList = (data: any) => ({
    type: SET_UOM_LIST,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to set Products.
 */
export const setProducts = (data: any) => ({
    type: SET_PRODUCTS,
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
 * @since 14-12-2021.
 * @description to set product categories.
 */
export const setProductCategories = (data: any) => ({
    type: SET_PRODUCT_CATEGORIES,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 15-12-2021.
 * @description to filter products.
 */
export const filterProducts = (data: { search: any, category: any, purpose: any }) => ({
    type: FILTER_PRODUCTS,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 17-12-2021.
 * @description to select cart product.
 */
export const selectCartProduct = (data: any) => ({
    type: SELECT_CART_PRODUCT,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 15-12-2021.
 * @description to add product to the cart.
 */
export const addProductToCart = (data: any) => ({
    type: ADD_PRODUCT_TO_CART,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 15-12-2021.
 * @description to set cart products.
 */
export const setCartProducts = (data: []) => ({
    type: SET_CART_PRODUCTS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 07-03-2022.
 * @description to set complementary.
 */
export const setComplimentary = (data: boolean) => ({
    type: SET_COMPLIMENTARY,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 15-12-2021.
 * @description to clear all products from cart.
 */
export const clearProductCart = (data?: any) => ({
    type: CLEAR_PRODUCT_CART,
    payload: data
});


/**
 * @author Vipin Joshi.
 * @since 15-12-2021.
 * @description to add product to the cart.
 */
export const selectCartFeatureAction = (data: { discount: boolean, quantity: boolean, price: boolean, decimal: boolean, complimentary: boolean }) => ({
    type: SELECT_CART_FEATURE_ACTION,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 23-12-2021.
 * @description to handle cart numeric key press event.
 */
export const pressCartFeatureNumericKey = (data: any) => ({
    type: PRESS_CART_FEATURE_NUMERIC_KEY,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 23-12-2021.
 * @description to handle cart delete key press event.
 */
export const pressCartFeatureDeleteKey = (data?: any) => ({
    type: PRESS_CART_FEATURE_DELETE_KEY,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 29-12-2021.
 * @description to show available discount dialog.
 */
export const showAvailableProductDiscountDialog = (data) => ({
    type: SHOW_AVAILABLE_PRODUCT_DISCOUNT_DIALOG,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 21-04-2022.
 * @description to set available discount.
 */
export const setAvailableProductDiscount = (data) => ({
    type: SET_AVAILABLE_PRODUCT_DISCOUNT,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 28-04-2022.
 * @description to set Favourite Products.
 */
export const setFavouriteProducts = (data: any) => ({
    type: SET_FAVOURITE_PRODUCTS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 28-04-2022.
 * @description to enable Favourite Products button.
 */
export const enableFavouriteProducts = (data: any) => ({
    type: ENABLE_FAVOURITE_PRODUCTS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 28-04-2022.
 * @description to filter Favourite Products.
 */
export const filterFavouriteProducts = (data: any) => ({
    type: FILTER_FAVOURITE_PRODUCTS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 25-05-2022.
 * @description to set limit 50 product quantities.
 */
export const setLimit50 = (data) => ({
    type: SET_LIMIT_50,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 25-05-2022.
 * @description to set limit 50 product quantities.
 */
export const setPurpose = (data) => ({
    type: SET_PURPOSE,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 25-05-2022.
 * @description to set limit 50 product quantities.
 */
export const resetPurpose = (data) => ({
    type: RESET_PURPOSE,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 25-05-2022.
 * @description to set limit 50 product quantities.
 */
export const showPurposeDialog = (data) => ({
    type: SHOW_PURPOSE_DIALOG,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 17-01-2022.
 * @description to handle used payment method detail dialog back press event.
 * @param data no use : undefined
 * @returns {{payload: *, type: string}}
 */
export const resetFarmDetails = (data: any) => ({
    type: RESET_FARM_DETAILS,
    payload: data
})


/**
 * @author Vipin Joshi.
 * @since 17-01-2022.
 * @description to handle used payment method detail dialog submit press event.
 * @param data no use : undefined
 * @returns {{payload: *, type: string}}
 */
export const setFarmDetails = (data: any) => ({
    type: SET_FARM_DETAILS,
    payload: data
})

/**
 * @author Lovesh Singh.
 * @since 31-05-2022.
 * @description to add product to cart list.
 */
export const addProductToCartWithDiscount = (product: any) => async (dispatch) => {
    await dispatch(setProductDiscount(product))
    await dispatch(addProductToCart(product))
}


/**
 * @author Lovesh Singh.
 * @since 28-04-2022.
 * @description to add product to favourite.
 */
export const addProductToFavourite = (favouriteProduct: any, callBack: Function) => async (dispatch) => {

    favouriteProduct.isFavourite = !favouriteProduct?.isFavourite
    await getAllFavouriteProducts().then(existingFavProducts => {
        const isFavourite = existingFavProducts.some((el) => el?.id === favouriteProduct?.id)
        if (isFavourite) {
            deleteFavouriteProductById(favouriteProduct?.id).then((res) => {
                let favouriteProducts = existingFavProducts.filter((el) => favouriteProduct?.id !== el?.id)
                dispatch(setFavouriteProducts(favouriteProducts))
                callBack.call(this, false)
            }, error => {
                localDBErrorHandler(error, I18N.t('CustomerSyncedButNotInsertedMsg'))
            })
        } else {
            insertFavouriteProduct(favouriteProduct).then(res => {
                    dispatch(setFavouriteProducts(existingFavProducts))
                    callBack.call(this, res?.isFavourite)
                }
            ), (error) => {
                localDBErrorHandler(error, I18N.t('RestartMsg'))
            }
        }
    })
}

/**
 * @author Vipin Joshi.
 * @since 29-12-2021.
 * @description to fetch discount & open available product discount dialog.
 */
export const setProductDiscount = (selectedCartProduct?: any) => async (dispatch) => {
    const availableDiscount = []
    let productCustomDiscount

    if (selectedCartProduct) {
        productCustomDiscount = JSON.parse(selectedCartProduct?.pos_custom_discount_id)
        await getAllDiscounts()
            .then(allDiscounts => {
                allDiscounts.forEach(discount => {
                    for (let i = 0; i < discount.category_ids.length; i++) {
                        if (discount.category_ids[i] === selectedCartProduct.pos_categ_id) {
                            availableDiscount.push(discount)
                            break;
                        }
                    }
                })
            }, localDBErrorHandler).finally(() => {
                console.log(JSON.stringify(availableDiscount))
            })
        let customDiscountAvailable = availableDiscount.some(discount => productCustomDiscount?.id === discount.id)

        if (productCustomDiscount?.discount && !customDiscountAvailable)
            availableDiscount.push(productCustomDiscount)
    }


    // await dispatch(showAvailableProductDiscountDialog({show, availableDiscount}))
    await dispatch(setAvailableProductDiscount(availableDiscount))
}

/**
 * @author Lovesh Singh.
 * @since 14-01-2022.
 * @description to add cart to hold.
 */
export const addToHoldCart = (cartItem: any, selectedCustomer: any, selectedPurpose: string, isComplimentarySelected: boolean) => async (dispatch) => {

    let holdOrder = {}

    await getLastHoldOrderId()
        .then(lastHoldOrderId => {
            holdOrder.id = lastHoldOrderId + 1
            let holdOrderData = {
                holdProductList: cartItem,
                customerData: selectedCustomer,
                purpose_id: selectedPurpose,
                complimentary: isComplimentarySelected ? 'Complementary' : undefined
            }
            holdOrder.stringData = JSON.stringify(holdOrderData)
            insertHoldOrderData(holdOrder).then(holdOrder => {
                    dispatch(SetHoldProducts(holdOrder))
                    dispatch(deSelectCustomer())
                    dispatch(resetPurpose())
                    dispatch(setComplimentary(false))
                    dispatch(clearProductCart())
                }
            ), (error) => {
                localDBErrorHandler(error, I18N.t('RestartMsg'))
            }
        })
}

/**
 * @author Vipin Joshi.
 * @since 29-12-2021.
 * @description to apply cart product discount.
 */
export const applyCartProductDiscount = (data: number) => ({
    type: APPLY_CART_PRODUCT_DISCOUNT,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 03-01-2022.
 * @description to handle product category press event.
 */
export const onProductCategoryBreadCrumbPress = (data: { breadCrumb: any, index: number }) => ({
    type: PRESS_PRODUCT_CATEGORY_BREADCRUMB,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 03-01-2022.
 * @description to handle product category press event.
 */
export const onProductCategoryPress = (data: { category: any, index: number }) => ({
    type: PRESS_PRODUCT_CATEGORY,
    payload: data
})

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to set total Cart Price.
 */
export const setTotalCartPrice = (data: number) => ({
    type: SET_TOTAL_CART_PRICE,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to set total applied discount cart price.
 */
export const setTotalAppliedDiscountPrice = (data: number) => ({
    type: SET_TOTAL_CART_DISCOUNT_PRICE,
    payload: data
});

//async function use redux-thunk
/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to load initial data from apis.
 * @returns {(function(*): Promise<void>)|*}
 */
export const loadOnlineData = (sessionDetails: any) => async (dispatch) => {
    await dispatch(loading(true))
    await fetchInitialDataFromAPI(dispatch, sessionDetails.shopId).then((values: any[]) => {
    }).catch((err) => {
        dispatch(error(err));
    }).finally(() => {
        dispatch(loading(false))
    })
};

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @param dispatch Redux event dispatcher.
 * @param shopId logged in shop id.
 * @description to fetch api data parallel.
 * @returns {Promise<any>} array of multiple api responses.
 */
const fetchInitialDataFromAPI = async (dispatch, shopId) => {
    const promises = []
    promises.push(fetchAllCategories(dispatch, shopId).then((res) => handleProductCategoriesResponse(dispatch, res)).finally(() => dispatch(categoryLoading(false))))
    promises.push(fetchAllProducts(dispatch, shopId).then((res) => handleProductsResponse(dispatch, res)).finally(() => dispatch(productLoading(false))))
    promises.push(getAllFavouriteProducts().then((res) => dispatch(setFavouriteProducts(res)).finally(() => dispatch(productLoading(false)))))
    promises.push(fetchAllCustomers(dispatch, shopId).then((res) => handleCustomersResponse(dispatch, res)).finally(() => dispatch(customerLoading(false))))
    promises.push(ProductAPIService.fetchPaymentMethods(dispatch, shopId).then((res) => handlePaymentMethodsResponse(dispatch, res)).finally(() => dispatch(paymentMethodsLoading(false))))
    promises.push(ProductAPIService.fetchTaxDetails(shopId).then((res) => handleTaxDetailsResponse(dispatch, res)))
    promises.push(ProductAPIService.fetchProductUOMData(shopId).then((res) => handleProductUOMDetailsResponse(dispatch, res)))
    return Promise.all(promises)
}

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @param dispatch Redux event dispatcher.
 * @param shopId logged in shop id.
 * @description to fetch all categories from API, is limited to some perPage,
 * this function will call multiple apis, if any request fail than all request will automatically fail.
 * @returns {Promise<any>} array of multiple api responses.
 */
const fetchAllCategories = async (dispatch, shopId) => {
    await dispatch(categoryLoading(true))
    const perPage = Constant.ITEMS_PER_PAGE
    let offset = 0
    const categoryPromises = []
    await ProductAPIService.fetchProductCategories(shopId, offset, perPage).then(async (res) => {
        categoryPromises.push(Promise.resolve(res))

        const totalCategories = res.category_count
        offset += perPage
        while (offset < totalCategories) {
            categoryPromises.push(ProductAPIService.fetchProductCategories(shopId, offset, perPage))
            offset += perPage
        }
    })

    return await Promise.all(categoryPromises).then((categories: []) => {
        const finalResponse = categories[0]
        categories.slice(1).forEach(value => finalResponse.pos_categories = finalResponse.pos_categories.concat(value.pos_categories))
        return Promise.resolve(finalResponse)
    });
}

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @param dispatch Redux event dispatcher.
 * @param shopId logged in shop id.
 * @description to fetch all products from API, is limited to some perPage,
 * this function will call multiple apis, if any request fail than all request will automatically fail.
 * @returns {Promise<any>} array of multiple api responses.
 */
const fetchAllProducts = async (dispatch, shopId) => {
    await dispatch(productLoading(true))
    const perPage = Constant.ITEMS_PER_PAGE
    let offset = 0
    const productPromises = []
    await ProductAPIService.fetchProducts(shopId, offset, perPage).then(async (res) => {
        productPromises.push(Promise.resolve(res))

        const totalProducts = res.product_count
        offset += perPage
        while (offset < totalProducts) {
            productPromises.push(ProductAPIService.fetchProducts(shopId, offset, perPage))
            offset += perPage
        }
    })

    return await Promise.all(productPromises).then((products: []) => {
        const finalResponse = products[0]
        products.slice(1).forEach(value => finalResponse.products = finalResponse.products.concat(value.products))
        return Promise.resolve(finalResponse)
    });
};

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @param dispatch Redux event dispatcher.
 * @param shopId logged in shop id.
 * @description to fetch all customers from API, is limited to some perPage,
 * this function will call multiple apis, if any request fail than all request will automatically fail.
 * @returns {Promise<any>} array of multiple api responses.
 */
const fetchAllCustomers = async (dispatch, shopId) => {
    await dispatch(customerLoading(true))
    const perPage = Constant.ITEMS_PER_PAGE
    let offset = 0
    const customerPromises = []
    await CustomerAPIService.fetchCustomers(shopId, offset, perPage).then(async (res) => {
        customerPromises.push(Promise.resolve(res))

        const totalCustomers = res.customer_count
        offset += perPage
        while (offset < totalCustomers) {
            customerPromises.push(CustomerAPIService.fetchCustomers(shopId, offset, perPage))
            offset += perPage
        }
    })

    return await Promise.all(customerPromises).then((customers: []) => {
        const finalResponse = customers[0]
        customers.slice(1).forEach(value => finalResponse.customers = finalResponse.customers.concat(value.customers))
        return Promise.resolve(finalResponse)
    });
};

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to handle product categories api network response.
 * @param dispatch Redux event dispatcher.
 * @param res network response.
 * @returns {Promise<void>}
 */
const handleProductCategoriesResponse = async (dispatch, res): void => {
    await insertCategories(res.pos_categories).then(voidHandler, (error) => {
        localDBErrorHandler(error, I18N.t('RestartMsg'))
    })
    await dispatch(setProductCategories(res.pos_categories))
}

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to handle products api network response.
 * @param dispatch Redux event dispatcher.
 * @param res network response.
 * @returns {Promise<void>}
 */
const handleProductsResponse = async (dispatch, res): void => {
    await insertAllProducts(res.products).then(voidHandler, (error) => {
        localDBErrorHandler(error, I18N.t('RestartMsg'))
    })
    await dispatch(setProducts(res.products))
}

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to handle customers api network response.
 * @param dispatch Redux event dispatcher.
 * @param res network response.
 * @returns {Promise<void>}
 */
const handleCustomersResponse = async (dispatch, res): void => {
    await insertCustomers(res.customers).then(voidHandler, (error) => {
        localDBErrorHandler(error, I18N.t('RestartMsg'))
    })
    // Fact if customers inserted successfully than customer display keys also inserted successfully.
    await insertCustomerDisplaykeys(res.display_keys).then(voidHandler, (error) => {
        localDBErrorHandler(error, I18N.t('RestartMsg'))
    })
}

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to handle payment methods api network response.
 * @param dispatch Redux event dispatcher.
 * @param res network response.
 * @returns {Promise<void>}
 */
const handlePaymentMethodsResponse = async (dispatch, res): void => {
    await insertPaymentListDetails(res.payments).then(voidHandler, (error) => {
        localDBErrorHandler(error, I18N.t('RestartMsg'))
    })
}

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to handle tax details api network response.
 * @param dispatch Redux event dispatcher.
 * @param res network response.
 * @returns {Promise<void>}
 */
const handleTaxDetailsResponse = async (dispatch, res): void => {
    await insertTaxList(res.taxes).then(voidHandler, (error) => {
        localDBErrorHandler(error, I18N.t('RestartMsg'))
    })
    await dispatch(setTaxList(res.taxes))
}

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to handle product UOM details api network response.
 * @param dispatch Redux event dispatcher.
 * @param res network response.
 * @returns {Promise<void>}
 */
const handleProductUOMDetailsResponse = async (dispatch, res): void => {
    await insertUOMList(res.uom).then(voidHandler, (error) => {
        localDBErrorHandler(error, I18N.t('RestartMsg'))
    })
    await dispatch(setUOMList(res.uom))
}

//async function use redux-thunk
/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to load initial data from local db.
 * @returns {(function(*): Promise<void>)|*}
 */
export const loadOfflineData = () => async (dispatch) => {
    await dispatch(loading(true));
    await loadDataFromDB(dispatch).catch((err) => {
        dispatch(error(err));
    }).finally(() => {
        dispatch(loading(false))
    })
};

/**
 * @author Vipin Joshi.
 * @since 14-12-2021.
 * @description to load initial data from db.
 * @param dispatch redux event dispatcher.
 */
const loadDataFromDB = async (dispatch) => {
    await getTaxList().then(taxList => dispatch(setTaxList(taxList)), checkOfflineDataErrorHandler)
    await getUOMList().then(uomList => dispatch(setUOMList(uomList)), checkOfflineDataErrorHandler)
    await getAllFavouriteProducts().then(favProducts => dispatch(setFavouriteProducts(favProducts)), checkOfflineDataErrorHandler)
    await getAllProducts().then(products => dispatch(setProducts(products)), checkOfflineDataErrorHandler)
    await getAllCategories().then(productCategories => dispatch(setProductCategories(productCategories)), checkOfflineDataErrorHandler)
}

/**
 * todo need to sort this method.
 * @author Vipin Joshi.
 * @since 03-09-2021.
 * @description common error handler (to remove duplicate code).
 * @param error instance.
 * @see checkOfflineData
 */
const checkOfflineDataErrorHandler = (error): void => {
    /*console.log('HomePage.js checkOfflineDataErrorhandler  --> ', error);
    let stateUpdates = {}
    stateUpdates.loadingText = I18N.t('LoadingText')
    stateUpdates.isLoading = false
    stateUpdates.hasDisplayData = false*/
    localDBErrorHandler(error, I18N.t('RestartMsg'))
}
