import React, {useEffect, useState} from "react";
import {ScrollView, View, StyleSheet} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {AppColors} from "../../../../../assets/AppColors";
import I18N from "../../../../../helper/translation";
import {Constant} from "../../../../../helper/constant";
import {isValidNumber, convertDate} from "../../../../../helper/Utility";
import AppModal from "../../../../lib/AppModal";
import AppRoundButton from "../../../../lib/AppRoundButton";
import AppTextInput from "../../../../lib/AppTextInput";
import AppIcon, {Icons} from "../../../../lib/AppIcon";
import {useMessage} from "../../../../../base/contexts/MessageProvider";
import {useLocale} from "../../../../../base/contexts/I18NProvider";

/**
 * @author Vipin Joshi.
 * @since 17-01-2022.
 * @description to render Used Payment Method Detail Dialog.
 * @return {JSX.Element}
 * @param show to visible or hide dialog.
 * @param isEditMode true/ for enable edit mode.
 * @param customerData selected payment method data for edit.
 * @param onBackPressed back event listener.
 * @param onPressAddDetail add button press event, trigger only when edit mode is false.
 * @param onPressSaveDetail save button press event, trigger only when edit mode is true.
 */
const UsedPaymentMethodDetailDialog = ({
                                           show,
                                           isEditMode,
                                           paymentMethodData,
                                           onBackPressed,
                                           onPressAddDetail,
                                           onPressSaveDetail,
                                       }) => {
    // noinspection JSUnusedLocalSymbols
    const TAG = "UsedPaymentMethodDialog:";
    const message = useMessage();
    const [visible, setVisible] = useState(false);
    const [editMode, setEditMode] = useState(isEditMode);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(undefined);

    const [transactionId, setTransactionId] = useState(undefined);
    const [transactionDate, setTransactionDate] = useState(undefined);
    const [datePickerDate, setDatePickerDate] = useState(new Date());
    const [ccApprovalCode, setCCApprovalCode] = useState(undefined);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [bankName, setBankName] = useState(undefined);
    const [branchName, setBranchName] = useState(undefined);

    const datePickerMaximumDate = new Date();
    const datePickerMinimumDate = moment().subtract(85, "day").toDate();
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    },[locale])

    //Language Constants
    const CARD = I18N.t("Card");
    const NEFT = I18N.t("NEFT");
    const RTGS = I18N.t("RTGS");
    const CHEQUE = I18N.t("Cheque");
    const CHECK = I18N.t("Check");
    const DD = I18N.t("DD");

    useEffect(() => {
        setVisible(show);

        if (show) {
            setEditMode(isEditMode);

            //reset data
            resetStateData();
        }
    }, [show, isEditMode]);

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to reset form current state data.
     */
    const resetStateData = (): void => {
        setSelectedPaymentMethod(undefined);
        setTransactionId(undefined);
        setTransactionDate(undefined);
        setCCApprovalCode(undefined);
        setBankName(undefined);
        setBranchName(undefined);

        setDatePickerDate(new Date());
        setShowDatePicker(false);
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to initialize payment method data.
     */
    useEffect(() => {
        const paymentMethod = paymentMethodData?.paymentMethod;
        const paymentDetails = paymentMethod?.paymentDetails;
        setSelectedPaymentMethod(paymentMethod);

        if (paymentDetails) {
            //initialize data

            setTransactionId(paymentDetails.transaction_id);
            if (paymentDetails.transaction_date) {
                const transactionDate = new Date(paymentDetails.transaction_date);
                setTransactionDate(transactionDate.toString());
                setDatePickerDate(transactionDate);
            }
            setCCApprovalCode(paymentDetails.ccapproval_code);
            setBankName(paymentDetails.bankname);
            setBranchName(paymentDetails.branchname);
        }
    }, [paymentMethodData]);

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description handle back key press event.
     */
    const onRequestClose = (): void => onBackPressed?.call(this);

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to render modal popup inner view based on data id.
     */
    const renderPaymentMethodView = (data): JSX.Element => {
        if (!data) {
            return null;
        }
        const name = String(data.name).toLowerCase();

        if (name.includes(CARD)) return renderCreditCardView();
        // Card Payments
        else if (name.includes(NEFT) || name.includes(RTGS))
            return renderNEFTView();
        // NEFT/RTGS
        else if (name.includes(CHEQUE) || name.includes(CHECK))
            return renderChequeView();
        // Cheque
        else if (name.includes(DD)) return renderDDView();
        //DD
        else console.log("Invalid Payment Method Name: " + data?.name);

        return null;
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle transactionId field value change event.
     */
    const onTransactionIdValueChange = (value): void => setTransactionId(value);

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle ccApprovalCode field value change event.
     */
    const onCCApprovalCodeValueChange = (value): void => setCCApprovalCode(value);

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle bank name field value change event.
     */
    const onBankNameValueChange = (value): void => setBankName(value);

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle branch name field value change event.
     */
    const onBranchNameValueChange = (value): void => setBranchName(value);

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle on pick date button press event.
     */
    const onPickDateButtonPress = (): void => setShowDatePicker(true);

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle date picker onchange event.
     */
    const onDatePickerValueChange = (event, selectedDate): void => {
        setShowDatePicker(!showDatePicker);

        if (event.type === "set") {
            setDatePickerDate(selectedDate || datePickerDate);
            setTransactionDate(convertDate(selectedDate).format(Constant.FORMAT_DD_MM_yyyy));
        }
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle Cancel Button on press event.
     */
    const onCancelButtonPress = (): void => onRequestClose();

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle Submit Button on press event.
     */
    const onSubmitButtonPress = (): void => onDataSubmit();

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle Save Button on press event.
     */
    const onSaveButtonPress = (): void => onDataSubmit();

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to handle data submission.
     */
    const onDataSubmit = (): void => {
        const data = selectedPaymentMethod;
        if (!data) {
            message.showAlert(I18N.t("SomethingWentWrongMsg"), {
                message: `${I18N.t("InvalidDataMsg")} : ${JSON.stringify(data)}`,
            });
            return;
        }
        const name = String(data.name).toLowerCase();

        if (name.includes(CARD)) {
            return submitCreditCardDetail(); // Card Payments
        } else if (name.includes(NEFT) || name.includes(RTGS)) {
            return submitNEFTDetail(); // NEFT/RTGS
        } else if (name.includes(CHEQUE) || name.includes(CHECK)) {
            return submitChequeDetail(); // Cheque
        } else if (name.includes(DD)) {
            return submitDDDetail(); //DD
        } else {
            console.log("Invalid Payment Method Name: " + data.name);
        }
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to submit credit card data after validation check.
     */
    const submitCreditCardDetail = (): void => {
        const txnId = transactionId?.trim();
        const txnDate = datePickerDate;
        const txnApprovalCode = ccApprovalCode?.trim();

        if (validateCreditCardDetail()) {
            const paymentDetails = {};
            paymentDetails.transaction_id = txnId;
            paymentDetails.transaction_date = moment(txnDate).format(
                Constant.FORMAT_YYYY_MM_DD
            );
            paymentDetails.ccapproval_code = txnApprovalCode;

            onSubmit(paymentDetails);
        }
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to check credit card detail.
     */
    const validateCreditCardDetail = (): boolean => {
        if (!transactionId?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailTerminalIdLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        } else if (!transactionDate?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailTransactionDateLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        } else if (
            !ccApprovalCode?.trim() ||
            isValidNumber(ccApprovalCode?.trim())
        ) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailApprovalCodeLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        }
        return true;
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to submit NEFT data after validation check.
     */
    const submitNEFTDetail = (): void => {
        const txnId = transactionId?.trim();
        const txnDate = datePickerDate;

        if (validateNEFTDetail()) {
            const paymentDetails = {};
            paymentDetails.transaction_id = txnId;
            paymentDetails.transaction_date = moment(txnDate).format(
                Constant.FORMAT_YYYY_MM_DD
            );

            onSubmit(paymentDetails);
        }
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to check NEFT detail.
     */
    const validateNEFTDetail = (): boolean => {
        if (!transactionId?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailTransactionIdLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        } else if (!transactionDate?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailTransactionDateLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        }

        return true;
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to submit Cheque data after validation check.
     */
    const submitChequeDetail = (): void => {
        const txnId = transactionId?.trim();
        const txnDate = datePickerDate;
        const txnBankName = bankName?.trim();
        const txnBranchName = branchName?.trim();

        if (validateChequeDetail()) {
            const paymentDetails = {};
            paymentDetails.transaction_id = txnId;
            paymentDetails.transaction_date = moment(txnDate).format(
                Constant.FORMAT_YYYY_MM_DD
            );
            paymentDetails.bankname = txnBankName;
            paymentDetails.branchname = txnBranchName;

            onSubmit(paymentDetails);
        }
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to check Cheque detail.
     */
    const validateChequeDetail = (): boolean => {
        if (!transactionId?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailChequeNumberLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        } else if (!transactionDate?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailChequeDateLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        } else if (!bankName?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailBankNameLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        } else if (!branchName?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailBranchNameLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        }
        return true;
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to submit DD data after validation check.
     */
    const submitDDDetail = (): void => {
        const txnId = transactionId?.trim();
        const txnDate = datePickerDate;
        const txnBankName = bankName?.trim();
        const txnBranchName = branchName?.trim();

        if (validateDDDetail()) {
            const paymentDetails = {};
            paymentDetails.transaction_id = txnId;
            paymentDetails.transaction_date = moment(txnDate).format(
                Constant.FORMAT_YYYY_MM_DD
            );
            paymentDetails.bankname = txnBankName;
            paymentDetails.branchname = txnBranchName;

            onSubmit(paymentDetails);
        }
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to check DD detail.
     */
    const validateDDDetail = (): boolean => {
        if (!transactionId?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailDDNumberLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        } else if (!transactionDate?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailDDDateLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        } else if (!bankName?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailBankNameLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        } else if (!branchName?.trim()) {
            message.showAlert(
                `${I18N.t("PaymentMethodDetailBranchNameLabel")} ${I18N.t(
                    "CannotBeEmptyMsg"
                )}`
            );
            return false;
        }
        return true;
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to submit data after validation check.
     */
    const onSubmit = (paymentDetails): void => {
        const submit = !editMode
            ? onPressAddDetail.bind(this)
            : onPressSaveDetail.bind(this);
        submit?.call(this, paymentDetails);
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to render Credit Card Payment Method Details.
     * @return Credit Card Payment Method Details View.
     */
    const renderCreditCardView = (): JSX.Element => {
        return (
            <>
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailTerminalIdLabel")}
                    value={transactionId}
                    onChangeText={onTransactionIdValueChange}
                    style={styles.rowItem}
                />
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailTransactionDateLabel")}
                    value={transactionDate}
                    disabled={true}
                    style={styles.rowItem}
                />
                {showDatePicker && (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        value={datePickerDate}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        maximumDate={datePickerMaximumDate}
                        minimumDate={datePickerMinimumDate}
                        onChange={onDatePickerValueChange}
                    />
                )}

                <AppRoundButton
                    style={styles.pickDateButton}
                    type="primary"
                    color={AppColors.white}
                    uppercase={false}
                    title={I18N.t("PickDateAction")}
                    withoutDelay={true}
                    icon={({size, color}) => (
                        <AppIcon
                            type={Icons.MaterialCommunityIcons}
                            name={"calendar-month"}
                            color={color}
                            size={size}
                        />
                    )}
                    onPress={onPickDateButtonPress}
                />

                <AppTextInput
                    label={I18N.t("PaymentMethodDetailApprovalCodeLabel")}
                    value={ccApprovalCode}
                    onChangeText={onCCApprovalCodeValueChange}
                    style={styles.rowItem}
                    keyboardType="phone-pad"
                />
            </>
        );
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to render NEFT/ RTGS Payment Method Details.
     * @return NEFT/ RTGS Payment Method Details View.
     */
    const renderNEFTView = (): JSX.Element => {
        return (
            <>
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailTransactionIdLabel")}
                    value={transactionId}
                    onChangeText={onTransactionIdValueChange}
                    style={styles.rowItem}
                />
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailTransactionDateLabel")}
                    value={transactionDate}
                    disabled={true}
                    style={styles.rowItem}
                />
                {showDatePicker && (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        value={datePickerDate}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        maximumDate={datePickerMaximumDate}
                        minimumDate={datePickerMinimumDate}
                        onChange={onDatePickerValueChange}
                    />
                )}
                <AppRoundButton
                    style={styles.pickDateButton}
                    type="primary"
                    color={AppColors.white}
                    uppercase={false}
                    title={I18N.t("PickDateAction")}
                    withoutDelay={true}
                    icon={({size, color}) => (
                        <AppIcon
                            type={Icons.MaterialCommunityIcons}
                            name={"calendar-month"}
                            color={color}
                            size={size}
                        />
                    )}
                    onPress={onPickDateButtonPress}
                />
            </>
        );
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to render Cheque Payment Method Details.
     * @return Cheque Payment Method Details View.
     */
    const renderChequeView = (): JSX.Element => {
        return (
            <>
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailChequeNumberLabel")}
                    value={transactionId}
                    onChangeText={onTransactionIdValueChange}
                    style={styles.rowItem}
                />
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailChequeDateLabel")}
                    value={transactionDate}
                    disabled={true}
                    style={styles.rowItem}
                />
                {showDatePicker && (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        value={datePickerDate}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        maximumDate={datePickerMaximumDate}
                        minimumDate={datePickerMinimumDate}
                        onChange={onDatePickerValueChange}
                    />
                )}
                <AppRoundButton
                    style={styles.pickDateButton}
                    type="primary"
                    color={AppColors.white}
                    uppercase={false}
                    title={I18N.t("PickDateAction")}
                    withoutDelay={true}
                    icon={({size, color}) => (
                        <AppIcon
                            type={Icons.MaterialCommunityIcons}
                            name={"calendar-month"}
                            color={color}
                            size={size}
                        />
                    )}
                    onPress={onPickDateButtonPress}
                />
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailBankNameLabel")}
                    value={bankName}
                    onChangeText={onBankNameValueChange}
                    style={styles.rowItem}
                />
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailBranchNameLabel")}
                    value={branchName}
                    onChangeText={onBranchNameValueChange}
                    style={styles.rowItem}
                />
            </>
        );
    };

    /**
     * @author Vipin Joshi
     * @since 17-01-2022
     * @description to render DD Payment Method Details.
     * @return DD Payment Method Details View.
     */
    const renderDDView = (): JSX.Element => {
        return (
            <>
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailDDNumberLabel")}
                    value={transactionId}
                    onChangeText={onTransactionIdValueChange}
                    style={styles.rowItem}
                />
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailDDDateLabel")}
                    value={transactionDate}
                    disabled={true}
                    style={styles.rowItem}
                />
                {showDatePicker && (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        value={datePickerDate}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        maximumDate={datePickerMaximumDate}
                        minimumDate={datePickerMinimumDate}
                        onChange={onDatePickerValueChange}
                    />
                )}
                <AppRoundButton
                    style={styles.pickDateButton}
                    type="primary"
                    color={AppColors.white}
                    uppercase={false}
                    title={I18N.t("PickDateAction")}
                    withoutDelay={true}
                    icon={({size, color}) => (
                        <AppIcon
                            type={Icons.MaterialCommunityIcons}
                            name={"calendar-month"}
                            color={color}
                            size={size}
                        />
                    )}
                    onPress={onPickDateButtonPress}
                />
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailBankNameLabel")}
                    value={bankName}
                    onChangeText={onBankNameValueChange}
                    style={styles.rowItem}
                />
                <AppTextInput
                    label={I18N.t("PaymentMethodDetailBranchNameLabel")}
                    value={branchName}
                    onChangeText={onBranchNameValueChange}
                    style={styles.rowItem}
                />
            </>
        );
    };

    return (
        <AppModal show={visible} onRequestClose={onRequestClose}>
            <View style={styles.modalViewContainer}>
                <ScrollView
                    contentContainerStyle={styles.scrollviewContent}
                    scrollEnabled={true}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.scrollviewViewContainer}>
                        {selectedPaymentMethod &&
                        renderPaymentMethodView(selectedPaymentMethod)}

                        <View style={styles.actionButtonContainer}>
                            <AppRoundButton
                                color={AppColors.arsenic}
                                uppercase={false}
                                style={[
                                    styles.actionButton,
                                    {
                                        display: !editMode ? "flex" : "none",
                                    },
                                ]}
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
                                style={styles.actionButton}
                                title={
                                    !editMode ? I18N.t("SubmitAction") : I18N.t("SaveAction")
                                }
                                withoutDelay={true}
                                icon={({size, color}) => (
                                    <AppIcon
                                        type={Icons.MaterialIcons}
                                        name={"save"}
                                        color={color}
                                        size={size}
                                    />
                                )}
                                onPress={!editMode ? onSubmitButtonPress : onSaveButtonPress}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </AppModal>
    );
};

const styles = StyleSheet.create({
    modalViewContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    scrollviewContent: {
        flexGrow: 1,
        justifyContent: "center",
    },
    scrollviewViewContainer: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minWidth: 370,
    },
    rowItem: {margin: 8, flex: 1},
    pickDateButton: {
        margin: 4,
        marginHorizontal: 30,
        flex: 1,
        // backgroundColor: AppColors.americanGreen
    },
    actionButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    actionButton: {margin: 8},
});

export default React.memo(
    UsedPaymentMethodDetailDialog,
    (prevProps, nextProps): boolean => {
        return (
            prevProps.show === nextProps.show &&
            prevProps.isEditMode === nextProps.isEditMode &&
            prevProps.paymentMethodData === nextProps.paymentMethodData
        );
    }
);
