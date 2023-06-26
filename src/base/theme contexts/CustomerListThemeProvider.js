import React, {createContext, useContext} from "react";
import {useTheme} from "../contexts/ThemeProvider";

// export const ThemeContext = createContext(); // 1st way
export const CustomerListThemeContext = createContext(); // 2nd way

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description to handle dashboard theme feature.
 */
const CustomerListThemeProvider = ({children}) => {
    const {theme, isLoadingTheme} = useTheme();

    const customerListTheme: CustomerListThemeContextValueType = theme?.cartListTheme

    return (
        <CustomerListThemeContext.Provider value={{customerListTheme, isLoadingTheme}}>
            {children}
        </CustomerListThemeContext.Provider>
    )
};

export const useCustomerListTheme = (): CustomerListThemeContextValueType => useContext(CustomerListThemeContext) // 2nd way

export default CustomerListThemeProvider

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description CustomerList theme context types.
 */
export type CustomerListThemeContextValueType = {
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