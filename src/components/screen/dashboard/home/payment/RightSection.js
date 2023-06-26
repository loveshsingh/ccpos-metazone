import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import UsedPaymentMethodList from "./UsedPaymentMethodList";
import {deleteUsedPaymentMethod, selectUsedPaymentMethod} from "../../../../../actions/dashboard/home/payment";
import {useLocale} from "../../../../../base/contexts/I18NProvider";
import {usePaymentTheme} from "../../../../../base/theme contexts/PaymentThemeProvider";

/**
 * @author Vipin Joshi.
 * @since 13-01-2022.
 * @description to render Payment Screen Right Section.
 * @return {JSX.Element}
 */
const RightSection = (): JSX.Element => {

    const TAG = "Payment Screen Right Section:"
    const dispatch = useDispatch()
    const {usedPaymentMethods} = useSelector((state: any) => state.paymentReducer)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {paymentTheme} = usePaymentTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    const onUsedPaymentMethodPress = ({item, index}): void => {
        console.log(TAG, 'onUsedPaymentMethodPress: ', JSON.stringify(item), '---', index)
        dispatch(selectUsedPaymentMethod({data: item, index}))
    }

    const onUsedPaymentMethodDeletePress = ({item, index}): void => {
        dispatch(deleteUsedPaymentMethod({
            data: item,
            index
        }))
    }

    return (
        <View style={[styles.container, {backgroundColor: paymentTheme?.backgroundColor}]}>
            <UsedPaymentMethodList
                data={usedPaymentMethods} onPress={onUsedPaymentMethodPress}
                onPressDelete={onUsedPaymentMethodDeletePress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1}
})

export default React.memo(RightSection, () => true)
