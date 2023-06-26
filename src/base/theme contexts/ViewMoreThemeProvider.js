import React, {createContext, useContext} from "react";
import {useTheme} from "../contexts/ThemeProvider";

// export const ThemeContext = createContext(); // 1st way
export const ViewMoreThemeContext = createContext(); // 2nd way

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description to handle view more theme feature.
 */
const ViewMoreThemeProvider = ({children}) => {
    const {theme, isLoadingTheme} = useTheme();

    const viewMoreTheme: ViewMoreThemeContextValueType = theme?.viewMoreTheme

    return (
        <ViewMoreThemeContext.Provider value={{viewMoreTheme, isLoadingTheme}}>
            {children}
        </ViewMoreThemeContext.Provider>
    )
};

export const useViewMoreTheme = (): ViewMoreThemeContextValueType => useContext(ViewMoreThemeContext) // 2nd way

export default ViewMoreThemeProvider

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description ViewMore theme context types.
 */
export type ViewMoreThemeContextValueType = {
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