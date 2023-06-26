import React from "react";
import AppStatusBar from "../components/lib/AppStatusBar";
import AppNavigator from "../navigation/AppNavigator";
import ErrorLogDialog from "../components/screen/ErrorLogDialog";

/**
 * @author Vipin Joshi.
 * @returns {JSX.Element}
 * @constructor
 * @description App Container Component.
 * @since 23-11-2021
 */
const AppContainer = ({ children }): JSX.Element => {
    return (
        <>
            <AppStatusBar />
            <AppNavigator />
            <ErrorLogDialog />
            {children}
        </>
    )
}

export default AppContainer
