import React, {createContext, useContext} from "react";
import {useTheme} from "../contexts/ThemeProvider";

// export const ThemeContext = createContext(); // 1st way
export const HoldOrderThemeContext = createContext(); // 2nd way

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description to handle hold order theme feature.
 */
const HoldOrderThemeProvider = ({children}) => {
    const {theme, isLoadingTheme} = useTheme();

    const holdOrderTheme: HoldOrderThemeContextValueType = theme?.holdOrderTheme

    return (
        <HoldOrderThemeContext.Provider value={{holdOrderTheme, isLoadingTheme}}>
            {children}
        </HoldOrderThemeContext.Provider>
    )
};

export const useHoldOrderTheme = (): HoldOrderThemeContextValueType => useContext(HoldOrderThemeContext) // 2nd way

export default HoldOrderThemeProvider

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description Hold Order theme context types.
 */
export type HoldOrderThemeContextValueType = {
    backgroundColor: string,
    selectionBackgroundColor: string,
    headingTextColor: string,
    primaryColor: string,
    primaryTextColor: string,

    statusBarColor: string,
    textColor: string,
}