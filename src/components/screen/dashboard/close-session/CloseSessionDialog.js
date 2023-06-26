// noinspection JSUnusedLocalSymbols

import React, {useEffect, useState} from "react";
import {ScrollView, View, StyleSheet, Pressable} from "react-native";
import AppModal from "../../../lib/AppModal";
import {AppColors} from "../../../../assets/AppColors";
import I18N from "../../../../helper/translation";
import {useSelector} from "react-redux";
import AppText from "../../../lib/AppText";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import {AppFonts} from "../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../helper/Utility"
import AppRoundButton from "../../../lib/AppRoundButton";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useTheme} from "../../../../base/contexts/ThemeProvider";

/**
 * @author Lovesh Singh
 * @since 17-01-2022
 * @description to render Close Session Dialog.
 * @param show to visible or hide dialog.
 * @param orderSummaryData
 * @param onPressCancel
 * @param onSubmitPress
 */
const CloseSessionDialog = ({show, onPressCancel, onSubmitPress}): JSX.Element => {

    const TAG = "CloseSessionDialog:"
    const orderSummaryData = useSelector(((state: any) => state.closeSessionReducer.ordersSummary))
    const sessionDetails = useSelector((state: any) => state.authReducer?.sessionDetails)

    const [visible, setVisible] = useState(show)
    const [data, setData] = useState(orderSummaryData)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {theme} = useTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    const cancelButtonPressHandler = (): void => onPressCancel?.call()
    const submitButtonPressHandler = (): void => onSubmitPress?.call()

    /**
     * @author Lovesh Singh
     * @since 17-01-2022
     * @description to reset data on this form visible.
     */
    useEffect(() => {
        setVisible(show)
    }, [show])


    useEffect(() => {
        setData(orderSummaryData)
    }, [orderSummaryData])


    if (visible) {
        return (
                <AppModal
                    animationType="slide"
                    show={visible}
                    transparent={true}
                    onRequestClose={onPressCancel}>
                    <Pressable style={styles.backdrop} onPress={onPressCancel}/>
                    <View style={styles.modalViewContainer}>
                        <ScrollView
                            contentContainerStyle={styles.scrollviewContent}
                            scrollEnabled={true}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>

                            <View style={[styles.scrollviewViewContainer, {backgroundColor: theme?.backgroundColor}]}>
                                <AppText text={I18N.t('OrderSummary')} style={styles.mainHeadingText}/>
                                {
                                    data && Object.keys(data).map(key => {
                                        const totalOrders = +data[key]?.length
                                        let totalOrderAmount = 0

                                        for (let i = 0; i < totalOrders; i++) {
                                            const object = data[key][i]
                                            totalOrderAmount += +object.totalAmount
                                        }

                                        if (sessionDetails.currencyPosition === 'before') {
                                            totalOrderAmount = sessionDetails.currencySymbol + totalOrderAmount
                                        } else {
                                            totalOrderAmount = totalOrderAmount + sessionDetails.currencySymbol
                                        }

                                        return (
                                            <View key={data.toString()} style={styles.itemContainer}>

                                                <AppText style={styles.itemDateHeading} text={key}/>

                                                <View style={styles.itemRowContainer}>
                                                    <AppText text={I18N.t('TotalOrdersColon')}
                                                             style={styles.itemRowText}/>
                                                    <AppText text={totalOrders} style={styles.itemRowText}/>
                                                </View>

                                                <View style={styles.itemRowContainer}>
                                                    <AppText text={I18N.t('TotalAmountColon')}
                                                             style={styles.itemRowText}/>
                                                    <AppText text={totalOrderAmount} style={styles.itemRowText}/>
                                                </View>

                                            </View>
                                        )
                                    })
                                }
                                {
                                    !data || Object.keys(data)?.length <= 0 ? (
                                        <View style={styles.itemContainer}>
                                            <AppText style={styles.noDataFoundText}
                                                     text={I18N.t('NoOrdersSummaryDetailFoundLabel')}/>
                                        </View>
                                    ) : null
                                }

                                <View style={styles.actionButtonContainer}>
                                    <AppRoundButton
                                        // color={AppColors.arsenic}
                                        uppercase={false}
                                        // style={{backgroundColor: AppColors.chineseWhite}}
                                        title={I18N.t('CancelAction')}
                                        withoutDelay={true}
                                        icon={({size, color}) => (
                                            <AppIcon type={Icons.MaterialIcons} name={'undo'} color={color}
                                                     size={size}/>
                                        )}
                                        onPress={cancelButtonPressHandler}
                                    />
                                    <AppRoundButton
                                        type="primary"
                                        uppercase={false}
                                        color={AppColors.white}
                                        // style={{backgroundColor: AppColors.americanGreen,marginLeft: 10}}
                                        style={{marginLeft: 10}}
                                        title={I18N.t('ProceedToCloseSessionLabel')}
                                        withoutDelay={true}
                                        icon={({size, color}) => (
                                            <AppIcon type={Icons.MaterialCommunityIcons} name={'page-next'} color={color}
                                                     size={size}/>
                                        )}
                                        onPress={submitButtonPressHandler}
                                    />
                                </View>
                            </View>

                        </ScrollView>
                    </View>
                </AppModal>
        )
    } else {
        return null
    }
}

/**
 * @author Lovesh Singh
 * @since 17-01-2022
 * @description Close Session Dialog Style.
 */
const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: AppColors.charlestonGreen,
        opacity: 0.32
    },
    modalViewContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
    },
    scrollviewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    scrollviewViewContainer: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: AppColors.white,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
        minWidth: getDynamicFontSize(370),
    },
    mainHeadingText: {
        fontSize: getDynamicFontSize(30),
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: 20,
        // color: AppColors.arsenic,
        fontFamily: AppFonts.bold
    },
    itemContainer: {
        margin: 8,
        flex: 1,
        borderColor: AppColors.americanSilver,
        borderWidth: 2,
        padding: 10,
        borderRadius: 20
    },
    itemDateHeading: {
        fontSize: getDynamicFontSize(25),
        textAlign: "center",
        fontWeight: "bold",
        textDecorationLine: "underline",
        padding: 10,
        fontFamily: AppFonts.bold
        // color: AppColors.arsenic
    },
    itemRowContainer: {
        flexDirection: "row",
        padding: 8,
        justifyContent: "space-between"
    },
    itemRowText: {
        fontSize: getDynamicFontSize(21),
        fontWeight: "bold",
        fontFamily: AppFonts.bold
        // color: AppColors.arsenic
    },
    actionButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10
    },
    cancelButton: {
        height: 40,
        margin: 8,
        backgroundColor: AppColors.oxfordBlue,
        borderRadius: 4,
        fontFamily: AppFonts.bold
    },
    submitButton: {
        height: 40,
        margin: 8,
        backgroundColor: AppColors.oxfordBlue,
        fontFamily: AppFonts.bold
    },
    noDataFoundText: {
        fontSize: getDynamicFontSize(18),
        textAlign: "center",
        // color: AppColors.arsenic,
        padding: 20
    }
})

export default React.memo(CloseSessionDialog, (prevProps, nextProps) => {
    return prevProps.show === nextProps.show
})
