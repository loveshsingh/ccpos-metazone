import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native'
import {AppColors} from "../../../../assets/AppColors";
import {useDispatch, useSelector} from "react-redux";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import AppText from "../../../lib/AppText";
import I18N from "../../../../helper/translation";
import {applyCartProductDiscount, setProductDiscount} from "../../../../actions/dashboard/home";
import {getDynamicFontSize} from "../../../../helper/Utility";
import AppCard from "../../../lib/AppCard";
import {AppFonts} from "../../../../assets/AppFonts";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useProductTheme} from "../../../../base/theme contexts/ProductThemeProvider";
import AppFlatList from "../../../lib/AppFlatList";

/**
 * @author Vipin Joshi.
 * @since 29-12-2021.
 * @description to render product available discount dialog.
 * @return {JSX.Element}
 */
const ProductDiscountDialog = (): JSX.Element => {

    const visible: boolean = useSelector((state: any) => state.dashboardHomeReducer.isDiscountSelected)
    const availableProductDiscount: [] = useSelector((state: any) => state.dashboardHomeReducer.availableProductDiscount)
    const {
        cartProducts,
        cartSelectedProductIndex,
        cartSelectedProduct,
    } = useSelector((state: any) => state.dashboardHomeReducer)
    const dispatch = useDispatch()
    const {locale} = useLocale()
    const {productTheme} = useProductTheme()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    useEffect(() => {
        dispatch(setProductDiscount(cartSelectedProduct))
    }, [cartSelectedProduct])

    /**
     * @author Vipin Joshi.
     * @since 29-12-2021.
     * @description back button press handler.
     */
    const onRequestClose = (): void => dispatch(setProductDiscount(false))

    /**
     * @author Vipin Joshi.
     * @since 29-12-2021.
     * @description remove discount button press handler, to set 0 discount on a product.
     */
    const onRemoveDiscountPress = (): void => dispatch(applyCartProductDiscount(0))

    /**
     * @author Vipin Joshi.
     * @since 29-12-2021.
     * @description discount press handler, to apply discount to product.
     */
    const onDiscountPress = (discountItem): void => dispatch(applyCartProductDiscount(discountItem))

    /**
     * @author Vipin Joshi.
     * @since 24-12-2021.
     * @description to render discount card.
     */
    const renderDiscountCard = ({item}): JSX.Element => {
        // return <AppTouchableOpacity
        //     style={[styles.discountItem, {backgroundColor: AppColors.buttonBlue}]}
        //     onPress={onDiscountPress.bind(this, item)}>
        //     <AppText style={styles.discountItemText} text={item.name}/>
        // </AppTouchableOpacity>
        return (
            <AppCard
                style={[styles.discountCard, {backgroundColor: cartSelectedProduct?.applied_discount_value === +item?.discount ? productTheme?.primaryColor : productTheme?.backgroundColor}]}
                elevation={12} childrenStyle={styles.cardChildren}>
                <AppTouchableOpacity
                    style={styles.discountCardContainer}
                    onPress={onDiscountPress.bind(this, item)}>
                    <AppIcon name={'new'} type={Icons.Entypo}
                             color={cartSelectedProduct?.applied_discount_value === +item?.discount ? AppColors.white : productTheme?.textColor}
                             size={getDynamicFontSize(60)}/>
                    <AppText
                        style={[styles.discountItemText, {color: cartSelectedProduct?.applied_discount_value === +item?.discount ? AppColors.white : productTheme?.textColor}]}
                        text={item.name} numberOfLines={2}/>
                    <AppIcon name={'checkcircle'} type={Icons.AntDesign}
                             color={cartSelectedProduct?.applied_discount_value === +item?.discount ? productTheme?.secondaryColor : productTheme?.backgroundColor}
                             size={getDynamicFontSize(20)}
                             style={{
                                 position: 'absolute',
                                 right: getDynamicFontSize(-10),
                                 top: getDynamicFontSize(10),
                             }}/>
                </AppTouchableOpacity>
            </AppCard>
        )
    }

    /**
     * @author Vipin Joshi.
     * @since 29-12-2021.
     * @description to render empty discount list card.
     */
    const renderEmptyDiscountListCard = (): JSX.Element => {
        if (cartProducts.length > 0 && cartSelectedProductIndex > -1) {
            return (
                <View style={styles.noDataFoundContainer}>
                    <AppIcon name={'emoticon-sad-outline'} type={Icons.MaterialCommunityIcons} color={productTheme?.textColor}
                             size={getDynamicFontSize(45)}/>
                    <AppText
                        style={[styles.noDataFoundText, {color: productTheme?.textColor}]}
                        text={I18N.t('NoProductDiscountAvailableMsg')}
                    />
                </View>)
        } else {
            return (
                <View style={styles.noDataFoundContainer}>
                    <AppIcon name={'tag'} type={Icons.AntDesign} color={productTheme?.textColor}
                             size={getDynamicFontSize(45)}/>
                    <AppText
                        style={[styles.noDataFoundText, {color: productTheme?.textColor}]}
                        text={I18N.t('SelectProductToApplyDiscountMsg')}
                    />
                </View>
            )
        }
    }

    return (

        <AppFlatList
            scrollEnabled={true}
            numColumns={2}
            columnWrapperStyle={{flexWrap: 'wrap', justifyContent: 'center'}}
            keyExtractor={(item, index) => index.toString()}
            data={availableProductDiscount}
            contentContainerStyle={[styles.listContentContainer, {borderLeftColor: productTheme?.secondaryColor, backgroundColor: productTheme?.backgroundColor}]}
            extraData={availableProductDiscount}
            nestedScrollEnabled={false}
            showsVerticalScrollIndicator={true}
            renderItem={renderDiscountCard}
            ListEmptyComponent={renderEmptyDiscountListCard}/>

    );
}


/**
 * @author Vipin Joshi
 * @since 15-07-2021
 * @description component view styles.
 */
const styles = StyleSheet.create({
    listContentContainer: {
        flexGrow: 1,
        borderLeftWidth: 2,
        // justifyContent: 'center',
    },
    noDataFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    noDataFoundText: {
        fontSize: getDynamicFontSize(18),
        textAlign: "center",
        // color: AppColors.arsenic,
        paddingHorizontal: 20,
        fontFamily: AppFonts.bold
    },
    discountItem: {
        borderRadius: 10,
        padding: 15,
        elevation: 2,
        margin: 8
    },
    discountItemText: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: getDynamicFontSize(18),
        marginTop: getDynamicFontSize(10)
    },
    discountCard: {
        width: getDynamicFontSize(140),
        height: getDynamicFontSize(200),
        margin: getDynamicFontSize(5),
        alignItems: 'center',
        borderColor: AppColors.chineseWhite,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
    },
    cardChildren: {
        paddingHorizontal: 0,
        paddingBottom: 0
    },
    discountCardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default React.memo(ProductDiscountDialog, () => true)
