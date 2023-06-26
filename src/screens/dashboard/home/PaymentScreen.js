import React from "react";
import {Animated, Easing, PanResponder, StyleSheet, View} from "react-native";
import {connect, useSelector} from "react-redux";
import {AppColors} from "../../../assets/AppColors";
import I18N from "../../../helper/translation";
import AppBar from "../../../components/lib/AppBar";
import AppText from "../../../components/lib/AppText";
import AppIcon, {Icons} from "../../../components/lib/AppIcon";
import AppButton from "../../../components/lib/AppButton";
import {debounce} from "../../../base/hook/app_hook";
import {
    loadData,
    setTotalCartAmount,
    setTotalAppliedDiscountAmount,
    onUsedPaymentMethodDetailDialogBackPress,
    onUsedPaymentMethodDetailDialogSubmitPress,
    setCanMakePayment,
    placeOrder, setTotalCollectedAmount, setDiscountRemarks,
} from "../../../actions/dashboard/home/payment";
import {
    resetReducerStateForNewOrder as resetDashboardHomeReducerStateForNewOrder
} from "../../../actions/dashboard/home";
import {
    resetReducerStateForNewOrder as resetCustomerReducerStateForNewOrder
} from "../../../actions/dashboard/home/customer";
import LeftSection from "../../../components/screen/dashboard/home/payment/LeftSection";
import RightSection from "../../../components/screen/dashboard/home/payment/RightSection";
import UsedPaymentMethodDetailDialog
    from "../../../components/screen/dashboard/home/payment/UsedPaymentMethodDetailDialog";
import {Constant} from "../../../helper/constant";
import AppProgressDialog from "../../../components/lib/AppProgressDialog";
import type {AppContextValueType} from "../../../base/contexts/AppProvider";
import {AppContext} from "../../../base/contexts/AppProvider";
import {getOrderPrintFormat, printHtml, getDynamicFontSize, width} from "../../../helper/Utility";
import {BaseComponent} from "../../../base/BaseComponent";
import ErrorHandler from "../../../base/contexts/ErrorProvider";
import {I18NContext} from "../../../base/contexts/I18NProvider";
import PaymentThemeProvider from "../../../base/theme contexts/PaymentThemeProvider";
import CartListThemeProvider from "../../../base/theme contexts/CartListThemeProvider";
import CartListWrapper from "../../../components/screen/dashboard/home/CartListWrapper";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Badge} from "react-native-paper";
import {ThemeContext} from "../../../base/contexts/ThemeProvider";


/**
 * @author Vipin Joshi.
 * @since 22-12-2021.
 * @description Dashboard Payment Screen.
 */
class PaymentScreen extends BaseComponent {
    TAG = "DashboardHomePaymentScreen:";

    showToast;
    showAlert;

    constructor(props) {
        super(props);
        this.state = {
            showProgressDialog: false,
            canMakePayment: false,
            isInvoiceOrder: false,
            showPaymentMethodDetailDialog: false,
            paymentMethodDetailDialogEditMode: false,
            selectedUsedPaymentMethodDetail: undefined,

            discountRemarks: undefined,
            totalAppliedDiscount: undefined,
            usedPaymentMethods: [],
            agentName: undefined,
            nursery: undefined,
            sessionDetails: undefined,
            locale: undefined,
            showCartList: false,
            cartAnimation: new Animated.Value(0),
            theme: undefined,
        };
    }

    /**
     * @author Vipin Joshi.
     * @since 09-12-2021.
     * @description to perform initial loading data.
     */
    componentDidMount = (): void => {
            const initLoadData = async ():void => {
                this.props.loadData(this.props.authReducer.sessionDetails);
                this.props.setTotalCartAmount(
                    this.props.dashboardHomeReducer.totalCartPrice
                );
                this.props.setTotalAppliedDiscountAmount(
                    this.props.dashboardHomeReducer.totalAppliedDiscountPrice
                );
            }
            initLoadData()

            console.log(
                this.TAG,
                "Cart Price: ",
                this.props.dashboardHomeReducer.totalCartPrice
            );
            console.log(
                this.TAG,
                "Cart Discount Price: ",
                this.props.dashboardHomeReducer.totalAppliedDiscountPrice
            );
            this.setState({
                agentName: this.props.homeReducer?.agent,
                nursery: this.props.authReducer?.sessionDetails?.shopName,
                sessionDetails: this.props.authReducer?.sessionDetails,
                discountRemarks: this.props.paymentReducer?.discountRemarks
            })
    };

