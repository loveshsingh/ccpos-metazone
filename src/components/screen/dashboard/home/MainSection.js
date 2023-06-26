import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ProductGrid from "./ProductGrid";
import {
    addProductToCart, addProductToCartWithDiscount, enableFavouriteProducts, filterFavouriteProducts,
    onProductCategoryBreadCrumbPress,
    onProductCategoryPress
} from "../../../../actions/dashboard/home";
import {AppColors} from "../../../../assets/AppColors";
import ProductCategoryBreadcrumb from "./ProductCategoryBreadcrumb";
import ProductCategoryList from "./ProductCategoryList";
import AppCategoryProgress from "../../progress-loader/AppCategoryProgress";
import AppProductsProgress from "../../progress-loader/AppProductsProgress";
import ProductDiscountDialog from "./ProductDiscountDialog";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import AppText from "../../../lib/AppText";
import {AppFonts} from "../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../helper/Utility";
import I18N from "../../../../helper/translation";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import ProductThemeProvider from "../../../../base/theme contexts/ProductThemeProvider";
import {useTheme} from "../../../../base/contexts/ThemeProvider";
import {Constant} from "../../../../helper/constant";


/**
 * @author Vipin Joshi.
 * @since 13-12-2021.
 * @return {JSX.Element}
 * @description Dashboard home screen main section.
 */
