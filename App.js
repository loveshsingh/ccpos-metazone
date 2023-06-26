import 'expo-dev-client' // To print more meaningful error message in development mode.
import React, {useState} from 'react'
import {LogBox} from "react-native"
import {enableScreens} from "react-native-screens"

import {Provider} from "react-redux"
import store from "./src/store"

import ThemeProvider from './src/base/contexts/ThemeProvider'
import ThemeWrapper from './src/base/contexts/ThemeWrapper'
import I18NProvider from "./src/base/contexts/I18NProvider"
import I18NWrapper from "./src/base/contexts/I18NWrapper"

import AppContainer from "./src/base/AppContainer"
import AppProvider from "./src/base/contexts/AppProvider";
import MessageProvider from "./src/base/contexts/MessageProvider";
import AppWrapper from "./src/base/contexts/AppWrapper";
/*import * as Updates from "expo-updates"
import {UpdateEventType} from "expo-updates";*/
import * as Sentry from 'sentry-expo';
import {Constant} from "./src/helper/constant";

enableScreens(); // enable android fragment & ios UIView  support.

/**
 * @author Vipin Joshi.
 * @since 08-12-2021.
 * @description Application root component.
 * @returns app.
 */
export const App = () => {

    /*const [updateChecking, setUpdateChecking] = useState(false)
    React.useEffect(() => {
        reactToUpdates()
    })

    const reactToUpdates = async (): void => {
        Updates.addListener((event) => {
            if (event.type === UpdateEventType.UPDATE_AVAILABLE) {
                Updates.reloadAsync() // will restart the app
                // alert("An update is available, Restart your app to see it.")
            }
        })
    }*/

    Sentry.init({
        dsn: Constant.SENTRY_DSN,
        enableInExpoDevelopment: true,
        debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
        release: 'STAGING'
    });

    appConfig()
    return (<ThemeProvider>
            <ThemeWrapper>
                <I18NProvider>
                    <I18NWrapper>
                        <MessageProvider>
                            <AppProvider>
                                <AppWrapper>
                                    <Provider store={store}>
                                        <AppContainer/>
                                    </Provider>
                                </AppWrapper>
                            </AppProvider>
                        </MessageProvider>
                    </I18NWrapper>
                </I18NProvider>
            </ThemeWrapper>
        </ThemeProvider>)
}

/**
 * @author Vipin Joshi.
 * @since 30-09-2021.
 * @description to set configuration at very first.
 */
const appConfig = () => {
    // console.reprtErrorsAsExceptions = false;
    // console.disableYellowBox = true;
    LogBox.ignoreAllLogs()
}

export default App
