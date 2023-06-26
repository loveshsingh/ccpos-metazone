import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Animated, Easing} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppColors} from "../../../../../assets/AppColors";
import AppBar from "../../../../lib/AppBar";
import I18N from "../../../../../helper/translation";
import PaymentMethodList from "./PaymentMethodList";
import CartListWrapper from "../CartListWrapper";
import AppPicker from "../../../../lib/AppPicker";
import AppText from "../../../../lib/AppText";
import AppTextInput from "../../../../lib/AppTextInput";
import {Purposes} from "../../../../../helper/constant";
import {onPressPaymentMethod, setDiscountRemarks} from "../../../../../actions/dashboard/home/payment";
import {AppFonts} from "../../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../../helper/Utility"
import AppIcon, {Icons} from "../../../../lib/AppIcon";
import {Badge} from "react-native-paper";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useMessage} from "../../../../../base/contexts/MessageProvider";
import {useLocale} from "../../../../../base/contexts/I18NProvider";
import CartListThemeProvider from "../../../../../base/theme contexts/CartListThemeProvider";
import {usePaymentTheme} from "../../../../../base/theme contexts/PaymentThemeProvider";
import {Constant} from "../../../../../helper/constant";

/**
 * @author Vipin Joshi.
 * @since 13-01-2022.
 * @description to render Payment Screen Left Section.
 * @return {JSX.Element}
 */
