import React, {createContext, useContext} from "react";
import {useTheme} from "../contexts/ThemeProvider";

// export const ThemeContext = createContext(); // 1st way
export const DashboardThemeContext = createContext(); // 2nd way

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description to handle dashboard theme feature.
 */
const DashboardThemeProvider = ({children}) => {
    const {theme, isLoadingTheme} = useTheme();

    const dashboardTheme: DashboardThemeContextValueType = theme?.dashboardTheme

    return (
        <DashboardThemeContext.Provider value={{dashboardTheme, isLoadingTheme}}>
            {children}
        </DashboardThemeContext.Provider>
    )
};

export const useDashboardTheme = (): DashboardThemeContextValueType => useContext(DashboardThemeContext) // 2nd way

export default DashboardThemeProvider

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description Cart List theme context types.
 */
export type DashboardThemeContextValueType = {
    backgroundColor: string,
    selectionBackgroundColor: string,
    headingTextColor: string,
    primaryColor: string,
    primaryTextColor: string,

    statusBarColor: string,
    textColor: string,
    card: {
        backgroundColor: string,
        titleColor: string,
        subtitleColor: string
    },
}