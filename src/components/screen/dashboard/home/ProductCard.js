import React, {useEffect, useRef, useState} from "react";
import {Animated, StyleSheet} from "react-native";
import {isCurrentDateSession, isString, SCREEN_WIDTH, width, getDynamicFontSize} from "../../../../helper/Utility";
import FastImage from "react-native-fast-image";
import AppCard from "../../../lib/AppCard";
import AppImage from "../../../lib/AppImage";
import AppText from "../../../lib/AppText";
import {useDispatch, useSelector} from "react-redux";
import {AppColors} from "../../../../assets/AppColors";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import {useMessage} from "../../../../base/contexts/MessageProvider";
import {AppFonts} from "../../../../assets/AppFonts";
import I18N from "../../../../helper/translation";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import {addProductToFavourite} from "../../../../actions/dashboard/home";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {useProductTheme} from "../../../../base/theme contexts/ProductThemeProvider";
import {Constant} from "../../../../helper/constant";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description Product Card Component.
 * @since 15-12-2021
 */
const ProductCard = ({data, onProductPress}): JSX.Element => {

    const TAG = "Product Card"

    console.log(TAG, 'Rendering')

    const message = useMessage()
    const [product, setProduct] = useState(data)
    const [favouriteProduct, setFavouriteProduct] = useState(data?.isFavourite)
    const sessionDetails = useSelector((state: any) => state.authReducer.sessionDetails)
    const isActiveDaySession = isCurrentDateSession(sessionDetails)
    const productOpacity = useRef(new Animated.Value(0)).current
    const productTransform = useRef(new Animated.Value(-10)).current
    const dispatch = useDispatch()
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {productTheme} = useProductTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    useEffect(() => {
        setProduct(data)
        setFavouriteProduct(data?.isFavourite)
        Animated.timing(productOpacity, {
            toValue: 1,
            duration: Constant.ANIMATION_DURATION,
            delay: 600,
            useNativeDriver: true
        }).start()
        Animated.timing(productTransform, {
            toValue: 0,
            duration: Constant.ANIMATION_DURATION,
            delay: 600,
            useNativeDriver: true
        }).start()
    }, [data])

    /**
     * @author Vipin Joshi.
     * @since 16-12-2021.
     * @description product press event handler.
     */
    const onPressProduct = (): void => {
        if (isActiveDaySession) {
            onProductPress(product)
        } else {
            message.showToast(I18N.t('ActiveSessionExpiredMsg'), {type: 'info'})
            console.log(TAG, 'onPressProduct: ', 'active session expired')
        }
    }

    /**
     * @author Lovesh Singh.
     * @since 29-04-2022.
     * @description favourite press event handler.
     */
    const onPressFavourite = (): void => {
        dispatch(addProductToFavourite(product, (isFavourite) => {
            setFavouriteProduct(isFavourite)
        }))
    }

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021.
     * @description to format product price for display.
     * @param price actual price.
     * @return formatted price.
     */
    const getFormattedPriceForDisplay = (price): string => {
        let priceToReturn = price
        if (isString(priceToReturn)) {
            priceToReturn = parseFloat(priceToReturn).toFixed(sessionDetails.currencyDecimalPlaces)
        }
        if (sessionDetails.currencyPosition === 'before') {
            priceToReturn = sessionDetails.currencySymbol + priceToReturn
        } else {
            priceToReturn = priceToReturn + sessionDetails.currencySymbol
        }
        return priceToReturn
    }

    return (
        <AppCard style={[styles.card, {opacity: productOpacity, transform: [{translateX: productTransform}], backgroundColor: productTheme?.card?.backgroundColor,}]}
                 elevation={12} childrenStyle={styles.cardChildren}>
            <AppTouchableOpacity
                style={styles.viewContainer}
                onPress={onPressProduct}>
                {'image_url' in product ? <FastImage
                    source={{uri: product.image_url}}
                    style={styles.productImage}
                    resizeMode={FastImage.resizeMode.cover}
                /> : <AppImage
                    source={require('../../../../assets/images/placeholder.png')}
                    resizeMode='contain'
                    style={styles.productImage}
                />}

                <AppText style={styles.productTitle} text={product.display_name} numberOfLines={2}/>
                <AppText style={styles.productPrice}
                         text={getFormattedPriceForDisplay(product.unit_price)}/>
                <AppTouchableOpacity style={{
                    position: 'absolute',
                    right: getDynamicFontSize(2),
                    bottom: getDynamicFontSize(2),
                }} onPress={onPressFavourite}>
                    <AppIcon name={product?.isFavourite ? 'star' : 'staro'} type={Icons.AntDesign}
                             color={product?.isFavourite ? AppColors.yellow : productTheme?.primaryColor}
                             size={getDynamicFontSize(20)}
                    />
                </AppTouchableOpacity>
            </AppTouchableOpacity>
        </AppCard>
    )
}

const styles = StyleSheet.create({
    card: {
        // ...AppStyleSheet.DashboardPageCardContainerstyle,
        // width: (width / 3) - 10,
        // maxWidth: (width / 3) - 10,
        width: getDynamicFontSize(140),
        height: getDynamicFontSize(200),
        borderColor: AppColors.chineseWhite,
        borderWidth: 1,
        borderRadius: 12,
        // marginBottom: 2,
        // marginRight: 5,
        // marginTop: 2,
        // marginLeft: 5,
        margin: getDynamicFontSize(5),
        // marginHorizontal: 10
        // flex: 1
    },
    cardChildren: {
        paddingHorizontal: 0,
        paddingBottom: 0
    },
    viewContainer: {
        // flex: 1,
        height: '100%'
    },
    productImage: {
        // flex: 1,
        // height: (((SCREEN_WIDTH / 13) * 8) / 4) - 8,
        height: '65%',
        width: '100%',
        // width: (((SCREEN_WIDTH / 13) * 8) / 4) - 8,
        padding: 8,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    productTitle: {
        fontSize: getDynamicFontSize(14),
        marginHorizontal: 8,
        fontFamily: AppFonts.bold,
    },
    productPrice: {
        fontSize: getDynamicFontSize(14),
        fontStyle: 'italic',
        // fontWeight: '700',
        marginHorizontal: 8,
        marginBottom: 10,
        fontFamily: AppFonts.regular,
    },
})

export default React.memo(ProductCard, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data;
})
