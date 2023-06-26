import React, {useEffect, useState} from "react";
import {Checkbox} from "react-native-paper";
import {debounce} from "../../base/hook/app_hook";
import {useTheme} from "../../base/contexts/ThemeProvider";
import {AppColors} from "../../assets/AppColors";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description custom Checkbox Component.
 * @since 25-11-2021
 */
const AppCheckbox = ({style, onPress, checked}): JSX.Element => {

    const [data, setData] = useState(false)

    useEffect(() => {
        setData(checked)
    }, [checked])

    const {theme} = useTheme();

    return (
        <Checkbox
            style={style}
            status={data ? 'checked' : 'unchecked'}
            onPress={debounce(onPress)}
            uncheckedColor={theme?.checkbox?.uncheckedColor}
            color={theme?.checkbox?.checkedColor}
        />
    )
}

export default AppCheckbox