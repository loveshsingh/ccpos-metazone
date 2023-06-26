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
    SET_PRODUCTS,
    SET_PURPOSE,
    SET_TAX_LIST,
    SET_TOTAL_CART_DISCOUNT_PRICE,
    SET_TOTAL_CART_PRICE,
    SET_UOM_LIST,
    SHOW_AVAILABLE_PRODUCT_DISCOUNT_DIALOG,
    SHOW_PURPOSE_DIALOG,
    SUCCESS
} from "../../../actions/dashboard/home/types";
import {Constant} from "../../../helper/constant";
import {isArray, isString} from "../../../helper/Utility";
import I18N from "../../../helper/translation";
import {deepCopy} from "../../../base/hook/app_hook";

/**
 * @author Vipin Joshi.
 * @since 09-12-2021.
 * @description dashboard home initial default state.
 */
const INITIAL_STATE = {
    loading: false,
    categoryLoading: false,
    productLoading: false,
    customerLoading: false,
    paymentMethodsLoading: false,
    loadingMessage: undefined,
    error: undefined,

    taxList: [],
    uomList: [],
    search: undefined,
    selectedCategory: undefined,
    products: [],
    favouriteProducts: [],
    filteredProducts: [],
    cartProducts: [],
    cartSelectedProduct: undefined,
    cartSelectedProductIndex: -1,
    breadCrumb: [{
        id: -1,
        name: I18N.t('DefaultCategoryBreadCrumb')
    }],
    productCategories: [],
    filteredProductCategories: [],
    productListPerPage: 20,

    isQuantitySelected: false,
    isPriceSelected: false,
    isDiscountSelected: false,
    isDecimalSelected: false,
    isComplimentarySelected: false,

    availableProductDiscount: [],
    totalCartPrice: 0,
    totalAppliedDiscountPrice: 0,
    favouriteProductEnable: false,

    showPurposeDialog: false,
    purpose: '',
    howDoYouKnowAboutUs: '',
    typeOfPlantation: '',
    farmLandArea: '',
    showPurposeSelectionDialog: false,
    limit50Products: false
}

/**
 * @author Vipin Joshi.
 * @since 09-12-2021.
 * @description Dashboard Home state handler.
 * @see INITIAL_STATE
 */
const DashboardHomeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING: {
            return {
                ...state,
                loading: action.payload.data,
                loadingMessage: action.payload.message,
            }
        }
        case CATEGORY_LOADING: {
            return {
                ...state,
                categoryLoading: action.payload.data,
                loadingMessage: action.payload.message,
            }
        }
        case PRODUCT_LOADING: {
            return {
                ...state,
                productLoading: action.payload.data,
                loadingMessage: action.payload.message,
            }
        }
        case CUSTOMER_LOADING: {
            return {
                ...state,
                customerLoading: action.payload.data,
                loadingMessage: action.payload.message,
            }
        }
        case PAYMENT_METHODS_LOADING: {
            return {
                ...state,
                paymentMethodsLoading: action.payload.data,
                loadingMessage: action.payload.message,
            }
        }
        case ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case SUCCESS: {
            return {
                ...state,
                error: undefined
            }
        }
        case SET_TAX_LIST: {
            return {
                ...state,
                taxList: [...action.payload],
            }
        }
        case SET_UOM_LIST: {
            return {
                ...state,
                uomList: [...action.payload],
            }
        }
        case SET_PRODUCTS: {
            return {
                ...state,
                products: [...action.payload],
                filteredProducts: [...action.payload]
            }
        }
        case SET_PRODUCT_CATEGORIES: {
            return {
                ...state,
                productCategories: [...action.payload],
                filteredProductCategories: [...action.payload]
            }
        }
        case FILTER_PRODUCTS: {
            return filterProducts(state, action);
        }
        case ADD_PRODUCT_TO_CART: {
            return addProductToCart(state, action);
        }
        case SET_CART_PRODUCTS: {
            const cartProducts = [...action.payload]
            return {
                ...state,
                cartProducts,
                cartSelectedProductIndex: (cartProducts.length > 0) ? 0 : INITIAL_STATE.cartSelectedProductIndex,
            }
        }
        case CLEAR_PRODUCT_CART: {
            return {
                ...state,
                cartProducts: INITIAL_STATE.cartProducts,
                cartSelectedProductIndex: INITIAL_STATE.cartSelectedProductIndex,
                availableProductDiscount: INITIAL_STATE.availableProductDiscount
            }
        }
        case SELECT_CART_PRODUCT: {
            const {product, index} = action.payload;
            return {
                ...state,
                cartSelectedProduct: product,
                cartSelectedProductIndex: index
            }
        }
        case SELECT_CART_FEATURE_ACTION: {
            const {quantity, price, discount, decimal, complimentary} = action.payload
            return {
                ...state,
                isComplimentarySelected: complimentary,
                isQuantitySelected: quantity,
                isPriceSelected: price,
                // isDiscountSelected: discount,
                isDecimalSelected: decimal
            }
        }
        case PRESS_CART_FEATURE_NUMERIC_KEY: {
            return pressCartFeatureNumericKey(state, action);
        }
        case PRESS_CART_FEATURE_DELETE_KEY: {
            return pressCartFeatureDeleteKey(state, action);
        }
        case SHOW_AVAILABLE_PRODUCT_DISCOUNT_DIALOG: {
            return {
                ...state,
                isDiscountSelected: !state.isDiscountSelected,
            }
        }
        case SET_AVAILABLE_PRODUCT_DISCOUNT: {
            const purpose = state.purpose
            return {
                ...state,
                availableProductDiscount: purpose ? action.payload : INITIAL_STATE.availableProductDiscount
            }
        }
        case APPLY_CART_PRODUCT_DISCOUNT: {
            return applyCartProductDiscount(state, action);
        }
        case PRESS_PRODUCT_CATEGORY_BREADCRUMB: {
            return pressProductCategoryBreadcrumb(state, action);
        }
        case PRESS_PRODUCT_CATEGORY: {
            return pressProductCategory(state, action);
        }
        case SET_TOTAL_CART_PRICE: {
            return {
                ...state,
                totalCartPrice: action.payload
            }
        }
        case SET_TOTAL_CART_DISCOUNT_PRICE: {
            return {
                ...state,
                totalAppliedDiscountPrice: action.payload
            }
        }
        case RESET_REDUCER_STATE_FOR_NEW_ORDER: {
            return resetReducerStateForNewOrder(state, action)
        }
        case SET_COMPLIMENTARY: {
            return {
                ...state,
                isComplimentarySelected: action.payload,
            }
        }
        case SET_FAVOURITE_PRODUCTS: {
            return {
                ...state,
                favouriteProducts: [...action.payload],
            }
        }
        case ENABLE_FAVOURITE_PRODUCTS: {
            return {
                ...state,
                favouriteProductEnable: !state.favouriteProductEnable
            }
        }
        case FILTER_FAVOURITE_PRODUCTS: {
            return filterFavouriteProducts(state, action)
        }
        case SET_LIMIT_50: {
            return {
                ...state,
                limit50Products: action.payload
            }
        }
        case SET_PURPOSE: {
            const purpose = action.payload
            return {
                ...state,
                purpose,
                showPurposeDialog: false,
            }
        }
        case RESET_PURPOSE: {
            return {
                ...state,
                purpose: INITIAL_STATE.purpose,
            }
        }
        case SHOW_PURPOSE_DIALOG: {
            return {
                ...state,
                showPurposeDialog: !state.showPurposeDialog
            }
        }
        case RESET_FARM_DETAILS: {
            return {
                ...state,
                howDoYouKnowAboutUs: INITIAL_STATE.howDoYouKnowAboutUs,
                typeOfPlantation: INITIAL_STATE.typeOfPlantation,
                farmLandArea: INITIAL_STATE.farmLandArea
            }
        }
        case SET_FARM_DETAILS: {
            const {howDoYouKnowAboutUs, typeOfPlantation, farmLandArea} = action.payload
            return {
                ...state,
                howDoYouKnowAboutUs: howDoYouKnowAboutUs,
                typeOfPlantation: typeOfPlantation,
                farmLandArea: farmLandArea
            }
        }
        default: {
            return state;
        }
    }
}


/**
 * @author Lovesh Singh.
 * @since 23-05-2022.
 * @description to filter products for general purpose.
 * @returns {*} updated state.
 * @param products
 */
const filterProductsForGeneral = (products: []): [] => products.filter((product) => product.pos_categ_id !== 1)


/**
 * @author Lovesh Singh.
 * @since 02-05-2022.
 * @description to filter favourite products.
 * @param state current reducer state.
 * @param action current reducer action.
 */
const filterFavouriteProducts = (state, action): any => {
    let existingFavProducts = [...state.favouriteProducts]
    let allProducts = [...state.products]
    let filteredProducts = [...state.filteredProducts]
    let productsAfterFav

    let productsAfterRemoveFav = [...filteredProducts.filter((el) => !existingFavProducts.some(fav => fav?.id === el?.id))]
    productsAfterFav = [].concat(existingFavProducts, productsAfterRemoveFav);


    if (action.payload) {
        filteredProducts.sort((a, b) => productsAfterFav.indexOf(a) - productsAfterFav.indexOf(b));
    } else {
        filteredProducts.sort((a, b) => allProducts.indexOf(a) - allProducts.indexOf(b));
    }

    return {
        ...state,
        filteredProducts: filteredProducts,
    }
}

