// noinspection JSUnusedLocalSymbols

import React, {useEffect, useState} from "react";
import {View, StyleSheet, Pressable} from "react-native";
import AppModal from "../lib/AppModal";
import AppText from "../lib/AppText";
import AppRoundButton from "../lib/AppRoundButton";
import I18N from "../../helper/translation";
import {AppColors} from "../../assets/AppColors";
import {AppFonts} from "../../assets/AppFonts";
import AppIcon, {Icons} from "../lib/AppIcon";
import {getDynamicFontSize} from "../../helper/Utility";
import {useDispatch, useSelector} from "react-redux";
import {setShowErrorLog, removeErrorLogs, setErrorLogs} from "../../actions/errorLog";
import ErrorLogList from "./error-log/ErrorLogList";
import ErrorLogDetail from "./error-log/ErrorLogDetail";
import {removeErrorLogsAsyncStorage, removeSingleErrorLog} from '../../storage/getAuthAsyncStorage'
import AppTouchableOpacity from "../lib/AppTouchableOpacity";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StorageConstant} from "../../storage";
import * as Sentry from 'sentry-expo';
import {useMessage} from "../../base/contexts/MessageProvider";
import {useTheme} from "../../base/contexts/ThemeProvider";

/**
 * @author Lovesh Singh
 * @since 01-04-2022
 * @description to render Error Log Dialog.
 */
const ErrorLogDialog = (): JSX.Element => {

    const TAG = "ErrorLogDialog:"
    const showShowErrorLog = useSelector(((state: any) => state.errorLogReducer.setShowErrorLog))
    const errorLogsArray = useSelector(((state: any) => state.errorLogReducer.errorLogs))
    const selectedErrorLog = useSelector((state: any) => state.errorLogReducer?.selectedErrorLogDetail?.errorLog);
    const nursery = useSelector((state: any) => state.authReducer?.sessionDetails?.shopName);
    const sessionId = useSelector((state: any) => state.authReducer?.sessionDetails?.sessionId);
    const agentName = useSelector((state: any) => state.viewMoreReducer?.agentDetail?.agentName);
    const [visible, setVisible] = useState(showShowErrorLog);
    const dispatch = useDispatch();
    const message = useMessage();
    const {theme} = useTheme()

    useEffect(() => {
        setVisible(showShowErrorLog)
        AsyncStorage.getItem(StorageConstant.ERROR_LOGS, async (err, result) => {
            dispatch(setErrorLogs(result))
        });
    }, [showShowErrorLog])

    /**
     * @author Lovesh Singh
     * @since 07-04-2022
     * @description to handle cancel button.
     */
    const cancelButtonPressHandler = (): void => {
        dispatch(setShowErrorLog(false))
    }

    /**
     * @author Lovesh Singh
     * @since 07-04-2022
     * @description to handle report button.
     */
    const reportButtonPressHandler = (): void => {
        if (selectedErrorLog) {
            Sentry.Native.setTags({
                "nursery": nursery,
                "sessionId": sessionId,
                "agentName": agentName,
                "errorDate": selectedErrorLog?.date
            })
            // Sentry.Native.captureException(selectedErrorLog?.error?.componentStack)
            Sentry.Native.captureMessage(selectedErrorLog?.message)
            removeSingleErrorLog(selectedErrorLog, (isRemoved, errorLogs) => {
                if (isRemoved) {
                    // dispatch(setErrorLogs(errorLogs))
                    // message.showAlert("Your error report sent to developer!")
                    message.showAlert(
                        "Report Sent", {
                            message: "Your error report sent to developer!",
                            buttons: [
                                {
                                    text: "Ok",
                                    icon: <AppIcon type={Icons.MaterialCommunityIcons} name={'page-next'}
                                                   color={AppColors.white}
                                                   size={12} style={{marginRight: 8}}/>,
                                    onPress: () => dispatch(setErrorLogs(errorLogs))
                                }
                            ]
                        })
                }
            })
        }
    }

    /**
     * @author Lovesh Singh
     * @since 07-04-2022
     * @description to handle clear all button.
     */
    const clearAllButtonPressHandler = (): void => {
        removeErrorLogsAsyncStorage((isRemoved) => {
            if (isRemoved)
                dispatch(removeErrorLogs())
        })
    }


    return (
        <AppModal
            animationType="slide"
            show={visible}
            transparent={true}
            onRequestClose={cancelButtonPressHandler}>
            <Pressable style={styles.backdrop} onPress={cancelButtonPressHandler}/>
            <View style={styles.modalViewContainer}>
                <View
                    contentContainerStyle={styles.scrollviewContent}
                    scrollEnabled={true}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>

                    <View style={[styles.scrollviewViewContainer, {backgroundColor: theme?.backgroundColor}]}>
                        <AppText text={I18N.t('ErrorLogs')} style={styles.mainHeadingText}/>

                        <View style={styles.innerContainer}>
                            <View style={{flex: 1}}>
                                <ErrorLogList data={errorLogsArray}/>
                            </View>
                            <View style={{flex: 2,}}>
                                <ErrorLogDetail/>
                            </View>
                        </View>

                        <View style={styles.actionButtonContainer}>
                            <AppRoundButton
                                type="primary"
                                color={AppColors.white}
                                uppercase={false}
                                // style={{backgroundColor: AppColors.chineseWhite}}
                                title={I18N.t('ReportAction')}
                                withoutDelay={true}
                                icon={({size, color}) => (
                                    <AppIcon type={Icons.MaterialIcons} name={'report'} color={color}
                                             size={size}/>
                                )}
                                onPress={reportButtonPressHandler}
                            />
                            <AppRoundButton
                                uppercase={false}
                                // color={AppColors.arsenic}
                                // style={{backgroundColor: AppColors.americanGreen,marginLeft: 10}}
                                style={{marginLeft: 10}}
                                title={I18N.t('ClearAllLabel')}
                                withoutDelay={true}
                                icon={({size, color}) => (
                                    <AppIcon type={Icons.MaterialIcons} name={'clear-all'} color={color}
                                             size={size}/>
                                )}
                                onPress={clearAllButtonPressHandler}
                            />
                        </View>
                        <AppTouchableOpacity style={{position: 'absolute', top: 10, right: 15}}
                                             onPress={cancelButtonPressHandler}>

                            <AppIcon type={Icons.Ionicons}
                                     name={'close'} color={theme?.textColor}
                                     size={30}/>
                        </AppTouchableOpacity>
                    </View>
                </View>
            </View>
        </AppModal>
    )
}

