import type {EnvironmentType} from "./env";

/**
 * @author Vipin Joshi.
 * @since 20-01-2022
 * @description to specify config for production release channel
 * @type EnvironmentType
 */
export default {
    type: 'production',
    apiUrl: 'https://sulaba.isha.in',
    enableHiddenFeatures: false,
    orderFailWebhookTitle: '*CCPOS 2.0 Order Error* \n',
}