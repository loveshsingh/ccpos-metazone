import React, {createContext, useContext} from "react";
import {useTheme} from "../contexts/ThemeProvider";
import {AppColors} from "../../assets/AppColors";

// export const ThemeContext = createContext(); // 1st way
export const CartListThemeContext = createContext(); // 2nd way

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description to handle cart list theme feature.
 */
const CartListThemeProvider = ({children}) => {
    const {theme, isLoadingTheme} = useTheme();

    const cartListTheme: CartListThemeContextValueType = theme?.cartListTheme

    return (
        <CartListThemeContext.Provider value={{cartListTheme, isLoadingTheme}}>
            {children}
        </CartListThemeContext.Provider>
    )
};

export const useCartListTheme = (): CartListThemeContextValueType => useContext(CartListThemeContext) // 2nd way

export default CartListThemeProvider

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description Cart List theme context types.
 */
export type CartListThemeContextValueType = {
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