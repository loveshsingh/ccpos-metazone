import React from 'react';
import LottieView from "lottie-react-native";
import {getDynamicFontSize} from "../../../helper/Utility";
import AppProgressLoader from "../../lib/AppProgressLoader";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom category progress.
 * @since 16-02-2022
 */
const AppCategoryProgress = ({visible, totalItems, listColumns, itemsDirection}): JSX.Element => {

    const renderCategory = () => {
        return (
            <LottieView style={{
                height: getDynamicFontSize(30),
                marginLeft: 10,
                display: visible ? 'flex' : 'none'
            }} source={require('../../../assets/animation/category-loader.json')} autoPlay loop/>
        )
    }

    return (
        <AppProgressLoader totalItems={totalItems} listColumns={listColumns} renderItem={renderCategory} itemsDirection={itemsDirection}/>
    );
}

export default AppCategoryProgress;
