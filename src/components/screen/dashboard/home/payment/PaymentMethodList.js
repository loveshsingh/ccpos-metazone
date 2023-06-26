import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from "react-native";
import {AppColors} from "../../../../../assets/AppColors";
import AppTouchableOpacity from "../../../../lib/AppTouchableOpacity";
import AppText from "../../../../lib/AppText";
import I18N from "../../../../../helper/translation";
import {useSelector} from "react-redux";
import {AppFonts} from "../../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../../helper/Utility"
import {useLocale} from "../../../../../base/contexts/I18NProvider";
import AppFlatList from "../../../../lib/AppFlatList";
import {Constant} from "../../../../../helper/constant"

/**
 * @author Vipin Joshi.
 * @since 13-01-2022.
 * @description to render Payment Method List.
 * @param data payment method data.
 * @param onPress payment method press event callback.
 * @param showPaymentSection
 * @return {JSX.Element}
 */
const PaymentMethodList = ({data, onPress}): JSX.Element => {

    const sessionDetails = useSelector((state: any) => state.authReducer.sessionDetails)
    const [paymentMethods, setPaymentMethods] = useState(data)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])


    useEffect(() => {
        setPaymentMethods(data)
    }, [data])

    /**
     * @author Vipin Joshi.
     * @since 13-01-2022.
     * @description to render Item Separator.
     */
    const renderItemSeparator = (): JSX.Element => <View style={styles.separatorContainer}/>

    /**
     * @author Vipin Joshi.
     * @since 04-01-2022.
     * @description to render Item.
     */
    const renderItem = ({item, index}): JSX.Element => {
        const paymentMethodOpacity = new Animated.Value(0)
        const paymentMethodTransform = new Animated.Value(-10)

        Animated.timing(paymentMethodOpacity, {
            toValue: 1,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 350,
            useNativeDriver: true
        }).start()
        Animated.timing(paymentMethodTransform, {
            toValue: 0,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 350,
            useNativeDriver: true
        }).start()

        return (
            <Animated.View style={[styles.itemContainer, {
                opacity: paymentMethodOpacity, transform: [
                    {translateX: paymentMethodTransform},
                ],
            }]}>
                <AppTouchableOpacity
                    onPress={onPress?.bind(this, item, index)}>

                    <AppText
                        style={styles.itemTextField}
                        text={`${item.name}(${sessionDetails?.currencySymbol})`}
                    />

                </AppTouchableOpacity>
            </Animated.View>
        )
    }

    /**
     * @author Vipin Joshi.
     * @since 13-01-2022.
     * @description list empty component.
     * @return {JSX.Element}
     */
    const renderListEmptyComponent = (): JSX.Element =>
        <View style={styles.emptyComponentContainer}>
            <AppText style={styles.emptyComponentText} text={I18N.t('PaymentListEmptyMsg')}/>
        </View>

    return (
        <AppFlatList
            style={styles.container}
            numColumns={3}
            scrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            data={paymentMethods}
            extraData={paymentMethods}
            ItemSeparatorComponent={renderItemSeparator}
            ListEmptyComponent={renderListEmptyComponent}
            renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
    container: {flexGrow: 0},
    separatorContainer: {height: 1, backgroundColor: AppColors.americanSilver, width: '100%'},
    emptyComponentContainer: {padding: 12},
    emptyComponentText: {
        // color: AppColors.arsenic,
        textAlign: 'center',
        margin: 12,
        fontSize: getDynamicFontSize(18),
        // fontWeight: 'bold',
        fontFamily: AppFonts.bold
    },
    itemContainer: {
        flex: 1,
        backgroundColor: AppColors.platinum,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 4,
        margin: 2,
        marginTop: 0,
    },
    itemTextField: {
        fontSize: getDynamicFontSize(18), color: AppColors.arsenic,
        textAlign: 'center',
        margin: 4,
        // padding: 4,
        fontFamily: AppFonts.bold
    },
})

export default React.memo(PaymentMethodList, (prevProps, nextProps): boolean => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length && prevProps.showPaymentSection === nextProps.showPaymentSection
})
