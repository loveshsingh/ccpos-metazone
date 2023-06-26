import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import {AppColors} from "../../../../assets/AppColors";
import AppText from "../../../lib/AppText";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import {useDispatch, useSelector} from "react-redux";
import {
    showAvailableProductDiscountDialog,
    pressCartFeatureDeleteKey,
    pressCartFeatureNumericKey,
    selectCartFeatureAction, showPurposeDialog
} from "../../../../actions/dashboard/home";
import I18N from "../../../../helper/translation";
import CartKeypadButton from "./CartKeypadButton";
import {isCurrentDateSession, getDynamicFontSize} from "../../../../helper/Utility";
import {Constant} from "../../../../helper/constant";
import {setDiscountRemarks} from "../../../../actions/dashboard/home/payment";
import {useMessage} from "../../../../base/contexts/MessageProvider";
import {AppFonts} from "../../../../assets/AppFonts";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useCartFeatureTheme} from "../../../../base/theme contexts/CartFeatureThemeProvider";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description Cart Feature Section: hold extra Cart actions.
 * @since 21-12-2021
 */
const CartFeatureSection = ({navigation}): JSX.Element => {

    const TAG = "CartFeatureSection:"
    const message = useMessage()
    const dispatch = useDispatch();
    const {
        isQuantitySelected,
        isPriceSelected,
        isDiscountSelected,
        isDecimalSelected,
        isComplimentarySelected,
        cartProducts,
        cartSelectedProductIndex,
        customerLoading,
        paymentMethodsLoading,
    } = useSelector((state: any) => state.dashboardHomeReducer)
    const selectedCustomer = useSelector((state: any) => state.customerReducer.selectedCustomer)

    const sessionDetails = useSelector((state: any) => state.authReducer.sessionDetails)
    const isActiveDaySession = isCurrentDateSession(sessionDetails)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const purpose = useSelector((state: any) => state.dashboardHomeReducer?.purpose)
    const {cartFeatureTheme} = useCartFeatureTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    }, [locale])

    /**
     * @author Vipin Joshi.
     * @since 22-12-2021.
     * @description to handle Customer button press event.
     * todo
     */
    const onPressCustomerButton = (): void => {
        if (purpose)
            navigation.navigate('CustomersScreen')
        else
            dispatch(showPurposeDialog())
    }

    /**
     * @author Lovesh Singh.
     * @since 23-05-2022.
     * @description to handle Purpose button press event.
     */
    const onPressPurposeButton = (): void => {
        if (cartProducts?.length > 0)
            message.showToast(I18N.t('ClearCartToChangePurposeMsg'), {type: 'info', timeout: 3000})
        else
            dispatch(showPurposeDialog())
    }

    /**
     * @author Vipin Joshi.
     * @since 22-12-2021.
     * @description to handle Payment button press event.
     * todo
     */
    const onPressPaymentButton = (): void => {
        if (isActiveDaySession) {
        if (canUserProceedForPayment()) {
            let appliedDiscount = false
            const existingCartProducts = [...cartProducts]
            existingCartProducts.map(cartProduct => {
                const productCustomDiscount = JSON.parse(cartProduct?.pos_custom_discount_id)
                if (productCustomDiscount?.discount && purpose === "farmland"){
                    appliedDiscount = true
                }
            })
            dispatch(setDiscountRemarks(isComplimentarySelected ? 'Complementary' : (appliedDiscount ? 'Farmers Only' : undefined)))
            // dispatch(setPurpose(undefined))

            navigation.navigate('PaymentScreen')
        }
        } else {
            console.log(TAG, 'onPressPayment: ', 'active session expired')
            message.showToast(I18N.t('CurrentSessionIsNotStartedTodayMsg'), {type: 'info', timeout: 3000})
        }
    }

    /**
     * @author Vipin Joshi.
     * @since 12-01-2022.
     * @description to check user safe to proceed to payment screen.
     * todo
     */
    const canUserProceedForPayment = (): boolean => {
        const existingCartProducts = [...cartProducts]
        if (existingCartProducts.length > 0) {
            let invalidProduct
            let totalValue = 0.00

            // Check if there is any invalid product in cart.
            existingCartProducts.every(cartProduct => {
                if (+cartProduct.cartQty <= 0) {
                    invalidProduct = cartProduct
                    return false
                }
                const totalToAdd = parseFloat((cartProduct.cartQty * (cartProduct.price_tax_inclusive - cartProduct.applied_discount_value)).toFixed(sessionDetails.currencyDecimalPlaces))
                totalValue += totalToAdd
                return true
            })

            if (invalidProduct) {
                console.log(TAG, 'onPressPaymentButton:', `${invalidProduct.display_name} ${I18N.t('Space')} ${I18N.t('IncorrectQuantityLabel')}, ${I18N.t('IncorrectQuantityMsg')}`)
                    message.showToast(`${invalidProduct.display_name} ${I18N.t('Space')} ${I18N.t('IncorrectQuantityLabel')}`, {description:  I18N.t('IncorrectQuantityMsg'),type: 'info',timeout: 3000  })
                return false
            }

            const existingSelectedCustomer = selectedCustomer ? {...selectedCustomer} : undefined
            if (existingSelectedCustomer) {
                totalValue = parseFloat(totalValue.toFixed(sessionDetails.currencyDecimalPlaces))
                let totalYearValue = existingSelectedCustomer.amount_total
                totalYearValue += totalValue

                // Validate payment amount.
                if (+totalValue === 0) {
                    message.showToast(I18N.t('InvalidTotalMsg'), {type: 'info', timeout: 3000})
                } else if (+totalValue > Constant.ORDER_SUM_50000 && !existingSelectedCustomer.pan_no) {
                    message.showToast(I18N.t('PanValidationErrorMsg'), {description: I18N.t('PanValidationErrorMsgDesc'),type: 'info',timeout: 3000})
                    return false
                } else if (+totalYearValue > Constant.ORDER_SUM_200k && !existingSelectedCustomer.pan_no) {
                    message.showToast(I18N.t('PanValidationErrorMsg_200K'), {description: I18N.t('PanValidationErrorMsg_200K_Desc'),type: 'info',timeout: 3000})
                    return false
                }

                return true

            } else {
                message.showToast(I18N.t('NoCustomerSelectedMsg'), {type: 'info', timeout: 3000})
            }
        } else {
            message.showToast(I18N.t('CartEmptyMsg'), {type: 'info', timeout: 3000})
        }

        return false
    }

    /**
     * @author Vipin Joshi.
     * @since 22-12-2021.
     * @description to handle Qty button press event.
     */
    const onPressQtyButton = (): void =>
        dispatch(selectCartFeatureAction({
            quantity: true,
            price: false,
            discount: false,
            decimal: false,
            complimentary: isComplimentarySelected
        }))

    /**
     * @author Vipin Joshi.
     * @since 22-12-2021.
     * @description to handle Discount button press event.
     */
    const onPressDiscountButton = (): void => {
        dispatch(showAvailableProductDiscountDialog())
    }

    /**
     * @author Vipin Joshi.
     * @since 22-12-2021.
     * @description to handle Complimentary button press event.
     */
    const onPressComplimentaryButton = (): void => {
        dispatch(selectCartFeatureAction({
            complimentary: !isComplimentarySelected,
            price: isPriceSelected,
            discount: isDiscountSelected,
            decimal: isDecimalSelected,
            quantity: isQuantitySelected
        }))
    }

    /**
     * @author Vipin Joshi.
     * @since 22-12-2021.
     * @description to handle Decimal button press event.
     */
    const onPressDecimalButton = (): void =>
        dispatch(selectCartFeatureAction({
            decimal: !isDecimalSelected,
            complimentary: isComplimentarySelected,
            quantity: isQuantitySelected,
            discount: isDiscountSelected,
            price: isPriceSelected
        }))

    /**
     * @author Vipin Joshi.
     * @since 22-12-2021.
     * @description to handle Delete button press event.
     */
    const onPressDeleteButton = (): void => dispatch(pressCartFeatureDeleteKey())

    /**
     * @author Vipin Joshi.
     * @since 23-12-2021.
     * @description to handle number keypad button[0-9] press event.
     * @param value key value.
     */
    const onPressNumericKeyPad = (value): void => dispatch(pressCartFeatureNumericKey(value))

    /**
     * @author Vipin Joshi.
     * @since 24-12-2021.
     * @description to render Keypad buttons.
     * @param title button title.
     * @param value key value.
     * @return {JSX.Element}
     */
    const renderKeypadButton = (value, title: string = ""): JSX.Element =>
        <CartKeypadButton value={value} title={title} onPress={onPressNumericKeyPad}/>

    return (
        <View style={[styles.container, {backgroundColor: cartFeatureTheme?.backgroundColor,}]}>
            <View style={styles.customerPaymentContainer}>
                <AppTouchableOpacity
                    style={styles.purposeButton}
                    onPress={onPressPurposeButton}>
                    <AppIcon type={Icons.MaterialIcons} name={'info'}
                             size={getDynamicFontSize(28)}
                             style={[styles.purposeButtonIcon, {color: cartFeatureTheme?.textColor}]}/>
                    <AppText
                        numberOfLines={2}
                        style={[styles.purposeButtonText, {color: cartFeatureTheme?.textColor}]}
                        text={purpose ? purpose : I18N.t('PurposeLabel')}
                    />
                </AppTouchableOpacity>
                <AppTouchableOpacity
                    style={styles.customerButton}
                    disabled={customerLoading && true}
                    onPress={!customerLoading ? onPressCustomerButton : () => {
                    }}>
                    <AppIcon type={Icons.MaterialIcons} name={'account-circle'} size={getDynamicFontSize(28)}
                             style={[styles.customerButtonIcon, {color: customerLoading ? cartFeatureTheme?.disabledTextColor : cartFeatureTheme?.textColor}]}/>
                    <AppText
                        numberOfLines={1}
                        style={[styles.customerButtonText, {color: customerLoading ? cartFeatureTheme?.disabledTextColor : cartFeatureTheme?.textColor}]}
                        text={selectedCustomer ? selectedCustomer.name : I18N.t('Customer')}
                    />
                    {/*<AppCustomerProgress visible={customerLoading} totalItems={1}/>*/}
                </AppTouchableOpacity>

                <AppTouchableOpacity style={styles.paymentButton}
                                     disabled={paymentMethodsLoading && true}
                                     onPress={!paymentMethodsLoading ? onPressPaymentButton : () => {
                                     }}>
                    <AppIcon type={Icons.MaterialIcons} name={'play-circle-filled'} size={getDynamicFontSize(28)}
                             style={[styles.paymentButtonIcon, {color: paymentMethodsLoading ? cartFeatureTheme?.disabledTextColor : cartFeatureTheme?.textColor}]}/>
                    <AppText
                        style={[styles.paymentButtonText, {color: paymentMethodsLoading ? cartFeatureTheme?.disabledTextColor : cartFeatureTheme?.textColor}]}
                        text={I18N.t('CartPaymentLabel')}/>
                    {/*<AppPaymentMethodProgress visible={paymentMethodsLoading} totalItems={1}/>*/}
                </AppTouchableOpacity>
            </View>

            <View style={styles.keypadContainer}>
                <View style={styles.keypadContainerRow}>
                    {renderKeypadButton(1, I18N.t('NumericKeyOneLabel'))}
                    {renderKeypadButton(2, I18N.t('NumericKeyTwoLabel'))}
                    {renderKeypadButton(3, I18N.t('NumericKeyThreeLabel'))}
                    <AppTouchableOpacity
                        onPress={onPressQtyButton}
                        style={[styles.cartFeatureButton, {backgroundColor: (isQuantitySelected ? cartFeatureTheme?.secondaryColor : cartFeatureTheme?.backgroundColor)}]}>

                        <AppText
                            style={[styles.cartFeatureButtonText, {color: (isQuantitySelected ? cartFeatureTheme?.textColor : cartFeatureTheme?.textColor)}]}
                            text={I18N.t('CartQtyLabel')}/>

                    </AppTouchableOpacity>
                </View>

                <View style={styles.keypadContainerRow}>
                    {renderKeypadButton(4, I18N.t('NumericKeyFourLabel'))}
                    {renderKeypadButton(5, I18N.t('NumericKeyFiveLabel'))}
                    {renderKeypadButton(6, I18N.t('NumericKeySixLabel'))}
                    <AppTouchableOpacity
                        onPress={onPressDiscountButton} //% discount code, this need not change for new discount
                        style={[styles.cartFeatureButton, {backgroundColor: (isDiscountSelected ? cartFeatureTheme?.secondaryColor : cartFeatureTheme?.backgroundColor)}]}>

                        <AppText
                            style={[styles.cartFeatureButtonText, {color: (isDiscountSelected ? cartFeatureTheme?.textColor : cartFeatureTheme?.textColor)}]}
                            text={I18N.t('CartDiscountLabel')}/>

                    </AppTouchableOpacity>
                </View>

                <View style={styles.keypadContainerRow}>
                    {renderKeypadButton(7, I18N.t('NumericKeySevenLabel'))}
                    {renderKeypadButton(8, I18N.t('NumericKeyEightLabel'))}
                    {renderKeypadButton(9, I18N.t('NumericKeyNineLabel'))}
                    <AppTouchableOpacity
                        onPress={onPressComplimentaryButton}
                        style={[styles.cartFeatureButton, {backgroundColor: (isComplimentarySelected ? cartFeatureTheme?.secondaryColor : cartFeatureTheme?.backgroundColor)}]}>

                        <AppText
                            style={[styles.cartFeatureButtonText, {color: (isComplimentarySelected) ? cartFeatureTheme?.textColor : cartFeatureTheme?.textColor}]}
                            text={I18N.t('CartComplimentaryLabel')}/>

                    </AppTouchableOpacity>
                </View>

                <View style={styles.keypadContainerRow}>
                    <View style={styles.cartEmptyButton}/>
                    {renderKeypadButton(0, I18N.t('NumericKeyZeroLabel'))}

                    <AppTouchableOpacity
                        onPress={onPressDecimalButton}
                        style={[styles.cartDecimalButton, {backgroundColor: (isDecimalSelected ? cartFeatureTheme?.secondaryColor : cartFeatureTheme?.backgroundColor)}]}>

                        <AppText
                            style={[styles.cartFeatureButtonText, {color: (isDecimalSelected ? cartFeatureTheme?.textColor : cartFeatureTheme?.textColor)}]}
                            text={I18N.t('CartDecimalLabel')}/>

                    </AppTouchableOpacity>

                    <AppTouchableOpacity
                        onPress={onPressDeleteButton}
                        style={styles.cartDeleteButton}>

                        <AppText style={styles.cartFeatureButtonText} text={I18N.t('CartDeleteLabel')}/>

                    </AppTouchableOpacity>
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        borderColor: AppColors.americanSilver,
        borderWidth: 1,
        flexDirection: 'row'
    },
    customerPaymentContainer: {flex: 1},
    purposeButton: {
        borderColor: AppColors.americanSilver,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
    },
    purposeButtonIcon: {color: AppColors.arsenic},
    purposeButtonText: {
        fontSize: getDynamicFontSize(18),
        textAlign: 'center',
        paddingHorizontal: 4,
        fontFamily: AppFonts.bold,
        color: AppColors.arsenic,
        textTransform: "capitalize",
    },
    customerButton: {
        borderColor: AppColors.americanSilver,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 14,
    },
    customerButtonIcon: {color: AppColors.arsenic},
    customerButtonText: {
        fontSize: getDynamicFontSize(18),
        textAlign: 'center',
        paddingHorizontal: 4,
        fontFamily: AppFonts.bold,
        // color: AppColors.arsenic,
    },
    paymentButton: {
        borderColor: AppColors.americanSilver,
        borderRightWidth: 1,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paymentButtonIcon: {
        // color: AppColors.arsenic
    },
    paymentButtonText: {
        textAlign: 'center',
        paddingHorizontal: 4,
        fontSize: getDynamicFontSize(18),
        fontFamily: AppFonts.bold,
        // color: AppColors.arsenic
    },
    keypadContainer: {
        flex: 1.4,
        justifyContent: 'space-between'
    },
    keypadContainerRow: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    cartFeatureButton: {
        flex: 1,
        justifyContent: 'space-evenly',
        borderColor: AppColors.americanSilver,
        borderBottomWidth: 1
    },
    cartFeatureButtonText: {
        fontSize: getDynamicFontSize(16),
        textAlign: 'center',
        fontFamily: AppFonts.bold
    },
    cartEmptyButton: {
        flex: 1,
        justifyContent: 'space-evenly',
        borderColor: AppColors.americanSilver,
        borderRightWidth: 1
    },
    cartDeleteButton: {
        flex: 1,
        justifyContent: 'space-evenly',
        borderColor: AppColors.americanSilver
    },
    cartDecimalButton: {
        flex: 1,
        justifyContent: 'space-evenly',
        borderColor: AppColors.americanSilver,
        borderRightWidth: 1
    }
})

export default React.memo(CartFeatureSection, () => true);
