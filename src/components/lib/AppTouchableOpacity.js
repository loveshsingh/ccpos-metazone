import React from "react";
import {TouchableOpacity} from "react-native";

/**
 * @author Vipin Joshi.
 * @since 17-12-2021
 * @description custom Touchable Opacity Component.
 * <br />
 * Some defaults:
 * <br />
 * activityOpacity = 0.4
 */
const AppTouchableOpacity = ({style, children, onPress, activeOpacity = 0.4, disabled}): JSX.Element => {

    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            disabled={disabled}
            style={style}
            onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

export default AppTouchableOpacity