/**
 * @author Vipin Joshi.
 * @since 22-11-2021.
 * @description I18N localization config.
 */
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './en';
import ja from './ja';
import hi from './hi';
import ta from './ta'
import kn from './kn'
// Set the key-value pairs for the different languages you want to support.
/*i18n.translations = { // 1st way
    en: en,
    ja: ja,
};*/
i18n.translations = {en, ja, hi, ta, kn}; // 2nd way
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

/*export const changeLocale = () => {
    i18n.locale = 'ja'
}*/


const I18N: { t: (value: string) => void } = i18n // wrapper to assign types.
export default I18N;