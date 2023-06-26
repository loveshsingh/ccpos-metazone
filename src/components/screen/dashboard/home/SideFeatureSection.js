import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from "react-native";
import {AppColors} from "../../../../assets/AppColors";
import CartFeatureSection from "./CartFeatureSection";
import CartListWrapper from "./CartListWrapper";
import {useDispatch, useSelector} from "react-redux";
import {Appbar} from "react-native-paper";
import I18N from "../../../../helper/translation";
import AppBar from "../../../lib/AppBar";
import AppText from "../../../lib/AppText";
import {clearProductCart} from "../../../../actions/dashboard/home";
import {height, getDynamicFontSize} from "../../../../helper/Utility";
import {useMessage} from "../../../../base/contexts/MessageProvider";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import CartListThemeProvider, {CartListThemeContext} from "../../../../base/theme contexts/CartListThemeProvider";
import CartFeatureThemeProvider from "../../../../base/theme contexts/CartFeatureThemeProvider";
import {useTheme} from "../../../../base/contexts/ThemeProvider";
import {Constant} from "../../../../helper/constant";

/**
 * @author Vipin Joshi.
 * @since 15-12-2021.
 * @description home screen Side Feature Section.
 * @return {JSX.Element}
 */
const SideFeatureSection = ({navigation, onPressHoldCart, onPressCart, showCartSection}): JSX.Element => {

    const TAG = 'SideFeatureSection'
    const {cartProducts, isComplimentarySelected} = useSelector((state: any) => state.dashboardHomeReducer)
    const cartFeatureAnimation = useRef(new Animated.Value(1)).current
    const [showCartFeature, setShowCartFeature] = useState(true)

    const dispatch = useDispatch();
    const message = useMessage()
    const {locale} = useLocale()
    const {theme} = useTheme()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    }, [locale])


    /**
     * @author Lovesh Singh.
     * @since 17-02-2022.
     * @description apply animation on cart feature section.
     */
    const toggleCartFeature = () => {
        Animated.timing(cartFeatureAnimation, {
            toValue: showCartFeature ? 0 : 1,
            duration: Constant.ANIMATION_DURATION,
            useNativeDriver: false
        }).start(finished => {
            if (finished) {
                setShowCartFeature(!showCartFeature)
            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={[styles.cartActionContainer, {display: showCartSection ? 'flex' : 'none', borderTopColor: theme?.secondaryColor, backgroundColor: theme?.secondaryBackgroundColor}]}>
                <Animated.View style={{
                    height: cartFeatureAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0%", "100%"],
                    }),
                    justifyContent: 'center',
                }}>
                    <CartFeatureThemeProvider>
                        <CartFeatureSection navigation={navigation}/>
                    </CartFeatureThemeProvider>
                </Animated.View>
                <View style={[styles.toggleCartFeature, {borderColor: theme?.secondaryColor, backgroundColor: theme?.secondaryBackgroundColor}]}>
                    <TouchableOpacity containerStyle={styles.innerToggleCart} onPress={toggleCartFeature}>
                        <AppIcon type={Icons.MaterialCommunityIcons}
                                 name={showCartFeature ? 'keyboard-off' : 'keyboard'}
                                 color={theme?.textColor}
                                 size={getDynamicFontSize(30)}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cartListContainer}>
                <CartListThemeProvider>
                    <CartListWrapper
                        cartProducts={cartProducts}
                        isComplimentarySelected={isComplimentarySelected}
                        readonly={false}
                    />
                </CartListThemeProvider>
            </View>
            <AppBar
                statusBarHeight={8}
                headerStyle={styles.cartSectionHeader}
                beforeContent={<>
                    <Appbar.Action icon="delete"
                                   style={{display: (cartProducts?.length > 0 && showCartSection) ? 'flex' : 'none'}}
                                   color={AppColors.colorBackgroundWhite}
                                   size={getDynamicFontSize(25)}
                                   onPress={() => {
                                       message.showAlert(I18N.t('AreYouSureLabelMsg'), {
                                           message: I18N.t('DeleteAllCartIemsWarningMsg'), buttons: [
                                               {
                                                   text: I18N.t('CancelAction'),
                                                   style: {
                                                       backgroundColor: AppColors.chineseWhite,
                                                       borderColor: AppColors.arsenic
                                                   },
                                                   buttonTextStyle: {
                                                       color: AppColors.arsenic
                                                   },
                                                   icon: <AppIcon type={Icons.MaterialIcons} name={'undo'}
                                                                  color={AppColors.arsenic}
                                                                  size={12} style={{marginRight: 8}}/>
                                               },
                                               {
                                                   text: I18N.t('CartDeleteAlertConfirmButtonLabel'),
                                                   icon: <AppIcon type={Icons.MaterialCommunityIcons} name={'page-next'}
                                                                  color={AppColors.white}
                                                                  size={12} style={{marginRight: 8}}/>,
                                                   onPress: () => {
                                                       dispatch(clearProductCart())
                                                   }
                                               },
                                           ]
                                       })
                                       //todo need to add a custom alert dialog.
                                   }}/>
                </>}
                // contentStyle={styles.cartSectionHeaderContent}
                title={
                    <AppText
                        text={I18N.t("CartLabel")}
                        style={styles.cartSectionHeaderText}
                    />}
                afterContent={<>
                    <Appbar.Action icon="cart-remove"
                                   color={AppColors.colorBackgroundWhite}
                                   size={getDynamicFontSize(25)}
                                   onPress={onPressCart}/>
                    <Appbar.Action icon="pause-circle-outline"
                                   style={{display: (cartProducts?.length > 0 && showCartSection) ? 'flex' : 'none'}}
                                   color={AppColors.colorBackgroundWhite}
                                   size={getDynamicFontSize(25)}
                                   onPress={() => {
                                       message.showAlert(I18N.t('AreYouSureLabelMsg'), {
                                           message: I18N.t('HoldCartWarningMsg'), buttons: [
                                               {
                                                   text: I18N.t('CancelAction'),
                                                   style: {
                                                       backgroundColor: AppColors.chineseWhite,
                                                       borderColor: AppColors.arsenic
                                                   },
                                                   buttonTextStyle: {
                                                       color: AppColors.arsenic
                                                   },
                                                   icon: <AppIcon type={Icons.MaterialIcons} name={'undo'}
                                                                  color={AppColors.arsenic}
                                                                  size={12} style={{marginRight: 8}}/>
                                               },
                                               {
                                                   text: I18N.t('HoldCartAlertConfirmButtonLabel'),
                                                   icon: <AppIcon type={Icons.MaterialCommunityIcons} name={'page-next'}
                                                                  color={AppColors.white}
                                                                  size={12} style={{marginRight: 8}}/>,
                                                   onPress: onPressHoldCart
                                               }
                                           ]
                                       })
                                   }}/>
                </>}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        flexDirection: 'column-reverse',
    },
    cartActionContainer: {
        maxHeight: getDynamicFontSize(220),
        borderTopWidth: 2,
        backgroundColor: AppColors.platinum,
        width: '100%',
        zIndex: 1,
        justifyContent: 'center',
    },
    cartListContainer: {
        flexGrow: 1,
    },
    cartSectionHeader: {
        flexGrow: 1,
        backgroundColor: AppColors.colorPrimary,
        alignItems: 'center',
        height: getDynamicFontSize(55),
        justifyContent: "center",
    },
    cartSectionHeaderText: {
        color: AppColors.colorBackgroundWhite,
        fontSize: getDynamicFontSize(22)
    },
    toggleCartFeature: {
        position: 'absolute',
        width: getDynamicFontSize(50),
        height: getDynamicFontSize(50),
        backgroundColor: AppColors.platinum,
        right: '44%',
        top: -getDynamicFontSize(50),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 2,
        borderBottomWidth: 0,
        zIndex: 1,
    },
    innerToggleCart: {
        width: getDynamicFontSize(50),
        height: getDynamicFontSize(50),
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default React.memo(SideFeatureSection, (prevProps, nextProps) => {
    return prevProps.showCartSection === nextProps.showCartSection
})