/**
 * @author Vipin Joshi.
 * @since 18-01-2022.
 * @description to reset reducer state for placing new orders.
 * @param state current reducer state.
 * @param action current reducer action.
 */
const resetReducerStateForNewOrder = (state, action): void => {
    return {
        ...state,
        cartProducts: INITIAL_STATE.cartProducts,
        cartSelectedProduct: INITIAL_STATE.cartSelectedProduct,
        cartSelectedProductIndex: INITIAL_STATE.cartSelectedProductIndex,
        showPurposeDialog: INITIAL_STATE.showPurposeDialog,
        purpose: INITIAL_STATE.purpose,
        howDoYouKnowAboutUs: INITIAL_STATE.howDoYouKnowAboutUs,
        typeOfPlantation: INITIAL_STATE.typeOfPlantation,
        farmLandArea: INITIAL_STATE.farmLandArea,
        showPurposeSelectionDialog: INITIAL_STATE.showPurposeSelectionDialog,
    }
}

/**
 * @author Vipin Joshi.
 * @since 15-12-2021.
 * @description to filter products.
 * @param state current reducer state.
 * @param action current reducer action.
 */
const filterProducts = (state, action): any => {
    const {search, category, purpose} = action.payload
    let filteredProducts = [...state.products] // if search cleared than filtered product must have initially loaded products.

    if (search) {
        filteredProducts = filterProductBySearch(filteredProducts, search)
    }

    if (category) { // if category comes than filter products by selected category.
        if (category.id !== -1) {
            filteredProducts = filterProductByCategory(filteredProducts, category)
        }
    }

    if (purpose === "general") {
        filteredProducts = filterProductsForGeneral(filteredProducts)
    }

    return {
        ...state,
        search: search,
        filteredProducts: filteredProducts
    }
}

/**
 * @author Vipin Joshi.
 * @since 04-01-2022.
 * @description to filter products by passed search string.
 * @param products source products.
 * @param search filter string.
 */
const filterProductBySearch = (products: [], search: string): [] => products.filter((product) => product.display_name.toLowerCase().includes(search.toLowerCase()))

/**
 * @author Vipin Joshi.
 * @since 04-01-2022.
 * @description to filter products by passed category.
 * @param products source products.
 * @param category filter category.
 */
const filterProductByCategory = (products: [], category: any): [] => products.filter((product) => product.pos_categ_id === category.id)

/**
 * @author Vipin Joshi.
 * @since 03-01-2022.
 * @description to handle product category breadcrumb press event.
 * @param state current reducer state.
 * @param action current reducer action.
 */
const pressProductCategoryBreadcrumb = (state, action): any => {
    const {breadCrumb, index} = action.payload

    const existingProducts = [...state.products]
    let productCategories = []
    let filteredProducts = existingProducts


    const search = state.search
    if (search) {
        filteredProducts = filterProductBySearch(filteredProducts, search)
    }

    if (breadCrumb.id !== -1) {
        filteredProducts = filterProductByCategory(filteredProducts, breadCrumb)

        let lastBreadCrumbChildCategories = breadCrumb.child_id
        if (isString(lastBreadCrumbChildCategories)) {
            lastBreadCrumbChildCategories = JSON.parse(lastBreadCrumbChildCategories)
        }

        if (isArray(lastBreadCrumbChildCategories)) {
            productCategories.push(...lastBreadCrumbChildCategories)
        }

    } else { // if default breadcrumb press than add all existing product categories.
        productCategories = [...state.productCategories]
    }

    const newBreadcrumb = state.breadCrumb.slice(0, index + 1) // remove all next breadcrumbs from the clicked one

    return {
        ...state,
        breadCrumb: newBreadcrumb,
        filteredProducts: filteredProducts,
        filteredProductCategories: productCategories,
        selectedCategory: breadCrumb
    }
}

/**
 * @author Vipin Joshi.
 * @since 03-01-2022.
 * @description to handle product category press event.
 * @param state current reducer state.
 * @param action current reducer action.
 */
