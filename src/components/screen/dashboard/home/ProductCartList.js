import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from "react-native";
import I18N from "../../../../helper/translation";
import AppText from "../../../lib/AppText";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import {AppColors} from "../../../../assets/AppColors";
import CartProduct from "./CartProduct";
import {useSelector} from "react-redux";
import {AppFonts} from "../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../helper/Utility"
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useCartListTheme} from "../../../../base/theme contexts/CartListThemeProvider";
import AppFlatList from "../../../lib/AppFlatList";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description Product Cart List Component.
 * @since 15-12-2021
 */
const ProductCartList = ({data, onProductPress, readOnly}): JSX.Element => {
    const TAG = "ProductCartList"
    console.log(TAG, 'Re-rendering')

    const [products, setProducts] = useState(data)
    const listRef = useRef(undefined)

    const selectedProductIndex = useSelector((state: any) => state.dashboardHomeReducer.cartSelectedProductIndex);
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {cartListTheme} = useCartListTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    useEffect(() => {
        setProducts(data)
    }, [data])

    useEffect(() => {
        if (products && selectedProductIndex >= 0 && products.length > selectedProductIndex) {
            listRef.current.scrollToIndex({animated: true, index: selectedProductIndex});
        }
    }, [products])

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021
     * @description to render each Product Item unique key.
     * @returns {JSX.Element}
     */
    const keyExtractor = (item, index): string => index.toString()

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021
     * @description list scrolling error handler.
     * @returns {JSX.Element}
     */
    const onScrollToIndexFailedHandler = (error): void => {
        const offset = error.averageItemLength * error.index;
        listRef.current.scrollToOffset({offset});
    }

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021
     * @description to render list Item separator.
     * @returns {JSX.Element}
     */
    const renderListItemSeparator = (): JSX.Element => <View style={styles.itemSeparator}/>

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021.
     * @description product grid empty component.
     * @returns {JSX.Element}
     */
    const renderListEmptyComponent = (): JSX.Element => {
        return (
            <View style={[styles.listEmptyComponentContainer, {backgroundColor: cartListTheme?.backgroundColor}]}>
                <AppIcon name={'shopping-cart'} type={Icons.MaterialIcons} color={cartListTheme?.textColor} size={getDynamicFontSize(50)}/>
                <AppText style={[styles.listEmptyComponentText, {color: cartListTheme?.textColor}]} text={I18N.t('CartEmptyMsg')}/>
            </View>
        )
    }

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021.
     * @description to render cart list Item.
     * @returns {JSX.Element}
     */
    const renderCartItem = ({item, index}): JSX.Element => {
        return <CartProduct data={item} index={index} onProductPress={onProductPress} readOnly={readOnly}/>
    }

    return (
        <AppFlatList
            ref={listRef}
            contentContainerStyle={[styles.listContentStyle, {backgroundColor: cartListTheme?.backgroundColor}]}
            numColumns={1}
            initialNumToRender={1}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            data={products}
            keyExtractor={keyExtractor}
            extraData={products}
            onScrollToIndexFailed={onScrollToIndexFailedHandler}
            // ItemSeparatorComponent={renderListItemSeparator}
            ListEmptyComponent={renderListEmptyComponent}
            renderItem={renderCartItem}
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
        // fontWeight: 'bold',
        fontFamily: AppFonts.bold
    }
})

export default React.memo(ProductCartList, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length && prevProps.readOnly === nextProps.readOnly;
})
