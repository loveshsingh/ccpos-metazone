import React, {createContext, useContext, useRef} from "react";
import Toast from "react-native-toast-message"
import AppAlertDialog from "../../components/lib/AppAlertDialog";
import type {AlertDialogButtonType} from "../../components/lib/AppAlertDialog";

//Note:  Class based component can't be able to use hook to access Context value for that we have to export this context
export const MessageContext = createContext()

/**
 * @author Vipin Joshi.
 * @since 19-01-2022.
 * @description to handle app messaging feature.
 */
const MessageProvider = ({children}): JSX.Element => {

    const TAG = 'MessageProvider'

    const alertRef = useRef();

    /**
     * @author Vipin Joshi.
     * @since 19-01-2022.
     * @param text 'Hello'
     * @param config toast Configuration
     * @see https://github.com/calintamas/react-native-toast-message/blob/main/docs/api.md
     */
    const showToast = (text: string, config: ToastConfigType): void => {
        const defaultConfig: ToastConfigType = {
            description: undefined, //'This is some something 👋'
            timeout: 1000,
            type: 'success',
            position: 'bottom',
            autoHide: true
        }

        const description = config?.description ? config?.description : defaultConfig.description
        const timeout = config?.timeout ? config?.timeout : defaultConfig.timeout
        const type = config?.type ? config?.type : defaultConfig.type
        const position = config?.position ? config?.position : defaultConfig.position
        const autoHide = config?.autoHide ? config?.autoHide : defaultConfig.autoHide

        Toast.show({
            type: type,
            text1: text,
            text2: description,

            position: position,
            autoHide: autoHide,
            visibilityTime: timeout
        });
    }

    /**
     * @author Lovesh Singh.
     * @since 29-01-2022.
     * @param title 'Hello'
     * @param config alert Configuration
     */
    const showAlert = (title: string, config: AlertConfigType): void => {

        alertRef.current.show({
            title,
            ...config
        })
    }


    return (
        <MessageContext.Provider value={{showToast, showAlert}}>
            {children}
            <Toast/>
            <AppAlertDialog ref={alertRef}/>
        </MessageContext.Provider>
    );
}

/**
 * @author Vipin Joshi.
 * @since 19-01-2022.
 * @description hook to get Message Context value.
 * @returns value from Message Context
 * @type {{showToast: Function}}
 */
export const useMessage = (): MessageContextValueType => useContext(MessageContext)

export default MessageProvider

/**
 * @author Vipin Joshi
 * @since 19-01-2022.
 * @description Message context types.
 */
export type MessageContextValueType = {
    showToast: () => void,
    showAlert: () => void,
    showUpdate: () => void,
}

/**
 * @author Vipin Joshi
 * @since 19-01-2022.
 * @description Toast Config types.
 */
export type ToastConfigType = {
    description: string, //'This is some something 👋'
    timeout: number,
    type: string,
    position: string,
    autoHide: boolean
}

/**
 * @author Lovesh Singh
 * @since 29-01-2022.
 * @description Alert Config types.
 */
export type AlertConfigType = {
    message: string, //'This is some something 👋'
    buttons: [AlertDialogButtonType],
}
