import AsyncStorage from "@react-native-async-storage/async-storage";
import {StorageConstant} from "../storage/index";
import {isString, objectHasProperty} from "../helper/Utility";
import {Constant} from "../helper/constant";

export const setLoggedInAsyncStorage = async (loginResponse): void => {
    await AsyncStorage.setItem(StorageConstant.AGENT_TIME_ZONE, (objectHasProperty(loginResponse, 'agent_timezone') ? loginResponse.agent_timezone : ''));
    await AsyncStorage.setItem(StorageConstant.AGENT_LANG, (objectHasProperty(loginResponse, 'agent_lang') ? loginResponse.agent_lang : ''));
    await AsyncStorage.setItem(StorageConstant.AGENT_USER_ID, (objectHasProperty(loginResponse, 'user_id') ? JSON.stringify(loginResponse.user_id) : ''));
    await AsyncStorage.setItem(StorageConstant.AGENT_AGENT_ID, (objectHasProperty(loginResponse, 'agent_id') ? JSON.stringify(loginResponse.agent_id) : ''));
    await AsyncStorage.setItem(StorageConstant.AGENT_NAME, (objectHasProperty(loginResponse, 'agent_name') ? loginResponse.agent_name : ''));
    await AsyncStorage.setItem(StorageConstant.AGENT_PROFILE_IMAGE, (objectHasProperty(loginResponse, 'agent_profile_image') ? loginResponse.agent_profile_image : (objectHasProperty(loginResponse, 'agentProfileImage') ? loginResponse.agentProfileImage : '')));
    await AsyncStorage.setItem(StorageConstant.AGENT_EMAIL, (objectHasProperty(loginResponse, 'agent_email') ? loginResponse.agent_email : ''));
    await AsyncStorage.setItem(StorageConstant.IS_LOGGED_IN, 'true');
}

export const setLoggedOutAsyncStorage = async (): boolean | void => {
    AsyncStorage.setItem(StorageConstant.AGENT_TIME_ZONE, '')
    AsyncStorage.setItem(StorageConstant.AGENT_LANG, '')
    AsyncStorage.setItem(StorageConstant.AGENT_USER_ID, '')
    AsyncStorage.setItem(StorageConstant.AGENT_AGENT_ID, '')
    AsyncStorage.setItem(StorageConstant.AGENT_NAME, '')
    AsyncStorage.setItem(StorageConstant.AGENT_PROFILE_IMAGE, '')
    AsyncStorage.setItem(StorageConstant.AGENT_EMAIL, '')
    AsyncStorage.setItem(StorageConstant.IS_LOGGED_IN, 'false')
}


export const resetAuthAsyncStorage = async (): void => {
    await AsyncStorage.removeItem(StorageConstant.IS_LOGGED_IN)
    await AsyncStorage.removeItem(StorageConstant.AGENT_LOGIN_HEADER)
}

export const setAuthAsyncStorage = async (loginHeader): void => {
    await AsyncStorage.setItem(StorageConstant.IS_LOGGED_IN, 'true');
    await AsyncStorage.setItem(StorageConstant.AGENT_LOGIN_HEADER, loginHeader);
}

/**
 * @author Lovesh Singh.
 * @since 26-02-2022.
 * @description to save user credentials.
 * @param username username input.
 * @param password password input.
 */
export const setAuthDetailsAsyncStorage = async (username, password): void => {
    await AsyncStorage.getItem(StorageConstant.AGENT_AUTH_DETAILS, (err, result) => {
        let userDetailArray = []
        if (result) {
            userDetailArray = JSON.parse(result)
        }
        if (userDetailArray.length !== 0)
            userDetailArray = userDetailArray.filter(user => user?.username !== username)

        userDetailArray.push({username, password})
        AsyncStorage.setItem(StorageConstant.AGENT_AUTH_DETAILS, JSON.stringify(userDetailArray))
    });
}

/**
 * @author Lovesh Singh.
 * @since 26-02-2022.
 * @description to save user credentials.
 * @param savedItem
 */
export const removeAuthDetailAsyncStorage = async (savedItem): void => {
    await AsyncStorage.getItem(StorageConstant.AGENT_AUTH_DETAILS, (err, result) => {
        if (result) {
            const userDetailArray = JSON.parse(result)
            AsyncStorage.setItem(StorageConstant.AGENT_AUTH_DETAILS, JSON.stringify(userDetailArray.filter(user => user?.username !== savedItem?.username)))
        }
    });
}

/**
 * @author Lovesh Singh.
 * @since 26-02-2022.
 * @description to save user credentials.
 * @param errorLog username input.
 * @param callBack
 */
export const setErrorLogsAsyncStorage = async (errorLog, callBack): void => {
    await AsyncStorage.getItem(StorageConstant.ERROR_LOGS, async (err, result) => {
        let errorLogArray = []
        if (result) {
            errorLogArray = JSON.parse(result)
        }

        errorLogArray.push(errorLog)
        await AsyncStorage.setItem(StorageConstant.ERROR_LOGS, JSON.stringify(errorLogArray)).then(() => {
            callBack.call(this, JSON.stringify(errorLogArray))
        })
    });
}

