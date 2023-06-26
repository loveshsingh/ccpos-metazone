import React, {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const I18NContext = createContext();

/**
 * @author Vipin Joshi.
 * @since 22-11-2021.
 * @description to handle app I18N (Internationalization) feature.
 */
const I18NProvider = ({children}) => {
    // const [locale, setLocale] = useState('en'/*Localization.locale*/); //set this default value to en
    const [locale, setLocale] = useState(undefined)
    const [isLoadingLocale, setIsLoadingLocale] = useState(true);

    useEffect(() => {
        findOldLocale().then();
    }, []);

    const findOldLocale = async () => { // to restore selected locale even on app start.
        const locale = await AsyncStorage.getItem('locale')
        if (locale) {
            setLocale(locale)
            setIsLoadingLocale(false)
        }
        setIsLoadingLocale(false)
    }

    const updateLocale = (changeLocale) => {
        if (changeLocale !== locale) { //if there is change in locale than only it will change.
            const newLocale = changeLocale
            setLocale(newLocale);
            AsyncStorage.setItem('locale', newLocale)
        }
    }

    return (
        <I18NContext.Provider value={{locale, isLoadingLocale, updateLocale}}>
            {children}
        </I18NContext.Provider>
    );
}

/**
 * @author Vipin Joshi.
 * @description hook to get locale value.
 * @returns value from locale Context -
 * <br>
 * {locale: string, isLoadingLocale: boolean, updateLocale: Function}
 */
export const useLocale = () => useContext(I18NContext)

export const supportingLanguages: Array = [
    {
        title: "English",
        value: "en"
    },
    {
        title: "தமிழ்",
        value: "ta"
    },
    {
        title: "ಕನ್ನಡ",
        value: "kn"
    },

]

export default I18NProvider;