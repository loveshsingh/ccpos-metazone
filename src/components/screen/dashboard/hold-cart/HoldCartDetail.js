import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {AppColors} from "../../../../assets/AppColors";
import {useSelector} from "react-redux";
import HoldCartItemList from "./HoldCartItemList";
import AppText from "../../../lib/AppText";
import I18N from "../../../../helper/translation";
import {isString, getDynamicFontSize} from "../../../../helper/Utility";
import {AppFonts} from "../../../../assets/AppFonts";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useHoldOrderTheme} from "../../../../base/theme contexts/HoldOrderThemeProvider";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @description Hold Cart Detail Component.
 * @since 13-01-2022
 */
const HoldCartDetail = (): JSX.Element => {
    // noinspection JSUnusedLocalSymbols
    const TAG = "HoldCartDetail"

    const selectedHoldCartDetail = useSelector((state: any) => state.holdCartReducer?.selectedCartDetail);
    const sessionDetails = useSelector((state: any) => state.authReducer.sessionDetails)
    const {holdOrderTheme} = useHoldOrderTheme()

    let selectedHoldCart = selectedHoldCartDetail?.cart?.stringData
    if (isString(selectedHoldCart)) {
        selectedHoldCart = JSON.parse(selectedHoldCart)
    }

    const [totalPrice, setTotalPrice] = useState(0)
    const [totalTax, setTotalTax] = useState(0)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    /**
     * @author Lovesh Singh.
     * @description calculate total price & total tax.
     * @since 13-01-2022
     */
    useEffect(() => {
        const tempCartProductList = selectedHoldCart?.holdProductList
        let totalPrice = 0.00;
        let totalWithTaxesValue = 0.00
        let totalWithoutTaxesValue = 0.00

        tempCartProductList?.forEach(element => {
            const cartQty = +element.cartQty
            const priceTaxInclusive = +element.price_tax_inclusive //Item price with tax
            const priceTaxExclusive = +element.price_tax_exclusive //Item price without tax
            const appliedDiscountValue = +element.applied_discount_value

            const totalToAddPrice = +((cartQty * (priceTaxInclusive - appliedDiscountValue)).toFixed(sessionDetails.currencyDecimalPlaces))
            totalPrice += totalToAddPrice

            const totalToAddWithTaxes = +((cartQty * priceTaxInclusive).toFixed(sessionDetails.currencyDecimalPlaces))
            const totalToAddWithoutTaxes = +((cartQty * priceTaxExclusive).toFixed(sessionDetails.currencyDecimalPlaces))

            totalWithTaxesValue += totalToAddWithTaxes
            totalWithoutTaxesValue += totalToAddWithoutTaxes
        })

        totalPrice = +(totalPrice.toFixed(sessionDetails.currencyDecimalPlaces))
        let totalTaxes = +(totalWithTaxesValue - totalWithoutTaxesValue)
        totalTaxes = totalTaxes.toFixed(sessionDetails.currencyDecimalPlaces)

        if (sessionDetails.currencyPosition === 'before') {
            totalPrice = `${sessionDetails.currencySymbol}${totalPrice}`
            totalTaxes = `${sessionDetails.currencySymbol}${totalTaxes}`
        } else {
            totalPrice = `${totalPrice}${sessionDetails.currencySymbol}`
            totalTaxes = `${totalTaxes}${sessionDetails.currencySymbol}`
        }
        setTotalPrice(totalPrice)
        setTotalTax(totalTaxes)
    }, [selectedHoldCart?.holdProductList])


    return (<View style={[styles.holCartDetailContainer, {backgroundColor: holdOrderTheme?.backgroundColor}]}>

        <AppText style={[styles.customerName, {display: selectedHoldCart?.customerData?.name ? 'flex' : 'none'}]}
                 text={`${I18N.t('CustomerName')} ${selectedHoldCart?.customerData?.name}`}/>

        <View style={styles.totalPriceContainer}>

            <AppText
                style={[
                    styles.discount_remarks,
                    {display: selectedHoldCart?.complimentary === "Complementary" ? "flex" : "none"},
                ]}
                text={selectedHoldCart?.complimentary}
            />

            <AppText
                style={[styles.totalPrice, {display: selectedHoldCart?.holdProductList?.length > 0 ? 'flex' : 'none'}]}
                text={`${I18N.t('TotalLabel')} ${totalPrice}`}/>

            <AppText
                style={[styles.totalPrice, {display: selectedHoldCart?.holdProductList?.length > 0 ? 'flex' : 'none'}]}
                text={`${I18N.t('TaxesLabel')} ${totalTax}`}/>

        </View>
        <HoldCartItemList data={selectedHoldCart?.holdProductList}/>
    </View>)
}

const styles = StyleSheet.create({
    listContentStyle: {flexGrow: 1},
    holCartDetailContainer: {
        flex: 1, padding: 12
    },
    customerName: {
        marginTop: 10,
        // color: AppColors.arsenic,
        borderBottomColor: AppColors.americanSilver,
        borderBottomWidth: 1,
        fontSize: getDynamicFontSize(18),
        textAlign: 'left'
    },
    totalPriceContainer: {
        justifyContent: 'flex-end',
        paddingVertical: 4,
        flexDirection: 'row'
    },
    totalPrice: {
        textAlign: 'left',
        paddingHorizontal: 8,
        fontSize: getDynamicFontSize(16),
        fontFamily: AppFonts.bold
    },
    discount_remarks: {
        backgroundColor: AppColors.americanGreen,
        borderRadius: 3,
        fontSize: getDynamicFontSize(12),
        paddingHorizontal: 10,
        paddingVertical: 3,
        color: AppColors.white,
        marginRight: 20
    },
})

export default React.memo(HoldCartDetail, () => true)
