import React from "react";
import {InteractionManager, StyleSheet, View} from "react-native";
import AppProgressDialog from "../components/lib/AppProgressDialog";
import {AppColors} from "../assets/AppColors";
import NurseryList from "../components/screen/home/NurseryList";
import {connect} from "react-redux";
import {
    fetchHomeScreenData,
    resumeSession,
    newSession,
} from "../actions/home";
import {fetchOrdersSummary} from "../actions/dashboard/close-session";
import AppSafeAreaView from "../components/lib/AppSafeAreaView";
import I18N from "../helper/translation";
import AppBar from "../components/lib/AppBar";
import LogoutButton from "../components/screen/dashboard/view-more/LogoutButton";
import {logout} from "../actions/auth";
import {closeSession} from "../actions/dashboard/close-session";
import type {AppContextValueType} from "../base/contexts/AppProvider";
import {AppContext} from "../base/contexts/AppProvider";
import AppIcon, {Icons} from "../components/lib/AppIcon";
import AppText from "../components/lib/AppText";
import {getDynamicFontSize, isNetworkAvailable} from "../helper/Utility";
import CloseSessionDialog from "../components/screen/dashboard/close-session/CloseSessionDialog";
import {debounce} from "../base/hook/app_hook";
import {BaseComponent} from "../base/BaseComponent";
import ErrorHandler from "../base/contexts/ErrorProvider";
import DashboardThemeProvider from "../base/theme contexts/DashboardThemeProvider";


/**
 * @author Vipin Joshi.
 * @since 03-12-2021.
 * @description Home Screen.
 */
class HomeScreen extends BaseComponent {
    TAG = "HomeScreen:";

    showToast;
    showAlert;

    constructor(props) {
        super(props);
        this.state = {
            showProgressDialog: false,
            showCloseSessionDialog: false,
            nurseries: props.homeReducer.nurseries,
            agentName: props.homeReducer.agent,
            isOnline: false,
        };
    }

    /**
     * @author Vipin Joshi.
     * @since 03-12-2021.
     * @description to perform initial loading data.
     */
    componentDidMount = (): void => {
        const initHomeScreenData = async ():void => {
            this.props.fetchHomeScreenData();
        }
        initHomeScreenData()
    };

    /**
     * @author Vipin Joshi.
     * @since 03-12-2021.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (prevProps: Readonly<any>): void => {
        const props = this.props;
        if (props.homeReducer.loading !== prevProps.homeReducer.loading)
            this.setState({showProgressDialog: props.homeReducer.loading});
        if (props.homeReducer.nurseries !== prevProps.homeReducer.nurseries)
            this.setState({nurseries: props.homeReducer.nurseries});
        if (props.homeReducer.agent !== prevProps.homeReducer.agent)
            this.setState({agentName: props.homeReducer.agent});
    };

    /**
     * @author Vipin Joshi.
     * @since 07-12-2021.
     * @description New Session button press event handler.
     * @param nursery selected nursery.
     */
    onPressNewSessionButton = (nursery): void => {
        this.props.newSession(nursery, () => {
            if (!this.props.homeReducer.error) {
                //if after session success there isn't any error than navigate to home screen
                this.props.navigation.replace("DashboardScreen");
            }
        });
    };

    /**
     * @author Vipin Joshi.
     * @since 07-12-2021.
     * @description Resume Session button press event handler.
     */
    onPressResumeSessionButton = (nursery): void => {
        this.props.resumeSession(nursery).then(() => {
            if (!this.props.homeReducer.error) {
                //if after session success there isn't any error than navigate to home screen
                this.props.navigation.replace("DashboardScreen");
            }
        });
    };

    /**
     * @author Vipin Joshi.
     * @since 07-12-2021.
     * @description Close Session button press event handler.
     */
    onPressCloseSessionButton = (nursery): void => {
        const {sessionDetails} = this.props.authReducer;
        this.props.closeSession(
            {
                nursery: nursery,
                sessionDetails: sessionDetails,
            },
            () => {
                this.props.navigation.replace("HomeScreen");
            },
            (error) => {
                console.log(
                    this.TAG,
                    I18N.t('SyncOrderErrorMsg'),
                    JSON.stringify(error)
                );
            }
        );
    };

    /**
     * @author Lovesh Singh.
     * @since 17-01-2022.
     * @description to check current cart.
     */
    checkCurrentCart = (): void => {
        if (+this.props.dashboardHomeReducer?.cartProducts?.length > 0) {
            //todo
            // console.log("Current Cart Items in Did Mount: ",currentCartItem)
            this.showAlert(I18N.t("AreYouSureLabelMsg"), {
                message: I18N.t("HomePageCartItemErrorMsg"),
                buttons: [
                    {
                        text: I18N.t("CancelAction"),
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
                        text: I18N.t("HomePageAlertConfirmButtonLabel"),
                        icon: (
                            <AppIcon
                                type={Icons.MaterialCommunityIcons}
                                name={"page-next"}
                                color={AppColors.white}
                                size={12}
                                style={{marginRight: 8}}
                            />
                        ),
                        onPress: this.props.navigation.navigate.bind(
                            this,
                            "DashboardHomeScreen"
                        ),
                    },
                ],
            });
        } else {
            isNetworkAvailable().then((isOnline) => {
                if (isOnline === true) {
                    debounce(() => {
                        this.props.fetchOrdersSummary().finally(() => {
                            this.setState({showCloseSessionDialog: true});
                        });
                    })();
                } else {
                    console.log(this.TAG, I18N.t("NoInternetConnectivityMsg"));
                    this.showToast(
                        I18N.t("NoInternetConnectivityMsg", {type: "error"})
                    );
                }
            });
        }
    };

