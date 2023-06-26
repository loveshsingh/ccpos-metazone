import React, {useEffect, useState} from "react";
import {useTheme} from "../../base/contexts/ThemeProvider";
import {debounce} from "../../base/hook/app_hook";
import {Button} from "react-native-paper";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description custom Button Component.
 * @since 23-11-2021
 * @param style object | array to style button.
 * @param labelStyle object | array to style button title.
 * @param title string label of button.
 * @param onPress Function on press event handler.
 * @param mode enum outlined, contained.
 * @param color string text color value.
 * @param uppercase boolean true/ false.
 * @param dark boolean true/ false.
 * @param height number button height.
 * @param margin number button margin.
 * @param type enum primary, secondary.
 * @param icon icon generate function (size, color) => JSX.Element
 * @param withoutDelay true/ false to remove delay on press event.
 * @param debounceDelay delay press event in milliseconds.
 * @param disabled true/false to disable button.
 */
const AppButton = ({
                       style,
                       labelStyle,
                       title,
                       onPress,
                       mode,
                       color,
                       uppercase,
                       dark,
                       height,
                       margin,
                       type,
                       icon,
                       withoutDelay,
                       debounceDelay,
                       disabled
                   }): JSX.Element => {

    const {theme} = useTheme()
    const [backgroundColor, setBackgroundColor] = useState(undefined)
    const [textColor, setTextColor] = useState(undefined)
    const [paperTheme, setPaperTheme] = useState({})

    useEffect(() => {
        setBackgroundColor(type === 'primary' ? theme?.button?.primaryBackgroundColor : theme?.button?.secondaryBackgroundColor)
        setTextColor(type === 'primary' ? theme?.button?.primaryTextColor : theme?.button?.secondaryTextColor)
        setPaperTheme({colors: {primary: theme?.button?.pressedColor}})
    }, [theme])

    return (
        <Button
            style={[{backgroundColor: backgroundColor}, style]}
            mode={mode}
            uppercase={uppercase}
            dark={dark}
            height={height}
            labelStyle={[{color: color ? color : textColor}, labelStyle]}
            margin={margin ? margin : 0}
            onPress={withoutDelay ? onPress : debounceDelay ? debounce(onPress, debounceDelay) : debounce(onPress)}
            icon={icon}
            disabled={disabled}
            theme={paperTheme}>
            {title}
        </Button>
    )
};

export default AppButton