/**
 * @author Lovesh Singh.
 * @since 26-02-2022.
 * @description to remove user credentials.
 */
export const removeErrorLogsAsyncStorage = async (callBack): void => {
    await AsyncStorage.removeItem(StorageConstant.ERROR_LOGS).then(() => {
        callBack.call(this, true)
    }).catch((err) => {
        callBack.call(this, false)
    });
}

export const removeSingleErrorLog = async (errorLog, callBack): void => {
    await AsyncStorage.getItem(StorageConstant.ERROR_LOGS, async (err, result) => {
        let errorLogArray = []
        if (result) {
            errorLogArray = JSON.parse(result)
        }

        let errorLogAfterRemoving = errorLogArray.filter((error) => {
            return error?.date !== errorLog?.date
        })

        await AsyncStorage.setItem(StorageConstant.ERROR_LOGS, JSON.stringify(errorLogAfterRemoving)).then(() => {
            callBack.apply(this, [true, JSON.stringify(errorLogAfterRemoving)])
        })
    });
}


export const getAuthAsyncStorage = async (): { isLoggedIn: boolean, loginHeader: string, then: Function, finally: Function } | void => {
    const response = {}
    await AsyncStorage.getItem(StorageConstant.IS_LOGGED_IN).then(isLoggedIn => {
        response.isLoggedIn = isLoggedIn
    })
    await AsyncStorage.getItem(StorageConstant.AGENT_LOGIN_HEADER).then(loginHeader => {
        response.loginHeader = loginHeader
    })
    return response
}

export const getAgentName = async (): { then: Function, finally: Function } | string | void => {
    let response = ''
    await AsyncStorage.getItem(StorageConstant.AGENT_NAME).then(agentName => {
        response = agentName
    })
    return response;
}

export const getAgentDetail = async (): { then: Function, finally: Function } | string | void => {
    let response = {}

    await AsyncStorage.getItem(StorageConstant.AGENT_NAME).then(agentName => {
        response.agentName = agentName
    })
    await AsyncStorage.getItem(StorageConstant.AGENT_PROFILE_IMAGE).then(agentProfileImage => {
        response.agentProfileImage = agentProfileImage
    })
    await AsyncStorage.getItem(StorageConstant.AGENT_EMAIL).then(agentEmail => {
        response.agentEmail = agentEmail
    })
    return response;
}

export const setSessionConfigStorage = async (response, shopData): void => {
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_SHOP_ID, JSON.stringify(shopData.id))
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_SHOP_NAME, shopData.name)
    const shortName = shopData?.short_name;
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_SHOP_SHORT_NAME, isString(shortName) ? shortName : Constant.DEFAULT_NURSERY_SHORT_NAME)
    await AsyncStorage.getItem(StorageConstant.SESSION_CONFIG_NORMAL_SEQUENCE_NO, async (err, normSeqNo) => {
        const responseSeqNo = +shopData?.seq_no
        let latestSeqNo = responseSeqNo
        if (+normSeqNo > responseSeqNo) {
            latestSeqNo = +normSeqNo
        }
        await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_NORMAL_SEQUENCE_NO, String(latestSeqNo))
    })

    await AsyncStorage.getItem(StorageConstant.SESSION_CONFIG_COMPLEMENT_SEQUENCE_NO, async (err, compSeqNo) => {
        const responseCompSeqNo = +shopData?.compl_seq_no

        let latestCompSeqNo = responseCompSeqNo
        if (+compSeqNo > responseCompSeqNo) {
            latestCompSeqNo = +compSeqNo
        }

        await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_COMPLEMENT_SEQUENCE_NO, String(latestCompSeqNo))
    })
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_CURRENCY_OBJECT_STRING, JSON.stringify(shopData.currency[0]))

    const sessionId = response.session_id;
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_SESSION_ID, JSON.stringify(sessionId))
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_LOGIN_NUMBER, JSON.stringify(response.login_number))
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_SESSION_START_AT, JSON.stringify(response.session_start_at))
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_RECEIPT_HEADER, JSON.stringify(response.config.receipt_header))
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_TO_INVOICE, JSON.stringify(response.config.to_invoice))
    await AsyncStorage.setItem(StorageConstant.SESSION_CONFIG_RECEIPT_FOOTER, JSON.stringify(response.config.receipt_footer))
}

const getShopIdAsyncStorage = async (): { then: Function, finally: Function } | string | void => {
    let response
    await AsyncStorage.getItem(StorageConstant.SESSION_CONFIG_SHOP_ID).then(shopId => {
        response = shopId
    })
    return response
}

export const AuthAsyncStorage = {
    getAuthAsyncStorage,
    getAgentName,
    getShopIdAsyncStorage,
}
