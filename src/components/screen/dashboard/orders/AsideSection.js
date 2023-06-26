import React, {useEffect, useState} from 'react';
import {StyleSheet, View,} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppColors} from "../../../../assets/AppColors";
import OrderList from "./OrderList";
import I18N from "../../../../helper/translation";
import {SetSelectedOrder, SetSelectedTab} from "../../../../actions/dashboard/orders";
import AppText from "../../../lib/AppText";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import {Constant} from "../../../../helper/constant";
import {AppFonts} from "../../../../assets/AppFonts";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useOrderTheme} from "../../../../base/theme contexts/OrderThemeProvider";

/**
 * @author Lovesh Singh.
 * @since 11-01-2022.
 * @description order screen Order List Container.
 * @return {JSX.Element}
 */
const AsideSection = (): JSX.Element => {

    // noinspection JSUnusedLocalSymbols
    const TAG = 'AsideSection'

    const {orders, selectedTab} = useSelector((state: any) => state?.orderReducer)
    const dispatch = useDispatch()
    const [isOfflineSelected, setIsOfflineSelected] = useState(false)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {orderTheme} = useOrderTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])


    /**
     * @author Lovesh Singh.
     * @since 11-01-2022.
     * @description render initial order list.
     */
    useEffect(() => {
        setIsOfflineSelected(selectedTab === Constant.TAB_OFFLINE)
    }, [selectedTab])

    /**
     * @author Lovesh Singh.
     * @since 11-01-2022.
     * @description order list press event handler.
     * @param order pressed order.
     * @param orderIndex pressed order index.
     */
    const onPressOrder = (order, orderIndex): void =>
        dispatch(SetSelectedOrder({order: order, index: orderIndex}))

    /**
     * @author Lovesh Singh.
     * @since 11-01-2022.
     * @description online order tab press event handler.
     */
    const onPressOnline = (): void => {
        dispatch(SetSelectedTab(Constant.TAB_ONLINE))
    }

    /**
     * @author Lovesh Singh.
     * @since 11-01-2022.
     * @description offline order tab press event handler.
     */
    const onPressOffline = (): void =>
        dispatch(SetSelectedTab(Constant.TAB_OFFLINE))


    return (
        <View style={[styles.orderListMainContainer, {backgroundColor: orderTheme?.backgroundColor}]}>

            <View style={[styles.ordersListTabs, {borderColor: orderTheme?.primaryColor}]}>

                <AppTouchableOpacity
                    style={[styles.ordersListStatus, {
                        backgroundColor: isOfflineSelected ? orderTheme?.backgroundColor : orderTheme?.primaryColor
                    }]}
                    onPress={onPressOnline}>
                    <AppText
                        style={[styles.orderTabText,
                            {color: isOfflineSelected ? orderTheme?.primaryColor : orderTheme?.primaryTextColor}
                        ]}
                        text={I18N.t('OnlineStatus')}/>
                </AppTouchableOpacity>

                <AppTouchableOpacity
                    style={[styles.ordersListStatus, {
                        backgroundColor: isOfflineSelected ? orderTheme?.primaryColor : orderTheme?.backgroundColor
                    }]}
                    onPress={onPressOffline}>
                    <AppText
                        style={[styles.orderTabText,
                            {color: isOfflineSelected ? orderTheme?.primaryTextColor : orderTheme?.primaryColor}
                        ]}
                        text={I18N.t('OfflineStatus')}/>
                </AppTouchableOpacity>

            </View>

            <View style={styles.orderListContainer}>
                <OrderList data={orders} onPress={onPressOrder}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    orderListMainContainer: {
        flex: 1,
        padding: 10,
    },
    orderTabText: {
        textAlign: 'center',
        fontFamily: AppFonts.bold
    },
    orderListContainer: {
        flex: 1,
    },
    ordersListTabs: {
        flexDirection: 'row',
        marginTop: 10,
        borderWidth: 1,
        marginBottom: 8,
    },
    ordersListStatus: {
        flex: 1,
        padding: 4,
    },
})

export default React.memo(AsideSection, () => true);
