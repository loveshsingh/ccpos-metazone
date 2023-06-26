import React, {createContext, useContext} from "react";
import {useTheme} from "../contexts/ThemeProvider";

// export const ThemeContext = createContext(); // 1st way
export const ProductThemeContext = createContext(); // 2nd way

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description to handle dashboard theme feature.
 */
const ProductThemeProvider = ({children}) => {
    const {theme, isLoadingTheme} = useTheme();

    const productTheme: ProductThemeContextValueType = theme?.productTheme

    return (
        <ProductThemeContext.Provider value={{productTheme, isLoadingTheme}}>
            {children}
        </ProductThemeContext.Provider>
    )
};

export const useProductTheme = (): ProductThemeContextValueType => useContext(ProductThemeContext) // 2nd way

export default ProductThemeProvider

/**
 * @author Lovesh Singh.
 * @since 30-05-2022.
 * @description Product theme context types.
 */
export type ProductThemeContextValueType = {
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