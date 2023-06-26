import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, StyleSheet, Animated} from "react-native";
import {AppColors} from "../../../../../assets/AppColors";
import AppTouchableOpacity from "../../../../lib/AppTouchableOpacity";
import AppText from "../../../../lib/AppText";
import AppIcon, {Icons} from "../../../../lib/AppIcon";
import AppTextInput from "../../../../lib/AppTextInput";
import {setCollectedAmount} from "../../../../../actions/dashboard/home/payment";
import {AppFonts} from "../../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../../helper/Utility"
import {useLocale} from "../../../../../base/contexts/I18NProvider";
import {usePaymentTheme} from "../../../../../base/theme contexts/PaymentThemeProvider";
import {Constant} from "../../../../../helper/constant";

/**
 * @author Vipin Joshi.
 * @since 15-01-2022.
 * @description to render Used Payment Method Item.
 * @param data used payment method data.
 * @param index used payment method index.
 * @param onPress used payment method item press event callback.
 * @param onPressDelete usedPayment method Item delete press event callback
 * @return {JSX.Element}
 */
const UsedPaymentMethodItem = ({data, index, onPress, onPressDelete}): JSX.Element => {

    const TAG = 'UsedPaymentMethodItem:'
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState(data)
    const [paymentMethodIndex, setPaymentMethodIndex] = useState(index)
    const [amountCollected, setAmountCollected] = useState(undefined)
    const [dueAmount, setDueAmount] = useState('')
    const [changeAmount, setChangeAmount] = useState('')
    const sessionDetails = useSelector((state: any) => state.authReducer.sessionDetails)
    const {
        selectedUsedPaymentMethodDetail,
        totalAmount,
        usedPaymentMethods
    } = useSelector((state: any) => state.paymentReducer)

    const selectedPaymentMethodIndex = selectedUsedPaymentMethodDetail.index

    const paymentItemOpacity = useState(new Animated.Value(0))[0]
    const paymentItemTransform = useState(new Animated.Value(-10))[0]
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {paymentTheme} = usePaymentTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    useEffect(() => {
        Animated.timing(paymentItemOpacity, {
            toValue: 1,
            duration: Constant.ANIMATION_DURATION,
            useNativeDriver: true
        }).start();
        Animated.timing(paymentItemTransform, {
            toValue: 0,
            duration: Constant.ANIMATION_DURATION,
            useNativeDriver: true
        }).start();
    },[paymentItemOpacity, paymentItemTransform])

    useEffect(() => {
        setPaymentMethod(data)
        setPaymentMethodIndex(index)
        setAmountCollected(`${data?.amountCollected}`)
    }, [data, index])

    useEffect(() => {
        const initAmounts = async ():void => {
            let i = 0
            let tempTotalCollected = 0
            usedPaymentMethods.every((paymentMethod) => {
                if (i === index)
                    return false

                tempTotalCollected += +paymentMethod?.amountCollected

                i++
                return true
            })


            const dueAmount = +((+totalAmount - tempTotalCollected).toFixed(sessionDetails.currencyDecimalPlaces))

            let changeAmount = ''
            if (tempTotalCollected >= totalAmount)
                changeAmount = +((tempTotalCollected - totalAmount).toFixed(sessionDetails.currencyDecimalPlaces))

            setDueAmount(`${dueAmount}`)
            setChangeAmount(`${changeAmount}`)
            console.log('DueAmount:', dueAmount)
            console.log('ChangeAmount:', changeAmount)
        }
        initAmounts()
    }, [amountCollected])

    /**
     * @author Vipin Joshi.
     * @since 15-01-2022
     * @description to handle amount collected text input value change event.
     * @param value amount collected value.
     */
    const onTenderedValueChange = (value): void => {
        if (value === '' || value.match(/^\d+$/) || value.match(/^\d+\.+$/) || value.match(/^\d+\.\d+$/)) {
            setAmountCollected(`${value}`)
            dispatch(setCollectedAmount({value: value, index: paymentMethodIndex}))
        }
    }

    const getAmountDue = (stopIndex): any => {
        let tempTotalCollected = 0
        for (let i = 0; i < stopIndex; i++) {
            const usedPaymentMethod = usedPaymentMethods[i]
            tempTotalCollected += +usedPaymentMethod?.amountCollected
        }

        return +((+totalAmount - tempTotalCollected).toFixed(sessionDetails.currencyDecimalPlaces))
    }

    const getChangeAmount = (stopIndex): any => {
        let tempTotalCollected = 0.0
        for (let i = 0; i <= stopIndex; i++) {
            const usedPaymentMethod = usedPaymentMethods[i]
            tempTotalCollected += +usedPaymentMethod?.amountCollected
        }

        let changeAmount = ''
        if (tempTotalCollected >= totalAmount) {
            changeAmount = +((tempTotalCollected - totalAmount).toFixed(sessionDetails.currencyDecimalPlaces))
        }

        return changeAmount
    }

    const isItemSelected = paymentMethodIndex === selectedPaymentMethodIndex
    const itemBackgroundColor = isItemSelected ? paymentTheme?.secondaryColor : AppColors.white
    const itemColor = isItemSelected ? paymentTheme?.textColor : AppColors.arsenic

    return (
        <Animated.View style={{
            opacity: paymentItemOpacity, transform: [
                {translateY: paymentItemTransform},
            ],
        }}>
            <AppTouchableOpacity
                style={[styles.container, {backgroundColor: itemBackgroundColor}]}
                onPress={onPress?.bind(this, {item: paymentMethod, index: paymentMethodIndex})}>

                <AppText style={[styles.text, {color: itemColor}]} text={getAmountDue(index)}/>

                <View style={styles.textInput}>
                    <AppTextInput
                        style={{color: itemColor, height: getDynamicFontSize(50)}}
                        label=''
                        mode={'flat'}
                        value={amountCollected}
                        onChangeText={onTenderedValueChange}
                        keyboardType='number-pad'
                        placeholder='0.00'
                    />
                </View>

                <AppText style={[styles.text, {color: itemColor}]} text={getChangeAmount(index)}/>

                <View style={{flex: 1, flexDirection: 'row'}}>

                    <AppText style={[styles.text, {color: itemColor}]}
                             text={`${paymentMethod.name} (${sessionDetails.currencySymbol})`}/>

                    <View style={styles.itemDeleteButtonContainer}>
                        <AppTouchableOpacity
                            onPress={onPressDelete?.bind(this, {item: data, index: paymentMethodIndex})}>
                            <AppIcon type={Icons.MaterialIcons} name={'close'} size={getDynamicFontSize(24)}
                                     color={itemColor}/>
                        </AppTouchableOpacity>
                    </View>

                </View>

            </AppTouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: getDynamicFontSize(50)
    },
    text: {
        flex: 1,
        fontSize: getDynamicFontSize(18),
        fontWeight: "900",
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: AppFonts.regular
    },
    textInput: {flex: 1},
    itemDeleteButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    },
})

export default React.memo(UsedPaymentMethodItem, (prevProps, nextProps): boolean => {
    return prevProps.data === nextProps.data && prevProps.index === nextProps.index
})