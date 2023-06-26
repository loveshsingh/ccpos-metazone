// noinspection JSUnresolvedVariable

import React from "react";
import {StyleSheet, View, SafeAreaView} from "react-native";
import I18N from "../../helper/translation";
import {AppColors} from "../../assets/AppColors";
import AppBar from "../../components/lib/AppBar";
import NetInfo from "@react-native-community/netinfo";
import OrderDetails from "../../components/screen/dashboard/orders/OrderDetails";
import {connect} from "react-redux";
import AsideSection from "../../components/screen/dashboard/orders/AsideSection";
import {
    SelectOrderListTab, SetSelectedOrder,
    SetSelectedTab,
    syncOfflineOrders,
    clearSelectedTab, fetchAllOrders,
} from "../../actions/dashboard/orders";
import AppProgressDialog from "../../components/lib/AppProgressDialog";
import AppText from "../../components/lib/AppText";
import AppButton from "../../components/lib/AppButton";
import AppIcon, {Icons} from "../../components/lib/AppIcon";
import {Constant} from "../../helper/constant";
import type {AppContextValueType} from "../../base/contexts/AppProvider";
import {AppContext} from "../../base/contexts/AppProvider";
import OrdersDialog from "../../components/screen/dashboard/orders/OrderDialog";
import {getDynamicFontSize, getOrderPrintFormat, printHtml} from "../../helper/Utility"
import {BaseComponent} from "../../base/BaseComponent";
import ErrorHandler, {ErrorContext} from "../../base/contexts/ErrorProvider";
import {I18NContext} from "../../base/contexts/I18NProvider";
import OrderThemeProvider from "../../base/theme contexts/OrderThemeProvider";
import {debounce} from "../../base/hook/app_hook";


/**
 * @author Lovesh Singh.
 * @since 11-01-2022.
 * @description Orders Screen.
 */
class OrdersScreen extends BaseComponent {

    showToast;

    TAG = "OrdersScreen"

    constructor(props) {
        super(props);
        this.state = {
            showProgressDialog: false,
            isOnline: false,
            debug: true,
            showOrdersDialog: false,
            locale: undefined,
        };
        this.networkEventUnsubscribe = undefined
    }

    /**
     * @author Lovesh Singh.
     * @since 08-01-2022.
     * @description to perform initial loading data.
     */
    componentDidMount = (): void => {
        this.networkEventUnsubscribe = NetInfo.addEventListener(state => {
            this.setState({isOnline: state.isConnected})
        });

        //set preselected tab on each time screen visit
        this._unsubscribeFocus = this.props.navigation.addListener("focus", () => {
            this.props.SetSelectedTab(Constant.TAB_ONLINE)
        })

        //clear preselected tab on each time tab blur
        this._unsubscribeBlur = this.props.navigation.addListener("blur", () => {
            this.props.clearSelectedTab(Constant.TAB_ONLINE)
        })
    }

    /**
     * @author Lovesh Singh.
     * @since 11-01-2022.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>): void => {
        const props: any = this.props
        const state: any = this.state

        if (props.orderReducer.selectedTab !== prevProps.orderReducer.selectedTab)
            props.SelectOrderListTab(props.orderReducer.selectedTab)
        if (props.orderReducer.loading !== prevProps.orderReducer.loading)
            this.setState({showProgressDialog: props.orderReducer.loading})
        if (state.isOnline !== prevState.isOnline)
            this.setState({isOnline: state.isOnline})
        if (state.locale !== prevState.locale)
            this.setState({locale: state.locale})
    }

    /**
     * @author Lovesh Singh.
     * @since 08-01-2022.
     * @description to perform clean out tasks.
     */
    componentWillUnmount = (): void => {
        if (this.networkEventUnsubscribe)
            this.networkEventUnsubscribe()
        if (this._unsubscribeFocus)
            this._unsubscribeFocus()
        if (this._unsubscribeBlur)
            this._unsubscribeBlur()
    }

