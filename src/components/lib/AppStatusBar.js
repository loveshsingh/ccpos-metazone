import React from "react";
import {StatusBar} from "react-native";
import {useTheme} from "../../base/contexts/ThemeProvider";
import {useApp} from "../../base/contexts/AppProvider";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description custom device status bar.
 * @since 23-11-2021
 */
const AppStatusBar = (): JSX.Element => {

    const {theme} = useTheme()
    const {isStatusBarTranslucent} = useApp()
    const statusBarStyle = theme.themeMode === 'default' ? 'dark-content' : 'light-content'

    return (
        <StatusBar translucent={isStatusBarTranslucent} backgroundColor={theme.statusBarColor}
                   barStyle={statusBarStyle}/>
    )
}

export default AppStatusBar