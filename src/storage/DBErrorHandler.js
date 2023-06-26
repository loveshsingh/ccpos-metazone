/**
 * @author Vipin Joshi.
 * @since 03-09-2021.
 * @description provide db error handlers.
 */
import {errorHandler} from "../helper/Utility";
import I18N from "../helper/translation";

/**
 * @author Vipin Joshi.
 * @since 03-09-2021.
 * @description to handle empty function.
 */
export const voidHandler = (): void => null

/**
 * @author Vipin Joshi.
 * @since 03-09-2021.
 * @param error details.
 * @param description message.
 * @description to handle db error.
 */
export const localDBErrorHandler = (error, description: string = ""): void => {
    if (!error.message) {
        error.message = I18N.t('SomethingWentWrongMsg')
    }
    errorHandler(error, description)
}