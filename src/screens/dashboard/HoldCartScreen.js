import React from "react";
import {StyleSheet, View, SafeAreaView} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AppBar from "../../components/lib/AppBar";
import AppText from "../../components/lib/AppText";
import {AppColors} from "../../assets/AppColors";
import I18N from "../../helper/translation";
import AppProgressDialog from "../../components/lib/AppProgressDialog";
import {connect} from "react-redux";
import {deleteHoldCart, getHoldCarts, moveHoldCartToOrderCart} from "../../actions/dashboard/hold-cart";
import HoldCartList from "../../components/screen/dashboard/hold-cart/HoldCartList";
import HoldCartDetail from "../../components/screen/dashboard/hold-cart/HoldCartDetail";
import {Appbar} from "react-native-paper";
import {debounce} from "../../base/hook/app_hook";
import type {AppContextValueType} from "../../base/contexts/AppProvider";
import {AppContext} from "../../base/contexts/AppProvider";
import AppIcon, {Icons} from "../../components/lib/AppIcon";
import {getDynamicFontSize} from "../../helper/Utility"
import {BaseComponent} from "../../base/BaseComponent";
import ErrorHandler from "../../base/contexts/ErrorProvider";
import {I18NContext} from "../../base/contexts/I18NProvider";
import HoldOrderThemeProvider from "../../base/theme contexts/HoldOrderThemeProvider";

/**
 * @author Vipin Joshi.
 * @since 26-11-2021.
 * @description Hold Cart Screen.
 */
class HoldCartScreen extends BaseComponent {

    showAlert;

    constructor(props) {
        super(props);
        this.state = {
            showProgressDialog: false,
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
            const initHoldCarts = async (): void => {
                this.props.getHoldCarts();
            }
            initHoldCarts()

    }

    /**
     * @author Lovesh Singh.
     * @since 11-01-2022.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>): void => {
        const props: any = this.props
        const state: any = this.state

        if (props.holdCartReducer.loading !== prevProps.holdCartReducer.loading)
            this.setState({showProgressDialog: props.holdCartReducer.loading})
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
            this.networkEventUnsubscribe();
    }

    /**
     * @author Lovesh Singh.
     * @since 11-01-2022.
     * @description to check component will re-render or not.
     */
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        const state: any = this.state
        const props: any = this.props

        if (nextProps.holdCartReducer.loading !== props.holdCartReducer.loading)
            return true
        else if (nextState.showProgressDialog !== state.showProgressDialog)
            return true
        else if (nextProps.holdCartReducer.holdCarts !== props.holdCartReducer.holdCarts ||
            nextProps.holdCartReducer.holdCarts?.length !== props.holdCartReducer.holdCarts?.length)
            return true
        else if (nextState.locale !== this.state.locale)
            return true

        return false
    }

    /**
     * @author Lovesh Singh.
     * @since 14-01-2022.
     * @description on hold cart event handler.
     */
    onCartPress = (): void =>
        this.props.moveHoldCartToOrderCart(this.props.holdCartReducer?.selectedCartDetail)
            .finally(() => this.props.navigation.navigate("DashboardHomeScreen"))

