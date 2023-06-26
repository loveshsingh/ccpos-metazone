import React from "react";
import {StyleSheet, View} from "react-native";
import AppText from "../../components/lib/AppText";
import {AppColors} from "../../assets/AppColors";
import I18N from "../../helper/translation";
import AppBar from "../../components/lib/AppBar";
import AppIcon, {Icons} from "../../components/lib/AppIcon";
import {connect} from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import {fetchOrdersSummary} from "../../actions/dashboard/close-session";
import AppProgressDialog from "../../components/lib/AppProgressDialog";
import CloseSessionDialog from "../../components/screen/dashboard/close-session/CloseSessionDialog";
import {isNetworkAvailable} from "../../helper/Utility";
import {debounce} from "../../base/hook/app_hook";
import {closeSession} from "../../actions/dashboard/close-session";
import {AppContext} from "../../base/contexts/AppProvider";
import type {AppContextValueType} from "../../base/contexts/AppProvider";
import {AppFonts} from "../../assets/AppFonts";
import {getDynamicFontSize} from "../../helper/Utility"
import AppRoundButton from "../../components/lib/AppRoundButton";
import {BaseComponent} from "../../base/BaseComponent";
import ErrorHandler from "../../base/contexts/ErrorProvider";
import {I18NContext} from "../../base/contexts/I18NProvider";
import {ThemeContext} from "../../base/contexts/ThemeProvider";

/**
 * @author Vipin Joshi.
 * @since 26-11-2021.
 * @description Close Session Screen.
 */
class CloseSessionScreen extends BaseComponent {

    TAG = "CloseSessionScreen"

    showToast;
    showAlert;

    constructor(props) {
        super(props);
        this.state = {
            showProgressDialog: false,
            showCloseSessionDialog: false,
            isOnline: false,
            debug: true,
            locale: undefined,
            theme: undefined,
        };
        this.networkEventUnsubscribe = undefined
    }

    /**
     * @author Lovesh Singh.
     * @since 17-01-2022.
     * @description to perform initial loading data.
     */
    componentDidMount = (): void => {
        this.networkEventUnsubscribe = NetInfo.addEventListener(state => {
            this.setState({isOnline: state.isConnected})
        });
        this._unsubscribe = this.props.navigation.addListener("focus", () => this.checkCurrentCart())
    }

