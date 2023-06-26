import React, {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import AppButton from "../../../lib/AppButton";
import I18N from "../../../../helper/translation";
import {AppColors} from "../../../../assets/AppColors";
import {useMessage} from "../../../../base/contexts/MessageProvider";
import {getDynamicFontSize} from "../../../../helper/Utility"
import {useLocale} from "../../../../base/contexts/I18NProvider";

/**
 * @author Lovesh Singh.
 * @returns {JSX.Element}
 * @description LogoutButton Component.
 * @since 15-01-2022
 */
const LogoutButton = ({onPressLogout}): JSX.Element => {

    const message = useMessage()
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    /**
     * @author Vipin Joshi.
     * @since 07-09-2021.
     * @description to show logout alert dialog.
     */
    const logoutAlert = (): void => {
        message.showAlert(
            I18N.t('LogoutAlertLabel'), {
                message: I18N.t('LogoutAlertMsg'),
                buttons: [
                    {
                        text: I18N.t('CancelAction'),
                        style: {
                            backgroundColor: AppColors.chineseWhite,
                            borderColor: AppColors.arsenic
                        },
                        buttonTextStyle: {
                            color: AppColors.arsenic
                        },
                        icon: <AppIcon type={Icons.MaterialIcons} name={'undo'} color={AppColors.arsenic}
                                       size={12} style={{marginRight: 8}}/>
                    },
                    {
                        text: I18N.t('LogoutAlertSuccessButtonLabel'),
                        icon: <AppIcon type={Icons.MaterialCommunityIcons} name={'page-next'} color={AppColors.white}
                                       size={12} style={{marginRight: 8}}/>,
                        onPress: onPressLogout
                    }
                ]
            })
    }


    return (
        <AppButton
            uppercase={false}
            type="primary"
            style={styles.logoutButton}
            onPress={logoutAlert}
            labelStyle={{fontSize:getDynamicFontSize(17), lineHeight: getDynamicFontSize(17), paddingTop: 2,}}
            withoutDelay={false}
            icon={({size, color}) => (
                <AppIcon type={Icons.AntDesign} name={'logout'} color={color}
                         size={getDynamicFontSize(size)}/>
            )}
            title={I18N.t('LogoutAction')}/>
    )
}

const styles = StyleSheet.create({
    logoutButton: {
        borderWidth: 1,
        borderColor: AppColors.americanSilver,
        borderRadius: 4,
    },
})

export default LogoutButton
