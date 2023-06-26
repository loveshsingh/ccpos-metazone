// noinspection JSUnusedLocalSymbols

import React, {useState, forwardRef, useImperativeHandle} from "react";
import {View, StyleSheet} from "react-native";
import AppModal from "./AppModal";
import AppText from "./AppText";
import {AppColors} from "../../assets/AppColors";
import {AppFonts} from "../../assets/AppFonts";
import {getDynamicFontSize} from "../../helper/Utility";
import AppTouchableOpacity from "./AppTouchableOpacity";
import I18N from "../../helper/translation";
import AppIcon, {Icons} from "./AppIcon";
import {useTheme} from "../../base/contexts/ThemeProvider";

/**
 * @author Lovesh Singh
 * @since 29-01-2022
 * @description to render App alert Dialog.
 * @param props
 */
const AppAlertDialog = forwardRef((props, ref): JSX.Element => {

    const TAG = "AppAlertDialog:"

    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState(I18N.t('AlertTitle'))
    const [message, setMessage] = useState(undefined)
    const [buttons: [AlertDialogButtonType], setButtons] = useState([])
    const [buttonContainerStyle, setButtonContainerStyle] = useState(undefined)
    const {theme} = useTheme()

    useImperativeHandle(ref, () => ({

        show({title, message, buttons, buttonContainerStyle}) {
            setVisible(true)
            setTitle(title)
            setMessage(message)
            setButtons(buttons)
            setButtonContainerStyle(buttonContainerStyle)
        }

    }));

    if (!visible)
        return null

    const onActionButtonPress = (item): void => {
        const isCancelable = item?.isCancelable
        setVisible(isCancelable ? isCancelable : false)
        item.onPress?.call(this)
    }

    const AndroidButtonBox = (): JSX.Element => {
        const buttonProps = buttons && buttons.length > 0 ? buttons : [{
            text: I18N.t('OkAction'),
            style: undefined,
            buttonTextStyle: undefined,
            icon: <AppIcon type={Icons.MaterialCommunityIcons} name={'page-next'} color={AppColors.white}
                           size={12} style={{marginRight: 8}}/>,
            onPress: () => {
                setVisible(false)
            },
            isCancelable: true
        }]

        return (
            <View style={[styles.buttonGroup, buttonContainerStyle]}>
                {
                    buttonProps.map((item, index) => {
                        if (index > 2) return null //if there are more than 3 buttons then return null

                        //if there are more than 3 buttons then align first button to left end
                        const marginRight = buttonProps.length > 2 && index === 0 ? 'auto' : +styles.button?.marginHorizontal

                        return (
                            <AppTouchableOpacity onPress={onActionButtonPress.bind(this, item)}
                                                 style={[styles.button, {marginRight, backgroundColor: theme?.primaryColor}, item?.style]}>
                                {item?.icon}
                                <AppText
                                    text={item.text}
                                    style={[styles.buttonText, item?.buttonTextStyle]}
                                />
                            </AppTouchableOpacity>
                        )
                    })

                }
            </View>
        );
    }
    return (
        <AppModal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.backdrop}/>
            <View style={styles.alertBoxContainer}>
                <View style={[styles.alertBox, {backgroundColor: theme?.backgroundColor}]}>

                    <AppText text={title} style={styles.alertTitle} numberOfLines={1}/>
                    <AppText text={message} style={styles.alertMessage} numberOfLines={4}/>
                    <AndroidButtonBox/>

                </View>
            </View>


        </AppModal>
    )
})

/**
 * @author Lovesh Singh
 * @since 17-01-2022
 * @description App alert Dialog Style.
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
    alertBoxContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertBox: {
        maxWidth: "80%",
        // width: "60%",
        borderRadius: 5,
        backgroundColor: AppColors.lotion,
    },
    alertTitle: {
        margin: 24,
        marginBottom: 10,
        // color: AppColors.black,
        fontFamily: AppFonts.bold,
        fontSize: getDynamicFontSize(22),
    },
    alertMessage: {
        margin: 24,
        marginTop: 0,
        marginBottom: 10,
        // color: AppColors.black,
        fontFamily: AppFonts.regular,
        fontSize: getDynamicFontSize(15),
    },
    buttonGroup: {
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: 12,
        marginHorizontal: 8,
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: AppColors.oxfordBlue,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: AppColors.oxfordBlue,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    buttonText: {
        color: AppColors.white,
        fontFamily: AppFonts.regular,
        fontSize: getDynamicFontSize(12),
    }
})

export default AppAlertDialog

/**
 * @author Lovesh Singh
 * @since 31-01-2022
 * @description Alert Dialog Button Type.
 */
export type AlertDialogButtonType = {
    text: string, style: any, buttonTextStyle: any, onPress: Function, icon: AppIcon,
    /**
     * @description pass true to auto close alert dialog, default:true
     */
    isCancelable: boolean
}
