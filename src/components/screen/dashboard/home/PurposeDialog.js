import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import AppModal from "../../../lib/AppModal";
import AppPicker from "../../../lib/AppPicker";
import AppRoundButton from "../../../lib/AppRoundButton";
import I18N from "../../../../helper/translation";
import {AppColors} from "../../../../assets/AppColors";
import AppIcon, {Icons} from "../../../lib/AppIcon";
import {Constant, FarmLandQuestion1Data, FarmLandQuestion2Data, Purposes} from "../../../../helper/constant";
import {useDispatch, useSelector} from "react-redux";
import {useLocale} from "../../../../base/contexts/I18NProvider";
import {getDynamicFontSize, isValidNumber} from "../../../../helper/Utility";
import {
    resetFarmDetails,
    setFarmDetails,
    setPurpose,
    showPurposeDialog
} from "../../../../actions/dashboard/home";
import AppText from "../../../lib/AppText";
import {AppFonts} from "../../../../assets/AppFonts";
import AppTextInput from "../../../lib/AppTextInput";
import {useMessage} from "../../../../base/contexts/MessageProvider";
import {useTheme} from "../../../../base/contexts/ThemeProvider";
import {deSelectCustomer} from "../../../../actions/dashboard/home/customer";

/**
 * @author Lovesh Singh
 * @since 23-05-2022
 * @description dialog open on purpose dropdown.
 */
