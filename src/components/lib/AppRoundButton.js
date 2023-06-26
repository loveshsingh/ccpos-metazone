import React, {useEffect, useState} from "react";
import {useTheme} from "../../base/contexts/ThemeProvider";
import {debounce} from "../../base/hook/app_hook";
import {Button} from "react-native-paper";
import {StyleSheet} from "react-native";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @description custom Round Button Component.
 * @since 03-02-2022
 * @param style object | array to style button.
 * @param labelStyle object | array to style button title.
 * @param title string label of button.
 * @param onPress Function on press event handler.
 * @param mode enum outlined, contained.
 * @param color string text color value.
 * @param borderColor string border color value
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
const AppRoundButton = ({
                       style,
                       labelStyle,
                       title,
                       onPress,
                       mode,
                       color,
                       borderColor,
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
        setBackgroundColor(type === 'primary' ? theme?.roundButton?.primaryBackgroundColor : theme?.roundButton?.secondaryBackgroundColor)
        setTextColor(type === 'primary' ? theme?.roundButton?.primaryTextColor : theme?.roundButton?.secondaryTextColor)
        setPaperTheme({colors: {primary: theme?.roundButton?.pressedColor}})
    }, [theme])

    return (
        <Button
            style={[styles.root,{backgroundColor: backgroundColor,borderColor: borderColor}, style]}
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

const styles = StyleSheet.create({
    root: {
    borderWidth: 1,
    borderRadius: 30,
    }
});

export default AppRoundButton