// noinspection JSUnusedLocalSymbols

import React from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import {connect} from "react-redux";
import {Searchbar} from "react-native-paper";
import {AppColors} from "../../../assets/AppColors";
import {isNetworkAvailable, SCREEN_WIDTH, getDynamicFontSize} from "../../../helper/Utility";
import CustomerList from "../../../components/screen/dashboard/home/customer/CustomerList";
import CustomerFormDialog from "../../../components/screen/dashboard/home/customer/CustomerFormDialog";
import AppButton from "../../../components/lib/AppButton";
import AppBar from "../../../components/lib/AppBar";
import AppIcon, {Icons} from "../../../components/lib/AppIcon";
import {
    loadData,
    filterCustomers,
    setSearch,
    selectCustomer,
    createCustomerOnline,
    createCustomerOffline,
    setCreatedCustomer,
    updateCustomerOnline,
    updateCustomerOffline,
} from "../../../actions/dashboard/home/customer";
import I18N from "../../../helper/translation";
import AppProgressDialog from "../../../components/lib/AppProgressDialog";
import {debounce} from "../../../base/hook/app_hook";
import type {AppContextValueType} from "../../../base/contexts/AppProvider";
import {AppContext} from "../../../base/contexts/AppProvider";
import {BaseComponent} from "../../../base/BaseComponent";
import ErrorHandler from "../../../base/contexts/ErrorProvider";
import {I18NContext} from "../../../base/contexts/I18NProvider";
import CustomerListThemeProvider from "../../../base/theme contexts/CustomerListThemeProvider";
import {ThemeContext} from "../../../base/contexts/ThemeProvider";
import AppSearchBar from "../../../components/lib/AppSearchBar";
import {Constant} from "../../../helper/constant";

/**
 * @author Vipin Joshi.
 * @since 22-12-2021.
 * @description Dashboard Customers Screen.
 */
class CustomersScreen extends BaseComponent {

    TAG = 'DashboardHomeCustomersScreen:'
    isOnline;
    showAlert;

    constructor(props) {
        super(props);
        this.state = {
            showCustomerForm: false,
            editMode: false,
            customers: [],
            customerColumns: undefined,
            showProgressDialog: false,
            searchQuery: '',
            selectedCustomer: undefined, //selected customer for edit purpose not for payment.
            locale: undefined,
            theme: undefined
        }
    }

    /**
     * @author Vipin Joshi.
     * @since 09-12-2021.
     * @description to perform initial loading data.
     */
    componentDidMount = async (): void => {
        const initLoadData = async (): void => {
            this.props.loadData()
        }
        initLoadData()
    }

