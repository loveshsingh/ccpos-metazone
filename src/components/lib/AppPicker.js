import {Text, View, StyleSheet} from "react-native";
import {Picker} from "@react-native-community/picker";
import React, {useEffect, useState} from "react";
import {useTheme} from "../../base/contexts/ThemeProvider";
import {AppColors} from "../../assets/AppColors";

/**
 * @author Vipin Joshi.
 * @since 20-07-2021.
 * @description Functional Picker Component.
 * @param props
 * @returns {JSX.Element}
 * @constructor Props
 * @see Picker
 * @see AppPickerProp
 */
const AppPicker = (props: AppPickerProp) => {

    const [data, setData] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [initialItem, setInitialItem] = useState(undefined)
    const {theme} = useTheme()

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    useEffect(() => {
        if (props.disabled)
            setDisabled(props.disabled)
        else
            setDisabled(false)
    }, [props.disabled])

    useEffect(() => {
        setInitialItem(props.initialItem)
    }, [props.initialItem])

    return (
        <View style={[styles.container,props.style, { backgroundColor: theme?.textInput?.backgroundColor, borderColor: disabled ? theme?.textInput?.disabledTextColor : theme?.textInput?.outlineColor,}]}>
            <Text style={[styles.titleText, {display: props?.title ? 'flex' : 'none', color: disabled ? theme?.textInput?.disabledTextColor : theme?.textInput?.placeholderColor}]}>{props?.title}</Text>
            <Picker {...props} enabled={!disabled} style={{color: disabled ? theme?.disabledTextColor : theme?.textColor}}>
                {
                    initialItem ? <Picker.Item
                        key={'-1'}
                        label={initialItem?.name}
                        value={initialItem?.id}
                    /> : null
                }
                {
                    data?.map(data =>
                        <Picker.Item
                            key={data.toString()}
                            label={data.name}
                            value={data.id}
                        />
                    )
                }
            </Picker>
        </View>
    )
}

/**
 * @author Vipin Joshi.
 * @since 20-07-2021
 * @description Picker Style.
 */
const styles = StyleSheet.create({
    container: {margin: 8, flex: 1, borderColor: '#cecece', borderRadius: 4, borderWidth: 1},
    titleText: {fontSize: 10, marginHorizontal: 8}
})

export default AppPicker

/**
 * @author Vipin Joshi.
 * @since 20-07-2021
 * @description App Picker Props declaration.
 */
type AppPickerProp = {
    /**
     * @description override component default children prop.
     */
    children?: any,
    /**
     * @description data should contain "id" as value & "name" as label.
     */
    data: any[],
    /**
     * @description picker title.
     */
    title?: string,
    /**
     * @description picker selected value.
     */
    selectedValue?: any,
    /**
     * @description picker callback listener on value change.
     */
    onValueChange?: (value: string) => void;
    /**
     * @description item data display at very first.
     */
    initialItem?: { name: any, id: any },
    /**
     * @description to show/hide picker.
     */
    style?: any,
    /**
     * @description to disabled picker.
     */
    disabled?: boolean
}
