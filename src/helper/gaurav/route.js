import { h } from '../helpers';

/**
 * Get route
 * @param {string} route
 * @param {object} [params]
 * @returns {string}
 */
export function getRoute(route, params) {
  if (params && Object.keys(params).length > 0) {
    for (let i = 0; i < Object.keys(params).length; i++) {
      const key = Object.keys(params)[i];
      if (!key) continue;
      const replaceValue = params[key] || '';
      const searchKey = `[${key.toLowerCase()}]`;
      route = route.replaceAll(searchKey, replaceValue);
    }
  }
  return route;
}

export function createSubdomainUrl(subdomain, url) {
  if (h.isEmpty(url)) return null;
  if (h.isEmpty(subdomain)) return url;
  if (process.env.NODE_ENV === 'production')
    return url.replace('app', subdomain);
  return url.split('//')[0] + '//' + subdomain + '.' + url.split('//')[1];
}
