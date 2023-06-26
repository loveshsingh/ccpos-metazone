import React, {useEffect, useState} from 'react';
import {Animated, ScrollView, StyleSheet, View} from "react-native";
import AppTextInput from "../../../../lib/AppTextInput";
import I18N from "../../../../../helper/translation";
import {AppColors} from "../../../../../assets/AppColors";
import AppModal from "../../../../lib/AppModal";
import AppButton from "../../../../lib/AppButton";
import AppIcon, {Icons} from "../../../../lib/AppIcon";
import AppBar from "../../../../lib/AppBar";
import AppPicker from "../../../../lib/AppPicker";
import {useSelector} from "react-redux";
import CustomerFarmList from "./CustomerFarmList";
import {
    getAllBlocks,
    getAllDistricts,
    getAllGramPanchayats,
    getAllLocalBodies,
    getAllTalukes, getAllVillages,
} from "../../../../../storage/Schema_Helpers";
import {localDBErrorHandler} from "../../../../../storage/DBErrorHandler";
import {Constant} from "../../../../../helper/constant";
import CustomerFarmFormDialog from "./CustomerFarmFormDialog";
import AppText from "../../../../lib/AppText";
import {useMessage} from "../../../../../base/contexts/MessageProvider";
import {AppFonts} from "../../../../../assets/AppFonts";
import {getDynamicFontSize} from "../../../../../helper/Utility"
import AppTouchableOpacity from "../../../../lib/AppTouchableOpacity";
import {useLocale} from "../../../../../base/contexts/I18NProvider";
import {useCustomerListTheme} from "../../../../../base/theme contexts/CustomerListThemeProvider";
import {debounce} from "../../../../../base/hook/app_hook";

/**
 * @author Vipin Joshi.
 * @since 06-01-2022.
 * @description to render Customer Form.
 * @return {JSX.Element}
 * @param show to visible or hide dialog.
 * @param isEditMode true/ for enable edit mode.
 * @param customerData selected customer data for edit.
 * @param onBackPressed back event listener.
 * @param onPressAddCustomer add customer button press event, trigger only when edit mode is false.
 * @param onPressSaveCustomer save customer button press event, trigger only when edit mode is true.
 */
