import React, {createContext, useState, useContext, useEffect} from "react";
import {defaultTheme, redTheme} from "../../helper/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const ThemeContext = createContext(); // 1st way
export const ThemeContext = createContext(); // 2nd way

/**
 * @author Vipin Joshi.
 * @since 22-11-2021.
 * @description to handle app theme feature.
 */
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(defaultTheme?.light);
    const [uIMode, setUIMode] = useState('light');
    const [isLoadingTheme, setIsLoadingTheme] = useState(true);
    const [isLoadingUIMode, setIsLoadingUIMode] = useState(false);

    useEffect(() => {
        findOldTheme().then()
    }, []);

    const findOldTheme =  async () => { // to restore selected theme even on app start.
        const themeMode = await AsyncStorage.getItem('themeMode')
        const uIMode = await AsyncStorage.getItem('uiMode')
        console.log(themeMode)
        if (themeMode) {
            themeMode === 'default' ? (uIMode === 'light' ? setTheme(defaultTheme?.light) : setTheme(defaultTheme?.dark)) : (uIMode === 'light' ? setTheme(redTheme?.light) : setTheme(redTheme?.dark));
            setIsLoadingTheme(false)
        }
        if (uIMode) {
            uIMode === 'light' ? setUIMode("light") : setUIMode("dark");
            // setIsLoadingUIMode(false)
        }
        setIsLoadingTheme(false)
    }

    const updateTheme = (currentThemeMode, uIMode) => {
        setIsLoadingUIMode(true)
        console.log("Ui mode: ", uIMode)
        const newTheme = currentThemeMode === 'default' ? (uIMode === 'light' ? defaultTheme?.light : defaultTheme?.dark) : (uIMode === 'light' ? redTheme?.light : redTheme?.dark)
        // const newMode = uIMode === 'light' ? "light" : "light"
        setTheme(newTheme);
        setUIMode(uIMode);
        AsyncStorage.setItem('themeMode', newTheme.themeMode)
        AsyncStorage.setItem('uiMode', uIMode)
        setIsLoadingUIMode(false)
    }

    return (
        <ThemeContext.Provider value={{theme, uIMode, isLoadingTheme, isLoadingUIMode, updateTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => useContext(ThemeContext) // 2nd way

export default ThemeProvider

export const supportingThemes: Array = [
    {
        title: "Blue",
        value: "default"
    },
    {
        title: "Red",
        value: "red"
    },

]
