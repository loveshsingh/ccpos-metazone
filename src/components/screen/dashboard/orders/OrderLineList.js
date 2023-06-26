import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, View} from "react-native";
import I18N from "../../../../helper/translation";
import AppText from "../../../lib/AppText";
import {AppColors} from "../../../../assets/AppColors";
import {AppFonts} from "../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../helper/Utility";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import AppFlatList from "../../../lib/AppFlatList";
import {Constant} from "../../../../helper/constant";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @description Order Line List Component.
 * @since 12-01-2022
 */
const OrderLineList = ({data}): JSX.Element => {

    const TAG = "OrderLineList"
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])


    /**
     * @author Lovesh Singh.
     * @since 12-01-2022
     * @description to render each Order Line Item unique key.
     * @returns {JSX.Element}
     */
    const keyExtractor = (item, index): string => index.toString()


    /**
     * @author Lovesh Singh.
     * @since 12-01-2022.
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
     * @since 12-01-2022.
     * @description to render order line list Item.
     * @returns {JSX.Element}
     */
    const renderOrderLineItem = ({item, index}): JSX.Element => {
        const OrderLineListOpacity = new Animated.Value(0)
        const OrderLineListTransform = new Animated.Value(-10)

        Animated.timing(OrderLineListOpacity, {
            toValue: 1,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 100,
            useNativeDriver: true
        }).start();

        Animated.timing(OrderLineListTransform, {
            toValue: 0,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 100,
            useNativeDriver: true
        }).start();

        return (
            <Animated.View style={[styles.orderListContainer, {
                opacity: OrderLineListOpacity, transform: [
                    {translateY: OrderLineListTransform},
                ],
            }]}>
                <AppText style={styles.itemTitleText} text={item.display_name}/>
                <AppText style={styles.itemPropText} text={`${I18N.t('OrderProductQtyLabel')} ${item.qty}`}/>
                <AppText style={styles.itemPropText}
                         text={`${I18N.t('OrderProductUnitPriceLabel')} ${item.price_unit}`}/>
                <AppText style={styles.itemPropText}
                         text={`${I18N.t('DiscountGivenLabel')} ${item.discount} ${I18N.t('DiscountUnitLabel')}`}/>
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
            renderItem={renderOrderLineItem}
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
        color: AppColors.arsenic,
        textAlign: 'center',
        margin: 12,
        fontSize: getDynamicFontSize(18),
        fontWeight: 'bold',
        fontFamily: AppFonts.bold
    },
    orderListContainer: {
        marginHorizontal: 8,
        marginVertical: 4
    },
    itemTitleText: {
        fontSize: getDynamicFontSize(16),
        fontWeight: '800',
        fontFamily: AppFonts.regular
    },
    itemPropText: {
        fontSize: getDynamicFontSize(12),
        fontWeight: '400',
        fontFamily: AppFonts.regular
    }
})

export default React.memo(OrderLineList, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length;
})
