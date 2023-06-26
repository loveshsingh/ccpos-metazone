import React, {useEffect, useState} from "react";
import {Searchbar} from "react-native-paper";
import {useTheme} from "../../base/contexts/ThemeProvider";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Text Input Component.
 * @since 17-05-2022
 */
const AppSearchBar = ({
                          style,
                          clearAccessibilityLabel,
                          searchAccessibilityLabel,
                          icon,
                          onChangeText,
                          value,
                          error,
                          secureText,
                          placeholder,
                          onIconPress,
                          inputStyle,
                          iconColor,
                          clearIcon,
                      }): JSX.Element => {

    const [data, setData] = useState(value)

    useEffect(() => {
        setData(value)
    }, [value, error, secureText])

    const {theme} = useTheme();
    // const {textInput} = theme;
    const {textInput} = theme;

    return (
        <Searchbar
            clearAccessibilityLabel={clearAccessibilityLabel}
            searchAccessibilityLabel={searchAccessibilityLabel}
            value={value} //to restore selector position with value
            icon={icon}
            onChangeText={onChangeText}
            onIconPress={onIconPress}
            inputStyle={inputStyle}
            style={[style, {backgroundColor: textInput?.backgroundColor}]}
            iconColor={iconColor}
            clearIcon={clearIcon}
            placeholder={placeholder}
            theme={{
                colors: {
                    text: textInput?.textColor,
                    placeholder: textInput?.placeholderColor,
                    backgroundColor: textInput?.backgroundColor,
                }
            }}
        />
    )
}

export default AppSearchBar
