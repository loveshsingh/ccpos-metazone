import React, {useEffect, useState} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import {useSelector} from "react-redux";
import {AppColors} from "../../../../assets/AppColors";
import I18N from "../../../../helper/translation";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import {Constant} from "../../../../helper/constant";
import AppText from "../../../lib/AppText";
import OrderLineList from "./OrderLineList";
import {
    isString,
    getDynamicFontSize,
    getOrderPrintFormat,
    printHtml,
} from "../../../../helper/Utility";
import {AppFonts} from "../../../../assets/AppFonts";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useOrderTheme} from "../../../../base/theme contexts/OrderThemeProvider";

/**
 * @author Lovesh Singh.
 * @since 08-01-2021.
 * @description order screen order details.
 * @return {JSX.Element}
 */
const OrderDetails = (): JSX.Element => {
    // noinspection JSUnusedLocalSymbols
    const TAG = "OrderDetails";

    const selectedOrderDetail: any = useSelector((state: any) => state.orderReducer.selectedOrderDetail)
    const agentName = useSelector((state: any) => state.homeReducer?.agent)
    const nursery = useSelector((state: any) => state.authReducer?.sessionDetails?.shopName)
    const sessionDetails = useSelector((state: any) => state.authReducer?.sessionDetails)

    let selectedOrder: any = selectedOrderDetail?.order?.orderDetailsString;
    if (isString(selectedOrder)) {
        selectedOrder = JSON.parse(selectedOrder);
    }

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {orderTheme} = useOrderTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    /**
     * @author Lovesh Singh
     * @since 21-01-2022
     * @description to calculate total price, discount, quantity.
     */
    useEffect(() => {
        let totalPrice = 0;
        let totalDiscount = 0;
        let totalQuantity = 0;

        const initCalcTotalPrice = async ():void => {
            selectedOrder?.lines.forEach((value) => {
                totalPrice += parseFloat(value.price_unit) * value.qty;
                totalDiscount += value.discount * value.qty;
                totalQuantity += value.qty;
            });

            setTotalPrice(totalPrice);
            setTotalDiscount(totalDiscount);
            setTotalQuantity(totalQuantity);
        }

        if (+selectedOrder?.lines?.length > 0) {
            initCalcTotalPrice()
        }
    }, [selectedOrder?.lines]);

    /**
     * @author Lovesh Singh
     * @since 10-01-2022
     * @description to print order receipt.
     */
    const onPrintPress = (): void => getOrderPrintFormat(agentName, nursery, selectedOrder, sessionDetails).then(printHtml);


    return selectedOrder ? (
        <View
            style={[styles.orderViewOuterContainer, {backgroundColor: orderTheme?.backgroundColor}]}
            contentContainerStyle={styles.orderViewOuterContainer}
        >
            <View style={styles.orderViewInnerContainer}>
                <View style={styles.dateIdContainer}>
                    <View style={styles.idContainer}>
                        <AppIcon
                            type={Icons.MaterialIcons}
                            name={"description"}
                            size={getDynamicFontSize(32)}
                            style={styles.orderIdIcon}
                        />
                        <AppText
                            style={styles.idText}
                            text={`${I18N.t("PoundSymbol")} ${selectedOrder?.id}`}
                        />
                    </View>

                    <View style={styles.dateContainer}>
                        <AppIcon
                            type={Icons.MaterialIcons}
                            name={"date-range"}
                            size={getDynamicFontSize(32)}
                            style={styles.orderDateIcon}
                        />
                        <AppText
                            style={styles.dateText}
                            text={selectedOrder?.creation_date}
                        />
                    </View>

                    <View style={styles.printContainer}>
                        <AppTouchableOpacity onPress={onPrintPress}>
                            <AppIcon
                                type={Icons.MaterialIcons}
                                name={"print"}
                                size={getDynamicFontSize(32)}
                                style={styles.orderPrintIcon}
                            />
                        </AppTouchableOpacity>
                    </View>
                </View>

                <View style={styles.partnerNameContainer}>
                    <View>
                        <AppText
                            style={[
                                styles.referenceNoText,
                                {display: selectedOrder?.reference_seq_no ? "flex" : "none"},
                            ]}
                            text={`${I18N.t("OrderBillNoLabel")} ${
                                selectedOrder.reference_seq_no
                            }`}
                        />

                        <AppText
                            style={[
                                styles.partnerNameText,
                                {display: selectedOrder?.partner_name ? "flex" : "none"},
                            ]}
                            text={`${I18N.t("OrderCustomerNameLabel")} ${
                                selectedOrder.partner_name
                            }`}
                        />
                    </View>
                    <AppText
                        style={[
                            styles.discount_remarks,
                            {display: selectedOrder?.discount_remarks === "Complementary" ? "flex" : "none"},
                        ]}
                        text={selectedOrder.discount_remarks}
                    />
                    <AppText
                        style={[
                            styles.failedText,
                            {display: selectedOrderDetail?.order?.isFailed ? "flex" : "none"},
                        ]}
                        text={I18N.t('FailedOrderLabel')}
                    />
                </View>

                <ScrollView>
                    <View>
                        <AppText
                            style={styles.paymentDetailsLabel}
                            text={I18N.t("PaymentDetailsLabel")}
                        />
                    </View>

                    <View style={styles.paymentContainer}>
                        <AppText
                            style={styles.paymentLabel}
                            text={I18N.t("AmountPaidLabel")}
                        />
                        <AppText
                            style={styles.paymentText}
                            text={selectedOrder?.amount_paid}
                        />
                    </View>

                    <View style={styles.paymentContainer}>
                        <AppText
                            style={styles.paymentLabel}
                            text={I18N.t("AmountReturnedLabel")}
                        />
                        <AppText
                            style={styles.paymentText}
                            text={selectedOrder?.amount_return}
                        />
                    </View>

                    <View style={styles.paymentContainer}>
                        <AppText
                            style={styles.paymentLabel}
                            text={I18N.t("AmountTotalLabel")}
                        />
                        <AppText style={styles.paymentText} text={totalPrice}/>
                    </View>

                    <View style={styles.paymentContainer}>
                        <AppText
                            style={styles.paymentLabel}
                            text={I18N.t("DiscountApplied")}
                        />
                        <AppText style={styles.paymentText} text={totalDiscount}/>
                    </View>

                    <View style={styles.paymentContainer}>
                        <AppText
                            style={styles.paymentLabel}
                            text={I18N.t("TotalDiscount")}
                        />
                        <AppText
                            style={styles.paymentText}
                            text={totalPrice - totalDiscount}
                        />
                    </View>

                    <View style={styles.paymentContainer}>
                        <AppText
                            style={styles.paymentLabel}
                            text={I18N.t("ItemTotalLabel")}
                        />
                        <AppText
                            style={styles.paymentText}
                            text={`${+selectedOrder?.lines?.length}`}
                        />
                    </View>

                    <View style={styles.paymentContainer}>
                        <AppText
                            style={styles.paymentLabel}
                            text={I18N.t("QtyTotalLabel")}
                        />
                        <AppText style={styles.paymentText} text={totalQuantity}/>
                    </View>

                    <AppText
                        style={styles.orderedProductText}
                        text={I18N.t("OrderedProductsLabel")}
                    />

                    <OrderLineList data={selectedOrder?.lines}/>
                </ScrollView>
            </View>
        </View>
    ) : (
        <View style={[styles.emptyComponentContainer, {backgroundColor: orderTheme?.backgroundColor}]}>
            <AppText
                style={styles.emptyComponentText}
                text={I18N.t("NoOrderDetailsFoundMsg")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    emptyComponentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
    },
    emptyComponentText: {
        // color: AppColors.arsenic,
        textAlign: "center",
        fontSize: getDynamicFontSize(18),
        fontWeight: "bold",
        fontFamily: AppFonts.bold,
    },
    orderViewOuterContainer: {
        flex: 2,
        padding: 8,
    },
    orderViewInnerContainer: {
        flex: 1,
    },
    dateIdContainer: {
        flexDirection: "row",
    },
    idContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "flex-start",
    },
    orderIdIcon: {
        color: AppColors.americanSilver,
    },
    idText: {
        alignSelf: "center",
        fontFamily: AppFonts.regular,
    },
    dateContainer: {
        flex: 1,
        flexDirection: "row",
    },
    orderDateIcon: {
        color: AppColors.americanSilver,
    },
    dateText: {
        alignSelf: "center",
        fontFamily: AppFonts.regular,
    },
    printContainer: {
        flexDirection: "row",
    },
    orderPrintIcon: {
        color: AppColors.americanSilver,
    },
    partnerNameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    referenceNoText: {
        marginTop: 10,
        fontSize: getDynamicFontSize(18),
        fontFamily: AppFonts.bold,
    },
    partnerNameText: {
        borderBottomColor: AppColors.americanSilver,
        borderBottomWidth: 1,
        fontSize: getDynamicFontSize(18),
        fontFamily: AppFonts.bold,
    },
    discount_remarks: {
        backgroundColor: AppColors.americanGreen,
        borderRadius: 3,
        fontSize: getDynamicFontSize(12),
        paddingHorizontal: 10,
        paddingVertical: 3,
        color: AppColors.white,
    },
    failedText: {
        backgroundColor: AppColors.venetianRed,
        borderRadius: 3,
        fontSize: getDynamicFontSize(12),
        paddingHorizontal: 10,
        paddingVertical: 3,
        color: AppColors.white,
    },
    paymentDetailsLabel: {
        marginTop: 10,
        borderBottomColor: AppColors.americanSilver,
        borderBottomWidth: 1,
        fontSize: getDynamicFontSize(Constant.TEXT_SIZE_BIG),
        fontFamily: AppFonts.regular,
    },
    paymentContainer: {
        flexDirection: "row",
        marginHorizontal: 8,
    },
    paymentLabel: {
        flex: 1,
    },
    paymentText: {
        textAlign: "right",
        fontFamily: AppFonts.regular,
    },
    orderedProductText: {
        marginTop: 10,
        borderBottomColor: AppColors.americanSilver,
        borderBottomWidth: 1,
        fontSize: getDynamicFontSize(Constant.TEXT_SIZE_BIG),
        fontFamily: AppFonts.regular,
    },
});

export default React.memo(OrderDetails, () => true);
