/**
 * @author Vipin Joshi.
 * @since 25-08-2021.
 * @description provide network error handlers.
 */
import {NetworkStatus} from "./NetworkConnection";
import {errorHandler} from "../helper/Utility";
import I18N from "../helper/translation";

/**
 * @author Vipin Joshi.
 * @since 25-08-2021.
 * @param error details.
 * @description to handle dashboard api promise errors.
 */
export const dashboardAPIErrorHandler = (error): void => {
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    }
    errorHandler(error, I18N.t('RestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 25-08-2021.
 * @param error details.
 * @description to handle session api promise errors.
 */
export const sessionAPIErrorHandler = (error): void => {
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    }
    errorHandler(error)
}

/**
 * @author Vipin Joshi.
 * @since 25-08-2021.
 * @param error details.
 * @param controlFromCloseSession true when close session screen control come.
 * @description to handle sync order api promise errors.
 */
export const syncOrderAPIErrorHandler = (error, controlFromCloseSession?: boolean | undefined): void => {
    let param = controlFromCloseSession // true when control coming from close session display.
    let description = undefined

    if (error.status === NetworkStatus.REQUEST_TIMEOUT) {
        let message = I18N.t('InternetConnectionProblemMsg')
        if (param) {
            message = I18N.t('InternetConnectionProblemMsg')
            description = I18N.t('RestartAndResumeSessionOrderSyncMsg')
        }
        error.message = message
    } else if (param) { // If control comes here from close session screen than always show description.
        description = I18N.t('RestartAndResumeSessionOrderSyncMsg')
    }

    if (!error.statusText) { // If status text is empty than show custom title text.
        error.statusText = I18N.t('SomethingWentWrongMsg')
    }
    errorHandler(error, description)
}

/**
 * @author Vipin Joshi.
 * @since 25-08-2021.
 * @param error details.
 * @param controlFromCloseSession true when close session screen control come.
 * @description to handle close session api promise errors.
 */
export const closeSessionAPIErrorHandler = (error, controlFromCloseSession?: boolean | undefined): void => {
    let param = controlFromCloseSession // true when control coming from close session display.
    let description = undefined

    if (error.status === NetworkStatus.REQUEST_TIMEOUT) {
        let message = I18N.t('InternetConnectionProblemMsgTryAgain')
        if (param) {
            message = I18N.t('InternetConnectionProblemMsg')
            description = I18N.t('RestartAndResumeSessionCloseSessionMsg')
        }
        error.message = message
    } else if (param) { // If control comes here from close session screen than always show description.
        description = I18N.t('RestartAndResumeSessionCloseSessionMsg')
    }

    if (!error.statusText) { // If status text is empty than show custom title text.
        error.statusText = I18N.t('SomethingWentWrongMsg')
    }
    errorHandler(error, description)
}

/**
 * @author Vipin Joshi.
 * @since 26-08-2021.
 * @param error details.
 * @description to handle category list api promise errors.
 */
export const categoryListAPIErrorHandler = (error): void => {
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    } else {
        error.message = I18N.t('InternetConnectionProblemMsg')
    }
    errorHandler(error, I18N.t('RestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 26-08-2021.
 * @param error details.
 * @description to handle product list api promise errors.
 */
export const productListAPIErrorHandler = (error): void => {
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    } else {
        error.message = I18N.t('InternetConnectionProblemMsg')
    }
    errorHandler(error, I18N.t('RestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 26-08-2021.
 * @param error details.
 * @description to handle customer list api promise errors.
 */
export const customerListAPIErrorHandler = (error): void => {
    let description = I18N.t('RestartMsg')
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    } else {
        // error.message = I18N.t('InternetConnectionProblemMsg')
        error.message = I18N.t('UnableToLoadCustomersMsg')
        description = I18N.t('UnableToLoadCustomersDescriptionMsg')
    }
    errorHandler(error, description)
}

/**
 * @author Vipin Joshi.
 * @since 26-08-2021.
 * @param error details.
 * @description to handle payment list api promise errors.
 */
export const paymentListAPIErrorHandler = (error): void => {
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    } else {
        error.message = I18N.t('InternetConnectionProblemMsg')
    }
    errorHandler(error, I18N.t('RestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 26-08-2021.
 * @param error details.
 * @description to handle tax list api promise errors.
 */
export const taxListAPIErrorHandler = (error): void => {
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    } else {
        error.message = I18N.t('InternetConnectionProblemMsg')
    }
    errorHandler(error, I18N.t('RestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 26-08-2021.
 * @param error details.
 * @description to handle uom list api promise errors.
 */
export const uomListAPIErrorHandler = (error): void => {
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    } else {
        error.message = I18N.t('InternetConnectionProblemMsg')
    }
    errorHandler(error, I18N.t('RestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 03-09-2021.
 * @param error details.
 * @description to handle login api promise errors.
 */
export const loginAPIErrorHandler = (error): void => {
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    } else {
        error.message = I18N.t('InternetConnectionProblemMsg')
    }
    errorHandler(error, I18N.t('RestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 07-09-2021.
 * @param error details.
 * @description to handle customer api promise errors.
 */
export const customerAPIErrorHandler = (error): void => {
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    } else {
        error.message = I18N.t('InternetConnectionProblemMsg')
    }
    errorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 07-09-2021.
 * @param error details.
 * @description to handle logout api promise errors.
 */
export const logoutAPIErrorHandler = (error): void => {
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    } else {
        error.message = I18N.t('InternetConnectionProblemMsg')
    }
    errorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 07-09-2021.
 * @param error details.
 * @description to handle splash api promise errors.
 */
export const splashAPIErrorHandler = (error): void => {
    if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
        error.statusText = I18N.t('SomethingWentWrongMsg')
    } else {
        error.message = I18N.t('InternetConnectionProblemMsg')
    }
    // errorHandler(error, I18N.t('RestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 26-08-2021.
 * @param response from access point.
 * @param description message.
 * @description to handle invalid response.
 */
export const invalidResponseHandler = (response, description?: string): void => {
    errorHandler(handleInvalidResponse(response), description ? description : I18N.t('RestartMsg'))
}

/**
 * @author Vipin Joshi.
 * @since 27-08-2021.
 * @param response from access point.
 * @description to handle invalid response.
 * @return modified response as error.
 */
export const handleInvalidResponse = (response): {} => {
    let error = {...response, status: response.code}
    error.statusText = response.message ? response.message : I18N.t('SomethingWentWrongMsg')
    return error
}

/**
 * @author Vipin Joshi.
 * @since 03-12-2021.
 * @param error details.
 * @description to handle webhookAPIError.
 */
export const webhookAPIErrorHandler = (error): void => {
    // if (error.status !== NetworkStatus.REQUEST_TIMEOUT) {
    //     error.statusText = I18N.t('SomethingWentWrongMsg')
    // } else {
    //     error.message = I18N.t('InternetConnectionProblemMsg')
    // }
    // errorHandler(error, I18N.t('RestartMsg'))
}
