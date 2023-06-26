import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, View} from "react-native";
import I18N from "../../../../helper/translation";
import AppText from "../../../lib/AppText";
import {AppColors} from "../../../../assets/AppColors";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import {useSelector} from "react-redux";
import {isString, getDynamicFontSize} from "../../../../helper/Utility";
import {AppFonts} from "../../../../assets/AppFonts";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useOrderTheme} from "../../../../base/theme contexts/OrderThemeProvider";
import AppFlatList from "../../../lib/AppFlatList";
import {Constant} from "../../../../helper/constant";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @description Order List Component.
 * @since 11-01-2022
 */
const OrderList = ({data, onPress}): JSX.Element => {
    // noinspection JSUnusedLocalSymbols
    const TAG = "OrderList"

    const selectedOrderIndex = useSelector((state: any) => +state.orderReducer?.selectedOrderDetail?.index);
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {orderTheme} = useOrderTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    /**
     * @author Lovesh Singh.
     * @since 11-01-2022
     * @description to render each Order Item unique key.
     * @returns {JSX.Element}
     */
    const keyExtractor = (item, index): string => index?.toString()

    /**
     * @author Lovesh Singh.
     * @since 11-01-2022.
     * @description order list empty component.
     * @returns {JSX.Element}
     */
    const renderListEmptyComponent = (): JSX.Element => {
        return (
            <View style={styles.listEmptyComponentContainer}>
                <AppText style={styles.listEmptyComponentText} text={I18N.t('NoOrdersFoundMsg')}/>
            </View>
        )
    }

    /**
     * @author Lovesh Singh.
     * @since 11-01-2022.
     * @description to render order list Item.
     * @returns {JSX.Element}
     */
    const renderOrderItem = ({item, index}): JSX.Element => {
        const isItemSelected = selectedOrderIndex === index
        const itemBackgroundColor = isItemSelected ? orderTheme?.primaryColor : undefined
        const itemTextColor = isItemSelected ? orderTheme?.primaryTextColor : orderTheme?.textColor
        const selectedOrderListOpacity = new Animated.Value(isItemSelected ? 0 : 1)
        const selectedOrderListTransform = new Animated.Value(isItemSelected ? -10 : 0)

        if (isItemSelected) {
            Animated.timing(selectedOrderListOpacity, {
                toValue: 1,
                duration: Constant.ANIMATION_DURATION,
                delay: index * 100,
                useNativeDriver: true
            }).start();

            Animated.timing(selectedOrderListTransform, {
                toValue: 0,
                duration: Constant.ANIMATION_DURATION,
                delay: index * 100,
                useNativeDriver: true
            }).start();
        }

        let orderDetailsString = item?.orderDetailsString
        if (isString(orderDetailsString)) {
            orderDetailsString = JSON.parse(orderDetailsString)
        }

        return (
            <Animated.View style={{
                opacity: selectedOrderListOpacity, transform: [
                    {translateY: selectedOrderListTransform},
                ],
            }}>
                <AppTouchableOpacity
                    style={[styles.orderItem, {backgroundColor: itemBackgroundColor}]}
                    onPress={onPress.bind(this, item, index)}>

                    <AppText style={[styles.orderText, {color: itemTextColor}]}
                             text={orderDetailsString?.reference_seq_no}/>
                    <AppIcon
                        type={Icons.MaterialIcons}
                        name={"error"}
                        size={getDynamicFontSize(25)}
                        color={AppColors.venetianRed}
                        style={{display: item?.isFailed ? 'flex' : 'none'}}
                    />

                </AppTouchableOpacity>
            </Animated.View>
        )
    }

    return (
        <AppFlatList
            contentContainerStyle={styles.listContentStyle}
            scrollEnabled={true}
            data={data}
            keyExtractor={keyExtractor}
            extraData={data}
            ListEmptyComponent={renderListEmptyComponent}
            renderItem={renderOrderItem}
        />
    )
}

const styles = StyleSheet.create({
    listContentStyle: {flexGrow: 1},
    listEmptyComponentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    listEmptyComponentText: {
        // color: AppColors.arsenic,
        textAlign: 'center',
        margin: 12,
        fontSize: getDynamicFontSize(18),
        fontWeight: 'bold',
        fontFamily: AppFonts.bold
    },
    orderItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    orderText: {
        fontSize: getDynamicFontSize(16),
        paddingHorizontal: 8,
        paddingVertical: 4,
        textAlign: 'center',
        color: AppColors.white,
        fontFamily: AppFonts.regular
    }
})

export default React.memo(OrderList, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length;
})
