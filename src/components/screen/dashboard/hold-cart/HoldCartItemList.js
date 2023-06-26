import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, View} from "react-native";
import I18N from "../../../../helper/translation";
import AppText from "../../../lib/AppText";
import {AppColors} from "../../../../assets/AppColors";
import FastImage from "react-native-fast-image";
import {useSelector} from "react-redux";
import {AppFonts} from "../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../helper/Utility"
import {useLocale} from "../../../../base/contexts/I18NProvider";
import AppFlatList from "../../../lib/AppFlatList";
import {Constant} from "../../../../helper/constant";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @description Hold Cart Item List Component.
 * @since 13-01-2022
 */
const HoldCartItemList = ({data}): JSX.Element => {
    // noinspection JSUnusedLocalSymbols
    const TAG = "HoldCartItemList"
    const sessionDetails = useSelector((state: any) => state.authReducer.sessionDetails)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])


    /**
     * @author Lovesh Singh.
     * @since 13-01-2022
     * @description to render each Hold Cart Item unique key.
     * @returns {JSX.Element}
     */
    const keyExtractor = (item, index): string => index.toString()

    /**
     * @author Lovesh Singh.
     * @since 13-01-2022
     * @description to render list Item separator.
     * @returns {JSX.Element}
     */
    const renderListItemSeparator = (): JSX.Element => <View style={styles.itemSeparator}/>

    /**
     * @author Lovesh Singh.
     * @since 13-01-2022.
     * @description hold cart item list empty component.
     * @returns {JSX.Element}
     */
    const renderListEmptyComponent = (): JSX.Element => {
        return (
            <View style={styles.listEmptyComponentContainer}>
                <AppText style={styles.listEmptyComponentText} text={I18N.t('NoHoldCartDetailsFoundMsg')}/>
            </View>
        )
    }

    /**
     * @author Lovesh Singh.
     * @since 15-01-2022
     * @description to get Item Price
     * @param price price of Item
     * @returns string
     */
    const itemPrice = (price): any => {
        let priceToReturn = price

        if (typeof (priceToReturn) == 'string') {
            priceToReturn = +(priceToReturn).toFixed(sessionDetails.currencyDecimalPlaces)
        }

        if (sessionDetails.currencyPosition === 'before') {
            priceToReturn = `${sessionDetails.currencySymbol}${priceToReturn}`
        } else {
            priceToReturn = `${priceToReturn}${sessionDetails.currencySymbol}`
        }

        return priceToReturn
    }

    /**
     * @author Lovesh Singh.
     * @since 13-01-2022.
     * @description to render hold cart list Item.
     * @returns {JSX.Element}
     */
    const renderHoldCartItem = ({item, index}): JSX.Element => {
        const HoldCartDetailOpacity = new Animated.Value(0)
        const HoldCartDetailTransform = new Animated.Value(-10)

        Animated.timing(HoldCartDetailOpacity, {
            toValue: 1,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 100,
            useNativeDriver: true
        }).start();

        Animated.timing(HoldCartDetailTransform, {
            toValue: 0,
            duration: Constant.ANIMATION_DURATION,
            delay: index * 100,
            useNativeDriver: true
        }).start();

        return (
            <Animated.View style={[styles.itemContainer, {
                opacity: HoldCartDetailOpacity, transform: [
                    {translateY: HoldCartDetailTransform},
                ],
            }]}>

                <AppText style={styles.itemPrice}
                         text={itemPrice((item.price_tax_exclusive - item.applied_discount_value) * item.cartQty)}/>

                <View style={styles.itemDetail}>

                    <AppText style={styles.displayName} text={item.display_name}/>
                    <AppText style={styles.itemText} text={`${I18N.t('QuantityLabel')} ${item.cartQty}`}/>
                    <AppText style={styles.itemText}
                             text={`${I18N.t('DiscountGivenLabel')} ${item.applied_discount_value}`}/>

                </View>

                <FastImage
                    source={{
                        uri: item.image_url,
                    }}
                    style={styles.itemImage}
                    resizeMode={FastImage.resizeMode.contain}
                />
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
            ItemSeparatorComponent={renderListItemSeparator}
            ListEmptyComponent={renderListEmptyComponent}
            renderItem={renderHoldCartItem}
        />
    )
}

const styles = StyleSheet.create({
    listContentStyle: {flexGrow: 1},
    itemSeparator: {
        height: 1,
        backgroundColor: AppColors.americanSilver,
    },
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
    itemContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        padding: 8,
    },
    itemDetail: {
        marginRight: 8,
        flex: 1,
        justifyContent: 'flex-start'
    },
    itemPrice: {
        fontSize: getDynamicFontSize(16),
        // color: AppColors.arsenic,
        fontFamily: AppFonts.bold
    },
    displayName: {
        fontSize: getDynamicFontSize(14),
        textAlign: 'left',
        fontFamily: AppFonts.bold
    },
    itemText: {
        fontSize: getDynamicFontSize(12),
        textAlign: 'left',
        fontFamily: AppFonts.regular
    },
    itemImage: {
        width: 90,
        height: 60
    }
})

export default React.memo(HoldCartItemList, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length;
})
