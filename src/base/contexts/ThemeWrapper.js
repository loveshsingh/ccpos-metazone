import React from "react";
import {useTheme} from "./ThemeProvider";

/**
 * @author Vipin Joshi.
 * @since 22-11-2021.
 * @description to remove code redundancy if theme currently in loading state.
 */
const ThemeWrapper = ({children}) => {

    const {isLoadingTheme} = useTheme();
    if (isLoadingTheme) return null;

    return children
};

export default ThemeWrapper