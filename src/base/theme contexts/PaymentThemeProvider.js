import React, {createContext, useContext} from "react";
import {useTheme} from "../contexts/ThemeProvider";

// export const ThemeContext = createContext(); // 1st way
export const PaymentThemeContext = createContext(); // 2nd way

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description to handle Payment theme feature.
 */
const PaymentThemeProvider = ({children}) => {
    const {theme, isLoadingTheme} = useTheme();

    const paymentTheme: PaymentThemeContextValueType = theme?.cartListTheme

    return (
        <PaymentThemeContext.Provider value={{paymentTheme, isLoadingTheme}}>
            {children}
        </PaymentThemeContext.Provider>
    )
};

export const usePaymentTheme = (): PaymentThemeContextValueType => useContext(PaymentThemeContext) // 2nd way

export default PaymentThemeProvider

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description Payment theme context types.
 */
export type PaymentThemeContextValueType = {
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