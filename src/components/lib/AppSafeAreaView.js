import {SafeAreaView} from "react-native";
import {useTheme} from "../../base/contexts/ThemeProvider";
import React from "react";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description custom SafeAreaView Component.
 * @since 03-12-2021
 */
const AppSafeAreaView = ({style, children}): JSX.Element => {

    const {theme} = useTheme()

    return (
        <SafeAreaView style={[{backgroundColor: theme.backgroundColor}, style]}>
            {children}
        </SafeAreaView>
    )
}

export default AppSafeAreaView
