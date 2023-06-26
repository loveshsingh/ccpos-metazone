/**
 * @author Vipin Joshi.
 * @since 19-01-2022
 * @description to setup app config for different environments.
 *
 */
import * as Updates from 'expo-updates'
import DefaultEnvironment from '../base/env/env'
import StagingEnvironment from '../base/env/staging-env'
import ProductionEnvironment from '../base/env/production-env'
import type {EnvironmentType} from "./env/env";

/**
 * @author Vipin Joshi.
 * @since 19-01-2022
 * @description application name.
 * @type {string}
 */
export const APP_NAME = 'CCPOS 2.0'

/**
 * @author Vipin Joshi.
 * @since 19-01-2022
 * @description supported environments.
 * @type {{TEST: string, LOCAL: string, STAGING: string, DEFAULT: string, PRODUCTION: string}}
 */
export const Environment = {
    PRODUCTION: 'production',
    STAGING: 'staging',
    TEST: 'test',
    DEFAULT: 'default',
    LOCAL: 'default',
}

/**
 * @author Vipin Joshi
 * @since 19-01-20222
 * @description to mention default configuration here.
 * @type AppConfigType
 */
const DefaultConfig = {
    name: APP_NAME,
    env: DefaultEnvironment
};

const extraConfig = {}
if (Updates.releaseChannel === Environment.PRODUCTION) {
    extraConfig.env = ProductionEnvironment
} else if (Updates.releaseChannel === Environment.STAGING || Updates.releaseChannel === Environment.TEST) {
    extraConfig.env = StagingEnvironment
} else { //default
}

/**
 * @author Vipin Joshi.
 * @since 19-01-2022
 * @description supported environments.
 * @type AppConfigType
 */
export default {...DefaultConfig, ...extraConfig}

/**
 * @author Vipin Joshi
 * @since 19-01-2022.
 * @description App Config types.
 */
export type AppConfigType = {
    name: string,
    env: EnvironmentType
}