import {CLEAR_SERVER_SESSION_DETAILS, ERROR, LOADING, SAVED_USERS, SERVER_SESSION_DETAILS, SUCCESS} from "./types";
import {AuthAPIService} from "../../services/AuthAPIService";
import {
    resetAuthAsyncStorage, setAuthDetailsAsyncStorage,
    setLoggedInAsyncStorage,
    setLoggedOutAsyncStorage
} from "../../storage/getAuthAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @author Vipin Joshi.
 * @since 25-11-2021.
 * @description to set loading.
 */
export const loading = (data: boolean) => ({
    type: LOADING,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 25-11-2021.
 * @description to set error.
 */
export const error = (data: any) => ({
    type: ERROR,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 25-11-2021.
 * @description to set success.
 */
export const success = (data: any) => ({
    type: SUCCESS,
    payload: data
});

/**
 * @author Vipin Joshi.
 * @since 25-11-2021.
 * @description to set session server details.
 */
export const setServerSessionDetails = (data: any) => ({
    type: SERVER_SESSION_DETAILS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 19-01-2021.
 * @description to clear session server details.
 */
export const clearServerSessionDetails = (data?: any) => ({
    type: CLEAR_SERVER_SESSION_DETAILS,
    payload: data
});

//async function use redux-thunk
/**
 * @author Vipin Joshi.
 * @since 25-11-2021.
 * @description to login user.
 * @param username username input.
 * @param password password input.
 * @param saveUserCredentials check for saving user credentials
 * @returns {(function(*): Promise<void>)|*}
 */
export const login = (username, password, saveUserCredentials): void => async (dispatch) => {
    await dispatch(loading(true))
    await AuthAPIService.login(username, password).then(async (res) => {
        if (saveUserCredentials) await setAuthDetailsAsyncStorage(username, password)
        await handleLoginAPIResponse(res)
        await dispatch(success(res))
    }).catch((err) => {
        handleLoginAPIError(err)
        dispatch(error(err));
    }).finally(() => {
        dispatch(loading(false))
    })
};

/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description to logout user.
 * @returns {(function(*): Promise<void>)|*}
 */
export const logout = (): void => async (dispatch) => {
    await dispatch(loading(true))
    await AuthAPIService.logout().then(async (res) => {
        await handleLogoutAPIResponse()
        await dispatch(success(res))
        await dispatch(clearServerSessionDetails)
    }).catch((err) => {
        handleLogoutAPIError(err)
        dispatch(error(err));
    }).finally(async () => {
        dispatch(loading(false))
    })
};


/**
 * @author Vipin Joshi.
 * @since 25-11-2021.
 * @description to handle login api response.
 */
const handleLoginAPIResponse = async (response): void => {
    await setLoggedInAsyncStorage(response)
}

/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description to handle logout api response.
 */
const handleLogoutAPIResponse = async (response): void => {
    await setLoggedOutAsyncStorage()
}

/**
 * @author Vipin Joshi.
 * @since 25-11-2021.
 * @description to handle login api error.
 */
const handleLoginAPIError = async (error): void => {
    await resetAuthAsyncStorage()
}

/**
 * @author Lovesh Singh.
 * @since 15-01-2022.
 * @description to handle logout api error.
 */
const handleLogoutAPIError = async (error): void => {
    await resetAuthAsyncStorage()
}