/**
 * @author Lovesh Singh
 * @since 01-04-2022
 * @description Error Log Dialog Style.
 */
const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: AppColors.charlestonGreen,
        opacity: 0.32
    },
    modalViewContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
    },
    scrollviewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    scrollviewViewContainer: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        shadowColor: AppColors.white,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
        // minWidth: getDynamicFontSize(370),
        minWidth: "90%",
        minHeight: "90%",
    },
    mainHeadingText: {
        fontSize: getDynamicFontSize(30),
        textAlign: "center",
        fontWeight: "bold",
        paddingBottom: 20,
        // color: AppColors.arsenic,
        fontFamily: AppFonts.bold
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        height: '80%',
        flexDirection: "row",
    },
    itemContainer: {
        margin: 8,
        flex: 1,
        borderColor: AppColors.americanSilver,
        borderWidth: 2,
        padding: 10,
        borderRadius: 20
    },
    itemDateHeading: {
        fontSize: getDynamicFontSize(25),
        textAlign: "center",
        fontWeight: "bold",
        textDecorationLine: "underline",
        padding: 10,
        fontFamily: AppFonts.bold
        // color: AppColors.arsenic
    },
    itemRowContainer: {
        flexDirection: "row",
        padding: 8,
        justifyContent: "space-between"
    },
    itemRowText: {
        fontSize: getDynamicFontSize(21),
        fontWeight: "bold",
        fontFamily: AppFonts.bold
        // color: AppColors.arsenic
    },
    actionButtonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingTop: 10,
    },
    cancelButton: {
        height: 40,
        margin: 8,
        backgroundColor: AppColors.oxfordBlue,
        borderRadius: 4,
        fontFamily: AppFonts.bold,
    },
    submitButton: {
        height: 40,
        margin: 8,
        backgroundColor: AppColors.oxfordBlue,
        fontFamily: AppFonts.bold
    },
    noDataFoundText: {
        fontSize: getDynamicFontSize(18),
        textAlign: "center",
        color: AppColors.arsenic,
        padding: 20
    }
})

export default React.memo(ErrorLogDialog, () => true)
