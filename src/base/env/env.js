/**
 * @author Vipin Joshi.
 * @since 20-01-2022
 * @description to specify config for default(local) release channel
 * @type EnvironmentType
 */
export default {
    type: 'default',
    // apiUrl: 'https://staging-15.sushumna.isha.in',
    apiUrl: 'https://staging.sushumna.isha.in',
    enableHiddenFeatures: true,
    orderFailWebhookTitle: '*CCPOS 2.0 Staging Order Error*',
    orderFailWebhookApiUrl: "https://hooks.slack.com/services/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",
}

/**
 * @author Vipin Joshi.
 * @since 11-02-2022
 * @description Application Environment Type.
 */
export type EnvironmentType = {
    type: string,
    enableHiddenFeatures: boolean,
    apiUrl: string,
    orderFailWebhookTitle: string,
    orderFailWebhookApiUrl: string
}