const MainSection = ({showCartSection}): JSX.Element => {

    const TAG = "MainSection"
    console.log(TAG, 'Rendering')

    const filteredProducts = useSelector((state: any) => state.dashboardHomeReducer.filteredProducts)
    const activeSessionDetails = useSelector((state: any) => state.authReducer.sessionDetails)
    const productCategoryBreadCrumb = useSelector((state: any) => state.dashboardHomeReducer.breadCrumb)
    const productCategories = useSelector((state: any) => state.dashboardHomeReducer.filteredProductCategories)
    const categoryLoadingVisible = useSelector((state: any) => state.dashboardHomeReducer.categoryLoading)
    const productLoadingVisible = useSelector((state: any) => state.dashboardHomeReducer.productLoading)
    const discountVisible: boolean = useSelector((state: any) => state.dashboardHomeReducer.isDiscountSelected)
    const favouriteProductEnable: boolean = useSelector((state: any) => state.dashboardHomeReducer.favouriteProductEnable)
    const discountAnimation = useRef(new Animated.Value(0)).current
    const dispatch = useDispatch()
    const {locale} = useLocale()
    const {theme} = useTheme()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    }, [locale])


    useEffect(() => {
        Animated.timing(discountAnimation, {
            toValue: showCartSection ? (discountVisible ? 1 : 0) : 0,
            duration: Constant.ANIMATION_DURATION,
            useNativeDriver: false
        }).start()
    }, [discountVisible, showCartSection])

    useEffect(() => {
        const initFavProducts = async ():void => {
            if (favouriteProductEnable)
                dispatch(filterFavouriteProducts(favouriteProductEnable))
            else
                dispatch(filterFavouriteProducts(false))
        }
        initFavProducts()
    }, [favouriteProductEnable, productCategoryBreadCrumb])

    /**
     * @author Lovesh Singh.
     * @since 28-04-2022.
     * @description on fav press event handler.
     */
    const onPressFav = (): void => {
        dispatch(enableFavouriteProducts())
    }

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021.
     * @description on product card press event handler.
     * @param product selected product.
     */
    const onPressProduct = (product): void => {
        console.log(TAG, 'Product Pressed:', JSON.stringify(product))
        console.log(TAG, JSON.stringify(activeSessionDetails))
        dispatch(addProductToCartWithDiscount(product))
    }

    /**
     * @author Vipin Joshi.
     * @since 03-01-2022.
     * @description on category press event handler.
     * @param category selected category.
     * @param index selected category index.
     */
    const onPressCategory = (category, index): void =>
        dispatch(onProductCategoryPress({
            category: category,
            index: index
        }))

    /**
     * @author Vipin Joshi.
     * @since 03-01-2022.
     * @description on breadCrumb press event handler.
     * @param breadCrumb selected breadCrumb.
     * @param index selected breadCrumb index.
     */
    const onPressBreadCrumb = (breadCrumb, index): void =>
        dispatch(onProductCategoryBreadCrumbPress({
            breadCrumb: breadCrumb,
            index: index
        }))

    return (
        <View style={styles.container}>

            <View style={[styles.innerContainer, {
                display: !categoryLoadingVisible ? 'flex' : 'none',
                borderBottomColor: theme?.secondaryColor,
                backgroundColor: theme?.secondaryBackgroundColor,
            }]}>
                <AppTouchableOpacity style={[styles.favouriteProductButton, {backgroundColor: theme?.secondaryBackgroundColor, borderLeftColor: theme?.secondaryColor,}]} onPress={onPressFav}>
                    <View style={{flexDirection: 'row'}}>
                        <AppText text={I18N.t('FavouriteButtonLabel')}
                                 style={[styles.favouriteButtonText, {color: favouriteProductEnable ? theme?.secondaryColor : theme?.textColor}]}/>
                        <AppIcon name={'arrowdown'} type={Icons.AntDesign}
                                 color={favouriteProductEnable ? theme?.secondaryColor : theme?.textColor}
                                 size={getDynamicFontSize(18)}
                                 style={{marginLeft: 5, marginTop: 3}}
                        />
                    </View>
                </AppTouchableOpacity>
                {/*Product Category Container*/}
                <View style={[styles.productCategoryContainer, {backgroundColor: theme?.secondaryBackgroundColor}]}>
                    {/* Product Category BreadCrumb View*/}
                    <View
                        style={[styles.categoryBreadcrumbContainer, {display: productCategoryBreadCrumb.length > 1 ? 'flex' : 'none'}]}>
                        <ProductCategoryBreadcrumb data={productCategoryBreadCrumb} onPress={onPressBreadCrumb}/>
                    </View>

                    {/*Product Category List View*/}
                    <View style={[styles.categoryContainer, {display: productCategories.length > 0 ? 'flex' : 'none'}]}>
                        <ProductCategoryList data={productCategories} onPress={onPressCategory}/>
                    </View>
                </View>
            </View>
            <AppCategoryProgress visible={categoryLoadingVisible} totalItems={3} itemsDirection={"row"}/>

            {/*Product List*/}
            <ProductThemeProvider>
            <View style={[styles.productGridContainer, {display: !productLoadingVisible ? 'flex' : 'none'}]}>
                <Animated.View style={{
                    width: discountAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["100%", "50%"],
                    }),
                }}>
                        <ProductGrid data={filteredProducts} onProductPress={onPressProduct}/>
                </Animated.View>
                <Animated.View
                    style={{
                        width: discountAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "50%"],
                        }),
                    }}>
                    <ProductDiscountDialog/>
                </Animated.View>
            </View>
            <AppProductsProgress visible={productLoadingVisible} totalItems={1} listColumns={1}/>
            </ProductThemeProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, width: '100%'},
    innerContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
    },
    productCategoryContainer: {
        width: '72%'
    },
    categoryBreadcrumbContainer: {
        width: '100%',
        // backgroundColor: AppColors.platinum
    },
    categoryContainer: {
        // backgroundColor: AppColors.platinum,
        width: '100%'
    },
    productGridContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row'
    },
    favouriteProductButton: {
        width: getDynamicFontSize(180),
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 2,
    },
    favouriteButtonText: {
        fontSize: getDynamicFontSize(16),
        fontFamily: AppFonts.bold
    }
})

export default React.memo(MainSection, (prevProps, nextProps) => {
    return prevProps.showCartSection === nextProps.showCartSection
});