const pressProductCategory = (state, action): any => {
    const {category, index} = action.payload
    const purpose = state.purpose

    const existingBreadcrumbs = [...state.breadCrumb]
    let filteredProducts = [...state.products]
    const newCategories = []

    const search = state.search;
    if (search) {
        filteredProducts = filterProductBySearch(filteredProducts, search)
    }

    if (purpose === "general") {
        filteredProducts = filteredProducts.filter((product) => product.pos_categ_id !== 1)
    }

    filteredProducts = filterProductByCategory(filteredProducts, category)
    existingBreadcrumbs.push(category)

    let lastBreadCrumbChildCategories = existingBreadcrumbs[existingBreadcrumbs.length - 1].child_id
    if (isString(lastBreadCrumbChildCategories)) {
        lastBreadCrumbChildCategories = JSON.parse(lastBreadCrumbChildCategories)
    }
    newCategories.push(...lastBreadCrumbChildCategories)

    return {
        ...state,
        breadCrumb: existingBreadcrumbs,
        filteredProducts: filteredProducts,
        filteredProductCategories: newCategories,
        selectedCategory: category
    }
}

/**
 * @author Vipin Joshi.
 * @since 15-12-2021.
 * @description to add product to the cart.
 * @param state current reducer state.
 * @param action current reducer action.
 */
const addProductToCart = (state, action): any => {
    const product = action.payload
    let cartQty = Constant.DEFAULT_PRODUCT_CART_QTY
    let selectedIndex = state.cartSelectedProductIndex;
    const purpose = state.purpose
    let totalCartQty = 0
    let limit50Products = state.limit50Products
    let showPurposeDialog = state.showPurposeDialog
    let cartSelectedProduct = state.cartSelectedProduct
    const productCustomDiscount = JSON.parse(product?.pos_custom_discount_id)

    const existingCartProducts: [] = [...state.cartProducts]
    const existingCarts = deepCopy(existingCartProducts)
    const existingSameProduct = existingCartProducts.find(item => item.id === product.id)

    if (purpose){

        if (existingSameProduct) { // if product already exist in cart than increase existing quantity by 1..
            cartQty = +existingSameProduct.cartQty + 1
            existingSameProduct.cartQty = cartQty

            const index = existingCartProducts.indexOf(existingSameProduct)
            existingCartProducts[index] = {...existingSameProduct} //update product on cart.
            selectedIndex = index

        } else {
            const newCartProduct = {...product}
            newCartProduct.applied_discount_value = 0
            newCartProduct.cartQty = cartQty
            existingCartProducts.push(newCartProduct)
            selectedIndex = existingCartProducts.length - 1
        }

        if (purpose === "home") {
            existingCarts.forEach(product => {
                totalCartQty += +product?.cartQty
            })

            limit50Products = totalCartQty >= 50
        }

        cartSelectedProduct = product

        if (productCustomDiscount?.discount && purpose === "farmland" && product?.unit_price >= productCustomDiscount?.discount) {
            let selectedProduct = existingCartProducts[selectedIndex]
            selectedProduct.applied_discount_value = +productCustomDiscount?.discount
            existingCartProducts[selectedIndex] = selectedProduct
            cartSelectedProduct = selectedProduct
        }

    } else{
        showPurposeDialog = true
    }

    console.log("Limit 50: ", limit50Products)

    // Toasts.show(appendString(product.display_name, StringConstants.addedToCart, StringConstants.space))
    return {
        ...state,
        limit50Products,
        cartProducts: limit50Products ? existingCarts : existingCartProducts,
        cartSelectedProduct: limit50Products ? state.cartSelectedProduct : cartSelectedProduct,
        cartSelectedProductIndex: limit50Products ? state.cartSelectedProductIndex : selectedIndex,
        showPurposeDialog: showPurposeDialog
    };
}

/**
 * @author Vipin Joshi.
 * @since 23-12-2021.
 * @description to handle cart keypad[0-9] press event.
 * @param state current reducer state.
 * @param action current reducer action.
 */
