import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import I18N from "../../../../helper/translation";
import ProductCard from "./ProductCard";
import AppImage from "../../../lib/AppImage";
import AppText from "../../../lib/AppText";
import {AppFonts} from "../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../helper/Utility"
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useProductTheme} from "../../../../base/theme contexts/ProductThemeProvider";
import AppFlatList from "../../../lib/AppFlatList";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description Product Grid Component.
 * @since 14-12-2021
 */
const ProductGrid = ({data, onProductPress}): JSX.Element => {

    const TAG = 'ProductGrid'
    console.log(TAG, 'Rendering')

    const [products, setProducts] = useState(data)
    const [stopProductListFetchMore, setStopProductListFetchMore] = useState(true)
    const [productListLoading, setProductListLoading] = useState(false)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {productTheme} = useProductTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    }, [locale])

    useEffect(() => {
        const initProducts = async ():void => {
            setProducts(data)
        }
        initProducts()
    }, [data])

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021
     * @description to render each Product Item unique key.
     * @returns {JSX.Element}
     */
    const keyExtractor = (item, index): string => index.toString()

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021.
     * @description product grid empty component.
     * @returns {JSX.Element}
     */
    const renderProductItem = ({item, index}): JSX.Element => {
        return <ProductCard
            data={item}
            index={index}
            onProductPress={onProductPress}
        />
    }

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021.
     * @description product grid empty component.
     * @returns {JSX.Element}
     */
    const renderListEmptyComponent = (): JSX.Element => {
        return (
            <View style={[styles.emptyComponentContainer, {backgroundColor: productTheme?.backgroundColor}]}>
                <AppImage
                    source={require("../../../../assets/images/ic_empty_bag.png")}
                    style={styles.emptyComponentImage}/>
                <AppText style={styles.emptyComponentText} text={I18N.t('NoProductsFoundMsg')}/>
            </View>
        )
    }

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021.
     * @description to render List Footer.
     * @return {JSX.Element}
     */
    const renderListFooter = (): JSX.Element => {
        return null
    }

    /**
     * @author Vipin Joshi.
     * @since 27-10-2021.
     * @description to handle Product List Scroll End Reached.
     * @return {JSX.Element}
     * @see renderMainSection
     */
    const handleProductListOnEndReached = async (): void => {
        setProductListLoading(true)
    }

    return (
        <AppFlatList
            scrollEnabled={true}
            data={products}
            columnWrapperStyle={{flexWrap: 'wrap', justifyContent: 'center'}}
            contentContainerStyle={[styles.listContentStyle, {backgroundColor: productTheme?.backgroundColor}]}
            // initialNumToRender={+this.state?.productListPerPage}
            keyExtractor={keyExtractor}
            numColumns={12}
            extraData={products}
            onEndReached={handleProductListOnEndReached}
            onEndReachedThreshold={0.5}
            onScrollBeginDrag={() => {
                setStopProductListFetchMore(false)
            }}
            renderItem={renderProductItem}
            ListEmptyComponent={renderListEmptyComponent}
            ListFooterComponent={renderListFooter}
        />
    )
};

const styles = StyleSheet.create({
    listContentStyle: {
        flexGrow: 1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
    },
    emptyComponentContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 12
    },
    emptyComponentImage: {
        alignSelf: 'center',
        margin: 12,
        width: getDynamicFontSize(100),
        height: getDynamicFontSize(100)
    },
    emptyComponentText: {
        // color: AppColors.arsenic,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: getDynamicFontSize(18),
        margin: 12,
        fontFamily: AppFonts.bold,
    },
})


export default React.memo(ProductGrid, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data && prevProps.data?.length === nextProps.data?.length;
})
