import React, {useEffect, useState} from "react";
import {TextInput} from "react-native-paper";
import {useTheme} from "../../base/contexts/ThemeProvider";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Text Input Component.
 * @since 25-11-2021
 */
const AppTextInput = ({
                          style,
                          label,
                          mode,
                          onChangeText,
                          onFocus,
                          onBlur,
                          value,
                          error,
                          secureText,
                          placeholder,
                          disabled,
                          multiline,
                          numberOfLines,
                          keyboardType,
                          fontSize
                      }): JSX.Element => {

    const [data, setData] = useState(value)
    const [errorData, setErrorData] = useState(error)
    const [isSecureText, setIsSecureText] = useState(secureText)

    useEffect(() => {
        setData(value)
        setErrorData(error)
        setIsSecureText(secureText)
    }, [value, error, secureText])

    const {theme} = useTheme();
    const {textInput} = theme;

    return (
        <TextInput
            label={label}
            value={value} //to restore selector position with value
            mode={mode ? mode : "outlined"}
            error={errorData}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            style={style}
            multiline={multiline}
            secureTextEntry={isSecureText}
            selectionColor={textInput?.selectionColor}
            placeholder={placeholder}
            keyboardType={keyboardType}
            disabled={disabled}
            numberOfLines={numberOfLines}
            fontSize={fontSize}
            // underlineColor={'#FAAAAF'}
            outlineColor={textInput?.outlineColor}
            activeOutlineColor={textInput?.activeOutlineColor}
            theme={{
                colors: {
                    text: textInput?.textColor,
                    placeholder: textInput?.placeholderColor,
                    ...(textInput?.backgroundColor ? {background: textInput?.backgroundColor} : null)
                }
            }}
        />
    )
}

export default AppTextInput
