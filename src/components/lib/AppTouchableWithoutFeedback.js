import React from "react";
import {TouchableWithoutFeedback} from "react-native";

/**
 * @author Vipin Joshi.
 * @since 13-01-2022
 * @description custom Touchable Without Feedback Component.
 * <br />
 * Some defaults:
 * <br />
 */
const AppTouchableWithoutFeedback = ({style, children, onPress}): JSX.Element => {

    return (
        <TouchableWithoutFeedback
            style={style}
            onPress={onPress}>
            {children}
        </TouchableWithoutFeedback>
    )
}

export default AppTouchableWithoutFeedback