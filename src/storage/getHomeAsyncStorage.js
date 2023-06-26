import AsyncStorage from "@react-native-async-storage/async-storage";
import {StorageConstant} from "./index";

export const setPosConfig = async (posConfig): void => {
    await AsyncStorage.setItem(StorageConstant.SESSION_POS_CONFIG, JSON.stringify(posConfig));
}

const getPosConfig = async (): { then: Function, finally: Function } | string | [] | void => {
    let response = ''
    await AsyncStorage.getItem(StorageConstant.SESSION_POS_CONFIG).then(posConfig => response = JSON.parse(posConfig))
    return response
}

//todo
export const setPosConfigForClose = async (posConfig): void => {
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_SHOP_ID, '');
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_SHOP_NAME, '');
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_SHOP_SHORT_NAME, '');
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_CURRENCY_OBJECT_STRING, '');
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_SESSION_ID, '');
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_LOGIN_NUMBER, '');
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_RECEIPT_HEADER, '');
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_TO_INVOICE, '');
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_RECEIPT_FOOTER, '');
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_SESSION_START_AT, '');
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_NORMAL_SEQUENCE_NO, '')
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_COMPLEMENT_SEQUENCE_NO, '')
    await AsyncStorage.setItem(StorageConstant.SESSION_POS_CONFIG, JSON.stringify(posConfig));
}

export const HomeAsyncStorage = {
    setPosConfig,
    getPosConfig,
}
