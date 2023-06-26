// noinspection JSUnusedLocalSymbols

import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import {View, StyleSheet} from "react-native";
import AppModal from "./AppModal";
import AppText from "./AppText";
import { AppColors } from "../../assets/AppColors";
import { AppFonts } from "../../assets/AppFonts";
import { getDynamicFontSize } from "../../helper/Utility";
import AppIcon, { Icons } from "./AppIcon";
import AppImage from "./AppImage";
import * as Progress from 'react-native-progress';
import { useMessage } from "../../base/contexts/MessageProvider";
import * as Updates from "expo-updates";
import AppRoundButton from "./AppRoundButton";
import I18N from "../../helper/translation/index"
import {useTheme} from "../../base/contexts/ThemeProvider";

/**
 * @author Lovesh Singh
 * @since 17-01-2022
 * @description to render Update Dialog.
 * @param props
 */
const AppUpdateDialog = forwardRef((props, ref): JSX.Element => {

    const TAG = "AppUpdateDialog:"

    const alert = useMessage()
    const [visible, setVisible] = useState(false)
    const [showProgress, setShowProgress] = useState(true)
    const [showButton, setShowButton] = useState(false)
    const [message, setMessage] = useState(undefined)
    const [update, setUpdate] = useState(undefined)
    const [isUpdateDownloaded, setIsUpdateDownloaded] = useState(false)
    const [onBackPress, setOnBackPress] = useState(undefined)
    const [logo, setLogo] = useState(require("../../assets/images/logo-animation.gif"))
    const {theme} = useTheme()

    /**
    * @author Lovesh Singh
    * @since 02-02-2022
    * @description to provide public functions.
    */
    useImperativeHandle(ref, () => ({
        show,
        checkForAppUpdate,
        hide,
        showWithData
    }));

    /**
    * @author Lovesh Singh
    * @since 02-02-2022
    * @description to hide update dialog.
    */
    const hide = (): void => {
        setVisible(false)
        setOnBackPress(undefined)
    }

    /**
     * @author Lovesh Singh
     * @since 02-02-2022
     * @description to show update dialog.
     * @param show to show/hide update dialog.
     * @param checkForUpdate to check for update.
     * @param onBackPress
     */
    const show = async ({ show, checkForUpdate, onBackPress }): void => {
        setVisible(show)
        setOnBackPress(onBackPress)

        if (checkForUpdate) {
            setMessage(I18N.t('CheckingForUpdateLabel'))
            setShowButton(false)
            await checkForAppUpdate(setUpdate,
                (err) => {
                    setUpdate(undefined)
                    setVisible(false)
                    alert.showAlert(I18N.t('ErrorUpdateMsg'), { message: err.message })
                })
        }
    }

    /**
   * @author Lovesh Singh
   * @since 02-02-2022
   * @description to show update dialog.
   * @param update updata data.
   * @param onBackPress call only when press back.
   */
    const showWithData = (update: any, onBackPress): void => {
        if (update) {
            setUpdate(update)
            setVisible(true)
            setOnBackPress(onBackPress)
        }
    }

    /**
    * @author Lovesh Singh
    * @since 02-02-2022
    * @description to check for update availability.
    * @param successCallback call only when update is available.
    * @param errorCallback call only when no update or any error come.
    */
    const checkForAppUpdate = async (successCallback: Function, errorCallback: Function): void => {
        try {
            setMessage(I18N.t('CheckingForUpdateLabel'))
            const update = await Updates.checkForUpdateAsync()
            if (update.isAvailable) {
                successCallback?.call(this, update)
            } else {
                errorCallback?.call(this, new Error(I18N.t('NoUpdateAvailableMsg')))
            }
        }
        catch (err) {
            errorCallback?.call(this, err)
        }
    }


    /**
    * @author Lovesh Singh
    * @since 02-02-2022
    * @description to set message when update available.
    */
    useEffect(() => {
        if (update) {
            setTimeout(() => {
                if (update.isAvailable) {
                    setLogo(require("../../assets/images/logo.png"))
                    setShowProgress(false)
                    setShowButton(true)
                    setMessage(I18N.t('UpdateAvailableMsg'))
                } else {
                    setLogo(require("../../assets/images/logo.png"))
                    setShowProgress(false)
                    setShowButton(true)
                    setMessage(I18N.t('NoUpdateAvailableMsg'))
                }
            }, 3000)
        }

    }, [update])

    /**
    * @author Lovesh Singh
    * @since 02-02-2022
    * @description on press update action.
    */
    const updateApp = async () => {
        setLogo(require("../../assets/images/logo-animation.gif"))
        setShowProgress(true)
        setShowButton(false)
        setMessage(I18N.t('DownloadingUpdateMsg'))
        setTimeout(async () => {
            try {
                await Updates.fetchUpdateAsync()
                setLogo(require("../../assets/images/logo.png"))
                setShowProgress(false)
                setShowButton(true)
                setMessage(I18N.t('DownloadCompleteMsg'))
                setUpdate(undefined)
                setIsUpdateDownloaded(true)
            }
            catch (err) {
                setLogo(require("../../assets/images/logo.png"))
                setShowProgress(false)
                setShowButton(true)
                setVisible(false)
                alert.showAlert(I18N.t('ErrorDownloadMsg'), { message: err.message })
            }
        }, 3000)
    }

    /**
    * @author Lovesh Singh
    * @since 02-02-2022
    * @description on press restart action.
    */
    const restartApp = async () => {
        try {
            setVisible(false)
            await Updates.reloadAsync()
        }
        catch (err) {
            alert.showAlert(I18N.t('ErrorRestartMsg'), { message: err.message })
        }
    }

    if (!visible)
        return null

    return (
        <AppModal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onBackPress}
        >
            <View style={styles.backdrop} />
            <View style={styles.updateBoxContainer}>
                <View style={[styles.updateBox, {backgroundColor: theme?.backgroundColor,}]}>

                    <AppImage source={logo} fadeDuration={0} style={styles.updateLogo}
                        resizeMode={'contain'} />
                    <AppText text={message} style={styles.updateTitle}
                        numberOfLines={2} />
                    <Progress.Bar width={getDynamicFontSize(400)} color={theme?.primaryColor} borderColor={theme?.primaryColor}
                        indeterminate={true}
                        style={{ display: showProgress ? 'flex' : 'none', marginBottom: 10 }} />
                    <AppRoundButton
                        type="primary"
                        color={AppColors.white}
                        uppercase={false}
                        style={[styles.button, { display: update?.isAvailable && showButton ? 'flex' : 'none' }]}
                        title={I18N.t('UpdateAction')}
                        withoutDelay={true}
                        icon={({ size, color }) => (
                            <AppIcon type={Icons.MaterialCommunityIcons} name={'update'} color={color}
                                size={20} />
                        )}
                        onPress={updateApp}
                    />
                    <AppRoundButton
                        type="primary"
                        color={AppColors.white}
                        uppercase={false}
                        style={[styles.button, { display: isUpdateDownloaded && showButton ? 'flex' : 'none' }]}
                        title={I18N.t('RestartAction')}
                        withoutDelay={true}
                        icon={({ size, color }) => (
                            <AppIcon type={Icons.MaterialCommunityIcons} name={'restart'} color={color}
                                size={getDynamicFontSize(20)} />
                        )}
                        onPress={restartApp}
                    />

                </View>
            </View>


        </AppModal>
    )
})

/**
 * @author Lovesh Singh
 * @since 01-02-2022
 * @description Update Dialog Style.
 */
const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: AppColors.charlestonGreen,
        opacity: 0.4
    },
    updateBoxContainer: {
        flex: 1,
        alignItems: 'center',
    },
    updateBox: {
        position: 'absolute',
        bottom: 0,
        maxWidth: '65%',
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        // backgroundColor: AppColors.lotion,
        padding: getDynamicFontSize(5),
        // paddingBottom: getDynamicFontSize(30),
        alignItems: "center",
    },
    updateLogo: {
        width: getDynamicFontSize(100),
        height: getDynamicFontSize(100),
        borderRadius: 10
    },
    updateTitle: {
        // margin: 24,
        marginVertical: getDynamicFontSize(20),
        // color: AppColors.arsenic,
        fontFamily: AppFonts.bold,
        fontSize: getDynamicFontSize(16),
    },
    button: {
        marginHorizontal: 8,
        padding: 3,
        alignSelf: 'center',
    }
})

export default AppUpdateDialog