    /**
     * @author Lovesh Singh.
     * @since 11-01-2022.
     * @description to check component will re-render or not.
     */
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        const state: any = this.state
        const props: any = this.props

        if (nextProps.orderReducer.loading !== props.orderReducer.loading)
            return true
        else if (nextState.showProgressDialog !== state.showProgressDialog)
            return true
        else if (nextState.isOnline !== state.isOnline)
            return true
        else if (nextProps.orderReducer.selectedTab !== props.orderReducer.selectedTab)
            return true
        else if (nextState.showOrdersDialog !== state.showOrdersDialog)
            return true
        else if (nextState.locale !== this.state.locale)
            return true

        return false
    }

    /**
     * @author Lovesh Singh.
     * @since 12-01-2022.
     * @description to check condition for showing SyncAll Button.
     */
    canSyncAllButtonVisible = (): boolean =>
        this.state.isOnline &&
        this.props.orderReducer?.selectedTab === Constant.TAB_OFFLINE &&
        this.props.orderReducer?.orders?.length > 0

    // /**
    //  * @author Lovesh Singh.
    //  * @since 21-01-2022.
    //  * @description to sync offline orders.
    //  */
    // onPressSyncAllOrders = (): void => {
    //     const {sessionDetails} = this.props.authReducer
    //     const nursery = this.props.homeReducer.nurseries
    //     this.props.syncOfflineOrders({
    //         nursery: nursery,
    //         sessionDetails: sessionDetails,
    //     }, () => {
    //         this.props.SetSelectedTab(Constant.TAB_ONLINE)
    //     }, (error) => {
    //         console.log(this.TAG, 'Sync Order ErrorCallback', JSON.stringify(error))
    //     })
    // }

    /**
     * @author Lovesh Singh
     * @since 10-01-2022
     * @description to print order receipt.
     */
    onPressSyncAllOrders = (): void => {
        const selectedOrder = {"lines": [
            {
                "display_name": "[மஹோகனி] Mahagony sapling",
                "product_id": 75850,
                "price_unit": "7",
                "price_subtotal": 0,
                "price_subtotal_incl": 0,
                "qty": 4200,
                "discount": 7,
                "id": "517245"
            },
            {
                "display_name": "[செஞ் சந்தனம்] Redsandel sapling",
                "product_id": 75263,
                "price_unit": "7",
                "price_subtotal": 0,
                "price_subtotal_incl": 0,
                "qty": 4700,
                "discount": 7,
                "id": "517246"
            },
            {
                "display_name": "[வேங்கை] Vengai sapling",
                "product_id": 75852,
                "price_unit": "7",
                "price_subtotal": 0,
                "price_subtotal_incl": 0,
                "qty": 4100,
                "discount": 7,
                "id": "517247"
            },
            {
                "display_name": "[தேக்கு] Teak sapling",
                "product_id": 75262,
                "price_unit": "7",
                "price_subtotal": 0,
                "price_subtotal_incl": 0,
                "qty": 5500,
                "discount": 7,
                "id": "517248"
            },
            {
                "display_name": "[மஞ்சள் கடம்பு] Manjal kadambu sapling",
                "product_id": 75855,
                "price_unit": "7",
                "price_subtotal": 0,
                "price_subtotal_incl": 0,
                "qty": 1550,
                "discount": 7,
                "id": "517249"
            },
            {
                "display_name": "[சந்தனம்] Sandel sapling",
                "product_id": 75851,
                "price_unit": "7",
                "price_subtotal": 0,
                "price_subtotal_incl": 0,
                "qty": 2150,
                "discount": 7,
                "id": "517250"
            },
            {
                "display_name": "[குமிழ்] Kumil sapling",
                "product_id": 75856,
                "price_unit": "7",
                "price_subtotal": 0,
                "price_subtotal_incl": 0,
                "qty": 500,
                "discount": 7,
                "id": "517251"
            },
            {
                "display_name": "[பலா] Pala sapling",
                "product_id": 75861,
                "price_unit": "7",
                "price_subtotal": 0,
                "price_subtotal_incl": 0,
                "qty": 300,
                "discount": 7,
                "id": "517252"
            },
            {
                "display_name": "[பென்சில்] Pencil sapling",
                "product_id": 76232,
                "price_unit": "7",
                "price_subtotal": 0,
                "price_subtotal_incl": 0,
                "qty": 200,
                "discount": 7,
                "id": "517253"
            },
            {
                "display_name": "[பிள்ளை மருது] Pillai marudhu sapling",
                "product_id": 75857,
                "price_unit": "7",
                "price_subtotal": 0,
                "price_subtotal_incl": 0,
                "qty": 500,
                "discount": 7,
                "id": "517254"
            },
            {
                "display_name": "[வெண் கடம்பு] Ven kadambu sapling",
                "product_id": 75865,
                "price_unit": "7",
                "price_subtotal": 0,
                "price_subtotal_incl": 0,
                "qty": 1700,
                "discount": 7,
                "id": "517255"
            }
        ],
            "id": "016038-001-1666199650",
            "name": "mobi 016038-001-1666199650",
            "amount_paid": 0,
            "amount_total": 0,
            "partner_id": 209862,
            "partner_name": "Sethumadhavan (L B Nursery)",
            "partner_phone": "9095529346",
            "to_invoice": false,
            "amount_return": 0,
            "creation_date": "2022-10-19T17:14:09.525Z",
            "purpose_id": "farmland",
            "reference_seq_no": "CDL-5c3eb5e-000001"
    }

    const sessionDetails = {
        "currencyDecimalPlaces": 2,
        "currencyId": 20,
        "currencyPosition": "after",
        "currencySymbol": "₹",
        "id": 0,
        "loginNumber": 1,
        "receiptFooter": "",
        "receiptHeader": "",
        "sessionId": 2025,
        "sessionStartAt": "2023-01-21 09:59:56",
        "shopId": 33,
        "shopName": "Cbe Ashram Nursery",
        "toInvoice": false,
    }
        getOrderPrintFormat("ashram", "Ashram Nursery", selectedOrder, sessionDetails).then(printHtml);
    }


    /**
     * @author Vipin Joshi
     * @since 30-12-2021
     * @description to show orders dialog.
     */
    onDebugPress = (show: boolean): void => {
        if (show) {
            this.props.fetchAllOrders()
        }
        this.setState({showOrdersDialog: show})
    }


    renderAppComponent(): JSX.Element {
        return (
            <I18NContext.Consumer>
                {({locale}) => {
                    this.setState({locale});
                    return (
                        <AppContext.Consumer>
                            {({messageContext}: AppContextValueType) => {
                                this.showToast = messageContext.showToast
                                return (
                                    <SafeAreaView style={styles.orderContainer}>
                                        <OrderThemeProvider>

                                            <View style={styles.ordersListContainer}>
                                                <AppBar
                                                    statusBarHeight={8}
                                                    headerStyle={styles.ordersListHeader}
                                                    title={<AppText style={styles.orderListHeaderText}
                                                                    text={I18N.t('Orders')}/>}
                                                />
                                                <ErrorHandler>
                                                    <AsideSection/>
                                                </ErrorHandler>
                                            </View>

                                        <View style={styles.ordersDetailContainer}>
                                            <AppBar
                                                statusBarHeight={8}
                                                headerStyle={styles.ordersDetailHeader}
                                                title={<AppText style={styles.ordersDetailHeaderText}
                                                                text={I18N.t('OrderDetailsLabel')}/>}
                                                afterContent={<>
                                                    <AppButton
                                                        color={AppColors.white}
                                                        size={getDynamicFontSize(32)}
                                                        style={[styles.actionButton, {
                                                            display: this.canSyncAllButtonVisible() ? 'flex' : 'none',
                                                            // backgroundColor: AppColors.oxfordBlue
                                                        }]}
                                                        type={"primary"}
                                                        labelStyle={{
                                                            fontSize: getDynamicFontSize(14),
                                                            lineHeight: getDynamicFontSize(15),
                                                            paddingTop: 1
                                                        }}
                                                        withoutDelay={true}
                                                        icon={({size, color}) => (
                                                            <AppIcon type={Icons.MaterialIcons} name={'sync'}
                                                                     color={color}
                                                                     size={size}/>
                                                        )}
                                                        title={I18N.t('SyncAllAction')}
                                                        onPress={debounce(this.onPressSyncAllOrders)}
                                                    />
                                                    <AppButton
                                                        style={[styles.actionButton, {
                                                            display: this.state.debug ? 'flex' : 'none',
                                                            // backgroundColor: AppColors.oxfordBlue
                                                        }]}
                                                        type={"primary"}
                                                        labelStyle={{
                                                            fontSize: getDynamicFontSize(15),
                                                            lineHeight: getDynamicFontSize(15),
                                                            paddingTop: 1
                                                        }}
                                                        color={AppColors.white}
                                                        size={getDynamicFontSize(32)}
                                                        withoutDelay={true}
                                                        icon={({size, color}) => (
                                                            <AppIcon type={Icons.Entypo} name={'flow-parallel'}
                                                                     color={color}
                                                                     size={size}/>
                                                        )}
                                                        title={I18N.t('ShowAllOrdersAction')}
                                                        onPress={this.onDebugPress.bind(this, true)}
                                                    />
                                                </>}/>

                                                <ErrorHandler>
                                                    <OrderDetails/>
                                                </ErrorHandler>
                                            </View>

                                            <OrdersDialog show={this.state.showOrdersDialog}
                                                          onRequestClose={this.onDebugPress.bind(this, false)}/>

                                            <AppProgressDialog
                                                visible={this.state.showProgressDialog}
                                                pleaseWaitVisible={true}
                                                pleaseWaitText={I18N.t('PleaseWaitText')}
                                                loadingText={I18N.t('LoadingText')}
                                                loadercolor={AppColors.colorAccent}
                                            />
                                        </OrderThemeProvider>
                                    </SafeAreaView>)
                            }}
                        </AppContext.Consumer>
                    )
                }}
            </I18NContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    orderContainer: {
        flex: 1,
        flexDirection: "row",
    },
    ordersListContainer: {
        flex: 1,
        borderRightColor: AppColors.platinum,
        borderRightWidth: 1
    },
    ordersListHeader: {
        backgroundColor: AppColors.oxfordBlue,
        alignItems: 'center',
        height: getDynamicFontSize(55),
        justifyContent: "center",
    },
    orderListHeaderText: {
        color: AppColors.white,
        fontSize: getDynamicFontSize(22)
    },
    ordersDetailContainer: {
        flex: 2,
    },
    ordersDetailHeader: {
        backgroundColor: AppColors.oxfordBlue,
        alignItems: 'center',
        height: getDynamicFontSize(55),
        justifyContent: "center",
        paddingBottom: 4
    },
    ordersDetailHeaderText: {
        color: AppColors.white,
        fontSize: getDynamicFontSize(22)
    },
    actionButton: {
        borderWidth: 2,
        borderColor: AppColors.americanSilver,
        borderRadius: 4,
        marginHorizontal: 10,
    }
});

const mapStateToProps = ({orderReducer, homeReducer, authReducer}) => {
    return {orderReducer, homeReducer, authReducer}
}

const mapDispatchToProps = {
    SelectOrderListTab, clearSelectedTab, SetSelectedTab, syncOfflineOrders, SetSelectedOrder, fetchAllOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen)