    /**
     * @author Vipin Joshi.
     * @since 13-12-2021.
     * @description to perform clean out tasks.
     */
    componentWillUnmount = (): void => {
        this.props.setCanMakePayment(false)
    };

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description to check component will re-render or not.
     */
    shouldComponentUpdate(
        nextProps: Readonly<any>,
        nextState: Readonly<any>,
        nextContext: any
    ): boolean {
        const props = this.props;
        const state = this.state;

        if (nextProps.paymentReducer.loading !== props.paymentReducer.loading)
            return true;
        else if (nextState.showProgressDialog !== state.showProgressDialog)
            return true;
        else if (
            nextProps.paymentReducer.canMakePayment !==
            props.paymentReducer.canMakePayment
        )
            return true;
        else if (nextState.canMakePayment !== state.canMakePayment) return true;
        else if (
            nextProps.paymentReducer.invoiceOrder !==
            props.paymentReducer.invoiceOrder
        )
            return true;
        else if (nextState.isInvoiceOrder !== state.isInvoiceOrder) return true;
        else if (
            nextProps.paymentReducer.showPaymentMethodDetailDialog !==
            props.paymentReducer.showPaymentMethodDetailDialog
        )
            return true;
        else if (
            nextState.showPaymentMethodDetailDialog !==
            state.showPaymentMethodDetailDialog
        )
            return true;
        else if (
            nextProps.paymentReducer.paymentMethodDetailDialogEditMode !==
            props.paymentReducer.paymentMethodDetailDialogEditMode
        )
            return true;
        else if (
            nextState.paymentMethodDetailDialogEditMode !==
            state.paymentMethodDetailDialogEditMode
        )
            return true;
        else if (
            nextProps.paymentReducer.selectedUsedPaymentMethodDetail !==
            props.paymentReducer.selectedUsedPaymentMethodDetail
        )
            return true;
        else if (
            nextState.selectedUsedPaymentMethodDetail !==
            state.selectedUsedPaymentMethodDetail
        )
            return true;
        else if (
            nextProps.paymentReducer.discountRemarks !==
            props.paymentReducer.discountRemarks
        )
            return true;
        else if (nextState.discountRemarks !== state.discountRemarks) return true;
        else if (
            nextProps.paymentReducer.totalAppliedDiscount !==
            props.paymentReducer.totalAppliedDiscount
        )
            return true;
        else if (nextState.totalAppliedDiscount !== state.totalAppliedDiscount)
            return true;
        else if (
            nextProps.paymentReducer.usedPaymentMethods !==
            props.paymentReducer.usedPaymentMethods
        )
            return true;
        else if (nextState.usedPaymentMethods !== state.usedPaymentMethods)
            return true;
        else if (
            nextProps.dashboardHomeReducer.cartProducts !== props.dashboardHomeReducer.cartProducts
        )
            return true;
        else if (nextState.locale !== this.state.locale)
            return true
        else if (nextState.showCartList !== this.state.showCartList)
            return true
        else if (nextState.theme !== this.state.theme)
            return true
        return false;
    }

