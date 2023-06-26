import React from "react";
import {useLocale} from "./I18NProvider";
import i18n from "../../helper/translation";

/**
 * @author Vipin Joshi.
 * @since 22-11-2021.
 * @description to remove code redundancy if locale currently in loading state.
 */
const I18NWrapper = ({children}) => {
    const {locale, isLoadingLocale} = useLocale();
    if (isLoadingLocale) return null;

    i18n.locale = locale;
    return children
};

export default I18NWrapper