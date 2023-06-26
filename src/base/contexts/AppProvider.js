import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {useMessage,} from "./MessageProvider";
import type {MessageContextValueType} from "./MessageProvider";
import NetInfo from "@react-native-community/netinfo";
import AppUpdateDialog from "../../components/lib/AppUpdateDialog";

//Note: Class based component can't be able to use hook to access Context value for that we have to export this context
export const AppContext = createContext()

/**
 * @author Vipin Joshi.
 * @since 19-01-2022.
 * @description to handle app context feature.
 */
const AppProvider = ({children}): JSX.Element => {

    const TAG = 'AppProvider'

    const updateRef = useRef();
    const [isOnline, setIsOnline] = useState(false)
    const [isStatusBarTranslucent, setIsStatusBarTranslucent] = useState(false)

    useEffect(() => {
        const networkEventUnsubscribe = NetInfo.addEventListener(state => {
            setIsOnline(state?.isConnected)
        });

        return () => {
            if (networkEventUnsubscribe)
                networkEventUnsubscribe();
        }
    }, [])

    /**
     * @author Lovesh Singh.
     * @since 01-02-2022.
     */
    const hideUpdateDialog = (): void => updateRef.current.hide()

    /**
     * @author Lovesh Singh.
     * @since 01-02-2022.
     * @param checkForUpdate
     * @param onBackPress
     */
    const showUpdateDialog = (checkForUpdate: boolean, onBackPress?: Function): void => updateRef.current.show({
        show: true,
        checkForUpdate,
        onBackPress
    })

    /**
     * @author Lovesh Singh.
     * @since 01-02-2022.
     * @param data
     */
    const showUpdateDialogWithData = (data: any): void => updateRef.current.showWithData(data)


    /**
     * @author Lovesh Singh.
     * @since 01-02-2022.
     * @param successCallback
     * @param errorCallback
     */
    const checkForUpdate = (successCallback?: Function, errorCallback?: Function): void => updateRef.current.checkForAppUpdate(successCallback, errorCallback)

    /**
     * @author Vipin Joshi.
     * @since 07-02-2022.
     * @param translucent true/false
     * @description When translucent is set to true, the app will draw under the status bar.
     */
    const setStatusBarTranslucent = (translucent: boolean): void => setIsStatusBarTranslucent(translucent)

    /**
     * @author Vipin Joshi.
     * @since 19-01-2022
     * @description AppContext values.
     * @type {{message: {showToast: function}}}
     */
    const AppContextValues: AppContextValueType = {
        messageContext: useMessage(),
        networkContext: {isOnline},
        showUpdateDialog,
        hideUpdateDialog,
        checkForUpdate,
        showUpdateDialogWithData,
        isStatusBarTranslucent,
        setStatusBarTranslucent
    }

    return (
        <AppContext.Provider value={AppContextValues}>
            {children}
            <AppUpdateDialog ref={updateRef}/>
        </AppContext.Provider>
    );
}

/**
 * @author Vipin Joshi.
 * @since 19-01-2022.
 * @description hook to get App Context value.
 * @returns value from AppContext
 */
export const useApp = (): AppContextValueType => useContext(AppContext)

export default AppProvider

/**
 * @author Lovesh Singh
 * @since 28-01-2022.
 * @description network context types.
 */
export type NetworkContextValueType = {
    isOnline: boolean,
}


/**
 * @author Vipin Joshi
 * @since 19-01-2022.
 * @description App context types.
 */
export type AppContextValueType = {
    messageContext: MessageContextValueType,
    networkContext: NetworkContextValueType,
    showUpdateDialog: Function,
    hideUpdateDialog: Function,
    checkForUpdate: Function,
    showUpdateDialogWithData: Function,
    isStatusBarTranslucent: boolean,
    setStatusBarTranslucent: (translucent: boolean) => void
}