    /**
     * @author Vipin Joshi.
     * @since 09-12-2021.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>): void => {
        const props = this.props;
        const state = this.state;

        if (props.paymentReducer.loading !== prevProps.paymentReducer.loading)
            this.setState({showProgressDialog: props.paymentReducer.loading});
        if (
            props.paymentReducer.canMakePayment !==
            prevProps.paymentReducer.canMakePayment
        )
            this.setState({canMakePayment: props.paymentReducer.canMakePayment});
        if (
            props.paymentReducer.invoiceOrder !==
            prevProps.paymentReducer.invoiceOrder
        )
            this.setState({isInvoiceOrder: props.paymentReducer.invoiceOrder});
        if (
            props.paymentReducer.showPaymentMethodDetailDialog !==
            prevProps.paymentReducer.showPaymentMethodDetailDialog
        )
            this.setState({
                showPaymentMethodDetailDialog:
                props.paymentReducer.showPaymentMethodDetailDialog,
            });
        if (
            props.paymentReducer.paymentMethodDetailDialogEditMode !==
            prevProps.paymentReducer.paymentMethodDetailDialogEditMode
        )
            this.setState({
                paymentMethodDetailDialogEditMode:
                props.paymentReducer.paymentMethodDetailDialogEditMode,
            });
        if (
            props.paymentReducer.selectedUsedPaymentMethodDetail !==
            prevProps.paymentReducer.selectedUsedPaymentMethodDetail
        )
            this.setState({
                selectedUsedPaymentMethodDetail:
                props.paymentReducer.selectedUsedPaymentMethodDetail,
            });
        if (
            props.paymentReducer.discountRemarks !==
            prevProps.paymentReducer.discountRemarks
        )
            this.setState({discountRemarks: props.paymentReducer.discountRemarks});
        if (
            props.paymentReducer.totalAppliedDiscount !==
            prevProps.paymentReducer.totalAppliedDiscount
        )
            this.setState({
                totalAppliedDiscount: props.paymentReducer.totalAppliedDiscount,
            });
        if (
            props.paymentReducer.usedPaymentMethods !==
            prevProps.paymentReducer.usedPaymentMethods
        )
            this.setState({
                usedPaymentMethods: props.paymentReducer.usedPaymentMethods,
            });
        if (props.dashboardHomeReducer.cartProducts !== prevProps.dashboardHomeReducer.cartProducts) {
                const initTotalAmounts = async ():void => {
                    this.props.setTotalCartAmount(
                        this.props.dashboardHomeReducer.totalCartPrice
                    )
                    this.props.setTotalAppliedDiscountAmount(
                        this.props.dashboardHomeReducer.totalAppliedDiscountPrice
                    )
                    this.props.setDiscountRemarks(this.props.dashboardHomeReducer?.isComplimentarySelected ? 'Complementary' : ' ')
                    this.props.setTotalCollectedAmount()
                }
                initTotalAmounts()
        }
        if (state.locale !== prevState.locale)
            this.setState({locale: state.locale})
        if (state.showCartList !== prevState.showCartList)
            this.setState({showCartList: state.showCartList})
        if (state.theme !== prevState.theme)
            this.setState({theme: state.theme})
    };

    /**
     * @author Vipin Joshi.
     * @since 13-01-2022.
     * @description to handle cancel button press event.
     */
    onPressCancelButton = (): void => this.props.navigation.goBack();

    /**
     * @author Lovesh Singh
     * @since 10-01-2022
     * @description to print order receipt.
     */
    printOrder = (orderForPrint: any): void => getOrderPrintFormat(this.state.agentName, this.state.nursery, orderForPrint, this.state.sessionDetails).then(printHtml)

    /**
     * @author Vipin Joshi.
     * @since 18-01-2022.
     * @description to handle validate button press event.
     */
    onPressValidateButton = (): void => {
        this.props.setCanMakePayment(false);
        if (this.validateDataBeforeConfirm()) {
            console.log(this.TAG, "onPressValidateButton:", "Valid Data");
            const {usedPaymentMethods} = this.state;
            const {cartProducts, isComplimentarySelected} =
                this.props.dashboardHomeReducer;
            const {sessionDetails} = this.props.authReducer;
            const {
                totalAmount,
                totalCollected,
                invoiceOrder,
                discountRemarks,
            } = this.props.paymentReducer;
            const {selectedCustomer} = this.props.customerReducer;
            const {
                purpose, howDoYouKnowAboutUs,
                typeOfPlantation,
                farmLandArea,
            } = this.props.dashboardHomeReducer

            //Note: retrieve only those payment methods whose collected amount is greater than 0
            const paymentDataArray = usedPaymentMethods.filter(
                (paymentMethod: any) => +paymentMethod?.amountCollected > 0
            );
            /*todo if (isInvoiceOrder && isInvoiceOrder === true && isEmptyObject(prevState.selectedCustomerData)) {
                  stateUpdates.showCustomerDialog = true
              } todo move this check to validation*/

            this.props.placeOrder(
                {
                    usedPaymentMethods: paymentDataArray,
                    cartProducts: cartProducts,
                    isComplimentary: isComplimentarySelected,
                    sessionDetails: sessionDetails,
                    totalAmount: totalAmount,
                    totalCollected: totalCollected,
                    isInvoiceOrder: invoiceOrder,
                    selectedCustomer: selectedCustomer,
                    purpose: purpose,
                    discountRemarks: discountRemarks,
                    typeOfPlantation: typeOfPlantation,
                    howDidYouKnowAboutUs: howDoYouKnowAboutUs,
                    farmLandArea: farmLandArea,
                },
                (orderData: any) => {
                    console.log(
                        this.TAG,
                        "PlaceOrder SuccessCallback",
                        JSON.stringify(orderData)
                    );
                    this.props.resetDashboardHomeReducerStateForNewOrder();
                    this.props.resetCustomerReducerStateForNewOrder();
                    this.props.navigation.popToTop();

                    this.printOrder(JSON.parse(orderData?.orderDetailsString))
                },
                (error, failedOrder) => {
                    console.log(
                        this.TAG,
                        "PlaceOrder ErrorCallback",
                        JSON.stringify(error)
                    );
                    if (failedOrder){
                        // this.showAlert(
                        //     I18N.t('FailedOrderAlertLabel'), {
                        //         message: I18N.t('FailedOrderAlertMsg'),
                        //         buttons: [
                        //             {
                        //                 text: I18N.t('GoToReceiptAction'),
                        //                 icon: <AppIcon type={Icons.MaterialCommunityIcons} name={'page-next'}
                        //                                color={AppColors.white}
                        //                                size={12} style={{marginRight: 8}}/>,
                        //                 onPress: () => failedOrder(true)
                        //             }
                        //         ]
                        //     })
                        this.showToast(I18N.t('FailedOrderAlertLabel'), {
                            description: I18N.t('FailedOrderAlertMsg'),
                            type: 'info',
                            timeout: 3000
                        })
                        failedOrder(true)
                    }
                    this.props.setCanMakePayment(true);
                }
            );
        } else {
            this.props.setCanMakePayment(true);
        }
    };

