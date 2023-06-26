import {
    ERROR,
    LOADING, REMOVE_ERROR_LOGS,
    SET_ERROR_LOGS,
    SET_SELECTED_ERROR_LOG,
    SET_SHOW_ERROR_LOG,
    SUCCESS
} from "./types";

/**
 * @author Lovesh Singh.
 * @since 31-03-2022.
 * @description to set loading.
 */
export const loading = (data: boolean) => ({
    type: LOADING,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 31-03-2022.
 * @description to set error.
 */
export const error = (data: any) => ({
    type: ERROR,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 31-03-2022.
 * @description to set success.
 */
export const success = (data: any) => ({
    type: SUCCESS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 31-03-2022.
 * @description to set show error log.
 */
export const setShowErrorLog = (data: any) => ({
    type: SET_SHOW_ERROR_LOG,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 13-01-2022.
 * @description to set selected hold cart.
 */
export const SetSelectedErrorLog = (data: { errorLog: any, index: any }) => ({
    type: SET_SELECTED_ERROR_LOG,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 31-03-2022.
 * @description to set error logs.
 */
export const setErrorLogs = (data: any) => ({
    type: SET_ERROR_LOGS,
    payload: data
});

/**
 * @author Lovesh Singh.
 * @since 31-03-2022.
 * @description to remove error logs.
 */
export const removeErrorLogs = (data: any) => ({
    type: REMOVE_ERROR_LOGS,
    payload: data
});


