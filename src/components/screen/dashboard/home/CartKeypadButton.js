import React, {useEffect, useState} from 'react';
import {StyleSheet} from "react-native";
import AppTouchableOpacity from "../../../lib/AppTouchableOpacity";
import {AppColors} from "../../../../assets/AppColors";
import AppText from "../../../lib/AppText";
import {getDynamicFontSize} from "../../../../helper/Utility";
import {useLocale} from "../../../../base/contexts/I18NProvider";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @description Cart Keypad Button Component.
 * @since 24-12-2021
 */
const CartKeypadButton = ({style, titleStyle, value, title, onPress}): JSX.Element => {

    const [data, setData] = useState(value)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    useEffect(() => {
        setData(value)
    }, [value])

    return (
        <AppTouchableOpacity
            style={[styles.container, style]}
            onPress={onPress ? onPress.bind(this, data) : undefined}>
            <AppText style={[styles.title, titleStyle]} text={title}/>
        </AppTouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        borderColor: AppColors.americanSilver,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: getDynamicFontSize(16),
        textAlign: 'center'
    }
})

export default CartKeypadButton;
