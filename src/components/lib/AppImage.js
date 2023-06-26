import React from "react";
import {Image} from "react-native";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Image Component.
 * @since 23-11-2021
 */
const AppImage = ({source, style, children, resizeMode, fadeDuration}): JSX.Element => {

    return (
        <Image
            source={source}
            style={style}
            resizeMode={resizeMode}
            fadeDuration={fadeDuration}>
            {children}
        </Image>
    )
}

export default AppImage