    /**
     * @author Lovesh Singh.
     * @since 19-01-2021.
     * @description to show close session dialog.
     */
    openCloseSessionDialog = (): void => {
        this.showAlert(I18N.t("AreYouSureLabelMsg"), {
            message: I18N.t("CloseSessionWarningMsg"),
            buttons: [
                {
                    text: I18N.t("CancelAction"),
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
                    text: I18N.t("CloseAction"),
                    icon: (
                        <AppIcon
                            type={Icons.MaterialCommunityIcons}
                            name={"page-next"}
                            color={AppColors.white}
                            size={12}
                            style={{marginRight: 8}}
                        />
                    ),
                    onPress: this.onPressCloseSessionButton,
                },
            ],
        });
    };

    /**
     * @author Lovesh Singh.
     * @since 17-01-2022.
     * @description to handle close session cancel button press event.
     */
    closeSessionDialogCancelPressHandler = (): void => {
        this.setState({showCloseSessionDialog: false});
    };

    /**
     * @author Lovesh Singh.
     * @since 15-01-2022.
     * @description logout button on press event handler.
     */
    onPressLogoutButton = (): void => {
        this.props.logout().then(
            () => this.props.navigation.replace("LoginScreen"),
            (error) => {
                console.log(JSON.stringify(error), "Logout Error");
                this.showToast(error.message);
            }
        );
    };

    renderAppComponent(): JSX.Element {
        return (
            <AppContext.Consumer>
                {({messageContext}: AppContextValueType) => {
                    this.showToast = messageContext.showToast;
                    this.showAlert = messageContext.showAlert;
                    return (
                        <View style={styles.dashboardContainer}>
                            <AppBar
                                statusBarHeight={8}
                                headerStyle={styles.homeScreenHeader}
                                title={
                                    <AppText
                                        text={I18N.t("PointOfSale")}
                                        style={styles.headerText}
                                    />
                                }
                                afterContent={
                                    <ErrorHandler>
                                        <LogoutButton
                                            onPressLogout={InteractionManager.runAfterInteractions.bind(
                                                this,
                                                this.onPressLogoutButton
                                            )}
                                        />
                                    </ErrorHandler>
                                }
                            />
                            <AppSafeAreaView style={styles.container}>
                                <ErrorHandler>
                                    <DashboardThemeProvider>
                                        <NurseryList
                                            data={this.state.nurseries}
                                            agentData={this.state.agentName}
                                            onPressNewSession={this.onPressNewSessionButton}
                                            onPressResumeSession={this.onPressResumeSessionButton}
                                            onPressCloseSession={this.checkCurrentCart}
                                        />
                                    </DashboardThemeProvider>
                                </ErrorHandler>

                                <AppProgressDialog
                                    visible={this.state.showProgressDialog}
                                    pleaseWaitVisible={true}
                                    pleaseWaitText={I18N.t("PleaseWaitText")}
                                    loadingText={I18N.t("LoadingText")}
                                    loadercolor={AppColors.colorAccent}
                                />
                                <ErrorHandler>
                                    <CloseSessionDialog
                                        show={this.state.showCloseSessionDialog}
                                        onPressCancel={this.closeSessionDialogCancelPressHandler}
                                        onSubmitPress={this.openCloseSessionDialog}
                                    />
                                </ErrorHandler>
                            </AppSafeAreaView>
                        </View>
                    );
                }}
            </AppContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    dashboardContainer: {
        flex: 1,
    },
    container: {
        // ...AppStyleSheet.SplashScreenContainer
        flex: 1,
        alignSelf: "stretch",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        padding: 10,
    },
    homeScreenHeader: {
        // backgroundColor: AppColors.oxfordBlue,
        height: getDynamicFontSize(55),
        justifyContent: "center",
        paddingBottom: 4,
    },
    headerText: {
        color: AppColors.colorBackgroundWhite,
        fontSize: getDynamicFontSize(22)
    },
});

const mapStateToProps = ({
                             homeReducer,
                             authReducer,
                             closeSessionReducer,
                             dashboardHomeReducer,
                         }) => {
    return {
        homeReducer,
        authReducer,
        closeSessionReducer,
        dashboardHomeReducer,
    };
};

const mapDispatchToProps = {
    fetchHomeScreenData,
    resumeSession,
    newSession,
    fetchOrdersSummary,
    closeSession,
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