    renderAppComponent(): JSX.Element {
        return (
            <I18NContext.Consumer>
                {({locale}) => {
                    this.setState({locale});
                    return (
                        <AppContext.Consumer>
                            {({messageContext}: AppContextValueType) => {
                                this.showAlert = messageContext.showAlert
                                return (
                                    <SafeAreaView style={styles.holdCartContainer}>
                                        <HoldOrderThemeProvider>

                                            {/*Left Section*/}
                                            <View style={styles.holdCartListContainer}>
                                                <AppBar
                                                    statusBarHeight={8}
                                                    headerStyle={styles.holdCartListHeader}
                                                    title={<AppText style={styles.holdCartListHeaderText}
                                                                    text={I18N.t('HoldCart')}/>}
                                                />
                                                <ErrorHandler>
                                                    <HoldCartList/>
                                                </ErrorHandler>
                                            </View>

                                            {/*Right Section*/}
                                            <View style={styles.holdCartDetailContainer}>
                                                <AppBar
                                                    statusBarHeight={8}
                                                    headerStyle={styles.holdCartDetailHeader}
                                                    title={<AppText style={styles.holdCartDetailHeaderText}
                                                                    text={I18N.t('CartDetailsLabel')}/>}
                                                    afterContent={<>
                                                        <Appbar.Action icon="delete"
                                                                       style={{display: (this.props.holdCartReducer.holdCarts?.length > 0) ? 'flex' : 'none'}}
                                                                       color={AppColors.colorBackgroundWhite}
                                                                       size={getDynamicFontSize(25)}
                                                                       onPress={() => {
                                                                           this.showAlert(I18N.t('AreYouSureLabelMsg'), {
                                                                               message: I18N.t('DeleteThisHoldCarWarningMsg'),
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
                                                                                       icon: <AppIcon
                                                                                           type={Icons.MaterialIcons}
                                                                                           name={'undo'}
                                                                                           color={AppColors.arsenic}
                                                                                           size={12}
                                                                                           style={{marginRight: 8}}/>
                                                                                   },
                                                                                   {
                                                                                       text: I18N.t('CartDeleteAlertConfirmButtonLabel'),
                                                                                       icon: <AppIcon
                                                                                           type={Icons.MaterialCommunityIcons}
                                                                                           name={'page-next'}
                                                                                           color={AppColors.white}
                                                                                           size={12}
                                                                                           style={{marginRight: 8}}/>,
                                                                                       onPress: this.props.deleteHoldCart.bind(this, +this.props.holdCartReducer?.selectedCartDetail?.cart.id)
                                                                                   },
                                                                               ]
                                                                           })
                                                                       }}/>
                                                        <Appbar.Action icon="cart"
                                                                       style={{display: (this.props.holdCartReducer.holdCarts?.length > 0) ? 'flex' : 'none'}}
                                                                       color={AppColors.colorBackgroundWhite}
                                                                       size={getDynamicFontSize(25)}
                                                                       onPress={() => {
                                                                           this.showAlert(I18N.t('AreYouSureLabelMsg'), {
                                                                               message: I18N.t('MoveHoldCartToCheckOutMsg'),
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
                                                                                       icon: <AppIcon
                                                                                           type={Icons.MaterialIcons}
                                                                                           name={'undo'}
                                                                                           color={AppColors.arsenic}
                                                                                           size={12}
                                                                                           style={{marginRight: 8}}/>
                                                                                   },
                                                                                   {
                                                                                       text: I18N.t('MoveHoldCartProceedButtonLabel'),
                                                                                       icon: <AppIcon
                                                                                           type={Icons.MaterialCommunityIcons}
                                                                                           name={'page-next'}
                                                                                           color={AppColors.white}
                                                                                           size={12}
                                                                                           style={{marginRight: 8}}/>,
                                                                                       onPress: this.onCartPress
                                                                                   },
                                                                               ]
                                                                           })
                                                                       }}/>
                                                    </>}
                                                />

                                                <ErrorHandler>
                                                    <HoldCartDetail/>
                                                </ErrorHandler>
                                            </View>

                                            <AppProgressDialog
                                                visible={this.state.showProgressDialog}
                                                pleaseWaitVisible={true}
                                                pleaseWaitText={I18N.t('PleaseWaitText')}
                                                loadingText={I18N.t('LoadingText')}
                                                loadercolor={AppColors.colorAccent}
                                            />
                                        </HoldOrderThemeProvider>
                                    </SafeAreaView>
                                )
                            }}
                        </AppContext.Consumer>
                    )
                }}
            </I18NContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    holdCartContainer: {
        flex: 1,
        flexDirection: "row",
    },
    holdCartListContainer: {
        flex: 1,
        borderRightColor: AppColors.platinum,
        borderRightWidth: 1
    },
    holdCartListHeader: {
        backgroundColor: AppColors.oxfordBlue,
        alignItems: 'center',
        height: getDynamicFontSize(55),
        justifyContent: "center",
    },
    holdCartListHeaderText: {
        color: AppColors.white,
        fontSize: getDynamicFontSize(22)
    },
    holdCartDetailContainer: {
        flex: 2,
    },
    holdCartDetailHeader: {
        backgroundColor: AppColors.oxfordBlue,
        alignItems: 'center',
        height: getDynamicFontSize(55),
        justifyContent: "center",
    },
    holdCartDetailHeaderText: {
        color: AppColors.white,
        fontSize: getDynamicFontSize(22)
    },
});

const mapStateToProps = ({holdCartReducer}) => {
    return {holdCartReducer}
}

const mapDispatchToProps = {
    getHoldCarts, moveHoldCartToOrderCart, deleteHoldCart
}

export default connect(mapStateToProps, mapDispatchToProps)(HoldCartScreen)