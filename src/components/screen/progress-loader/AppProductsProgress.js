import React from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from "lottie-react-native";
import {AppColors} from "../../../assets/AppColors";
import {getDynamicFontSize} from "../../../helper/Utility";
import AppProgressLoader from "../../lib/AppProgressLoader";
import AppText from "../../lib/AppText";
import {AppFonts} from "../../../assets/AppFonts";
import I18N from "../../../helper/translation";
import {useProductTheme} from "../../../base/theme contexts/ProductThemeProvider";


/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom products progress.
 * @since 16-02-2022
 */
const AppProductsProgress = ({visible, totalItems, listColumns}): JSX.Element => {

    const {productTheme} = useProductTheme()

    /**
     * @author Lovesh Singh.
     * @since 16-02-2022
     * @description to render each Product Item unique key.
     * @returns {JSX.Element}
     */
    const renderProduct = () => {
        return (
            <View style={[styles.productContainer, {display: visible ? 'flex' : 'none'}]}>
                <LottieView style={{
                    height: getDynamicFontSize(200),
                }} source={require('../../../assets/animation/productCardLoader.json')} autoPlay loop/>
                <AppText text={I18N.t('LoadingProductsMsg')} style={styles.productLoadingText}/>
            </View>
        )
    }

    return (
        <View style={{display: visible ? 'flex' : 'none', flexGrow: 1, justifyContent: 'center', backgroundColor: productTheme?.backgroundColor}}>
            <AppProgressLoader totalItems={totalItems} listColumns={listColumns} renderItem={renderProduct} />
        </View>
    );
}

const styles = StyleSheet.create({
    productContainer: {flex: 1, alignItems: "center", justifyContent: 'center'},
    productLoadingText: {
        textAlign: 'center',
        // color: AppColors.arsenic,
        fontSize: getDynamicFontSize(18),
        fontFamily: AppFonts.bold
    }
})

export default AppProductsProgress;