    /**
     * @author Vipin Joshi.
     * @since 17-01-2022.
     * @description to check data validity before submitting.
     */
    validateDataBeforeConfirm = (): boolean => {
        const {
            howDoYouKnowAboutUs,
            typeOfPlantation,
            totalAppliedDiscount,
            discountRemarks,
            usedPaymentMethods,
        } = this.state;

        const existingCartProducts = this.props.dashboardHomeReducer?.cartProducts
        if (existingCartProducts.length > 0) {
            let invalidProduct

            // Check if there is any invalid product in cart.
            existingCartProducts.every(cartProduct => {
                if (+cartProduct.cartQty <= 0) {
                    invalidProduct = cartProduct
                    return false
                }
                return true
            })

            if (invalidProduct) {
                this.showToast(`${invalidProduct.display_name} ${I18N.t('Space')} ${I18N.t('IncorrectQuantityLabel')}`, {
                    description: I18N.t('IncorrectQuantityMsg'),
                    type: 'info',
                    timeout: 3000
                })
                this.props.setCanMakePayment(true);
                return false
            }
        }

        if (+totalAppliedDiscount > 0 && !discountRemarks?.trim()) {
            this.showToast(I18N.t("DiscountRemarksRequiredMsg"), {
                type: "info",
                timeout: 4000,
            });
            this.props.setCanMakePayment(true);
            return false;
        }

        if (+usedPaymentMethods?.length <= 0) {
            this.showToast(I18N.t("SelectPaymentMethodLabel"), {
                type: "info",
                timeout: 3000,
            });
            this.props.setCanMakePayment(true);
            return false;
        }

        let isPaymentMethodsValid = true;
        usedPaymentMethods.every((bankPaymentMethod) => {
            const name = String(bankPaymentMethod.name).toLowerCase();
            const paymentDetails = bankPaymentMethod.paymentDetails;

            const CARD = I18N.t("Card");
            const NEFT = I18N.t("NEFT");
            const RTGS = I18N.t("RTGS");
            const CHEQUE = I18N.t("Cheque");
            const CHECK = I18N.t("Check");
            const DD = I18N.t("DD");
            const CASH = I18N.t("Cash");

            if (name.includes(CARD)) {
                // Card Payments
                if (
                    !paymentDetails?.transaction_id ||
                    !paymentDetails?.transaction_date ||
                    !paymentDetails?.ccapproval_code
                ) {
                    isPaymentMethodsValid = false;
                    this.showToast(I18N.t("CardValidationMsg"), {
                        type: "info",
                        timeout: 3000,
                    });
                    return isPaymentMethodsValid;
                }
            } else if (name.includes(NEFT) || name.includes(RTGS)) {
                // NEFT/RTGS
                if (
                    !paymentDetails?.transaction_id ||
                    !paymentDetails?.transaction_date
                ) {
                    isPaymentMethodsValid = false;
                    this.showToast(I18N.t("NEFTValidationMsg"), {
                        type: "info",
                        timeout: 3000,
                    });
                    return isPaymentMethodsValid;
                }
            } else if (name.includes(CHEQUE) || name.includes(CHECK)) {
                // Cheque
                if (
                    !paymentDetails?.transaction_id ||
                    !paymentDetails?.transaction_date ||
                    !paymentDetails?.bankname ||
                    !paymentDetails?.branchname
                ) {
                    isPaymentMethodsValid = false;
                    this.showToast(I18N.t("ChequeValidationMsg"), {
                        type: "info",
                        timeout: 3000,
                    });
                    return isPaymentMethodsValid;
                }
            } else if (name.includes(DD)) {
                // DD
                if (
                    !paymentDetails?.transaction_id ||
                    !paymentDetails?.transaction_date ||
                    !paymentDetails?.bankname ||
                    !paymentDetails?.branchname
                ) {
                    isPaymentMethodsValid = false;
                    this.showToast(I18N.t("DDValidationMsg"), {
                        type: "info",
                        timeout: 3000,
                    });
                    return isPaymentMethodsValid;
                }
            } else {
                isPaymentMethodsValid = true;
            }
            return true; //continue
        });

        if (!this.props.customerReducer?.selectedCustomer) {
            this.showToast(I18N.t("NoCustomerSelectedMsg"), {
                type: "info",
                timeout: 3000,
            });
            this.props.setCanMakePayment(true);
            return false;
        }

        return isPaymentMethodsValid;
    };

