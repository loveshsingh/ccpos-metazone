import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, View} from "react-native";
import I18N from "../../../../helper/translation";
import AppText from "../../../lib/AppText";
import {AppColors} from "../../../../assets/AppColors";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import {useDispatch, useSelector} from "react-redux";
import {SetSelectedCart} from "../../../../actions/dashboard/hold-cart";
import {AppFonts} from "../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../helper/Utility"
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useHoldOrderTheme} from "../../../../base/theme contexts/HoldOrderThemeProvider";
import AppFlatList from "../../../lib/AppFlatList";
import {Constant} from "../../../../helper/constant";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @description Hold Cart List Component.
 * @since 13-01-2022
 */
const HoldCartList = (): JSX.Element => {
    // noinspection JSUnusedLocalSymbols
    const TAG = "HoldCartList"

    const holdCarts = useSelector((state: any) => state.holdCartReducer.holdCarts)
    const selectedHoldCartIndex = useSelector((state: any) => +state.holdCartReducer?.selectedCartDetail?.index)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {holdOrderTheme} = useHoldOrderTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    const dispatch = useDispatch()


    /**
     * @author Lovesh Singh.
     * @since 14-01-2022.
     * @description zero placed handler.
     * @param num number to be placed.
     * @param places places to be placed.
     */
    const zeroPad = (num, places): string => {
        let zero = places - num.toString().length + 1
        return Array(+(zero > 0 && zero)).join("0") + num
    }

    /**
     * @author Lovesh Singh.
     * @since 11-01-2022.
     * @description hold-cart list press event handler.
     * @param holdCart pressed hold-cart.
     * @param holdCartIndex pressed hold-cart index.
     */
    const onPressHoldCart = (holdCart, holdCartIndex): void => {
        dispatch(SetSelectedCart({cart: holdCart, index: holdCartIndex}))
    }

    /**
     * @author Lovesh Singh.
     * @since 13-01-2022
     * @description to render each Hold Cart Item unique key.
     * @returns {JSX.Element}
     */
    const keyExtractor = (item, index): string => index.toString()

    /**
     * @author Lovesh Singh.
     * @since 13-01-2022.
     * @description hold cart list empty component.
     * @returns {JSX.Element}
     */
    const renderListEmptyComponent = (): JSX.Element => {
        return (
            <View style={styles.listEmptyComponentContainer}>
                <AppText style={styles.listEmptyComponentText} text={I18N.t('NoHoldOrdersFoundMsg')}/>
            </View>
        )
    }

    /**
     * @author Lovesh Singh.
     * @since 13-01-2022.
     * @description to render hold cart list Item.
     * @returns {JSX.Element}
     */
    const renderHoldCartItem = ({item, index}): JSX.Element => {
        const isItemSelected = selectedHoldCartIndex === index
        const itemBackgroundColor = isItemSelected ? holdOrderTheme?.primaryColor : undefined
        const itemTextColor = isItemSelected ? holdOrderTheme?.primaryTextColor : holdOrderTheme?.textColor

        const selectedHoldOrderOpacity = new Animated.Value(isItemSelected ? 0 : 1)
        const selectedHoldOrderTransform = new Animated.Value(isItemSelected ? -10 : 0)

        if (isItemSelected) {
            Animated.timing(selectedHoldOrderOpacity, {
                toValue: 1,
                duration: Constant.ANIMATION_DURATION,
                delay: index * 100,
                useNativeDriver: true
            }).start();

            Animated.timing(selectedHoldOrderTransform, {
                toValue: 0,
                duration: Constant.ANIMATION_DURATION,
                delay: index * 100,
                useNativeDriver: true
            }).start();
        }

        return (
            <Animated.View style={{
                opacity: selectedHoldOrderOpacity, transform: [
                    {translateY: selectedHoldOrderTransform},
                ],
            }}>
                <AppTouchableOpacity
                    style={[styles.holdCartItem, {backgroundColor: itemBackgroundColor}]}
                    onPress={onPressHoldCart.bind(this, item, index)}>

                    <AppText style={[styles.holdCartText, {color: itemTextColor}]}
                             text={`${I18N.t('PoundSymbol')} ${zeroPad(item?.id, 5)}`}/>

                </AppTouchableOpacity>
            </Animated.View>
        )
    }

    return (
        <View style={[styles.holdCartListContainer, {backgroundColor: holdOrderTheme?.backgroundColor}]}>
            <AppFlatList
                contentContainerStyle={styles.listContentStyle}
                scrollEnabled={true}
                data={holdCarts}
                keyExtractor={keyExtractor}
                extraData={holdCarts}
                ListEmptyComponent={renderListEmptyComponent}
                renderItem={renderHoldCartItem}
            />
        </View>
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
    holdCartListContainer: {
        flex: 1,
        padding: 8
    },
    holdCartItem: {
        marginVertical: 2,
    },
    holdCartText: {
        fontSize: getDynamicFontSize(16),
        paddingHorizontal: 8,
        paddingVertical: 4,
        textAlign: 'center',
        color: AppColors.white,
        fontFamily: AppFonts.bold
    }
})

export default React.memo(HoldCartList, () => true)
