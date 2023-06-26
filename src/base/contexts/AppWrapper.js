import React from "react";
import {useFonts} from 'expo-font';

/**
 * @author Lovesh Singh.
 * @since 25-01-2021.
 * @description to load Configurations.
 */
const AppWrapper = ({children}): JSX.Element => {

    const [loadingFonts] = useFonts({
        RobotoBold: require('../../assets/fonts/Roboto-Bold.ttf'),
        RobotoRegular: require('../../assets/fonts/Roboto-Regular.ttf'),
        RobotoThin: require('../../assets/fonts/Roboto-Thin.ttf'),
        Niconne: require('../../assets/fonts/Niconne-Regular.ttf'),
        Norican: require('../../assets/fonts/Norican-Regular.ttf'),
        VT323: require('../../assets/fonts/VT323-Regular.ttf'),
    });

    if (!loadingFonts) {
        return null;
    }

    return children
};

export default AppWrapper