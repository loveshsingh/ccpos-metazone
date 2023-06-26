import React from 'react';
import LottieView from "lottie-react-native";
import {getDynamicFontSize} from "../../../helper/Utility";
import AppProgressLoader from "../../lib/AppProgressLoader";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom payment method progress.
 * @since 25-02-2022
 */
const AppPaymentMethodProgress = ({visible, totalItems}): JSX.Element => {

    /**
     * @author Lovesh Singh.
     * @since 25-02-2022
     * @description to render each payment method Item unique key.
     * @returns {JSX.Element}
     */
    const renderPaymentSkeleton = () => {
        return (
            <LottieView style={{
                height: getDynamicFontSize(100),
                display: visible ? 'flex' : 'none'
            }} source={require('../../../assets/animation/paymentLoad.json')} autoPlay loop/>
        )
    }


    return (
        <AppProgressLoader totalItems={totalItems} renderItem={renderPaymentSkeleton}/>
    )
}

export default AppPaymentMethodProgress;
