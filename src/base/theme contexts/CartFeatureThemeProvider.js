import React, {createContext, useContext} from "react";
import {useTheme} from "../contexts/ThemeProvider";

// export const ThemeContext = createContext(); // 1st way
export const CartFeatureThemeContext = createContext(); // 2nd way

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description to handle cart feature theme feature.
 */
const CartFeatureThemeProvider = ({children}) => {
    const {theme, isLoadingTheme} = useTheme();

    const cartFeatureTheme: CartFeatureThemeContextValueType = theme?.cartFeatureTheme

    return (
        <CartFeatureThemeContext.Provider value={{cartFeatureTheme, isLoadingTheme}}>
            {children}
        </CartFeatureThemeContext.Provider>
    )
};

export const useCartFeatureTheme = (): CartFeatureThemeContextValueType => useContext(CartFeatureThemeContext) // 2nd way

export default CartFeatureThemeProvider

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description CartFeature theme context types.
 */
export type CartFeatureThemeContextValueType = {
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