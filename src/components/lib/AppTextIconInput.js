import React from 'react';
import {StyleSheet, View} from "react-native";
import {TextInput} from "react-native-paper";

/**
 * @author Vipin Joshi.
 * @since 16-12-2021.
 * @description TextIconInput component.
 */
const AppTextIconInput = ({
                              left,
                              right,
                              value,
                              mode,
                              error,
                              onChangeText,
                              onFocus,
                              theme,
                              style,
                              placeholder,
                              selectionColor,
                              underlineColor,
                              secureTextEntry,
                              outlineColor,
                              activeOutlineColor
                          }) => {

    return (
        <View style={styles.container}>
            {left ? (
                <View style={[styles.directionalContainer, styles.leftContainer]}>
                    {left}
                </View>
            ) : null}
            <TextInput
                value={value}
                mode={mode}
                error={error}
                onChangeText={onChangeText}
                onFocus={onFocus}
                style={style}
                placeholder={placeholder}
                selectionColor={selectionColor}
                underlineColor={underlineColor}
                secureTextEntry={secureTextEntry}
                theme={theme}
                outlineColor={outlineColor}
                activeOutlineColor={activeOutlineColor}
            />
            {right ? (
                <View style={[styles.directionalContainer, styles.rightContainer]}>
                    {right}
                </View>
            ) : null}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    directionalContainer: {
        position: "absolute",
        zIndex: 1,
        flexDirection: 'row'
    },
    leftContainer: {
        left: 10,
    },
    rightContainer: {
        right: 10,
    }
})

export default AppTextIconInput;