const LeftSection = (): JSX.Element => {

    const TAG = 'LeftSection'
    const purposes = Purposes
    const dispatch = useDispatch()
    const {cartProducts, isComplimentarySelected} = useSelector((state: any) => state.dashboardHomeReducer)
    const {
        purpose,
        discountRemarks,
        paymentMethods,
        totalAppliedDiscount
    } = useSelector((state: any) => state.paymentReducer)

    const [purposeValue, setPurposeValue] = useState(purpose)
    const [discountRemarksValue, setDiscountRemarksValue] = useState(discountRemarks)
    const [showCartList, setShowCartList] = useState(false)
    const cartAnimation = useRef(new Animated.Value(0)).current
    const message = useMessage()
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {paymentTheme} = usePaymentTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    }, [locale])

    // /**
    //  * @author Vipin Joshi.
    //  * @since 13-01-2022.
    //  * @description to set the purpose reducer state on change of purpose state.
    //  */
    // useEffect(() => {
    //     if (purpose !== purposeValue) { // avoiding this will start an infinite loop.
    //         dispatch(setPurpose(purposeValue))
    //     }
    // }, [purposeValue])
    //
    // /**
    //  * @author Vipin Joshi.
    //  * @since 13-01-2022.
    //  * @description to set the purpose state on change of purpose reducer state.
    //  */
    // useEffect(() => {
    //     if (purpose !== purposeValue) {  // avoiding this will start an infinite loop.
    //         setPurposeValue(purpose)
    //     }
    // }, [purpose])

    /**
     * @author Vipin Joshi.
     * @since 13-01-2022.
     * @description set discount remarks on reducer on change of discountRemarks state.
     */
    useEffect(() => {
        dispatch(setDiscountRemarks(discountRemarksValue))
    }, [discountRemarksValue])

    /**
     * @author Vipin Joshi.
     * @since 13-01-2022.
     * @description set discount remarks on reducer on change of discountRemarks state.
     */
    useEffect(() => {
        setDiscountRemarksValue(discountRemarks)
    }, [discountRemarks])

    // /**
    //  * @author Vipin Joshi.
    //  * @since 13-01-2022.
    //  * @description to handle purpose dropdown value change.
    //  * @param value selected purpose.
    //  */
    // const onPurposeValueChange = (value): void => setPurposeValue(value)

    /**
     * @author Vipin Joshi.
     * @since 13-01-2022.
     * @description to handle discount comment input value change.
     * @param value discount comment text.
     */
    const onDiscountCommentTextChange = (value): void => setDiscountRemarksValue(value)

    /**
     * @author Vipin Joshi.
     * @since 18-01-2022.
     * @description to check discount applied to any product or not.
     */
    const isTotalDiscountGreaterThanZero = (): boolean => +totalAppliedDiscount > 0


    /**
     * @author Vipin Joshi.
     * @since 13-01-2022.
     * @description to handle payment method on Press Event.
     * @param value payment method.
     * @param index payment method index.
     */
    const onPaymentMethodPress = (value, index): void => dispatch(onPressPaymentMethod(value, (isPressed: boolean) => {
        if (!isPressed)
            message.showToast(I18N.t('PaymentMethodNotAllowedMsg'), {
                description: I18N.t('OnePaymentMethodDescMsg'),
                type: "info",
            })
    }))

    /**
     * @author Lovesh Singh.
     * @since 17-02-2022.
     * @description apply animation on cart list section.
     */
    const toggleCartList = () => {
        setShowCartList(!showCartList)
        Animated.timing(cartAnimation, {
            toValue: showCartList ? 0 : 1,
            duration: Constant.ANIMATION_DURATION,
            easing: Easing.ease,
            useNativeDriver: false
        }).start();
    }

    return (
        <View style={[styles.container, {backgroundColor: paymentTheme?.backgroundColor}]}>
            <View>
                <PaymentMethodList data={paymentMethods}
                                   onPress={onPaymentMethodPress}/>

                {/*<View style={styles.purposeContainer}>*/}
                {/*    <AppPicker*/}
                {/*        title={I18N.t('PurposeLabel')}*/}
                {/*        selectedValue={purposeValue}*/}
                {/*        onValueChange={onPurposeValueChange}*/}
                {/*        data={purposes}*/}
                {/*        style={styles.picker}*/}
                {/*        initialItem={{name: '', id: ''}}*/}
                {/*    />*/}
                {/*</View>*/}

                {/*DISCOUNT COMMENT*/}
                <View style={styles.discountCommentContainer}>
                    <AppTextInput
                        // multiline={true}
                        style={styles.discountText}
                        value={discountRemarksValue}
                        numberOfLines={1}
                        label={I18N.t('DiscountRemarksLabel')}
                        disabled={!isTotalDiscountGreaterThanZero() || isComplimentarySelected }
                        onChangeText={onDiscountCommentTextChange}
                    />
                </View>
            </View>

            <Animated.View style={[styles.cartContainer, {
                width: cartAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                }),
                borderRightWidth: showCartList ? 1 : 0,
            }]}>
                <AppBar
                    statusBarHeight={2}
                    headerStyle={styles.header}
                    style={{display: showCartList ? 'flex' : 'none'}}
                    title={<AppText text={I18N.t('OrderPreviewLabel')} style={styles.headerText}/>}
                />

                <View style={styles.cartListContainer}>
                    <CartListThemeProvider>
                    <CartListWrapper
                        cartProducts={cartProducts}
                        isComplimentarySelected={isComplimentarySelected}
                        readonly={true}
                    />
                    </CartListThemeProvider>
                </View>

                <View style={styles.toggleCartList}>
                    <TouchableOpacity containerStyle={styles.innerToggleCartList} onPress={toggleCartList}>
                        <AppIcon type={Icons.MaterialCommunityIcons}
                                 name={showCartList ? 'cart-remove' : 'cart'}
                                 color={AppColors.colorAccent}
                                 style={styles.cartIcon}
                                 size={getDynamicFontSize(25)}/>
                        <Badge
                            size={getDynamicFontSize(16)}
                            style={styles.totalAmountBadge}
                        >
                            {cartProducts.length}
                        </Badge>
                    </TouchableOpacity>
                </View>
            </Animated.View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    header: {backgroundColor: AppColors.oxfordBlue, height: getDynamicFontSize(55), paddingBottom: 4,},
    headerText: {
        color: AppColors.colorBackgroundWhite,
        fontSize: getDynamicFontSize(22)
    },
    purposeContainer: {flexDirection: 'row'},
    discountCommentContainer: {flexDirection: 'row', paddingBottom: 10, marginHorizontal: 8},
    discountText: {
        flex: 1, fontFamily: AppFonts.bold,
        height: getDynamicFontSize(50),
        fontSize: getDynamicFontSize(18),
    },
    picker: {
        height: getDynamicFontSize(40)
    },
})

export default React.memo(LeftSection, () => false)
