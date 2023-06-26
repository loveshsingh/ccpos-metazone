import React from "react";
import {debounce} from "../../base/hook/app_hook";
import {Button} from "react-native-paper";
import {useTheme} from "../../base/contexts/ThemeProvider";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description custom React-Native-Paper Button Component.
 * @since 25-11-2021
 * todo currently no use.
 */
const AppPaperButton = ({mode, style, color, title, uppercase, dark, onPress}): JSX.Element => {

    const {theme} = useTheme()

    return (
        <Button
            style={style}
            mode={mode}
            color={color ? color : theme.primaryColor}
            uppercase={uppercase}
            dark={dark}
            onPress={debounce(onPress)}>
            {title}
        </Button>
    )
}

export default AppPaperButton