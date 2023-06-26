// noinspection JSUnusedLocalSymbols

import React, {useEffect, useState} from "react";
import {ScrollView, View, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import AppModal from "../../../../lib/AppModal";
import {AppColors} from "../../../../../assets/AppColors";
import AppButton from "../../../../lib/AppButton";
import I18N from "../../../../../helper/translation";
import AppIcon, {Icons} from "../../../../lib/AppIcon";
import AppBar from "../../../../lib/AppBar";
import AppText from "../../../../lib/AppText";
import AppTextInput from "../../../../lib/AppTextInput";
import AppPicker from "../../../../lib/AppPicker";
import {getAllDistricts, getAllTalukes, getAllVillages} from "../../../../../storage/Schema_Helpers";
import {localDBErrorHandler} from "../../../../../storage/DBErrorHandler";
import {Constant} from "../../../../../helper/constant";
import {useMessage} from "../../../../../base/contexts/MessageProvider";
import {getDynamicFontSize} from "../../../../../helper/Utility"
import {useLocale} from "../../../../../base/contexts/I18NProvider";
import {useCustomerListTheme} from "../../../../../base/theme contexts/CustomerListThemeProvider";

/**
 * @author Vipin Joshi
 * @since 07-01-2022
 * @description to render Customer Farm Form.
 * @param show to visible or hide dialog.
 * @param isEditMode true/ for enable edit mode.
 * @param onBackPressed back button event callback.
 * @param onPressAddFarm add farm button press event callback.
 * @param onPressSaveFarm save farm button press event callback
 * @param customerFarmData selected customer farm details.
 */
const CustomerFarmFormDialog = ({
                                    show,
                                    isEditMode,
                                    onBackPressed,
                                    onPressAddFarm,
                                    onPressSaveFarm,
                                    customerFarmData
                                }): JSX.Element => {

    const TAG = "CustomerFarmFormDialog:"

    const message = useMessage()
    const [visible, setVisible] = useState(show)
    const [editMode, setEditMode] = useState(isEditMode)
    const [selectedFarmData: { farm: any, index: index }, setSelectedFarmData] = useState(customerFarmData)
    const [selectedFarm: any, setSelectedFarm] = useState(undefined)
    const [index, setIndex] = useState(-1)

    const {countries, states} = useSelector((currentState: any) => currentState.customerReducer)
    const [taluks, setTaluks] = useState([])
    const [districts, setDistricts] = useState([])
    const [villages, setVillages] = useState([])


    const [id, setId] = useState(-1)
    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [street2, setStreet2] = useState('')
    const [city, setCity] = useState('')
    const [postcode, setPostcode] = useState('')
    const [country: any, setCountry] = useState(undefined)
    const [state: any, setState] = useState(undefined)
    const [district: any, setDistrict] = useState(undefined)
    const [taluk: any, setTaluk] = useState(undefined)
    const [village: any, setVillage] = useState(undefined)
    const [isFarmer, setIsFarmer] = useState(false)
    const [isVendor, setIsVendor] = useState(false)
    const [isCashVendor, setIsCashVendor] = useState(false)
    const [isMeditator, setIsMeditator] = useState(false)
    const [isSynced, setIsSynced] = useState(false)
    const [isOffline, setIsOffline] = useState(false)
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {customerListTheme} = useCustomerListTheme()

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    /**
     * @author Vipin Joshi
     * @since 10-01-2022
     * @description to reset data on this form visible.
     */
    useEffect(() => {
        setVisible(show)
        setEditMode(isEditMode)

        if (show) {
            //reset data
            resetStateData()

            if (!isEditMode) { // set default country & state while creating new customer Farm
                onCountryValueChange(Constant.INDIA_COUNTRY_ID)
                onStateValueChange(Constant.TAMIL_NADU_STATE_ID)
            }
        }

    }, [show, isEditMode])

    /**
     * @author Vipin Joshi
     * @since 10-01-2022
     * @description to reset form current state data.
     */
    const resetStateData = (): void => {
        setSelectedFarmData(undefined)
        setSelectedFarm(undefined)
        setIndex(-1)

        setId(-1)
        setType('')
        setName('')
        setStreet('')
        setStreet2('')
        setCity('')
        setPostcode('')
        setDistricts([])
        setTaluks([])
        setVillages([])
        setCountry(undefined)
        setState(undefined)
        setDistrict(undefined)
        setTaluk(undefined)
        setVillage(undefined)
        setIsFarmer(false)
        setIsVendor(false)
        setIsCashVendor(false)
        setIsMeditator(false)
        setIsSynced(false)
        setIsOffline(false)
    }

    /**
     * @author Vipin Joshi
     * @since 10-01-2022
     * @description to handle change of Customer Farm State Data.
     */
    useEffect(() => {
        if (state && state.id !== -1) {
            getAllDistricts(state.id).then(districts => {
                setDistricts(districts)

                if (selectedFarm) { // must be undefined when customer Farm selected for edit
                    const selectedDistrict = districts.find(item => item.id === selectedFarm.district_id)
                    if (selectedDistrict) {
                        setDistrict(selectedDistrict)
                    }
                }
            }, error => {
                localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
            })
        }
    }, [state, visible])

    /**
     * @author Vipin Joshi
     * @since 10-01-2022
     * @description to handle change of Customer Farm District Data.
     */
    useEffect(() => {
        if (district && district.id !== -1) {
            getAllTalukes(+district.id).then(taluks => {
                setTaluks(taluks)

                if (selectedFarm) { // must be undefined when customer farm selected for edit.
                    const selectedTaluk = taluks.find(item => item.id === selectedFarm.taluk_id)
                    if (selectedTaluk) {
                        setTaluk(selectedTaluk)
                    }
                }
            }, error => {
                localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
            })
        }
    }, [district])

    /**
     * @author Vipin Joshi
     * @since 10-01-2022
     * @description to handle change of Customer Farm Taluk Data.
     */
    useEffect(() => {
        if (taluk && taluk.id !== -1) {
            getAllVillages(+taluk.id).then(villages => {
                setVillages(villages)

                if (selectedFarm) { // must be undefined when customer farm selected for edit.
                    const selectedVillage = villages.find(item => item.id === selectedFarm.village_id)
                    if (selectedVillage) {
                        setVillage(selectedVillage)
                    }
                }
            }, error => {
                localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
            })
        }
    }, [taluk])

    /**
     * @author Vipin Joshi
     * @since 10-01-2022
     * @description to initialize data on change of Edit Customer Farm Data.
     */
    useEffect(() => {
        setSelectedFarmData(customerFarmData)

        if (customerFarmData) {
            const {farm, index} = customerFarmData

            if (farm) {
                setSelectedFarm(farm)
                setIndex(index)

                //initialize data
                setId(farm.id)
                setName(farm.name)
                setType(farm.type)
                setStreet(farm.street)
                setStreet2(farm.street2)
                setCity(farm.city)
                setPostcode(farm.zip)

                onCountryValueChange(farm.country_id)
                onStateValueChange(farm.state_id)

                setIsSynced(farm.isSynced)
                setIsOffline(farm.isOffline)
                setIsFarmer(farm.is_farmer)
                setIsVendor(farm.is_vendor)
                setIsCashVendor(farm.is_cash_vendor)
                setIsMeditator(farm.is_meditator)
            }
        }
    }, [customerFarmData])

    const onStreetTextChange = (value): void => setStreet(value)
    const onStreetBlur = (): void => {
        if (!street) {
            message.showToast(I18N.t('NewFarmStreet1CannotBeEmptyMsg'))
        }
    }
    const onStreet2TextChange = (value): void => setStreet2(value)
    const onStreet2Blur = (): void => {
        if (!street2) {
            message.showToast(I18N.t('NewFarmStreet2CannotBeEmptyMsg'))
        }
    }
    const onCityTextChange = (value): void => setCity(value)
    const onCityBlur = (): void => {
        if (!city) {
            message.showToast(I18N.t('NewFarmCityCannotBeEmptyMsg'))
        }
    }
    const onPostcodeTextChange = (value): void => setPostcode(value)
    const onPostcodeBlur = (): void => {
        if (!postcode) {
            message.showToast(I18N.t('NewFarmPinCodeCannotBeEmptyMsg'))
        } else if (postcode.length !== 6) {
            message.showToast(I18N.t('NewFarmPinCode6DigitMsg'))
        }
    }
    /**
     * @author Vipin Joshi.
     * @since 10-01-2022.
     * @description country picker value changes event handler.
     * @param countryId selected id.
     */
    const onCountryValueChange = (countryId) => {
        const selectedCountry = countries.find(item => item.id === countryId)
        if (selectedCountry) {
            setCountry(selectedCountry)
        }
    }
    /**
     * @author Vipin Joshi.
     * @since 10-01-2022.
     * @description state picker value changes handler.
     * @param stateId selected id.
     */
    const onStateValueChange = (stateId) => {
        const selectedState = states.find(item => item.id === stateId)
        if (selectedState) {
            setState(selectedState)

            // setDistricts([])
            setDistrict(undefined)
            setTaluks([])
            setTaluk(undefined)
            setVillages([])
            setVillage(undefined)
        }
    }
    /**
     * @author Vipin Joshi.
     * @since 10-01-2022.
     * @description district picker value changes handler.
     * @param districtId selected id.
     */
    const onDistrictValueChange = (districtId) => {
        const selectedDistrict = districts.find(item => item.id === districtId)
        if (selectedDistrict) {
            setDistrict(selectedDistrict)

            // setTaluks([])
            setTaluk(undefined)
            setVillages([])
            setVillage(undefined)
        }
    }
    /**
     * @author Vipin Joshi.
     * @since 10-01-2022.
     * @description taluk picker value changes handler.
     * @param talukId selected id.
     */
    const onTalukValueChange = (talukId) => {
        const selectedTaluk = taluks.find(item => item.id === talukId)
        if (selectedTaluk) {
            setTaluk(selectedTaluk)

            // setVillages([])
            setVillage(undefined)
        }
    }
    /**
     * @author Vipin Joshi.
     * @since 10-01-2022.
     * @description village picker value changes handler.
     * @param villageId selected id.
     */
    const onVillageValueChange = (villageId) => {
        const selectedVillage = villages.find(item => item.id === villageId)
        if (selectedVillage) {
            setVillage(selectedVillage)
        }
    }

    /**
     * @author Vipin Joshi.
     * @since 10-01-2022.
     * @description to handle reset button press event.
     */
    const onResetButtonPress = (): void => resetStateData()

    /**
     * @author Vipin Joshi.
     * @since 10-01-2022.
     * @description to handle customer farm detail submission button press event.
     */
    const onSubmitFarmButtonPress = (): void => {
        if (isValidate()) {
            let farm = {}
            farm.type = 'other'
            farm.name = name
            farm.street = street
            farm.street2 = street2
            farm.city = city
            farm.zip = postcode
            farm.country_id = country.id
            farm.state_id = state.id
            farm.district_id = district.id
            farm.taluk_id = taluk.id
            farm.village_id = village.id
            farm.is_farmer = true
            farm.is_vendor = false
            farm.is_cash_vendor = false
            farm.is_meditator = false

            farm.isOffline = true
            farm.isSynced = isSynced // to identify later on it is already created on server or not.

            farm.id = -1
            if (editMode) {
                farm.id = id
            }

            // Call respective functions based on edit mode.
            const callback = !editMode ? onPressAddFarm?.bind(this, farm) : onPressSaveFarm?.bind(this, farm, index)
            if (callback) {
                callback()
            } else {
                console.log(TAG, 'OnSubmitCustomerFarmCallback is', callback)
            }
        }
    }

    /**
     * @author Vipin Joshi.
     * @since 10-01-2022.
     * @description to check customer farm data is valid or not.
     * @return {boolean|void}
     * todo remove alert dialogs.
     */
    const isValidate = (): boolean => {
        if (!street?.trim()) {
            return message.showAlert(I18N.t('FarmFormStreet1CannotBeEmptyMsg'))
        } else if (!street2?.trim()) {
            return message.showAlert(I18N.t('FarmFormStreet2CannotBeEmptyMsg'))
        } else if (!city?.trim()) {
            return message.showAlert(I18N.t('FarmFormCityCannotBeEmptyMsg'))
        } else if (postcode?.trim() && postcode?.trim().length !== 6) {
            return message.showAlert(I18N.t('FarmFormPinCode6DigitMsg'))
        } else if (!country?.name?.trim()) {
            return message.showAlert(I18N.t('FarmFormCountryCannotBeEmptyMsg'))
        } else if (!state?.name?.trim()) {
            return message.showAlert(I18N.t('FarmFormStateCannotBeEmptyMsg'))
        } else if (!district?.name?.trim()) {
            return message.showAlert(I18N.t('FarmFormDistrictCannotBeEmptyMsg'))
        } else if (!taluk?.name?.trim()) {
            return message.showAlert(I18N.t('FarmFormTalukCannotBeEmptyMsg'))
        } else if (!village?.name?.trim()) {
            return message.showAlert(I18N.t('FarmFormVillageCannotBeEmptyMsg'))
        }
        return true
    }

    return (
        <AppModal
            show={visible}
            transparent={false}
            onRequestClose={onBackPressed}>

            <View style={styles.modalViewContainer}>

                <AppBar
                    statusBarHeight={2}
                    headerStyle={[styles.header, {backgroundColor: !editMode ? AppColors.americanGreen : AppColors.darkBlueGray}]}
                    beforeContent={<>
                        <AppButton
                            style={[styles.actionButton, /*{backgroundColor: !editMode ? AppColors.americanGreen : AppColors.darkBlueGray}*/]}
                            color={AppColors.white}
                            type={'primary'}
                            labelStyle={{fontSize:getDynamicFontSize(14),lineHeight: getDynamicFontSize(14),paddingTop: 2}}
                            title={I18N.t('CancelAction')}
                            size={32}
                            withoutDelay={true}
                            icon={({size, color}) => (
                                <AppIcon type={Icons.MaterialIcons} name={'keyboard-arrow-left'} color={color}
                                         size={size}/>
                            )}
                            onPress={onBackPressed}/>
                    </>}
                    title={<AppText style={styles.headerText} text={I18N.t('FarmDetails')}/>}
                    contentStyle={styles.content}
                    afterContent={
                        <>
                            <AppButton
                                style={[styles.actionButton, /*{backgroundColor: !editMode ? AppColors.americanGreen : AppColors.darkBlueGray}*/]}
                                title={!editMode ? I18N.t('AddFarmAction') : I18N.t('SaveFarmAction')}
                                color={AppColors.white}
                                type={'primary'}
                                labelStyle={{fontSize:getDynamicFontSize(14),lineHeight: getDynamicFontSize(14),paddingTop: 2}}
                                size={32}
                                withoutDelay={true}
                                onPress={onSubmitFarmButtonPress}
                                icon={({size, color}) => (
                                    <AppIcon type={Icons.MaterialIcons} name={!editMode ? 'check' : 'save'}
                                             color={color}
                                             size={size}/>
                                )}/>
                        </>}
                />

                <ScrollView
                    contentContainerStyle={[styles.scrollviewContent, {backgroundColor: customerListTheme?.backgroundColor}]}
                    scrollEnabled={true}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.scrollViewContainer}>
                        <View style={styles.row}>
                            <AppTextInput
                                label={I18N.t('FarmFormStreet1Label')}
                                value={street}
                                mode="outlined"
                                onChangeText={onStreetTextChange}
                                onBlur={onStreetBlur}
                                style={styles.rowItem}
                            />
                            <AppTextInput
                                label={I18N.t('FarmFormStreet2Label')}
                                value={street2}
                                mode="outlined"
                                onChangeText={onStreet2TextChange}
                                onBlur={onStreet2Blur}
                                style={styles.rowItem}
                            />
                        </View>
                        <View style={styles.row}>
                            <AppTextInput
                                label={I18N.t('FarmFormCityLabel')}
                                value={city}
                                mode="outlined"
                                onChangeText={onCityTextChange}
                                onBlur={onCityBlur}
                                style={styles.rowItem}
                            />
                            <AppTextInput
                                label={I18N.t('FarmFormPinCodeLabel')}
                                value={postcode}
                                mode="outlined"
                                onChangeText={onPostcodeTextChange}
                                onBlur={onPostcodeBlur}
                                style={styles.rowItem}
                                keyboardType='phone-pad'
                            />
                        </View>
                        <View style={styles.row}>
                            <AppPicker
                                title={I18N.t('FarmFormCountryLabel')}
                                selectedValue={country?.id}
                                onValueChange={onCountryValueChange}
                                data={countries}
                                initialItem={{name: I18N.t('SelectCountryItem'), id: -1}}
                            />
                            <AppPicker
                                title={I18N.t('FarmFormStateLabel')}
                                selectedValue={state?.id}
                                onValueChange={onStateValueChange}
                                data={states}
                                initialItem={{name: I18N.t('SelectStateItem'), id: -1}}
                            />
                        </View>
                        <View style={styles.row}>
                            <AppPicker
                                title={I18N.t('FarmFormDistrictLabel')}
                                selectedValue={district?.id}
                                onValueChange={onDistrictValueChange}
                                data={districts}
                                initialItem={{name: I18N.t('SelectDistrictItem'), id: -1}}
                            />
                            <AppPicker
                                title={I18N.t('FarmFormTalukLabel')}
                                selectedValue={taluk?.id}
                                onValueChange={onTalukValueChange}
                                data={taluks}
                                initialItem={{name: I18N.t('SelectTalukItem'), id: -1}}
                            />
                        </View>

                        <View style={styles.row}>
                            <AppPicker
                                title={I18N.t('FarmFormVillageLabel')}
                                selectedValue={village?.id}
                                onValueChange={onVillageValueChange}
                                data={villages}
                                initialItem={{name: I18N.t('SelectVillageItem'), id: -1}}
                            />
                            <View style={styles.rowItem}/>
                        </View>

                        <View style={[styles.row, {display: editMode ? 'none' : 'flex'}]}>
                            <AppButton
                                style={styles.resetButton}
                                color={AppColors.white}
                                title={I18N.t('ResetAction')}
                                size={32}
                                withoutDelay={true}
                                icon={({size, color}) => (
                                    <AppIcon type={Icons.MaterialIcons} name={'undo'} color={color}
                                             size={size}/>
                                )}
                                onPress={onResetButtonPress}/>
                        </View>

                    </View>

                </ScrollView>
            </View>
        </AppModal>
    )
}

/**
 * @author Vipin Joshi.
 * @since 21-07-2021
 * @description Farm Dialog Style.
 */
const styles = StyleSheet.create({
    modalViewContainer: {flex: 1},
    header: {justifyContent: 'space-between',height: getDynamicFontSize(55),paddingBottom: 4,},
    headerText: {
    color: AppColors.colorBackgroundWhite,
    fontSize: getDynamicFontSize(22)
  },
    content: {justifyContent: 'center', alignItems: 'center', left: '20%'},
    scrollviewContent: {flexGrow: 1},
    scrollViewContainer: {margin: 8},
    row: {flexDirection: 'row'},
    rowItem: {margin: 8, flex: 1},
    actionButton: {borderWidth: 2, borderColor: AppColors.americanSilver, borderRadius: 4},
    resetButton: {margin: 8, backgroundColor: AppColors.americanGreen}
})

export default React.memo(CustomerFarmFormDialog, (prevProps, nextProps) => {
    return prevProps.show === nextProps.show && prevProps.isEditMode === nextProps.isEditMode && prevProps.customerFarmData === nextProps.customerFarmData
})
