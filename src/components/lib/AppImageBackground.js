import React from "react";
import {ImageBackground} from "react-native";
import {useTheme} from "../../base/contexts/ThemeProvider";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Image Background Component.
 * @since 23-11-2021
 */
const AppImageBackground = ({source, style, children}): JSX.Element => {

    const {theme} = useTheme()

    return (
        <ImageBackground source={source}
            style={[{backgroundColor: theme.backgroundColor}, style]}>
            {children}
        </ImageBackground>
    )
}

export default AppImageBackground