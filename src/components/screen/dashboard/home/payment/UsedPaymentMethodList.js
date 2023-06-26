import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {View, StyleSheet} from "react-native";
import {AppColors} from "../../../../../assets/AppColors";
import I18N from "../../../../../helper/translation";
import AppText from "../../../../lib/AppText";
import UsedPaymentMethodItem from "./UsedPaymentMethodItem";
import {AppFonts} from "../../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../../helper/Utility"
import {useLocale} from "../../../../../base/contexts/I18NProvider";
import {usePaymentTheme} from "../../../../../base/theme contexts/PaymentThemeProvider";
import AppFlatList from "../../../../lib/AppFlatList";

/**
 * @author Vipin Joshi.
 * @since 13-01-2022.
 * @description to render Payment Method List.
 * @param data used payment method data.
 * @param onPress used payment method item press event callback.
 * @param onPressDelete used payment method item delete press event callback.
 * @return {JSX.Element}
 */
const UsedPaymentMethodList = ({data, onPress, onPressDelete}): JSX.Element => {

    const sessionDetails = useSelector((state: any) => state.authReducer.sessionDetails)
    const {selectedUsedPaymentMethodDetail, totalAmount} = useSelector((state: any) => state.paymentReducer)

    const [paymentMethods, setPaymentMethods] = useState(data)
    const selectedPaymentMethodIndex = selectedUsedPaymentMethodDetail.index

    const listRef = useRef(undefined)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {paymentTheme} = usePaymentTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    useEffect(() => {
        setPaymentMethods(data)
    }, [data, totalAmount])

    useEffect(() => {
        if (paymentMethods && selectedPaymentMethodIndex >= 0 && paymentMethods.length > selectedPaymentMethodIndex) {
            listRef.current.scrollToIndex({animated: true, index: selectedPaymentMethodIndex});
        }
    }, [paymentMethods])

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
    const renderItem = ({item, index}): JSX.Element =>
        <UsedPaymentMethodItem data={item} index={index} onPress={onPress} onPressDelete={onPressDelete}/>

    /**
     * @author Vipin Joshi.
     * @since 14-01-2022.
     * @description to get total cart price.
     * @return {string} total cart price
     */
    const getFormattedTotalCartPrice = (): string => {
        console.log("Total Amount in payment screen: ",totalAmount)
        let totalValue = totalAmount
        if (sessionDetails.currencyPosition === 'before') {
            totalValue = sessionDetails.currencySymbol + totalValue
        } else {
            totalValue = totalValue + sessionDetails.currencySymbol
        }

        return totalValue
    }

    /**
     * @author Vipin Joshi.
     * @since 13-01-2022.
     * @description list empty component.
     * @return {JSX.Element}
     */
    const renderListEmptyComponent = (): JSX.Element =>
        <View style={styles.listEmptyComponentContainer}>
            <AppText style={[styles.listEmptyComponentTotalPriceText, {color: paymentTheme?.primaryColor,}]} text={getFormattedTotalCartPrice()}/>
            <AppText style={[styles.listEmptyComponentText]} text={I18N.t('PleaseSelectPaymentMethodMsg')}/>
        </View>

    /**
     * @author Vipin Joshi.
     * @since 14-01-2022.
     * @description to render list header component.
     * @return {JSX.Element}
     */
    const renderListHeaderComponent = (): JSX.Element =>
        <View style={styles.headerContainer}>
            <AppText style={styles.headingText} text={I18N.t('PaymentDueLabel')}/>
            <AppText style={styles.headingText} text={I18N.t('PaymentTenderedLabel')}/>
            <AppText style={styles.headingText} text={I18N.t('PaymentChangeLabel')}/>
            <AppText style={styles.headingText} text={I18N.t('PaymentMethodLabel')}/>
        </View>

    /**
     * @author Vipin Joshi.
     * @since 14-01-2022
     * @description list scrolling error handler.
     * @returns {JSX.Element}
     */
    const onScrollToIndexFailedHandler = (error): void => {
        const offset = error.averageItemLength * error.index;
        listRef.current.scrollToOffset({offset});
    }

    return (
        <AppFlatList
            stickyHeaderIndices={[0]}
            ref={listRef}
            style={styles.container}
            contentContainerStyle={styles.listContentStyle}
            numColumns={1}
            scrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            data={paymentMethods}
            extraData={paymentMethods}
            ListHeaderComponent={renderListHeaderComponent}
            ItemSeparatorComponent={renderItemSeparator}
            ListEmptyComponent={renderListEmptyComponent}
            renderItem={renderItem}

            removeClippedSubviews={false}
            onScrollToIndexFailed={onScrollToIndexFailedHandler}
        />
    );
}

const styles = StyleSheet.create({
    container: {flexGrow: 1},
    listContentStyle: {flexGrow: 1},
    headerContainer: {justifyContent: 'space-between', flexDirection: 'row', backgroundColor: AppColors.americanSilver},
    headingText: {
        flex: 1,
        fontSize: getDynamicFontSize(18),
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 8,
        fontFamily: AppFonts.bold
    },
    separatorContainer: {height: 1, backgroundColor: AppColors.americanSilver, width: '100%'},
    listEmptyComponentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    listEmptyComponentTotalPriceText: {
        fontSize: getDynamicFontSize(30),
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: AppFonts.bold
    },
    listEmptyComponentText: {
        // color: AppColors.arsenic,
        textAlign: 'center',
        margin: 12,
        fontSize: getDynamicFontSize(16),
        fontWeight: 'bold',
        fontFamily: AppFonts.bold
    }
})

export default React.memo(UsedPaymentMethodList, (prevProps, nextProps): boolean => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length
})
