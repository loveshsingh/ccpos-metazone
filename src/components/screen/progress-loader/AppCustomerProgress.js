import React from 'react';
import LottieView from "lottie-react-native";
import {getDynamicFontSize} from "../../../helper/Utility";
import AppProgressLoader from "../../lib/AppProgressLoader";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom customers progress.
 * @since 25-02-2022
 */
const AppCustomerProgress = ({visible, totalItems}): JSX.Element => {

    /**
     * @author Lovesh Singh.
     * @since 25-02-2022
     * @description to render each customer Item unique key.
     * @returns {JSX.Element}
     */
    const renderCustomerSkeleton = () => {
        return (
            <LottieView style={{
                height: getDynamicFontSize(40),
                display: visible ? 'flex' : 'none'
            }} source={require('../../../assets/animation/customerLoad.json')} autoPlay loop/>
        )
    }

    return (
        <AppProgressLoader totalItems={totalItems} renderItem={renderCustomerSkeleton}/>
    )
}

export default AppCustomerProgress;
