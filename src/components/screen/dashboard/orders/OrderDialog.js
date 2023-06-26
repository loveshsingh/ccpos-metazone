import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import AppModal from "../../../lib/AppModal";
import {AppColors} from "../../../../assets/AppColors";
import {useSelector} from "react-redux";
import AppText from "../../../lib/AppText";
import I18N from "../../../../helper/translation";
import AppButton from "../../../lib/AppButton";
import {getDynamicFontSize} from "../../../../helper/Utility"
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useOrderTheme} from "../../../../base/theme contexts/OrderThemeProvider";

/**
 * @author Lovesh Singh
 * @since 24-01-2021
 * @description dialog open on click of show all orders
 */
const OrdersDialog = ({show, onRequestClose}): JSX.Element => {

    const orderDialogData = useSelector((state: any) => state?.orderReducer?.orderDialogData)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {orderTheme} = useOrderTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    const onBackPressed = (): void => {
        onRequestClose();
    }

    return (
        <AppModal
            animationType="slide"
            transparent={true}
            show={show}
            onRequestClose={onBackPressed}>

            <View style={styles.modalViewContainer}>
                <ScrollView
                    contentContainerStyle={styles.scrollviewContent}
                    scrollEnabled={true}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>

                    <View style={[styles.scrollviewViewContainer, {backgroundColor: orderTheme?.backgroundColor,}]}>

                        <View style={styles.itemPickerContainer}>
                            {
                                orderDialogData.map(dataItem => {
                                    return <>
                                        <View key={dataItem?.orderId} style={{padding: 20}}>
                                            <View style={styles.itemHeadingContainer}>

                                                <AppText text={dataItem?.orderId} style={styles.itemPickerTitle}/>
                                                <AppText text={dataItem?.posOrderId} style={styles.itemPickerTitle}/>
                                                <AppText text={`${I18N.t('OfflineLabel')} - ${dataItem?.isOffline}`}
                                                         style={styles.itemPickerTitle}/>
                                                <AppText text={`${I18N.t('SyncedLabel')} - ${dataItem?.isSynced}`}
                                                         style={styles.itemPickerTitle}/>

                                            </View>

                                            <View style={styles.itemDetailContainer}>

                                                <AppText text={JSON.stringify(dataItem?.detail)}
                                                         style={styles.itemDetail}/>

                                            </View>
                                        </View>
                                    </>
                                })
                            }

                        </View>

                        <View style={styles.actionButtonContainer}>
                            <AppButton
                                style={styles.actionButton}
                                color={orderTheme?.primaryColor}
                                size={32}
                                withoutDelay={true}
                                title={I18N.t('CloseAction')}
                                onPress={onBackPressed}
                            />
                        </View>
                    </View>

                </ScrollView>
            </View>
        </AppModal>
    );
}

/**
 * @author Vipin Joshi
 * @since 15-07-2021
 * @description component view styles.
 */
const styles = StyleSheet.create({
    modalViewContainer: {
        flex: 1,
        marginTop: 22,
    },
    scrollviewContent: {
        flexGrow: 1,
    },
    scrollviewViewContainer: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        shadowColor: AppColors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minWidth: 370
    },
    itemPickerContainer: {
        margin: 8,
        flex: 1,
        borderColor: AppColors.americanSilver,
        borderRadius: 4,
        borderWidth: 2
    },
    itemHeadingContainer: {
        flexDirection: 'row'
    },
    itemPickerTitle: {
        fontSize: getDynamicFontSize(22),
        marginHorizontal: 8,
        fontWeight: 'bold'
    },
    itemDetailContainer: {
        marginBottom: 20,
        borderWidth: 2,
        padding: 20},
    itemDetail: {
        // color: AppColors.davysGrey
    },
    actionButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    actionButton: {
        borderWidth: 2,
        borderColor: AppColors.americanSilver,
        borderRadius: 4,
        marginHorizontal: 10,
    }
})

export default OrdersDialog;