const CustomerFormDialog = ({
                                show,
                                isEditMode,
                                customerData,
                                onBackPressed,
                                onPressAddCustomer,
                                onPressSaveCustomer
                            }): JSX.Element => {

    const TAG = 'CustomerFormDialog'

    const message = useMessage()
    const [visible, setVisible] = useState(show)
    const [editMode, setEditMode] = useState(isEditMode)
    const [selectedCustomerData, setSelectedCustomerData] = useState(customerData)
    const [showFarmDialog, setShowFarmDialog] = useState(false)
    const [selectedCustomerFarmData, setSelectedCustomerFarmData] = useState(undefined)
    const [farmFormEditMode, setFarmFormEditMode] = useState(false)

    const {countries, states} = useSelector((currentState: any) => currentState.customerReducer)
    // const [districts, setDistricts] = useState([])
    const [districts, setDistricts] = useState([])
    const [taluks, setTaluks] = useState([])
    // const [villages, setVillages] = useState([])
    const [localBodies, setLocalBodies] = useState([])
    const [blocks, setBlocks] = useState([])
    const [gramPanchayats, setGramPanchayts] = useState([])
    const [landDistricts, setLandDistricts] = useState([])
    const [landTaluks, setLandTaluks] = useState([])
    const [landVillages, setLandVillages] = useState([])

    const [customerId, setCustomerId] = useState(-1)
    const [farmId, setFarmId] = useState(-1)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [whatsAppNo, setWhatsAppNo] = useState('')
    const [country: any, setCountry] = useState(undefined)
    const [district: any, setDistrict] = useState(undefined)
    const [state: any, setState] = useState(undefined)
    const [taluk: any, setTaluk] = useState(undefined)
    const [landDistrict: any, setLandDistrict] = useState(undefined)
    const [landTaluk: any, setLandTaluk] = useState(undefined)
    const [landBlock: any, setLandBlock] = useState(undefined)
    const [landGramPanchayat: any, setLandGramPanchayat] = useState(undefined)
    const [landLocalBody: any, setLandLocalBody] = useState(undefined)
    const [landVillage, setLandVillage] = useState('')
    const [landLandmark: any, setLandLandmark] = useState('')
    // const [village, setVillage] = useState(undefined)
    // const [village, setVillage] = useState('')
    // const [city, setCity] = useState('')
    // const [postcode, setPostcode] = useState('')
    // const [barcode, setBarcode] = useState('')
    // const [tax, setTax] = useState('')
    // const [street, setStreet] = useState('')
    // const [farmLandArea, setFarmLandArea] = useState('')
    // const [farmAddress, setFarmAddress] = useState('')
    const [aadhaarNo, setAadhaarNo] = useState('')
    const [panNo, setPanNo] = useState('')
    const [isOffline, setIsOffline] = useState(false)
    const [isCustomerSynced, setIsCustomerSynced] = useState(false)
    const [isFarmSynced, setIsFarmSynced] = useState(false)
    const [farms, setFarms] = useState([])
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)
    const {customerListTheme} = useCustomerListTheme()
    const purpose = useSelector((state: any) => state.dashboardHomeReducer?.purpose)
    const [showLocalBlock, setShowLocalBlock] = useState(true)
    const [showGramPanchayat, setShowGramPanchayat] = useState(true)

    useEffect(() => {
        setSelectedLocale(locale)
    }, [locale])

    /**
     * @author Vipin Joshi
     * @since 08-01-2022
     * @description to reset data on this form visible.
     */
    useEffect(() => {
        setVisible(show)

        if (show) {
            setEditMode(isEditMode)

            //reset data
            const initResetStateData = async (): void => {
                resetStateData()
                if (!isEditMode) { // set default country & state while creating new customer
                    onCountryValueChange(Constant.INDIA_COUNTRY_ID)
                    onStateValueChange(Constant.TAMIL_NADU_STATE_ID)
                }
            }
            initResetStateData()

        }

    }, [show, isEditMode])


    /**
     * @author Vipin Joshi
     * @since 10-01-2022
     * @description to reset form current state data.
     */
    const resetStateData = (): void => {
        setSelectedCustomerData(undefined)

        setCustomerId(-1)
        setFarmId(-1)
        setName('')
        // setEmail('')
        setPhone('')
        setWhatsAppNo('')
        setDistricts([])
        setTaluks([])
        setLandDistricts([])
        setLandTaluks([])
        setLocalBodies([])
        setBlocks([])
        setGramPanchayts([])
        setLandVillages([])
        setCountry(undefined)
        setDistrict(undefined)
        setState(undefined)
        setTaluk(undefined)
        setLandDistrict(undefined)
        setLandTaluk(undefined)
        setLandBlock(undefined)
        setLandGramPanchayat(undefined)
        setLandLocalBody(undefined)
        setLandLandmark(undefined)
        setLandVillage('')
        // setVillage(undefined)
        // setCity('')
        // setPostcode('')
        // setBarcode('')
        // setTax('')
        // setStreet('')
        // setFarmLandArea('')
        // setFarmAddress('')
        setAadhaarNo('')
        setPanNo('')
        setIsOffline(false)
        setIsCustomerSynced(false)
        setIsFarmSynced(false)
        // setFarms([])
    }

    /**
     * @author Vipin Joshi
     * @since 08-01-2022
     * @description to handle change of Customer State Data.
     */
    useEffect(() => {
        const initAllDistricts = async (): void => {
            if (state && state.id !== -1) {
                getAllDistricts(state.id).then(districts => {
                    setDistricts(districts)
                    setLandDistricts(districts)

                    if (selectedCustomerData) { // must be undefined when customer selected for edit
                        let farm = customerData.child_ids[0]
                        const selectedDistrict = districts.find(item => item.id === selectedCustomerData.district_id)
                        if (selectedDistrict) {
                            setDistrict(selectedDistrict)
                        }

                        if (farm) {
                            const selectedLandDistrict = districts.find(item => item.id === farm.district_id)
                            if (selectedLandDistrict) {
                                setLandDistrict(selectedLandDistrict)
                                setShowLocalBlock(false)
                            }
                        }
                    }
                }, error => {
                    localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
                })
            }
        }
        initAllDistricts()
    }, [state, visible])

    /**
     * @author Vipin Joshi
     * @since 08-01-2022
     * @description to handle change of Customer District Data.
     */
    useEffect(() => {
        const initAllTaluks = async (): void => {
            getAllTalukes(+district.id).then(taluks => {
                setTaluks(taluks)

                if (selectedCustomerData) { // must be undefined when customer selected for edit.
                    const selectedTaluk = taluks.find(item => item.id === selectedCustomerData.taluk_id)
                    if (selectedTaluk) {
                        setTaluk(selectedTaluk)
                    }
                }
            }, error => {
                localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
            })
        }
        if (district && district.id !== -1) {
            initAllTaluks()
        }
    }, [district])

    /**
     * @author Lovesh Singh
     * @since 24-06-2022
     * @description to handle change of Customer Land District Data.
     */
    useEffect(() => {

        const initAllTaluksLocalBodies = async (): void => {

            await getAllTalukes(+landDistrict.id).then(taluks => {
                setLandTaluks(taluks)

                if (selectedCustomerData) { // must be undefined when customer selected for edit.
                    let farm = customerData.child_ids[0]
                    if (farm) {
                        const selectedLandTaluk = taluks.find(item => item.id === farm.taluk_id)
                        if (selectedLandTaluk) {
                            setLandTaluk(selectedLandTaluk)
                        }
                    }
                }
            }, error => {
                localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
            })

            await getAllLocalBodies(+landDistrict.id).then(localBodies => {
                setLocalBodies(localBodies)

                if (selectedCustomerData) { // must be undefined when customer selected for edit.
                    let farm = customerData.child_ids[0]
                    if (farm) {
                        const selectedLocalBody = localBodies.find(item => item.id === farm.local_body_id)
                        if (selectedLocalBody) {
                            setLandLocalBody(selectedLocalBody)
                        }
                    }
                }
            }, error => {
                localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
            })

            await getAllBlocks(+landDistrict.id).then(blocks => {
                setBlocks(blocks)

                if (selectedCustomerData) { // must be undefined when customer selected for edit.
                    let farm = customerData.child_ids[0]
                    if (farm) {
                        const selectedBlock = blocks.find(item => item.id === farm.block_id)
                        if (selectedBlock) {
                            setLandBlock(selectedBlock)
                            setShowGramPanchayat(false)
                        }
                    }
                }
            }, error => {
                localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
            })
        }
        if (landDistrict && landDistrict.id !== -1) {
            initAllTaluksLocalBodies()
        }
    }, [landDistrict])

    /**
     * @author Lovesh Singh
     * @since 24-06-2022
     * @description to handle change of Customer Land Block Data.
     */
    useEffect(() => {
        const initAllGramPanchayats = async (): void => {

            getAllGramPanchayats(+landBlock.id).then(gramPanchayats => {
                setGramPanchayts(gramPanchayats)
                setLandVillages(gramPanchayats)

                if (selectedCustomerData) { // must be undefined when customer selected for edit.
                    let farm = customerData.child_ids[0]
                    if (farm) {
                        const selectedGramPanchayat = gramPanchayats.find(item => item.id === farm.gram_panchayat_id)
                        if (selectedGramPanchayat) {
                            setLandGramPanchayat(selectedGramPanchayat)
                        }
                    }
                }
            }, error => {
                localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
            })

        }
        if (landBlock && landBlock.id !== -1) {
            initAllGramPanchayats()
        }
    }, [landBlock])

    /**
     * @author Lovesh Singh
     * @since 24-06-2022
     * @description to handle change of Customer Land Gram Panchayat Data.
     */
    useEffect(() => {

        const initAllVillages = async (): void => {
            getAllVillages(+landGramPanchayat.id).then(villages => {
                setLandVillages(villages)

                if (selectedCustomerData) { // must be undefined when customer selected for edit.
                    let farm = customerData.child_ids[0]
                    if (farm) {
                        const selectedVillage = villages.find(item => item.id === farm.gp_village_id)
                        if (selectedVillage) {
                            setLandVillage(selectedVillage)
                        }
                    }
                }
            }, error => {
                localDBErrorHandler(error, I18N.t('IfProblemPersistRestartMsg'))
            })
        }
        if (landGramPanchayat && landGramPanchayat.id !== -1) {
            initAllVillages()
        }
    }, [landGramPanchayat])

    /**
     * @author Vipin Joshi
     * @since 08-01-2022
     * @description to initialize data on change of Edit Customer Data.
     */
    useEffect(() => {
        const initCustomerData = async (): void => {
            setSelectedCustomerData(customerData)


            if (customerData) {
                console.log("Customer data: ", customerData)
                //initialize data
                setCustomerId(customerData.id)
                setName(customerData.name)
                setEmail(customerData.email)
                setPhone(customerData.phone)
                setWhatsAppNo(customerData.whatsapp_number)

                onCountryValueChange(Constant.INDIA_COUNTRY_ID)
                onStateValueChange(customerData.state_id)

                // setVillage(customerData.village)
                //todo mobile
                // setCity(customerData.city)
                // setPostcode(customerData.zip)
                // setBarcode(customerData.barcode)
                // setTax(customerData.vat)
                // setStreet(customerData.street)
                // setFarmLandArea(customerData.farm_land_area)
                // setFarmAddress(customerData.farm_address)
                setAadhaarNo(customerData.aadhaar_no)
                setPanNo(customerData.pan_no)
                setIsOffline(customerData.isOffline)
                setIsCustomerSynced(customerData.isSynced)

                let farm = customerData.child_ids[0]
                if (farm) {
                    setFarmId(farm.id)
                    setIsFarmSynced(farm.isSynced)
                    setLandLandmark(farm.landmark)
                }

                // setFarms(customerData.child_ids ? customerData.child_ids : [])
            }
        }

        initCustomerData()

    }, [customerData])


    const onNameTextChange = (value): void => setName(value)
    const onNameBlur = (): void => {
        if (!name) {
            message.showToast(I18N.t('NewCustomerNameCannotBeEmptyMsg'))
        }
    }
    // const onEmailTextChange = (value): void => setEmail(value)
    const onPhoneTextChange = (value): void => setPhone(value)
    const onPhoneBlur = (): void => {
        if (!phone) {
            message.showToast(I18N.t('NewCustomerPhoneCannotBeEmptyMsg'))
        } else if (phone.length !== 10) {
            message.showToast(I18N.t('NewCustomerPhone10DigitMsg'))
        }
    }
    const onWhatsAppNoTextChange = (value): void => setWhatsAppNo(value)
    const onWhatsAppNoFocus = (): void => {
        if (phone !== '' && whatsAppNo === '') {
            message.showAlert(I18N.t('WhatsappSameAsPhoneMsg'), {
                buttons: [
                    {
                        text: I18N.t('NoAction'),
                        style: {
                            backgroundColor: AppColors.chineseWhite,
                            borderColor: AppColors.arsenic,
                        },
                        buttonTextStyle: {
                            color: AppColors.arsenic,
                        },
                        icon: (
                            <AppIcon
                                type={Icons.MaterialIcons}
                                name={"undo"}
                                color={AppColors.arsenic}
                                size={12}
                                style={{marginRight: 8}}
                            />
                        ),
                    },
                    {
                        text: I18N.t('YesAction'),
                        icon: (
                            <AppIcon
                                type={Icons.MaterialCommunityIcons}
                                name={"page-next"}
                                color={AppColors.white}
                                size={12}
                                style={{marginRight: 8}}
                            />
                        ),
                        onPress: () => setWhatsAppNo(phone)
                    },
                ]
            })
        }
    }
    /**
     * @author Vipin Joshi.
     * @since 07-01-2022.
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
     * @since 07-01-2022.
     * @description state picker value changes handler.
     * @param stateId selected id.
     */
    const onStateValueChange = (stateId) => {
        const selectedState = states.find(item => item.id === stateId)
        if (selectedState) {
            setState(selectedState)

            // setDistricts([])
            setDistrict(undefined)
            setLandDistrict(undefined)
            setLandTaluk(undefined)
            setTaluks([])
            setTaluk(undefined)
            /*setVillages([])
            setVillage(undefined)*/
        }
    }
    /**
     * @author Vipin Joshi.
     * @since 07-01-2022.
     * @description district picker value changes handler.
     * @param districtId selected id.
     */
    const onDistrictValueChange = (districtId) => {
        const selectedDistrict = districts.find(item => item.id === districtId)
        if (selectedDistrict) {
            setDistrict(selectedDistrict)

            // setTaluks([])
            setTaluk(undefined)
            /*setVillages([])
            setVillage(undefined)*/
        }
    }
    /**
     * @author Vipin Joshi.
     * @since 07-01-2022.
     * @description taluk picker value changes handler.
     * @param talukId selected id.
     */
    const onTalukValueChange = (talukId) => {
        const selectedTaluk = taluks.find(item => item.id === talukId)
        if (selectedTaluk) {
            setTaluk(selectedTaluk)

            /*setVillages([])
            setVillage(undefined)*/
        }
    }
    /**
     * @author Vipin Joshi.
     * @since 07-01-2022.
     * @description village picker value changes handler.
     * @param villageId selected id.
     */
    /*const onVillageValueChange = (villageId) => {
        const selectedVillage = villages.find(item => item.id === villageId)
        if (selectedVillage) {
            setVillage(selectedVillage)
        }
    }*/
    const onVillageTextChange = (value): void => setVillage(value)
    const onVillageBlur = (): void => {
        if (!landVillage) {
            message.showToast(I18N.t('NewCustomerVillageCannotBeEmptyMsg'))
        }
    }
    // const onCityTextChange = (value): void => setCity(value)
    // const onCityBlur = (): void => {
    //     if (!city) {
    //         message.showToast(I18N.t('NewCustomerCityCannotBeEmptyMsg'))
    //     }
    // }
    // const onPostcodeTextChange = (value): void => setPostcode(value)
    // const onPostcodeBlur = (): void => {
    //     if (postcode?.length !== 6) {
    //         message.showToast(I18N.t('NewCustomerPinCode6DigitMsg'))
    //     }
    // }
    // const onStreetTextChange = (value): void => setStreet(value)
    // const onStreetBlur = (): void => {
    //     if (!street) {
    //         message.showToast(I18N.t('NewCustomerHomeAddressCannotBeEmptyMsg'))
    //     }
    // }
    // const onFarmLandAreaTextChange = (value): void => setFarmLandArea(value)
    // const onFarmLandAreaBlur = (): void => {
    //     if (!farmLandArea) {
    //         message.showToast(I18N.t('NewCustomerFarmLandAreaCannotBeEmptyMsg'))
    //     }
    // }
    const onLandLandmarkTextChange = (value): void => setLandLandmark(value)
    const onLandLandmarkBlur = (): void => {
        if (!landLandmark) {
            message.showToast(I18N.t('NewCustomerFarmLandAreaCannotBeEmptyMsg'))
        }
    }
    const onAadhaarNoTextChange = (value): void => setAadhaarNo(value)
    const onAadhaarNoBlur = (): void => {
        if (aadhaarNo?.length !== 12) {
            message.showToast(I18N.t('NewCustomerAadhaar12DigitMsg'))
        }
    }
    const onPanNoTextChange = (value): void => setPanNo(value)

    /**
     * @author Vipin Joshi.
     * @since 07-01-2022.
     * @description to handle add farm button press event.
     */
    const onAddFarmButtonPress = (): void => {
        setSelectedCustomerFarmData(undefined)
        setFarmFormEditMode(false)
        setShowFarmDialog(true)
    }

    /**
     * @author Vipin Joshi
     * @since 10-01-2022
     * @description to handle farm item press event.
     */
    const onFarmItemPress = (item, index): void => {
        setSelectedCustomerFarmData({farm: {...item}, index})
        setFarmFormEditMode(true)
        setShowFarmDialog(true)
    }

    /**
     * @author Vipin Joshi.
     * @since 10-01-2022.
     * @description to handle farm form dialog back press event.
     */
    const onFarmFormDialogBackPress = (): void => setShowFarmDialog(false)

    /**
     * @author Lovesh Singh.
     * @since 23-06-2022.
     * @description land district picker value changes handler.
     * @param landDistrictId selected id.
     */
    const onLandDistrictValueChange = (landDistrictId) => {
        const selectedLandDistrict = landDistricts.find(item => item.id === landDistrictId)
        if (selectedLandDistrict) {
            setLandDistrict(selectedLandDistrict)
            setShowLocalBlock(false)

            setLandTaluks([])
            setLandTaluk(undefined)
            setLandLocalBody(undefined)
            setLandBlock(undefined)
            setLandGramPanchayat(undefined)
            setLandVillage(undefined)
            /*setVillages([])
            setVillage(undefined)*/
        } else {
            setLandDistrict(undefined)
            setLandLocalBody(undefined)
            setLandGramPanchayat(undefined)
            setLandVillage(undefined)
            setLandBlock(undefined)
            setShowLocalBlock(true)
        }
    }

    /**
     * @author Lovesh Singh.
     * @since 23-06-2022.
     * @description land taluk picker value changes handler.
     * @param landTalukId selected id.
     */
    const onLandTalukValueChange = (landTalukId) => {
        const selectedLandTaluk = landTaluks.find(item => item.id === landTalukId)
        if (selectedLandTaluk) {
            // setTaluk(selectedTaluk)
            setLandTaluk(selectedLandTaluk)

            /*setVillages([])
            setVillage(undefined)*/
        }
    }

    /**
     * @author Lovesh Singh.
     * @since 23-06-2022.
     * @description land local body picker value changes handler.
     * @param landLocalBodyId selected id.
     */
    const onLandLocalBodyValueChange = (landLocalBodyId) => {
        const selectedLandLocalBody = localBodies.find(item => item.id === landLocalBodyId)
        if (selectedLandLocalBody) {
            setLandLocalBody(selectedLandLocalBody)

            /*setVillages([])
            setVillage(undefined)*/
        }
    }

    /**
     * @author Lovesh Singh.
     * @since 23-06-2022.
     * @description land block picker value changes handler.
     * @param landBlockId selected id.
     */
    const onLandBlockValueChange = (landBlockId) => {
        const selectedLandBlock = blocks.find(item => item.id === landBlockId)
        if (selectedLandBlock) {
            setLandBlock(selectedLandBlock)
            setLandGramPanchayat(undefined)
            setShowGramPanchayat(false)

            /*setVillages([])
            setVillage(undefined)*/
        } else {
            setLandBlock(undefined)
            setLandGramPanchayat(undefined)
            setLandVillage(undefined)
            setShowGramPanchayat(true)
        }
    }

    /**
     * @author Lovesh Singh.
     * @since 23-06-2022.
     * @description land gram panchayat picker value changes handler.
     * @param landGramPanchayatId
     */
    const onLandGramPanchayatValueChange = (landGramPanchayatId) => {
        const selectedLandGramPanchayat = gramPanchayats.find(item => item.id === landGramPanchayatId)
        if (selectedLandGramPanchayat) {
            setLandGramPanchayat(selectedLandGramPanchayat)
            // setLandVillages([])

            /*setVillages([])
            setVillage(undefined)*/
            setLandVillage(undefined)
        }
    }

    /**
     * @author Lovesh Singh.
     * @since 23-06-2022.
     * @description land village picker value changes handler.
     * @param landVillageId selected id.
     */
    const onLandVillageValueChange = (landVillageId) => {
        const selectedLandVillage = landVillages.find(item => item.id === landVillageId)
        if (selectedLandVillage) {
            setLandVillage(selectedLandVillage)

            /*setVillages([])
            setVillage(undefined)*/
        }
    }


    /**
     * @author Vipin Joshi.
     * @since 07-01-2022.
     * @description to handle customer detail submission button press event.
     */
    const onSubmitCustomerButtonPress = (): void => {
        console.log(TAG, 'IS Data Valid:', isValidate())
        if (isValidate()) {
            const customer = {}
            const farm = {}
            customer.city = ''
            customer.country_id = country.id
            customer.state_id = state.id
            customer.district_id = district ? district.id : false
            // customer.village_id = village.id
            customer.village = ''
            customer.taluk_id = taluk ? taluk.id : false
            customer.email = ''
            customer.street = ''
            customer.mobile = ""
            customer.name = name

            const displayValues = {
                "name": name,
                "phone": phone,
            }

            // let address = street ? street + ', ' : ''
            // address += city ? city + ', ' : ''
            // address += postcode ? postcode + ', ' : ''
            // address += country?.name ? country.name : ''
            // displayValues.address = address

            customer.display_values = JSON.stringify(displayValues)

            customer.barcode = ''
            customer.vat = ''
            customer.zip = ''
            customer.phone = phone
            customer.aadhaar_no = aadhaarNo
            customer.pan_no = panNo
            customer.farm_land_area = ''
            customer.whatsapp_number = whatsAppNo ? whatsAppNo : ''
            customer.farm_address = ''

            farm.type = 'other'
            farm.name = name
            farm.street = ''
            farm.street2 = ''
            farm.city = ''
            farm.zip = ''
            farm.country_id = country.id
            farm.state_id = state.id
            farm.district_id = landDistrict ? landDistrict.id : ''
            farm.taluk_id = landTaluk ? landTaluk.id : false
            farm.gp_village_id = landVillage ? landVillage.id : false
            farm.block_id = landBlock ? landBlock.id : false
            farm.local_body_id = landLocalBody ? landLocalBody.id : false
            farm.gram_panchayat_id = landGramPanchayat ? landGramPanchayat.id : false
            farm.landmark = landLandmark ? landLandmark : ''
            farm.is_farmer = true
            farm.is_vendor = false
            farm.is_cash_vendor = false
            farm.is_meditator = false

            farm.isOffline = true
            farm.isSynced = isFarmSynced // to identify later on it is already created on server or not.

            // setFarms([...farms, farm])

            customer.id = -1
            farm.id = -1
            if (editMode) {
                customer.id = customerId
                farm.id = farmId
            }

            customer.farm_list = purpose === 'farmland' ? [...farms, farm] : []

            // customer.farm_list.forEach(farm => {
            //     if (!farm.isSynced && farm.isOffline) { //Change newly added farm name as customer name
            //         farm.name = customer.name
            //     }
            // })
            // console.log(TAG, 'Submitting farms', customer.farm_list)

            customer.isOffline = isOffline
            customer.isSynced = isCustomerSynced

            console.log("Customer Details: ", customer)

            // Call respective functions based on edit mode.
            if (!editMode) {
                if (onPressAddCustomer) {
                    onPressAddCustomer(customer)
                } else {
                    console.log(TAG, 'OnPressAddCustomer is', onPressAddCustomer)
                }
            } else {
                if (onPressSaveCustomer) {
                    onPressSaveCustomer(customer)
                } else {
                    console.log(TAG, 'OnPressSaveCustomer is', onPressSaveCustomer)
                }
            }
        }
    }

    /**
     * @author Vipin Joshi.
     * @since 07-01-2022.
     * @description to check customer data is valid or not.
     * @return {boolean|void}
     */
    const isValidate = (): boolean => {
        if (!name?.trim()) {
            return message.showAlert(I18N.t('CustomerFormNameCannotBeEmptyMsg'))
        } else if (!phone?.trim()) {
            return message.showAlert(I18N.t('CustomerFormPhoneCannotBeEmptyMsg'))
        } else if (phone.length !== 10) {
            return message.showAlert(I18N.t('CustomerFormPhone10DigitMsg'))
        } else if (whatsAppNo?.trim() && whatsAppNo?.trim().length !== 10) {
            return message.showAlert(I18N.t('CustomerFormWhatsAppNo10DigitMsg'))
            // } else if (!country?.name?.trim()) {
            //     return message.showAlert(I18N.t('CustomerFormCountryCannotBeEmptyMsg'))
        } else if (!state?.name?.trim()) {
            return message.showAlert(I18N.t('CustomerFormStateCannotBeEmptyMsg'))
        } else if (purpose !== 'farmland' && !district?.name?.trim()) {
            return message.showAlert(I18N.t('CustomerFormDistrictCannotBeEmptyMsg'))
        } else if (purpose !== 'farmland' && !taluk?.name?.trim()) {
            return message.showAlert(I18N.t('CustomerFormTalukCannotBeEmptyMsg'))
            // } else if (postcode?.trim() && postcode?.trim().length !== 6) {
            //     return message.showAlert(I18N.t('CustomerFormPinCode6DigitMsg'))
            // } else if (!street?.trim()) {
            //     return message.showAlert(I18N.t('CustomerFormHomeAddressCannotBeEmptyMsg'))
            // } else if (aadhaarNo?.trim() && aadhaarNo?.trim().length !== 12) {
            //     return message.showAlert('CustomerFormAadhaar12DigitMsg')
        } else {
            if (purpose === 'farmland') {
                if (!landDistrict?.name?.trim()) {
                    return message.showAlert(I18N.t('CustomerFormLandDistrictCannotBeEmptyMsg'))
                } else if (!landTaluk?.name?.trim()) {
                    return message.showAlert(I18N.t('CustomerFormLandTalukCannotBeEmptyMsg'))
                } else if ((!landLocalBody?.name?.trim() && !landBlock?.name?.trim() && state?.id === Constant.TAMIL_NADU_STATE_ID)) {
                    return message.showAlert(I18N.t('CustomerFormLandLocalBodyBlockCannotBeEmptyMsg'))
                } else if (landBlock?.name?.trim()) {
                    if (!landGramPanchayat?.name?.trim()) {
                        return message.showAlert(I18N.t('CustomerFormLandGramPanchayatCannotBeEmptyMsg'))
                    } else if (!landVillage?.name?.trim()) {
                        return message.showAlert(I18N.t('CustomerFormLandVillageCannotBeEmptyMsg'))
                    }
                }
            }
            // IF GST IS VALID NUMBER START
            /*let firstTwoChars = +newState.tax.substring(0, 2)
            let selectedStateId = newState.state?.id
            if ((selectedStateId === serverTamilNaduId && firstTwoChars !== gstTamilNaduStartDigit) ||
                (selectedStateId === serverKarnatakaId && firstTwoChars !== gstKarnatakaStartDigit)
            ) {// If the state is TamilNadu then the starting number must be 33
                // for karnataka then the starting 29
                return Alert.alert(StringConstants.gstFormatNotBelongToThisState)
            }
            // IF GST IS VALID NUMBER END*/
        }
        return true
    }

    /**
     * @author Vipin Joshi.
     * @since 10-01-2022.
     * @description to handle add newly customer farm event.
     */
    const onNewlyFarmCreated = (farm): void => {
        setFarms([...farms, farm])
        setShowFarmDialog(false)
    }

    /**
     * @author Vipin Joshi.
     * @since 10-01-2022.
     * @description to handle save existing customer farm event.
     */
    const onSavedExistingFarm = (farm, index): void => {
        const existingFarms = [...farms]
        existingFarms.splice(index, 1, farm)

        setFarms(existingFarms)
        setShowFarmDialog(false)
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
                            type={"primary"}
                            labelStyle={{
                                fontSize: getDynamicFontSize(14),
                                lineHeight: getDynamicFontSize(14),
                                paddingTop: 2
                            }}
                            title={I18N.t('CancelAction')}
                            size={32}
                            withoutDelay={true}
                            icon={({size, color}) => (
                                <AppIcon type={Icons.MaterialIcons} name={'keyboard-arrow-left'} color={color}
                                         size={size}/>
                            )}
                            onPress={onBackPressed}/>
                    </>}
                    title={<AppText text={I18N.t('CustomerDetails')} style={styles.headerText}/>}
                    contentStyle={styles.content}
                    afterContent={<>
                        <AppButton
                            style={[styles.actionButton, /*{backgroundColor: !editMode ? AppColors.americanGreen : AppColors.darkBlueGray}*/]}
                            title={!editMode ? I18N.t('AddCustomerAction') : I18N.t('SaveCustomerAction')}
                            type={"primary"}
                            color={AppColors.white}
                            labelStyle={{
                                fontSize: getDynamicFontSize(14),
                                lineHeight: getDynamicFontSize(14),
                                paddingTop: 2
                            }}
                            size={32}
                            withoutDelay={true}
                            onPress={debounce(onSubmitCustomerButtonPress)}
                            icon={({size, color}) => (
                                <AppIcon type={Icons.MaterialIcons} name={!editMode ? 'check' : 'save'} color={color}
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
                                label={I18N.t('CustomerFormNameLabel')}
                                value={name}
                                mode="outlined"
                                onChangeText={onNameTextChange}
                                onBlur={onNameBlur}
                                style={styles.rowItem}/>
                            <AppTextInput
                                label={I18N.t('CustomerFormPhoneLabel')}
                                value={phone}
                                disabled={customerData?.phone}
                                mode="outlined"
                                onChangeText={onPhoneTextChange}
                                onBlur={onPhoneBlur}
                                style={styles.rowItem}
                                keyboardType='phone-pad'/>
                        </View>
                        <View style={styles.row}>
                            <AppTextInput
                                label={I18N.t('CustomerFormWhatsAppLabel')}
                                value={whatsAppNo}
                                disabled={customerData?.whatsapp_number}
                                mode="outlined"
                                onFocus={onWhatsAppNoFocus}
                                onChangeText={onWhatsAppNoTextChange}
                                style={styles.rowItem}
                                keyboardType='phone-pad'/>
                            <AppPicker
                                title={I18N.t('CustomerFormStateLabel')}
                                selectedValue={state?.id}
                                onValueChange={onStateValueChange}
                                data={states}
                                initialItem={{name: I18N.t('SelectStateItem'), id: -1}}
                            />
                        </View>

                        <View style={styles.row}>
                            <AppPicker
                                title={I18N.t('CustomerFormDistrictLabel')}
                                selectedValue={district?.id}
                                onValueChange={onDistrictValueChange}
                                data={districts}
                                style={{display: purpose !== 'farmland' ? 'flex' : 'none'}}
                                initialItem={{name: I18N.t('SelectDistrictItem'), id: -1}}
                            />
                            <View style={[styles.rowItem, {display: purpose === 'farmland' ? 'flex' : 'none'}]}/>
                            <AppPicker
                                title={I18N.t('CustomerFromTalukLabel')}
                                selectedValue={taluk?.id}
                                onValueChange={onTalukValueChange}
                                data={taluks}
                                style={{display: purpose !== 'farmland' ? 'flex' : 'none'}}
                                initialItem={{name: I18N.t('SelectTalukItem'), id: -1}}
                            />
                        </View>

                        <View style={{display: purpose === 'farmland' ? 'flex' : 'none'}}>
                            <View style={styles.farmContainer}>
                                <AppText style={styles.farmHeadingText}
                                         text={I18N.t('FarmDetails')}/>
                            </View>

                            <View style={styles.row}>
                                <AppPicker
                                    title={"Land District"}
                                    selectedValue={landDistrict?.id}
                                    onValueChange={onLandDistrictValueChange}
                                    data={landDistricts}
                                    initialItem={{name: "Select Land District", id: -1}}
                                />
                                <AppPicker
                                    title={"Land Taluk"}
                                    selectedValue={landTaluk?.id}
                                    onValueChange={onLandTalukValueChange}
                                    data={landTaluks}
                                    initialItem={{name: "Select Land Taluk", id: -1}}
                                />
                            </View>

                            <View style={styles.row}>
                                <AppPicker
                                    title={"Land Local Body"}
                                    selectedValue={landLocalBody?.id}
                                    onValueChange={onLandLocalBodyValueChange}
                                    data={localBodies}
                                    initialItem={{name: "Select Land Local Body", id: -1}}
                                    disabled={showLocalBlock}
                                />
                                <AppPicker
                                    title={"Land Block"}
                                    selectedValue={landBlock?.id}
                                    onValueChange={onLandBlockValueChange}
                                    data={blocks}
                                    initialItem={{name: "Select Land Block", id: -1}}
                                    disabled={showLocalBlock}
                                />
                            </View>


                            <View style={styles.row}>
                                <AppPicker
                                    title={"Land Gram Panchayat"}
                                    selectedValue={landGramPanchayat?.id}
                                    onValueChange={onLandGramPanchayatValueChange}
                                    data={gramPanchayats}
                                    initialItem={{name: "Select Gram Panchayat", id: -1}}
                                    disabled={showGramPanchayat}
                                />
                                <AppPicker
                                    title={"Land Village"}
                                    selectedValue={landVillage?.id}
                                    onValueChange={onLandVillageValueChange}
                                    data={landVillages}
                                    initialItem={{name: "Select Land Village", id: -1}}
                                    disabled={showGramPanchayat}
                                />
                            </View>

                            <View style={styles.row}>
                                <AppTextInput
                                    label={"Land Landmark"}
                                    value={landLandmark}
                                    mode="outlined"
                                    onChangeText={onLandLandmarkTextChange}
                                    onBlur={onLandLandmarkBlur}
                                    style={styles.rowItem}
                                />
                                {/*<View style={styles.rowItem}/>*/}
                            </View>
                            <View style={styles.row}>
                                <AppTextInput
                                    label={I18N.t('CustomerFormAadhaarNoLabel')}
                                    value={aadhaarNo}
                                    mode="outlined"
                                    onChangeText={onAadhaarNoTextChange}
                                    onBlur={onAadhaarNoBlur}
                                    keyboardType='phone-pad'
                                    style={styles.rowItem}/>
                                <AppTextInput
                                    label={I18N.t('CustomerFormPanNoLabel')}
                                    value={panNo}
                                    mode="outlined"
                                    onChangeText={onPanNoTextChange}
                                    style={styles.rowItem}
                                />
                            </View>
                            {/*<View style={styles.farmContainer}>*/}
                            {/*    <AppText style={styles.farmHeadingText}*/}
                            {/*             text={I18N.t('FarmAddressesLabel')}/>*/}
                            {/*    <View style={styles.row}>*/}
                            {/*        <CustomerFarmList*/}
                            {/*            style={styles.farmList}*/}
                            {/*            data={farms}*/}
                            {/*            onPress={onFarmItemPress}/>*/}
                            {/*    </View>*/}
                            {/*</View>*/}
                            {/*<View style={styles.addFarmButtonContainer}>*/}
                            {/*    <AppButton style={styles.addFarmButton}*/}
                            {/*               title={I18N.t('AddFarm')}*/}
                            {/*               size={32}*/}
                            {/*               withoutDelay={true}*/}
                            {/*               color={AppColors.white}*/}
                            {/*               icon={({size, color}) => (*/}
                            {/*                   <AppIcon type={Icons.Entypo} name={'address'} color={color}*/}
                            {/*                            size={size}/>*/}
                            {/*               )}*/}
                            {/*               onPress={onAddFarmButtonPress}/>*/}
                            {/*</View>*/}

                        </View>

                        {/*<View style={styles.row}>*/}
                        {/*    <CustomerFarmFormDialog*/}
                        {/*        isEditMode={farmFormEditMode}*/}
                        {/*        customerFarmData={selectedCustomerFarmData}*/}
                        {/*        onPressAddFarm={onNewlyFarmCreated}*/}
                        {/*        onPressSaveFarm={onSavedExistingFarm}*/}
                        {/*        onBackPressed={onFarmFormDialogBackPress}*/}
                        {/*        show={showFarmDialog}/>*/}
                        {/*</View>*/}
                    </View>

                </ScrollView>
            </View>

        </AppModal>
    )
}

const styles = StyleSheet.create({
    modalViewContainer: {flex: 1,},
    header: {justifyContent: 'space-between', height: getDynamicFontSize(55), paddingBottom: 4,},
    headerText: {
        color: AppColors.colorBackgroundWhite,
        fontSize: getDynamicFontSize(22)
    },
    actionButton: {borderWidth: 2, borderColor: AppColors.americanSilver, borderRadius: 4},
    content: {justifyContent: 'center', alignItems: 'center', left: '55%'},
    scrollviewContent: {flexGrow: 1},
    scrollViewContainer: {margin: 8},
    row: {flexDirection: 'row'},
    rowItem: {margin: 8, flex: 1},
    farmContainer: {alignItems: 'center', marginVertical: 8},
    farmHeadingText: {
        fontWeight: 'bold',
        fontSize: getDynamicFontSize(Constant.TEXT_SIZE_BIG),
        marginBottom: 8,
        // color: AppColors.arsenic,
        fontFamily: AppFonts.bold
    },
    farmList: {flex: 1, alignItems: 'center'},
    addFarmButtonContainer: {alignItems: "center", padding: 8, paddingBottom: 16},
    addFarmButton: {backgroundColor: AppColors.americanGreen}
})

export default React.memo(CustomerFormDialog, (prevProps, nextProps) => {
    return prevProps.show === nextProps.show && prevProps.isEditMode === nextProps.isEditMode && prevProps.customerData === nextProps.customerData
})
