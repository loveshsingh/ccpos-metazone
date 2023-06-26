import * as generalHelper from './general';
import * as formHelper from './form';
import * as apiHelper from './api';
import * as validateHelper from './validate';
import * as cookieHelper from './cookie';
import * as authHelper from './auth';
import * as userHelper from './user';
import * as tableHelper from './table';
import * as routeHelper from './route';
import * as intercomHelper from './intercom';
import * as dateHelper from './date';
import * as currencyHelper from './currency';
import * as youtubeHelper from './youtube';
import * as userManagementHelper from './user-management';

export const h = {
  general: generalHelper,
  form: formHelper,
  api: apiHelper,
  validate: validateHelper,
  cookie: cookieHelper,
  auth: authHelper,
  user: userHelper,
  table: tableHelper,
  route: routeHelper,
  intercom: intercomHelper,
  date: dateHelper,
  currency: currencyHelper,
  youtube: youtubeHelper,
  userManagement: userManagementHelper,
  //General helper functions to expose on top level
  isEmpty: generalHelper.isEmpty,
  notEmpty: generalHelper.notEmpty,
  cmpStr: generalHelper.compareString,
  cmpInt: generalHelper.compareInt,
  cmpBool: generalHelper.compareBoolean,
  //Route helper functions to expose on top level
  getRoute: routeHelper.getRoute,
};
