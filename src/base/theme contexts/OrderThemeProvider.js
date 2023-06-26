import React, {createContext, useContext} from "react";
import {useTheme} from "../contexts/ThemeProvider";

// export const ThemeContext = createContext(); // 1st way
export const OrderThemeContext = createContext(); // 2nd way

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description to handle order theme feature.
 */
const OrderThemeProvider = ({children}) => {
    const {theme, isLoadingTheme} = useTheme();

    const orderTheme: OrderThemeContextValueType = theme?.orderTheme

    return (
        <OrderThemeContext.Provider value={{orderTheme, isLoadingTheme}}>
            {children}
        </OrderThemeContext.Provider>
    )
};

export const useOrderTheme = (): OrderThemeContextValueType => useContext(OrderThemeContext) // 2nd way

export default OrderThemeProvider

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description Order theme context types.
 */
export type OrderThemeContextValueType = {
    backgroundColor: string,
    selectionBackgroundColor: string,
    headingTextColor: string,
    primaryColor: string,
    primaryTextColor: string,

    statusBarColor: string,
    textColor: string,
}