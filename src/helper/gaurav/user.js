import { h } from './index';

/**
 * Format full name for a user
 * @param {object} user
 * @returns {string}
 */
export function formatFullName(user) {
  let formattedName = '';
  if (h.isEmpty(user)) return formattedName;
  if (h.notEmpty(user.first_name)) {
    formattedName += user.first_name;
  }
  if (h.notEmpty(user.last_name)) {
    if (h.notEmpty(formattedName)) {
      formattedName += ' ' + user.last_name;
    } else {
      formattedName += user.first_name;
    }
  }
  formattedName = h.general.ucFirstAllWords(formattedName);
  return formattedName;
}

/**
 * Parse Google signin payload and extract it to a standardized format
 * @param {{
 * 	profileObj:{
 *     email:string,
 *     familyName:string,
 *     givenName:string,
 *     googleId:string,
 *     imageUrl:string,
 *     name:string
 * 	},
 * 	tokenId:string
 * }} payload
 * @returns {{google_id: string, full_name: string, profile_picture_url: string, last_name: string, first_name: string, email: string, token_id: string}}
 */
export function parseGoogleSigninPayload(payload) {
  let extractedData = {
    first_name: '',
    last_name: '',
    email: '',
    profile_picture_url: '',
    google_id: '',
    full_name: '',
    token_id: '',
  };
  if (!payload || !payload.profileObj || !payload.tokenId) return extractedData;
  const { profileObj, tokenId } = payload;
  const { email, familyName, givenName, googleId, imageUrl, name } = profileObj;
  extractedData.first_name = givenName;
  extractedData.last_name = familyName;
  extractedData.email = email;
  extractedData.profile_picture_url = imageUrl;
  extractedData.google_id = googleId;
  extractedData.full_name = name;
  extractedData.token_id = tokenId;
  return extractedData;
}
