import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ProductCartList from "./ProductCartList";
import {selectCartProduct, setTotalAppliedDiscountPrice, setTotalCartPrice} from "../../../../actions/dashboard/home";
import I18N from "../../../../helper/translation";
import {AppColors} from "../../../../assets/AppColors";
import AppText from "../../../lib/AppText";
import {AppFonts} from "../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../helper/Utility"
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useCartListTheme} from "../../../../base/theme contexts/CartListThemeProvider";
import {useTheme} from "../../../../base/contexts/ThemeProvider";

/**
 * @author Vipin Joshi.
 * @since 13-01-2022.
 * @description Wrapper Component for home screen Cart List hold cart list with total amount.
 * @return {JSX.Element}
 * @param readonly true/ false by passing true will disable all ui interactions.
 * @param cartProducts cart products details have to show.
 * @param isComplimentarySelected true entire cart amount will be 0.
 * @param showCartSection
 */
const CartListWrapper = ({cartProducts, isComplimentarySelected, readonly}): JSX.Element => {

    const TAG = 'CartListWrapper'
    const sessionDetails = useSelector((state: any) => state.authReducer.sessionDetails)
    const dispatch = useDispatch()
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    // const {cartListTheme} = useCartListTheme()
    const {theme} = useTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description cart product press event handler.
     * @param product pressed product.
     * @param index pressed product index.
     */
    const onPressCartProduct = (product, index) => dispatch(selectCartProduct({product: product, index: index}))

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description return total Items string with count.
     * @return {string}
     */
    const getFormattedTotalItemsCount = (): string => {
        const totalItems = parseFloat(+cartProducts?.length.toFixed(sessionDetails.currencyDecimalPlaces))
        return (`${I18N.t('ItemsLabel')}${totalItems}`)
    }

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description return total cart item price.
     * @return {string}
     */
    const getFormattedTotalCartItemPrice = (): string => {
        const currencyDecimalPlaces = sessionDetails.currencyDecimalPlaces

        let totalValue = 0.00
        let totalDiscount = 0.00

        if (!isComplimentarySelected) {
            cartProducts.forEach(product => {
                let totalToAdd = +((product.cartQty * (product.price_tax_inclusive - product.applied_discount_value)).toFixed(currencyDecimalPlaces))
                totalValue += totalToAdd

                let appliedDiscount = +((product.cartQty * (product.applied_discount_value)).toFixed(currencyDecimalPlaces))
                totalDiscount += appliedDiscount
            })
            totalValue = +(totalValue.toFixed(currencyDecimalPlaces))
            totalDiscount = +(totalDiscount.toFixed(currencyDecimalPlaces))
        }

        dispatch(setTotalCartPrice(totalValue)) //todo find better place for calculating cart price & their discount
        dispatch(setTotalAppliedDiscountPrice(totalDiscount))


        if (sessionDetails.currencyPosition === 'before') {
            totalValue = sessionDetails.currencySymbol + totalValue
        } else {
            totalValue = totalValue + sessionDetails.currencySymbol
        }
        return (I18N.t('TotalLabel') + totalValue)
    }

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description return total Cart Items quantity.
     * @return {string}
     */
    const getFormattedTotalCartItemQty = (): string => {
        let totalCartQty = 0
        cartProducts.forEach(product => {
            totalCartQty += +product?.cartQty
        })
        return (I18N.t('QuantityLabel') + totalCartQty)
    }

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description return total cart items tax-price.
     * @return {string}
     */
    const getFormattedTotalCartItemTaxPrice = (): string => {
        const currencyDecimalPlaces = sessionDetails.currencyDecimalPlaces;
        let totalWithTaxesValue = 0.00
        let totalWithoutTaxesValue = 0.00

        if (!isComplimentarySelected) {
            cartProducts.forEach(element => {
                let totalToAddWithTaxes = parseFloat((element.cartQty * (element.price_tax_inclusive - element.applied_discount_value)).toFixed(currencyDecimalPlaces))
                let totalToAddWithoutTaxes = parseFloat((element.cartQty * (element.price_tax_exclusive - element.applied_discount_value)).toFixed(currencyDecimalPlaces))
                totalWithTaxesValue = totalWithTaxesValue + totalToAddWithTaxes
                totalWithoutTaxesValue = totalWithoutTaxesValue + totalToAddWithoutTaxes
            })
        }

        let totalTaxes = parseFloat((totalWithTaxesValue - totalWithoutTaxesValue))
        totalTaxes = totalTaxes.toFixed(currencyDecimalPlaces)
        if (sessionDetails.currencyPosition === 'before') {
            totalTaxes = sessionDetails.currencySymbol + totalTaxes
        } else {
            totalTaxes = totalTaxes + sessionDetails.currencySymbol
        }
        return (I18N.t('TaxesLabel') + totalTaxes)
    }

    return (
        <View style={styles.container}>
            {
                cartProducts.length > 0 ? <>
                    <View style={[styles.cartDetailContainer, {backgroundColor: theme?.backgroundColor}]}>
                        <View style={styles.cartDetailViewContainer}>
                            <AppText style={styles.cartItemCountText} text={getFormattedTotalItemsCount()}/>
                            <AppText style={styles.cartItemPriceText} text={getFormattedTotalCartItemPrice()}/>
                        </View>
                        <View style={styles.cartDetailViewContainer}>
                            <AppText style={styles.cartItemQtyText} text={getFormattedTotalCartItemQty()}/>
                            <AppText style={styles.cartItemTaxPriceText} text={getFormattedTotalCartItemTaxPrice()}/>
                        </View>
                    </View>
                </> : null
            }
            <View style={styles.cartListContainer}>
                <ProductCartList data={cartProducts} onProductPress={onPressCartProduct} readOnly={readonly}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column-reverse',
    },
    cartListContainer: {
        flex: 1
    },
    cartDetailContainer: {
        width: '100%',
        alignContent: 'flex-end',
        justifyContent: 'flex-end',
        paddingVertical: 4
    },
    cartDetailViewContainer: {
        flexDirection: 'row'
    },
    cartItemCountText: {
        alignContent: 'flex-start',
        textAlign: 'left',
        paddingHorizontal: 8,
        fontSize: getDynamicFontSize(20),
        flex: 1,
        fontFamily: AppFonts.bold
    },
    cartItemPriceText: {
        alignContent: 'flex-end',
        textAlign: 'right',
        paddingHorizontal: 8,
        fontSize: getDynamicFontSize(20),
        flex: 1,
        fontFamily: AppFonts.bold
    },
    cartItemQtyText: {
        alignContent: 'flex-start',
        textAlign: 'left',
        paddingHorizontal: 8,
        fontSize: getDynamicFontSize(14),
        flex: 1,
        // color: AppColors.davysGrey,
        fontFamily: AppFonts.bold
    },
    cartItemTaxPriceText: {
        alignContent: 'flex-end',
        textAlign: 'right',
        paddingHorizontal: 8,
        fontSize: getDynamicFontSize(14),
        flex: 1,
        // color: AppColors.davysGrey,
        fontFamily: AppFonts.bold
    },
})

export default React.memo(CartListWrapper, (prevProps, nextProps) => {
    return prevProps.cartProducts === nextProps.cartProducts && +prevProps.cartProducts?.length === +nextProps.cartProducts?.length && prevProps.isComplimentarySelected === nextProps.isComplimentarySelected && prevProps.readonly === nextProps.readonly
})