const pressCartFeatureNumericKey = (state, action): any => {
    const response = {...state}
    const existingCartProducts = [...state.cartProducts]
    const existingCarts = deepCopy(existingCartProducts)
    const selectedCartProductIndex = state.cartSelectedProductIndex
    const purpose = state.purpose
    let limit50Products = state.limit50Products
    let totalCartQty = 0

    if (existingCartProducts.length > 0 && selectedCartProductIndex > -1) {
        const value = action.payload;
        const selectedCartProduct = {...existingCartProducts[selectedCartProductIndex]}

        if (state.isQuantitySelected) {
            let cartQty = +selectedCartProduct.cartQty
            if (state.isDecimalSelected) {
                //Note: Uncomment if-else block for enabling decimal quantity feature
                /*if (Number.isInteger(cartQty)) {
                    cartQty = parseFloat(cartQty + '.' + value)
                } else {
                    const totalDecimalDigits = getValueAfterDecimal(cartQty).length
                    // if decimal has already 3 digits.
                    if (totalDecimalDigits < 3) { // length start from 0 index onwards.
                        cartQty = parseFloat(cartQty).toString() + value
                    }
                }*/
            } else {
                if (Number.isInteger(cartQty)) {
                    cartQty = cartQty.toString() + value.toString()
                }
                //Note: Uncomment else block for enabling decimal quantity feature
                /*else {
                    cartQty = parseInt(cartQty).toString() + value + '.' + getValueAfterDecimal(cartQty) // .___
                }*/
            }

            selectedCartProduct.cartQty = +parseFloat(cartQty).toFixed(3) // make sure than decimal doesn't exceed 3 digits.

            existingCartProducts[selectedCartProductIndex] = selectedCartProduct

            if (purpose === "home") {
                existingCartProducts.forEach(product => {
                    totalCartQty += +product?.cartQty
                })

                limit50Products = totalCartQty > 50
            }

            response.cartProducts = limit50Products ? existingCarts : existingCartProducts
            response.limit50Products = limit50Products
            return response
        }
    }
    return response
}

/**
 * @author Vipin Joshi.
 * @since 23-12-2021.
 * @description to handle cart keypad delete key press event.
 * @param state current reducer state.
 * @param action current reducer action.
 */
const pressCartFeatureDeleteKey = (state, action): any => {
    const response = {...state}

    const existingCartProducts = [...state.cartProducts]
    const selectedCartProductIndex = state.cartSelectedProductIndex
    if (existingCartProducts.length > 0 && selectedCartProductIndex > -1) {

        const selectedCartProduct = {...existingCartProducts[selectedCartProductIndex]}

        if (state.isQuantitySelected) {
            const cartQty = +selectedCartProduct.cartQty
            if (cartQty === 0) {
                // exclude selected product from existing cart products.
                const filteredCartProducts = existingCartProducts.filter(cartProduct => cartProduct.id !== selectedCartProduct.id)

                // change item selection.
                let cartSelectedProductNewIndex = INITIAL_STATE.cartSelectedProductIndex
                let newCartSelectedProduct = INITIAL_STATE.cartSelectedProduct
                if (filteredCartProducts.length > 0) {
                    cartSelectedProductNewIndex = selectedCartProductIndex - 1
                    newCartSelectedProduct = filteredCartProducts[cartSelectedProductNewIndex]
                }

                response.cartProducts = filteredCartProducts
                response.cartSelectedProductIndex = cartSelectedProductNewIndex
                response.cartSelectedProduct = newCartSelectedProduct
                return response
            } else {
                //if decimal is selected than remove digits one by one, otherwise skip decimals than remove
                const qtyString = (state.isDecimalSelected ? cartQty : parseInt(cartQty)).toString()
                selectedCartProduct.cartQty = +qtyString.substring(0, qtyString.length - 1)

                existingCartProducts[selectedCartProductIndex] = selectedCartProduct
                response.cartProducts = existingCartProducts
                return response
            }
        }
    }

    return response
}

/**
 * @author Vipin Joshi.
 * @since 29-12-2021.
 * @description to handle cart keypad discount button key press event.
 * @param state current reducer state.
 * @param action current reducer action.
 */
const showAvailableProductDiscountDialog = (state, action): any => {
    const {show, availableDiscount} = action.payload

    return {
        ...state,
        isQuantitySelected: false,
        isPriceSelected: false,
        isDecimalSelected: false,
        isDiscountSelected: !state.isDiscountSelected,
        availableProductDiscount: availableDiscount
    }
}

/**
 * @author Vipin Joshi.
 * @since 29-12-2021.
 * @description to apply cart product discount.
 * @param state current reducer state.
 * @param action current reducer action.
 */
const applyCartProductDiscount = (state, action): any => {
    const existingCartProducts = [...state.cartProducts]
    const selectedCartProductIndex = state.cartSelectedProductIndex
    const appliedDiscount = action.payload
    const selectedCartProduct = {...existingCartProducts[selectedCartProductIndex]}


    if (existingCartProducts.length > 0 && selectedCartProductIndex > -1) {

        if (selectedCartProduct.applied_discount_value === +appliedDiscount?.discount) {
            selectedCartProduct.applied_discount_value = 0
        } else {
            selectedCartProduct.applied_discount_value = +appliedDiscount?.discount
        }
        existingCartProducts[selectedCartProductIndex] = selectedCartProduct
    }

    return {
        ...state,
        // isDiscountSelected: false,
        cartSelectedProduct: selectedCartProduct,
        cartProducts: existingCartProducts
    }
}

export default DashboardHomeReducer