    /**
     * @author Vipin Joshi.
     * @since 13-12-2021.
     * @description to perform clean out tasks.
     */
    componentWillUnmount = (): void => {
    }

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description to check component will re-render or not.
     */
    shouldComponentUpdate = (nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean => {
        const state = this.state
        const props = this.props

        if (nextProps.customerReducer.loading !== props.customerReducer.loading)
            return true
        else if (nextState.showProgressDialog !== this.state.showProgressDialog)
            return true
        else if (nextProps.customerReducer.customers !== props.customerReducer.customers || nextProps.customerReducer.customers?.length !== props.customerReducer.customers?.length)
            return true
        else if (nextState.customers !== state.customers || nextState.customers?.length !== state.customers?.length)
            return true
        else if (nextProps.customerReducer.search !== props.customerReducer.search)
            return true
        else if (nextState.searchQuery !== state.searchQuery)
            return true
        else if (nextState.showCustomerForm !== state.showCustomerForm)
            return true
        else if (nextState.editMode !== state.editMode)
            return true
        else if (nextState.locale !== this.state.locale)
            return true
        else if (nextState.theme !== this.state.theme)
            return true

        return false
    }

    /**
     * @author Vipin Joshi.
     * @since 09-12-2021.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>): void => {
        const props = this.props
        const state = this.state

        if (props.customerReducer.search !== prevProps.customerReducer.search) {
            const initFilterCustomers = async (): void => {
                props.filterCustomers({search: props.customerReducer.search})
            }
            initFilterCustomers()
        }
        if (props.customerReducer.loading !== prevProps.customerReducer.loading)
            this.setState({showProgressDialog: props.customerReducer.loading})
        if (props.customerReducer.customers !== prevProps.customerReducer.customers || props.customerReducer.customers?.length !== prevProps.customerReducer.customers?.length)
            this.setState({customers: props.customerReducer.customers})
        if (state.showCustomerForm !== prevState.showCustomerForm)
            this.setState({showCustomerForm: state.showCustomerForm})
        if (state.editMode !== prevState.editMode)
            this.setState({editMode: state.editMode})
        if (state.locale !== prevState.locale)
            this.setState({locale: state.locale})
        if (state.theme !== prevState.theme)
            this.setState({theme: state.theme})
    }

    /**
     * @author Vipin Joshi.
     * @since 05-01-2022.
     * @description to handle customer press event.
     */
    onPressCustomer = (customer, index): void => {
        const customerFarmsLength = customer?.child_ids.length
        const selectedPurpose = this.props.dashboardHomeReducer?.purpose
        let customerValid = true;

        if (this.props.dashboardHomeReducer?.purpose === Constant.FarmLand) {
            if (customerFarmsLength <= 0) {
                this.showAlert(I18N.t('CustomerNotValidForPurposeMsg'), {message: I18N.t('CustomerHavingFarmlandPurposeDetails')})
                customerValid = false;
            }
        } else if (customer.district_id < 0 || customer.taluk_id < 0) {
            this.showAlert(I18N.t('CustomerNotValidForPurposeMsg'), {message: I18N.t('CustomerHavingHomePurposeDetails')})
            customerValid = false;
        }

        if (customerValid) {
            this.props.selectCustomer({...customer})
            this.props.navigation.popToTop()
        }
    }

    /**
     * @author Vipin Joshi.
     * @since 05-01-2022.
     * @description to handle customer edit press event.
     */
    onPressEditCustomer = (customer, index): void => {
        if (customer?.isOffline && this.isOnline) {
            this.showAlert(I18N.t("UpdateLabel"), {message: I18N.t("UpdateOfflineCustomerInOnlineModeMsg")})
        } else {
            this.setState({showCustomerForm: true, editMode: true, selectedCustomer: {...customer}})
        }
    }

    /**
     * @author Vipin Joshi.
     * @since 05-01-2022.
     * @description to handle cancel button press event.
     */
    onPressCancelButton = (): void => this.props.navigation.goBack()

    /**
     * @author Vipin Joshi.
     * @since 07-01-2022.
     * @description search bar text change callback.
     */
    onSearchQueryTextChange = (text): void => {
        this.setState({searchQuery: text}, debounce(this.props.setSearch.bind(this, text)))
    }

    /**
     * @author Vipin Joshi.
     * @since 05-01-2022.
     * @description to handle add customer button press event.
     */
    onPressAddCustomerButton = (customer): void => {
        isNetworkAvailable().then(isOnline => {
            if (isOnline) { // for customer created online
                this.props.createCustomerOnline(customer).then(this.onCustomerSubmissionSuccess.bind(this)).finally(this.onChangeInCustomer)
            } else {
                this.props.createCustomerOffline(customer).then(this.onCustomerSubmissionSuccess.bind(this)).finally(this.onChangeInCustomer)
            }
        })
    }

    /**
     * @author Vipin Joshi.
     * @since 11-01-2022.
     * @description to perform action after change in customer.
     */
    onChangeInCustomer = (): void => {
        this.props.filterCustomers({search: this.state.searchQuery})
    }

    /**
     * @author Vipin Joshi.
     * @since 05-01-2022.
     * @description to handle save customer button press event.
     */
    onPressSaveCustomerButton = (customer): void => {
        isNetworkAvailable().then(isOnline => {
            if (isOnline) {
                if (customer.isOffline) { // Offline true here only when customer edit offline.
                    if (customer.isSynced) { //If customer is synced: that customer already created earlier.
                        this.props.updateCustomerOnline(customer).then(this.onCustomerSubmissionSuccess.bind(this)).finally(this.onChangeInCustomer)
                    } else { // otherwise its not created, so we have to create.
                        this.props.createCustomerOnline(customer).then(this.onCustomerSubmissionSuccess.bind(this)).finally(this.onChangeInCustomer)
                    }
                    return
                }
                // if customer is not offline, it must've isSynced=true also, for that we can simply update customer.
                this.props.updateCustomerOnline(customer).then(this.onCustomerSubmissionSuccess.bind(this)).finally(this.onChangeInCustomer)
            } else {
                // Control go here if customer recently whether online or offline & now editing offline.
                this.props.updateCustomerOffline(customer).then(this.onCustomerSubmissionSuccess.bind(this)).finally(this.onChangeInCustomer)
            }
        })
    }

    /**
     * @author Vipin Joshi.
     * @since 12-01-2022.
     * @description to handle common code on successful customer submission.
     */
    onCustomerSubmissionSuccess = (): void => this.onPressCancelButton()

    /**
     * @author Vipin Joshi.
     * @since 06-01-2022.
     * @description to handle customer back button press event.
     */
    onPressCustomerFormBackButton = (): void => this.setState({
        showCustomerForm: false,
        editMode: false,
        selectedCustomer: undefined
    })

    /**
     * @author Vipin Joshi.
     * @since 05-01-2022.
     * @description to handle create customer button press event.
     */
    onPressCreateCustomerButton = (): void => this.setState({
        showCustomerForm: true,
        editMode: false,
    })

    renderAppComponent(): JSX.Element {
        return (
            <ThemeContext.Consumer>
                {({theme}) => {
                    this.setState({theme})
                    return (
                        <I18NContext.Consumer>
                            {({locale}) => {
                                this.setState({locale});
                                return (
                                    <AppContext.Consumer>
                                        {({networkContext, messageContext}: AppContextValueType) => {
                                            this.isOnline = networkContext.isOnline
                                            this.showAlert = messageContext.showAlert
                                            return (
                                                <View
                                                    style={[styles.container, {backgroundColor: this.state.theme?.backgroundColor}]}>
                                                    <AppBar
                                                        statusBarHeight={2}
                                                        headerStyle={styles.header}
                                                        beforeContent={<>
                                                            <AppButton
                                                                style={styles.actionButton}
                                                                labelStyle={{
                                                                    fontSize: getDynamicFontSize(14),
                                                                    lineHeight: getDynamicFontSize(14),
                                                                    paddingTop: 1
                                                                }}
                                                                type={"primary"}
                                                                color={AppColors.white}
                                                                title={I18N.t('CancelAction')}
                                                                size={32}
                                                                withoutDelay={true}
                                                                icon={({size, color}) => (
                                                                    <AppIcon type={Icons.MaterialIcons}
                                                                             name={'keyboard-arrow-left'}
                                                                             color={color}
                                                                             size={size}/>
                                                                )}
                                                                onPress={this.onPressCancelButton}/>

                                                            <AppSearchBar
                                                                placeholder={I18N.t('SearchCustomersPlaceHolder')}
                                                                onChangeText={this.onSearchQueryTextChange}
                                                                style={styles.searchBar}
                                                                inputStyle={styles.searchInput}
                                                                value={this.state.searchQuery}/>
                                                        </>}
                                                        afterContent={<>
                                                            <AppButton
                                                                style={styles.actionButton}
                                                                labelStyle={{
                                                                    fontSize: getDynamicFontSize(14),
                                                                    lineHeight: getDynamicFontSize(14),
                                                                    paddingTop: 2,
                                                                }}
                                                                title={I18N.t('CreateCustomerAction')}
                                                                color={AppColors.white}
                                                                type={"primary"}
                                                                // size={32}
                                                                withoutDelay={true}
                                                                onPress={this.onPressCreateCustomerButton}
                                                                icon={({size, color}) => (
                                                                    <AppIcon type={Icons.MaterialIcons}
                                                                             name={'person-add'}
                                                                             color={color}
                                                                             size={getDynamicFontSize(20)}/>
                                                                )}/>
                                                        </>}
                                                    />

                                                    <ScrollView
                                                        scrollEnabled={true}
                                                        horizontal={false}
                                                        showsHorizontalScrollIndicator={false}
                                                        showsVerticalScrollIndicator={false}>
                                                        <CustomerListThemeProvider>
                                                            <View style={styles.container}>

                                                                {/*Customer Form*/}
                                                                <ErrorHandler>
                                                                    <CustomerFormDialog
                                                                        show={this.state.showCustomerForm}
                                                                        isEditMode={this.state.editMode}
                                                                        customerData={this.state.selectedCustomer}
                                                                        onPressAddCustomer={this.onPressAddCustomerButton}
                                                                        onPressSaveCustomer={this.onPressSaveCustomerButton}
                                                                        onBackPressed={this.onPressCustomerFormBackButton}
                                                                    />
                                                                </ErrorHandler>

                                                                {/*Customer List*/}
                                                                <ErrorHandler>
                                                                    <CustomerListThemeProvider>
                                                                        <CustomerList
                                                                            data={this.state.customers}
                                                                            columnsData={this.state.customerColumns}
                                                                            onPress={this.onPressCustomer}
                                                                            onEditPress={this.onPressEditCustomer}
                                                                        />
                                                                    </CustomerListThemeProvider>
                                                                </ErrorHandler>

                                                            </View>
                                                        </CustomerListThemeProvider>

                                                    </ScrollView>

                                                    <AppProgressDialog
                                                        visible={this.state.showProgressDialog}
                                                        pleaseWaitVisible={true}
                                                        pleaseWaitText={I18N.t('PleaseWaitText')}
                                                        loadingText={I18N.t('LoadingText')}
                                                        loadercolor={AppColors.colorAccent}
                                                    />
                                                </View>
                                            )
                                        }}
                                    </AppContext.Consumer>
                                )
                            }}
                        </I18NContext.Consumer>
                    );
                }}
            </ThemeContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1},
    header: {
        backgroundColor: AppColors.oxfordBlue,
        justifyContent: 'space-between',
        height: getDynamicFontSize(55),
        paddingBottom: 4,
    },
    searchBar: {
        width: (SCREEN_WIDTH / 3),
        borderRadius: 50,
        height: '80%',
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        left: '3%'
    },
    searchInput: {
        fontSize: getDynamicFontSize(15)
    },
    actionButton: {borderWidth: 2, borderColor: AppColors.americanSilver, borderRadius: 4}
})

const mapStateToProps = ({customerReducer, dashboardHomeReducer}) => {
    return {customerReducer, dashboardHomeReducer}
}

const mapDispatchToProps = {
    loadData, filterCustomers, setSearch, selectCustomer, createCustomerOnline,
    createCustomerOffline, setCreatedCustomer, updateCustomerOnline, updateCustomerOffline
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomersScreen)

