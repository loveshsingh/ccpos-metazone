/**
 * @author Vipin Joshi.
 * @since 26-07-2021.
 * @param callback function called after specified delay.
 * @param delay interval in milliseconds, for best user experience its a standard to keep it for 500 milliseconds.
 * @returns {(function(...[*]=): void)|*}
 * @description debounce the event, return latest event after a specific delay.
 */
export const debounce = (callback, delay: number = 500) => {
    let timeout;
    return function (...args) {
        const context = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = undefined;
            callback?.apply(context, args);
        }, delay);
    };
};

/**
 * @author Vipin Joshi.
 * @since 08-09-2021.
 * @description to create a deep copy of an object,
 * <p>try only if shallow copy(Object.assign or Spread Operator) not working.</p>
 */
export const deepCopy = (object: {} | []): {} | [] => JSON.parse(JSON.stringify(object));