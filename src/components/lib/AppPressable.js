import React from "react";
import {Pressable} from "react-native";

/**
 * @author Lovesh Singh.
 * @since 26-02-2022
 * @description custom Pressable Component.
 * <br />
 * Some defaults:
 * <br />
 */
const AppPressable = ({style, children, onPress}): JSX.Element => {

    return (
        <Pressable
            style={style}
            onPress={onPress}>
            {children}
        </Pressable>
    )
}

export default AppPressable