    /**
     * @author Vipin Joshi.
     * @since 17-01-2022.
     * @description to handle payment method detail dialog back pressed event.
     */
    onUsedPaymentMethodDetailBackPress = (): void =>
        this.props.onUsedPaymentMethodDetailDialogBackPress();

    /**
     * @author Vipin Joshi.
     * @since 17-01-2022.
     * @description to handle payment method detail dialog submit detail pressed event.
     */
    onUsedPaymentMethodDetailSubmitDetailPress = (paymentDetails): void =>
        this.props.onUsedPaymentMethodDetailDialogSubmitPress(paymentDetails);

    /**
     * @author Lovesh Singh.
     * @since 17-02-2022.
     * @description apply animation on cart list section.
     */
    toggleCartList = () => {
        // setShowCartList(!showCartList)
        const {showCartList} = this.state
        this.setState((prevState) => ({
            showCartList: !prevState.showCartList,
        }))
        Animated.timing(this.state.cartAnimation, {
            toValue: showCartList ? 0 : 1,
            duration: Constant.ANIMATION_DURATION,
            easing: Easing.ease,
            useNativeDriver: false
        }).start();
    }

    renderAppComponent(): JSX.Element {
        console.log("Can make payment: ", this.state.canMakePayment)
        return (
            <ThemeContext.Consumer>
                {({theme}) => {
                    this.setState({theme});
                    return (
                        <I18NContext.Consumer>
                            {({locale}) => {
                                this.setState({locale});
                                return (
                                    <AppContext.Consumer>
                                        {({messageContext}: AppContextValueType) => {
                                            this.showToast = messageContext.showToast;
                                            this.showAlert = messageContext.showAlert;
                                            return (
                                                <View style={styles.container}>
                                                    <AppBar
                                                        statusBarHeight={2}
                                                        headerStyle={[
                                                            styles.header,
                                                            {backgroundColor: AppColors.outrageousOrange},
                                                        ]}
                                                        beforeContent={
                                                            <>
                                                                <AppButton
                                                                    style={[
                                                                        styles.actionButton,
                                                                        // {backgroundColor: AppColors.outrageousOrange},
                                                                    ]}
                                                                    type={"primary"}
                                                                    color={AppColors.white}
                                                                    title={I18N.t("BackAction")}
                                                                    labelStyle={{
                                                                        fontSize: getDynamicFontSize(14),
                                                                        lineHeight: getDynamicFontSize(14),
                                                                        paddingTop: 2
                                                                    }}
                                                                    size={32}
                                                                    withoutDelay={true}
                                                                    icon={({size, color}) => (
                                                                        <AppIcon
                                                                            type={Icons.MaterialIcons}
                                                                            name={"keyboard-arrow-left"}
                                                                            color={color}
                                                                            size={size}
                                                                        />
                                                                    )}
                                                                    onPress={this.onPressCancelButton}
                                                                />
                                                            </>
                                                        }
                                                        title={<AppText text={I18N.t("PaymentDetailsLabel")}
                                                                        style={styles.headerText}/>}
                                                        contentStyle={styles.content}
                                                        afterContent={
                                                            <>
                                                                <AppButton
                                                                    style={[
                                                                        styles.actionButton,
                                                                        {
                                                                            // backgroundColor: AppColors.outrageousOrange,
                                                                            display: this.state.isInvoiceOrder ? "flex" : "none",
                                                                        },
                                                                    ]}
                                                                    type={"primary"}
                                                                    title={I18N.t("InvoiceButtonAction")}
                                                                    color={AppColors.white}
                                                                    size={32}
                                                                    withoutDelay={true}
                                                                    // onPress={debounce(InteractionManager.runAfterInteractions.bind(this, this.onPressInvoiceButton.bind(this)))}>

                                                                    onPress={this.onPressCreateCustomerButton}
                                                                    icon={({size, color}) => (
                                                                        <AppIcon
                                                                            type={Icons.FontAwesome5}
                                                                            name={"file-invoice"}
                                                                            color={color}
                                                                            size={size}
                                                                        />
                                                                    )}
                                                                />

                                                                <AppButton
                                                                    style={[
                                                                        styles.actionButton,
                                                                        // {backgroundColor: AppColors.outrageousOrange},
                                                                    ]}
                                                                    type={"primary"}
                                                                    title={I18N.t("PaymentValidateAction")}
                                                                    color={AppColors.white}
                                                                    labelStyle={{
                                                                        fontSize: getDynamicFontSize(14),
                                                                        lineHeight: getDynamicFontSize(14),
                                                                        paddingTop: 2
                                                                    }}
                                                                    size={32}
                                                                    withoutDelay={true}
                                                                    disabled={!this.state.canMakePayment}
                                                                    onPress={this.onPressValidateButton}
                                                                    icon={({size, color}) => (
                                                                        <AppIcon
                                                                            type={Icons.MaterialCommunityIcons}
                                                                            name={"page-next"}
                                                                            color={color}
                                                                            size={size}
                                                                        />
                                                                    )}
                                                                />
                                                            </>
                                                        }
                                                    />

                                                    <View style={styles.viewContainer}>
                                                        <PaymentThemeProvider>
                                                            <View style={styles.leftSectionContainer}>
                                                                <ErrorHandler>
                                                                    <LeftSection/>
                                                                </ErrorHandler>
                                                            </View>
                                                            <View style={styles.rightSectionContainer}>
                                                                <ErrorHandler>
                                                                    <RightSection/>
                                                                </ErrorHandler>
                                                            </View>
                                                            <Animated.View style={[styles.cartContainer, {
                                                                width: this.state.cartAnimation.interpolate({
                                                                    inputRange: [0, 1],
                                                                    outputRange: ["0%", "33.3%"],
                                                                }),
                                                                borderRightWidth: this.state.showCartList ? 1 : 0,
                                                                borderRightColor: this.state.theme?.primaryColor,
                                                            }]}>
                                                                <AppBar
                                                                    statusBarHeight={2}
                                                                    headerStyle={styles.header}
                                                                    style={{display: this.state.showCartList ? 'flex' : 'none'}}
                                                                    title={<AppText text={I18N.t('OrderPreviewLabel')}
                                                                                    style={styles.headerText}/>}
                                                                />

                                                                <View style={styles.cartListContainer}>
                                                                    <CartListThemeProvider>
                                                                        <CartListWrapper
                                                                            cartProducts={this.props.dashboardHomeReducer.cartProducts}
                                                                            isComplimentarySelected={this.props.dashboardHomeReducer.isComplimentarySelected}
                                                                            readonly={true}
                                                                        />
                                                                    </CartListThemeProvider>
                                                                </View>

                                                                <View style={[styles.toggleCartList, {
                                                                    backgroundColor: this.state.theme?.backgroundColor,
                                                                    borderColor: this.state.theme?.primaryColor,
                                                                }]}>
                                                                    <TouchableOpacity
                                                                        containerStyle={styles.innerToggleCartList}
                                                                        onPress={this.toggleCartList}>
                                                                        <AppIcon type={Icons.MaterialCommunityIcons}
                                                                                 name={this.state.showCartList ? 'cart-remove' : 'cart'}
                                                                                 color={this.state.theme?.primaryColor}
                                                                                 style={styles.cartIcon}
                                                                                 size={getDynamicFontSize(25)}/>
                                                                        <Badge
                                                                            size={getDynamicFontSize(16)}
                                                                            style={[styles.totalAmountBadge, {backgroundColor: this.state.theme?.secondaryColor}]}
                                                                        >
                                                                            {this.props.dashboardHomeReducer.cartProducts.length}
                                                                        </Badge>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </Animated.View>
                                                        </PaymentThemeProvider>
                                                    </View>

                                                    <ErrorHandler>
                                                        <UsedPaymentMethodDetailDialog
                                                            show={this.state.showPaymentMethodDetailDialog}
                                                            isEditMode={this.state.paymentMethodDetailDialogEditMode}
                                                            paymentMethodData={this.state.selectedUsedPaymentMethodDetail}
                                                            onBackPressed={this.onUsedPaymentMethodDetailBackPress}
                                                            onPressAddDetail={
                                                                this.onUsedPaymentMethodDetailSubmitDetailPress
                                                            }
                                                            onPressSaveDetail={
                                                                this.onUsedPaymentMethodDetailSubmitDetailPress
                                                            }
                                                        />
                                                    </ErrorHandler>

                                                    <AppProgressDialog
                                                        visible={this.state.showProgressDialog}
                                                        pleaseWaitVisible={true}
                                                        pleaseWaitText={I18N.t("PleaseWaitText")}
                                                        loadingText={I18N.t("LoadingText")}
                                                        loadercolor={AppColors.colorAccent}
                                                    />
                                                </View>
                                            );
                                        }}
                                    </AppContext.Consumer>
                                );
                            }}
                        </I18NContext.Consumer>
                    );
                }}
            </ThemeContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: AppColors.white},
    header: {
        backgroundColor: AppColors.platinum,
        justifyContent: "space-between",
        height: getDynamicFontSize(55),
        paddingBottom: 4,
    },
    headerText: {
        color: AppColors.colorBackgroundWhite,
        fontSize: getDynamicFontSize(22)
    },
    content: {justifyContent: "center", alignItems: "center", left: "55%"},
    actionButton: {
        borderWidth: 2,
        borderColor: AppColors.americanSilver,
        borderRadius: 4,
    },
    viewContainer: {flex: 1, flexDirection: "row"},
    leftSectionContainer: {flex: 1},
    rightSectionContainer: {flex: 2},
    cartContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        // borderRightWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.colorAccent,
        zIndex: 1,
        height: '100%',
        backgroundColor: AppColors.colorBackgroundWhite
    },
    cartListContainer: {
        flex: 1,
        // height: '85%',
    },
    toggleCartList: {
        position: 'absolute',
        width: getDynamicFontSize(50),
        height: getDynamicFontSize(50),
        right: -getDynamicFontSize(50),
        top: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderLeftWidth: 0,
        zIndex: 2,
        elevation: 15
    },
    innerToggleCartList: {
        width: getDynamicFontSize(50),
        height: getDynamicFontSize(50),
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    cartIcon: {alignSelf: 'center', marginTop: getDynamicFontSize(15)},
    totalAmountBadge: {position: 'absolute', top: 1, right: 1}
});

const mapStateToProps = ({
                             authReducer,
                             dashboardHomeReducer,
                             customerReducer,
                             paymentReducer,
                             homeReducer,
                         }) => {
    return {authReducer, dashboardHomeReducer, customerReducer, paymentReducer, homeReducer};
};

const mapDispatchToProps = {
    loadData,
    setTotalCartAmount,
    setTotalCollectedAmount,
    setTotalAppliedDiscountAmount,
    onUsedPaymentMethodDetailDialogBackPress,
    onUsedPaymentMethodDetailDialogSubmitPress,
    setCanMakePayment,
    placeOrder,
    resetDashboardHomeReducerStateForNewOrder,
    resetCustomerReducerStateForNewOrder,
    setDiscountRemarks,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