    /**
     * @author Lovesh Singh.
     * @since 17-01-2022.
     * @description to check current cart.
     */
    checkCurrentCart = (): void => {
        if (+this.props.dashboardHomeReducer?.cartProducts?.length > 0) {
            //todo
            // console.log("Current Cart Items in Did Mount: ",currentCartItem)
            this.showAlert(I18N.t('AreYouSureLabelMsg'), {
                message: I18N.t('HomePageCartItemErrorMsg'), buttons: [
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
                        text: I18N.t('HomePageAlertConfirmButtonLabel'),
                        icon: <AppIcon type={Icons.MaterialCommunityIcons} name={'page-next'} color={AppColors.white}
                                       size={12} style={{marginRight: 8}}/>,
                        onPress: this.props.navigation.navigate.bind(this, 'DashboardHomeScreen')
                    }
                ]
            })
        } else {
            isNetworkAvailable().then(isOnline => {
                if (isOnline === true) {
                    debounce(() => {
                        this.props.fetchOrdersSummary().finally(() => {
                            this.setState({showCloseSessionDialog: true})
                        })
                    })()
                } else {
                    this.showToast(I18N.t('NoInternetConnectivityMsg', {type: 'error'}))
                }
            });
        }
    }

    /**
     * @author Lovesh Singh.
     * @since 17-01-2022.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>): void => {
        const props: any = this.props
        const state: any = this.state

        if (props.closeSessionReducer.loading !== prevProps.closeSessionReducer.loading)
            this.setState({showProgressDialog: props.closeSessionReducer.loading})
        if (state.isOnline !== prevState.isOnline)
            this.setState({isOnline: state.isOnline})
        if (state.locale !== prevState.locale)
            this.setState({locale: state.locale})
        if (state.theme !== prevState.theme)
            this.setState({theme: state.theme})
    }

    /**
     * @author Lovesh Singh.
     * @since 17-01-2022.
     * @description to perform clean out tasks.
     */
    componentWillUnmount = (): void => {
        if (this.networkEventUnsubscribe)
            this.networkEventUnsubscribe();
        this._unsubscribe();
    }

    /**
     * @author Lovesh Singh.
     * @since 17-01-2022.
     * @description to check component will re-render or not.
     */
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        const state: any = this.state
        const props: any = this.props

        if (nextProps.closeSessionReducer.loading !== props.closeSessionReducer.loading)
            return true
        else if (nextState.showProgressDialog !== state.showProgressDialog)
            return true
        else if (nextState.showCloseSessionDialog !== state.showCloseSessionDialog)
            return true
        else if (nextState.isOnline !== state.isOnline)
            return true
        else if (nextState.locale !== this.state.locale)
            return true
        else if (nextState.theme !== this.state.theme)
            return true

        return false
    }

    /**
     * @author Lovesh Singh.
     * @since 17-01-2022.
     * @description to handle close session cancel button press event.
     */
    closeSessionDialogCancelPressHandler = (): void => {
        this.setState({showCloseSessionDialog: false})
    }

    /**
     * @author Lovesh Singh.
     * @since 17-01-2022.
     * @description Close Session button press event handler.
     */
    onPressCloseSessionButton = (nursery): void => {
        const {sessionDetails} = this.props.authReducer
        this.props.closeSession({
            nursery: nursery,
            sessionDetails: sessionDetails,
        }, () => {
            this.props.navigation.replace('HomeScreen')
            this.closeSessionDialogCancelPressHandler();
        }, (error) => {
            console.log(this.TAG, I18N.t('SyncOrderErrorMsg'), JSON.stringify(error))
        })
    }

    /**
     * @author Lovesh Singh.
     * @since 19-01-2021.
     * @description to show close session dialog.
     */
    openCloseSessionDialog = (): void => {
        this.showAlert(
            I18N.t("AreYouSureLabelMsg"),
            {
                message: I18N.t("CloseSessionWarningMsg"),
                buttons: [
                    {
                        text: I18N.t("CancelAction"),
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
                        text: I18N.t("CloseAction"),
                        icon: <AppIcon type={Icons.MaterialCommunityIcons} name={'page-next'} color={AppColors.white}
                                       size={12} style={{marginRight: 8}}/>,
                        onPress: this.onPressCloseSessionButton
                    },
                ]
            }
        )
    }

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
                                        {({messageContext}: AppContextValueType) => {
                                            this.showToast = messageContext.showToast
                                            this.showAlert = messageContext.showAlert
                                            return (
                                                <View style={styles.container}>
                                                    <AppBar
                                                        statusBarHeight={8}
                                                        headerStyle={styles.closeSessionHeader}
                                                        title={<AppText style={styles.closeSessionHeaderText}
                                                                        text={I18N.t('CloseSession')}/>}
                                                    />
                                                    <View style={[styles.orderDetails, {backgroundColor: theme?.backgroundColor}]}>
                                                        <AppText style={styles.headingStyle}
                                                                 text={I18N.t('CloseSessionHeading')}/>
                                                        <AppText style={styles.headingStyle}
                                                                 text={I18N.t('CloseSessionDetails')}/>
                                                        <AppRoundButton
                                                            type="primary"
                                                            uppercase={false}
                                                            color={AppColors.white}
                                                            size={32}
                                                            withoutDelay={true}
                                                            icon={({size, color}) => (
                                                                <AppIcon type={Icons.AntDesign} name={'close'}
                                                                         color={color}
                                                                         size={size}/>
                                                            )}
                                                            title={I18N.t('CloseSessionAction')}
                                                            onPress={this.checkCurrentCart}
                                                        />
                                                        <AppProgressDialog
                                                            visible={this.state.showProgressDialog}
                                                            pleaseWaitVisible={true}
                                                            pleaseWaitText={I18N.t('PleaseWaitText')}
                                                            loadingText={I18N.t('LoadingText')}
                                                            loadercolor={AppColors.colorAccent}
                                                        />
                                                    </View>
                                                    <ErrorHandler>
                                                        <CloseSessionDialog
                                                            show={this.state.showCloseSessionDialog}
                                                            onPressCancel={this.closeSessionDialogCancelPressHandler}
                                                            onSubmitPress={this.openCloseSessionDialog}
                                                        />
                                                    </ErrorHandler>
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
    container: {
        flex: 1,
    },
    closeSessionHeader: {
        backgroundColor: AppColors.oxfordBlue,
        alignItems: 'center',
        height: getDynamicFontSize(55),
        justifyContent: "center",
    },
    closeSessionHeaderText: {
        color: AppColors.white,
        fontSize: getDynamicFontSize(22)
    },
    orderDetails: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingStyle: {
        textAlign: 'center',
        fontSize: getDynamicFontSize(18),
        marginVertical: 4,
        padding: 3,
        fontFamily: AppFonts.bold
    }
});

const mapStateToProps = ({closeSessionReducer, dashboardHomeReducer, homeReducer, authReducer}) => {
    return {closeSessionReducer, dashboardHomeReducer, homeReducer, authReducer}
}

const mapDispatchToProps = {
    fetchOrdersSummary, closeSession
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseSessionScreen)

