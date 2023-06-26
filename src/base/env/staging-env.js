import type {EnvironmentType} from "./env";

/**
 * @author Vipin Joshi.
 * @since 20-01-2022
 * @description to specify config for staging release channel
 * @type EnvironmentType
 */
export default {
    type: 'staging',
    // apiUrl: 'https://staging-15.sushumna.isha.in',
    apiUrl: 'https://staging.sushumna.isha.in',
    enableHiddenFeatures: true,
    orderFailWebhookTitle: '*CCPOS 2.0 Staging Order Error* \n'
}