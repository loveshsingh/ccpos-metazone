import React, {useEffect, useState} from "react";
import {Text} from "react-native";
import {debounce} from "../../base/hook/app_hook";
import {useTheme} from "../../base/contexts/ThemeProvider";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description custom text Component.
 * @since 25-11-2021
 */
const AppText = ({style, text, onPress, numberOfLines}): JSX.Element => {

    const [textColor, setTextColor] = useState(undefined)
    const {theme} = useTheme();

    useEffect(() => {
        setTextColor(theme?.textColor)
    }, [theme])

    return (
        <Text style={[{color: textColor}, style]}
              onPress={onPress ? debounce(onPress) : onPress}
              numberOfLines={numberOfLines}>
            {text}
        </Text>
    )
}

export default AppText