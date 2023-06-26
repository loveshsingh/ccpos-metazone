import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {AppColors} from "../../../../assets/AppColors";
import I18N from "../../../../helper/translation";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import AppModal from "../../../lib/AppModal";
import AppPicker from "../../../lib/AppPicker";
import AppTextInput from "../../../lib/AppTextInput";
import AppRoundButton from "../../../lib/AppRoundButton";
import {FarmLandQuestion1Data, FarmLandQuestion2Data} from "../../../../helper/constant";
import {isValidNumber, getDynamicFontSize} from "../../../../helper/Utility";
import {useMessage} from "../../../../base/contexts/MessageProvider";
import {useLocale} from "../../../../base/contexts/I18NProvider";

/**
 * @author Vipin Joshi
 * @since 17-01-2022
 * @description dialog open on purpose dropdown selection.
 * @param show true/false to show/ hide dialog.
 * @param onBackPressed back button event callback.
 * @param onSubmit submit button event callback
 */
const PurposeSelectionDialog = ({show, onBackPressed, onSubmit}): JSX.Element => {

    const [visible, setVisible] = useState(false)
    const [farmLandQuestion1Selection, setFarmLandQuestion1Selection] = useState('')
    const [farmLandQuestion2Selection, setFarmLandQuestion2Selection] = useState('')
    const [farmLandQuestion3Selection, setFarmLandQuestion3Selection] = useState('')
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    const message = useMessage()

    useEffect(() => {
        setVisible(show)

        if (show) {
            //reset data
            resetStateData()
        }
    }, [show])

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to reset form current state data.
     */
    const resetStateData = (): void => {
        setFarmLandQuestion1Selection('')
        setFarmLandQuestion2Selection('')
        setFarmLandQuestion3Selection('')
    }

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description handle back key press event.
     */
    const onRequestClose = (): void => onBackPressed?.call(this)

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle farmLand Question1 field value change event.
     */
    const onFarmLandQuestion1ValueChange = (value): void => setFarmLandQuestion1Selection(value)

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle farmLand Question2 field value change event.
     */
    const onFarmLandQuestion2ValueChange = (value): void => setFarmLandQuestion2Selection(value)

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle farmLand Question3 field value change event.
     */
    const onFarmLandQuestion3ValueChange = (value): void => setFarmLandQuestion3Selection(value)

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle Cancel Button on press event.
     */
    const onCancelButtonPress = (): void => onRequestClose()

    /**
     * @author Vipin Joshi
     * @since 18-01-2022
     * @description to handle Submit Button on press event.
     */
    const onSubmitButtonPress = (): void => {
        const farmLandArea = farmLandQuestion3Selection?.trim()

        if (validateFormData()) {
            const farmLandDetails = {}
            farmLandDetails.howDoYouKnowAboutUs = farmLandQuestion1Selection
            farmLandDetails.typeOfPlantation = farmLandQuestion2Selection
            farmLandDetails.farmLandArea = farmLandArea

            onSubmit?.call(this, farmLandDetails)
        }
    }

    const validateFormData = (): boolean => {
        if (!farmLandQuestion1Selection) {
            message.showAlert(`${I18N.t('FarmLandQuestion1')} ${I18N.t('CannotBeEmptyMsg')}`)
            return false
        } else if (!farmLandQuestion2Selection) {
            message.showAlert(`${I18N.t('FarmLandQuestion2')} ${I18N.t('CannotBeEmptyMsg')}`)
            return false
        } else if (!farmLandQuestion3Selection) {
            message.showAlert(`${I18N.t('FarmLandQuestion3')} ${I18N.t('CannotBeEmptyMsg')}`)
            return false
        } else if (isValidNumber(farmLandQuestion3Selection) || +farmLandQuestion3Selection?.trim() <= 0) {
            message.showAlert(I18N.t('FarmLandQuestion3'), {message: I18N.t('EnterValidNumberValueMsg')})
            return false
        }

        return true
    }

    return (
        <AppModal
            show={visible}
            onRequestClose={onRequestClose}>

            <View style={styles.modalViewContainer}>
                <ScrollView
                    contentContainerStyle={styles.scrollviewContent}
                    scrollEnabled={true}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>

                    <View style={styles.scrollviewViewContainer}>

                        <AppPicker
                            title={I18N.t('FarmLandQuestion1')}
                            selectedValue={farmLandQuestion1Selection}
                            onValueChange={onFarmLandQuestion1ValueChange}
                            data={FarmLandQuestion1Data}
                            initialItem={{name: '', id: ''}}
                        />

                        <AppPicker
                            title={I18N.t('FarmLandQuestion2')}
                            selectedValue={farmLandQuestion2Selection}
                            onValueChange={onFarmLandQuestion2ValueChange}
                            data={FarmLandQuestion2Data}
                            initialItem={{name: '', id: ''}}
                        />

                        <AppTextInput
                            label={I18N.t('FarmLandQuestion3')}
                            value={farmLandQuestion3Selection}
                            onChangeText={onFarmLandQuestion3ValueChange}
                            style={styles.textInput}
                            keyboardType='number-pad'/>

                        <View style={styles.actionButtonContainer}>

                            <AppRoundButton
                                color={AppColors.arsenic}
                                uppercase={false}
                                title={I18N.t("CancelAction")}
                                withoutDelay={true}
                                icon={({size, color}) => (
                                    <AppIcon
                                        type={Icons.MaterialIcons}
                                        name={"undo"}
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={onCancelButtonPress}
                            />
                            <AppRoundButton
                                type="primary"
                                uppercase={false}
                                color={AppColors.white}
                                title={I18N.t("SubmitAction")}
                                withoutDelay={true}
                                icon={({size, color}) => (
                                    <AppIcon
                                        type={Icons.MaterialIcons}
                                        name={"save"}
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={onSubmitButtonPress}
                            />
                        </View>
                    </View>

                </ScrollView>
            </View>
        </AppModal>
    );
}

const styles = StyleSheet.create({
    modalViewContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    scrollviewContent: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    scrollviewViewContainer: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minWidth: 370
    },
    itemPickerTitle: {
        fontSize: getDynamicFontSize(10),
        marginHorizontal: 8
    },
    textInput: {
        margin: 8,
        flex: 1
    },
    actionButtonContainer: {
        margin: 8,
        flexDirection: "row",
        justifyContent: "space-around"
    }
})

export default React.memo(PurposeSelectionDialog, (prevProps, nextProps): boolean => {
    return prevProps.show === nextProps.show
})