const PurposeDialog = (): JSX.Element => {

    const show: boolean = useSelector((state: any) => state.dashboardHomeReducer?.showPurposeDialog)
    const {locale} = useLocale()
    const message = useMessage()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const purposes = Purposes
    const purpose = useSelector((state: any) => state.dashboardHomeReducer?.purpose)
    const howDoYouKnowAboutUs = useSelector((state: any) => state.dashboardHomeReducer?.howDoYouKnowAboutUs)
    const typeOfPlantation = useSelector((state: any) => state.dashboardHomeReducer?.typeOfPlantation)
    const farmLandArea = useSelector((state: any) => state.dashboardHomeReducer?.farmLandArea)
    const [purposeValue, setPurposeValue] = useState(purpose)
    const [visible, setVisible] = useState(purpose)
    const [showFarmQuestions, setShowFarmQuestions] = useState(false)
    const [farmLandQuestion1Selection, setFarmLandQuestion1Selection] = useState('')
    const [farmLandQuestion2Selection, setFarmLandQuestion2Selection] = useState('')
    const [farmLandQuestion3Selection, setFarmLandQuestion3Selection] = useState('')
    const {theme} = useTheme()

    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedLocale(locale)
    }, [locale])

    useEffect(() => {
        setVisible(show)
        if (show)
            setPurposeDialogData()

    }, [show])

    /**
     * @author Lovesh Singh
     * @since 02-06-2022
     * @description to load data of purpose.
     */
    const setPurposeDialogData = (): void => {
        if (purpose !== purposeValue) {
            setPurposeValue(purpose)
        }
        if (howDoYouKnowAboutUs !== farmLandQuestion1Selection) {
            setFarmLandQuestion1Selection(howDoYouKnowAboutUs)
        }
        if (typeOfPlantation !== farmLandQuestion2Selection) {
            setFarmLandQuestion2Selection(typeOfPlantation)
        }
        if (farmLandArea !== farmLandQuestion3Selection) {
            setFarmLandQuestion3Selection(farmLandArea)
        }
    }


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


    /**
     * @author Lovesh Singh
     * @since 23-05-2022
     * @description to reset form current state data.
     */
    const resetStateData = (): void => {
        // setPurposeValue('')
        setFarmLandQuestion1Selection('')
        setFarmLandQuestion2Selection('')
        setFarmLandQuestion3Selection('')
    }

    /**
     * @author Lovesh Singh
     * @since 23-05-2022
     * @description handle back key press event.
     */
    const onRequestClose = (): void => dispatch(showPurposeDialog())

    /**
     * @author Lovesh Singh
     * @since 23-05-2022.
     * @description to set the purpose state on change of purpose reducer state.
     */
    useEffect(() => {
        if (purposeValue === Constant.FarmLand) {
            setShowFarmQuestions(true)
        } else {
            setShowFarmQuestions(false)
        }
    }, [purposeValue])

    /**
     * @author Lovesh Singh
     * @since 23-05-2022.
     * @description to handle purpose dropdown value change.
     * @param value selected purpose.
     */
    const onPurposeValueChange = (value): void => {
        setPurposeValue(value)
    }

    /**
     * @author Lovesh Singh
     * @since 23-05-2022
     * @description to handle Cancel Button on press event.
     */
    const onCancelButtonPress = (): void => onRequestClose()

    /**
     * @author Lovesh Singh
     * @since 23-05-2022
     * @description to handle Submit Button on press event.
     */
    const onSubmitButtonPress = (): void => {
        if (purposeValue === Constant.FarmLand) {
            const farmLandArea = farmLandQuestion3Selection?.trim()

            if (validateFormData()) {
                const farmLandDetails = {}
                farmLandDetails.howDoYouKnowAboutUs = farmLandQuestion1Selection
                farmLandDetails.typeOfPlantation = farmLandQuestion2Selection
                farmLandDetails.farmLandArea = farmLandArea

                dispatch(setFarmDetails(farmLandDetails))
                dispatch(setPurpose(purposeValue))
                dispatch(deSelectCustomer())
            }
        } else {
            dispatch(resetFarmDetails())
            dispatch(setPurpose(purposeValue))
            dispatch(deSelectCustomer())
        }
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

                    <View style={[styles.scrollviewViewContainer, {backgroundColor: theme?.backgroundColor,}]}>

                        <AppText text={I18N.t('SelectPurposeLabel')} style={styles.purposeHeading}/>

                        <AppPicker
                            // title={I18N.t('PurposeLabel')}
                            selectedValue={purposeValue}
                            onValueChange={onPurposeValueChange}
                            data={purposes}
                            style={styles.picker}
                            initialItem={{name: '', id: ''}}
                            mode={"dropdown"}
                        />

                        <View style={{display: showFarmQuestions ? 'flex' : 'none'}}>

                            <AppText text={I18N.t('FarmLandQuestion1')} style={styles.purposeHeading}/>
                            <AppPicker
                                selectedValue={farmLandQuestion1Selection}
                                onValueChange={onFarmLandQuestion1ValueChange}
                                data={FarmLandQuestion1Data}
                                initialItem={{name: '', id: ''}}
                            />

                            <AppText text={I18N.t('FarmLandQuestion2')} style={styles.purposeHeading}/>
                            <AppPicker
                                selectedValue={farmLandQuestion2Selection}
                                onValueChange={onFarmLandQuestion2ValueChange}
                                data={FarmLandQuestion2Data}
                                initialItem={{name: '', id: ''}}
                            />

                            <AppText text={I18N.t('FarmLandQuestion3')} style={styles.purposeHeading}/>
                            <AppTextInput
                                value={farmLandQuestion3Selection}
                                onChangeText={onFarmLandQuestion3ValueChange}
                                style={styles.textInput}
                                keyboardType='number-pad'/>
                        </View>

                        <View style={styles.actionButtonContainer}>

                            <AppRoundButton
                                // color={AppColors.arsenic}
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
        borderRadius: 20,
        padding: getDynamicFontSize(18),
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
        flex: 1,
        height: getDynamicFontSize(50),
    },
    actionButtonContainer: {
        margin: 8,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    purposeHeading: {
        fontSize: getDynamicFontSize(20),
        fontFamily: AppFonts.bold,
        marginBottom: 5,
        paddingLeft: getDynamicFontSize(5)
    }
})

export default React.memo(PurposeDialog, () => true)
