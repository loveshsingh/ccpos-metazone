/**
 * Validate whether an email is valid
 * @param {string} value
 * @returns {boolean}
 */
export function validateEmail(value) {
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value)) {
    return true;
  }
  return false;
}
