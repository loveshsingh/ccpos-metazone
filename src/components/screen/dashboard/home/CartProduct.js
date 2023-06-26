import React, {useEffect, useState} from "react";
import {Animated, StyleSheet, View} from "react-native";
import {isString, getDynamicFontSize} from "../../../../helper/Utility";
import AppText from "../../../lib/AppText";
import {useSelector} from "react-redux";
import {AppColors} from "../../../../assets/AppColors";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import AppTouchableWithoutFeedback from "../../../lib/AppTouchableWithoutFeedback";
import {AppFonts} from "../../../../assets/AppFonts";
import I18N from "../../../../helper/translation";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useCartListTheme} from "../../../../base/theme contexts/CartListThemeProvider";
import {Constant} from "../../../../helper/constant";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description Cart Product Component.
 * @since 17-12-2021
 */
const CartProduct = ({data, index, onProductPress, readOnly}): JSX.Element => {

    const TAG = "CartProduct"

    console.log(TAG, 'Rendering')

    const [product, setProduct] = useState(data)
    const [productIndex, setProductIndex] = useState(index)
    const cartAnimate = useState(new Animated.Value(0))[0]
    const cartTransformAnimate = useState(new Animated.Value(-15))[0]
    const sessionDetails = useSelector((state: any) => state.authReducer.sessionDetails)
    const uomList = useSelector((state: any) => state.dashboardHomeReducer.uomList)

    const selectedProductIndex = useSelector((state: any) => state.dashboardHomeReducer.cartSelectedProductIndex);
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {cartListTheme} = useCartListTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    useEffect(() => {
        setProduct(data)
        setProductIndex(index)
        Animated.timing(cartAnimate, {
            toValue: 1,
            duration: Constant.ANIMATION_DURATION,
            useNativeDriver: true
        }).start();
        Animated.timing(cartTransformAnimate, {
            toValue: 0,
            duration: Constant.ANIMATION_DURATION,
            useNativeDriver: true
        }).start();
    }, [data, index])

    const ItemContainer = readOnly ? AppTouchableWithoutFeedback : AppTouchableOpacity
    const itemBackgroundColor = (productIndex === selectedProductIndex && !readOnly ? cartListTheme?.selectionBackgroundColor : cartListTheme?.backgroundColor)
    const itemTextColor = (productIndex === selectedProductIndex && !readOnly ? cartListTheme?.selectionTextColor : cartListTheme?.textColor)

    /**
     * @author Vipin Joshi.
     * @since 16-12-2021.
     * @description product press event handler.
     */
    const onPressProduct = (): void => onProductPress?.call(this, product, index)

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description to get formatted discount applied text.
     * @param discount amount.
     * @return {string}
     */
    const getCartItemDiscountLineText = (discount): string => {
        let discountString = discount
        if (+discountString === 0) {
            return ''
        }

        if (isString(discount)) {
            discountString = parseFloat(discount).toFixed(sessionDetails.currencyDecimalPlaces)
        }

        if (sessionDetails.currencyPosition === 'before') {
            discountString = sessionDetails.currencySymbol + discountString
        } else {
            discountString = discountString + sessionDetails.currencySymbol
        }

        return `${I18N.t('CartItemDiscountTextBefore')}${discountString}${I18N.t('CartItemDiscountTextAfter')}`
    }

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description to get cart Item below line text showing product quantity with tax-info.
     * @param product selected product.
     * @return {string}
     */
    const getCartItemSecondLineText = (product): string => {
        const uomToUse = uomList.find(item => item.id === product.uom_id)
        if (uomToUse) {
            const uomName = uomToUse.name
            return product.cartQty + uomName + I18N.t('AtLabel') + getFormattedPriceForDisplay(product.price_tax_exclusive) + I18N.t('SlashSymbol') + uomName
        }
        return product.cartQty + I18N.t('CartItemDiscountSecondTextBefore') + getFormattedPriceForDisplay(product.price_tax_exclusive) + I18N.t('CartItemDiscountSecondTextAfter') + getCartItemDiscountLineText(product.applied_discount_value)
    }

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021.
     * @description to format product price for display.
     * @param price actual price.
     * @return formatted price.
     */
    const getFormattedPriceForDisplay = (price): string => {
        let priceToReturn = price
        if (isString(priceToReturn)) {
            priceToReturn = parseFloat(priceToReturn).toFixed(sessionDetails.currencyDecimalPlaces)
        }
        if (sessionDetails.currencyPosition === 'before') {
            priceToReturn = sessionDetails.currencySymbol + priceToReturn
        } else {
            priceToReturn = priceToReturn + sessionDetails.currencySymbol
        }
        return priceToReturn
    }

    return (
        <Animated.View style={{
            opacity: cartAnimate, transform: [
                {translateY: cartTransformAnimate },
            ],
        }}>
            <ItemContainer onPress={onPressProduct}>
                <View
                    style={[styles.container, {backgroundColor: itemBackgroundColor}]}>
                    <View style={styles.nameContainer}>
                        <AppText style={[styles.nameText, {color: itemTextColor}]} text={product.display_name}/>
                        <View style={styles.cartDetailContainer}>
                            <AppText style={[styles.cartDetailText, {color: itemTextColor}]} text={getCartItemSecondLineText(product)}/>
                            {'applied_discount_value' in product ? <AppText style={[styles.cartDetailText, {color: itemTextColor}]}
                                                                            text={getCartItemDiscountLineText(product.applied_discount_value)}/> : null}
                        </View>
                    </View>
                    <View>
                        <AppText
                            style={[styles.priceText, {color: itemTextColor}]}
                            text={getFormattedPriceForDisplay(((product.price_tax_exclusive - product.applied_discount_value) * product.cartQty).toFixed(sessionDetails.currencyDecimalPlaces))}
                        />
                    </View>
                </View>
            </ItemContainer>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.americanSilver
    },
    priceText: {
        textAlign: 'center',
        fontSize: getDynamicFontSize(18),
        fontFamily: AppFonts.regular
    },
    nameContainer: {
        marginRight: 8,
        flex: 1,
        justifyContent: 'flex-start'
    },
    nameText: {
        fontSize: getDynamicFontSize(14),
        fontFamily: AppFonts.bold
    },
    cartDetailContainer: {
        flexDirection: "row",
        paddingHorizontal: 8
    },
    cartDetailText: {
        fontSize: getDynamicFontSize(10),
        fontFamily: AppFonts.regular
    }
})

export default React.memo(CartProduct, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data && prevProps.readOnly === nextProps.readOnly;
})
