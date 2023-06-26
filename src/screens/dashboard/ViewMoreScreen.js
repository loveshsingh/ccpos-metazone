import React from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import {logout} from "../../actions/auth";
import {connect} from "react-redux";
import FastImage from "react-native-fast-image";
import {fetchViewMoreScreenData} from "../../actions/dashboard/view-more";
import {AppColors} from "../../assets/AppColors";
import AppIcon, {Icons} from "../../components/lib/AppIcon";
import AppText from "../../components/lib/AppText";
import {getDynamicFontSize, height, width} from "../../helper/Utility";
import LogoutButton from "../../components/screen/dashboard/view-more/LogoutButton";
import I18N from "../../helper/translation";
import type {AppContextValueType} from "../../base/contexts/AppProvider";
import {AppContext} from "../../base/contexts/AppProvider";
import {Card} from 'react-native-paper';
import {AppFonts} from "../../assets/AppFonts";
import AppTouchableOpacity from "../../components/lib/AppTouchableOpacity";
import app from '../../../app.json'
import AppConfig from "../../base/AppConfig";
import {setShowErrorLog} from "../../actions/errorLog";
import {BaseComponent} from "../../base/BaseComponent";
import ErrorHandler from "../../base/contexts/ErrorProvider";
import {I18NContext} from "../../base/contexts/I18NProvider";
import ViewMoreThemeProvider, {
    ViewMoreThemeContext,
    ViewMoreThemeContextValueType
} from "../../base/theme contexts/ViewMoreThemeProvider";
import AppFlatList from "../../components/lib/AppFlatList";


/**
 * @author Vipin Joshi.
 * @since 26-11-2021.
 * @description View More Screen.
 */
class ViewMoreScreen extends BaseComponent {

    showToast
    showAlert
    showUpdate
    hideUpdate

    constructor(props) {
        super(props);
        this.state = {
            locale: undefined,
            viewMoreTheme: undefined,
            isDarkMode: false,
        };
    }

    /**
     * @author Vipin Joshi.
     * @since 03-12-2021.
     * @description to perform initial loading data.
     */
    componentDidMount = (): void => {
        const initViewMoreScreenData = async ():void => {
            this.props.fetchViewMoreScreenData()
        }
        initViewMoreScreenData()
    }

    /**
     * @author Lovesh Singh.
     * @since 03-05-2022.
     * @description to check component will re-render or not.
     */
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        const state = this.state
        if (state.locale !== nextState.locale)
            return true
        else if (state.isDarkMode !== nextState.isDarkMode)
            return true
        else if (state.viewMoreTheme !== nextState.viewMoreTheme)
            return true
        return false

    }

    /**
     * @author Lovesh Singh.
     * @since 03-05-2022.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>): void => {
        const state = this.state
        if (state.locale !== prevState.locale)
            this.setState({locale: state.locale})
        if (state.isDarkMode !== prevState.isDarkMode)
            this.setState({isDarkMode: state.isDarkMode})
        if (state.viewMoreTheme !== prevState.viewMoreTheme)
            this.setState({viewMoreTheme: state.viewMoreTheme})
    }

    /**
     * @author Lovesh Singh.
     * @since 15-01-2022.
     * @description logout button on press event handler.
     */
    onPressLogoutButton = (): void => {
        this.props.logout().then(() =>
                this.props.navigation.replace('LoginScreen')
            , error => {
                console.log(JSON.stringify(error), "Logout Error")
                this.showToast(error.message, {type: 'error'})
            })
    }

    /**
     * @author Lovesh Singh.
     * @since 15-01-2022
     * @description to render each Product Item unique key.
     * @returns {JSX.Element}
     */
    keyExtractor = (item, index): string => index.toString()

    /**
     * @author Lovesh Singh.
     * @since 15-01-2022.
     * @description to render cart list Item.
     * @returns {JSX.Element}
     */
    renderCartItem = ({item, index}): JSX.Element => {
        let iconType;
        if (item.icon?.type === "Icons.MaterialCommunityIcons") {
            iconType = Icons.MaterialCommunityIcons
        } else if (item.icon?.type === "Icons.FontAwesome") {
            iconType = Icons.FontAwesome
        } else if (item.icon?.type === "Icons.FontAwesome") {
            iconType = Icons.FontAwesome
        } else if (item.icon?.type === "Icons.Feather") {
            iconType = Icons.Feather
        }
        return (
            <AppTouchableOpacity onPress={item?.onPress} /*disabled={index === 1}*/>
                <Card style={[styles.card, {backgroundColor: this.state.viewMoreTheme?.card?.backgroundColor}]}>
                    <Card.Title
                        title={item.title}
                        subtitle={item.description}
                        subtitleStyle={{color: this.state.viewMoreTheme?.textColor}}
                        titleStyle={{color: this.state.viewMoreTheme?.textColor}}
                        left={({size, color}) => <AppIcon type={iconType} name={item.icon?.name}
                                                          color={this.state.viewMoreTheme?.textColor}
                                                          size={size}/>}
                    />
                </Card>
            </AppTouchableOpacity>
        )
    }

    /**
     * @author Lovesh Singh.
     * @since 01-02-2022.
     * @description to check for update.
     */
    triggerCheckForUpdate = (): void => {
        this.showUpdate(true, () => this.hideUpdate)
    }

    /**
     * @author Lovesh Singh.
     * @since 01-04-2022.
     * @description to check error logs.
     */
    triggerCheckErrorLogs = (): void => {
        this.props.setShowErrorLog(true)
    }

    /**
     * @author Lovesh Singh.
     * @since 02-02-2022.
     * @description to redirect to language screen.
     */
    onPressLanguage = (): void => {
        this.props.navigation.navigate("LanguageScreen", {next: "goBack"})
    }

    /**
     * @author Lovesh Singh.
     * @since 30-05-2022.
     * @description to redirect to theme screen.
     */
    onPressTheme = (): void => {
        this.props.navigation.navigate("ThemeScreen", {next: "goBack"})
    }


    renderAppComponent(): JSX.Element {
        const envType = AppConfig.env?.type !== 'production' ? AppConfig.env?.type + ' ' : ''
        return (
            <ViewMoreThemeProvider>
            <I18NContext.Consumer>
                {({locale}) => {
                    this.setState({locale});
                    return (
                        <AppContext.Consumer>
                            {({messageContext, showUpdateDialog, hideUpdateDialog}: AppContextValueType) => {
                                this.showToast = messageContext.showToast
                                this.showAlert = messageContext.showAlert
                                this.showUpdate = showUpdateDialog
                                this.hideUpdate = hideUpdateDialog
                                return (
                                    <ViewMoreThemeContext.Consumer>
                                        {({viewMoreTheme}: ViewMoreThemeContextValueType) => {
                                            this.setState({viewMoreTheme})
                                            return (
                                                <ScrollView style={[styles.viewMoreContainer, {backgroundColor: this.state.viewMoreTheme?.backgroundColor}]}>
                                                    <View style={[styles.headerStyle, {backgroundColor: viewMoreTheme?.primaryColor}]}>
                                                        <View style={styles.logoutContainer}>
                                                            <ErrorHandler>
                                                                <LogoutButton
                                                                    onPressLogout={this.onPressLogoutButton}/>
                                                            </ErrorHandler>
                                                        </View>
                                                    </View>
                                                    <View style={styles.profileContainer}>
                                                        <View style={styles.profileImageContainer}>
                                                            {
                                                                (this.props.viewMoreReducer?.agentDetail?.agentProfileImage === '')
                                                                    ? <AppIcon
                                                                        name="account-circle"
                                                                        style={styles.profileIcon}
                                                                        size={150}
                                                                        color={AppColors.colorBackgroundWhite}
                                                                    />
                                                                    : <FastImage
                                                                        source={{
                                                                            uri: this.props.viewMoreReducer?.agentDetail?.agentProfileImage,
                                                                        }}
                                                                        style={styles.profileImage}
                                                                        resizeMode={FastImage.resizeMode.center}
                                                                    />
                                                            }
                                                        </View>
                                                        <View style={styles.detailContainer}>
                                                            <View style={styles.headingContainer}>
                                                                <AppText style={styles.headingText}
                                                                         text={I18N.t("AgentNameLabel")}/>
                                                                <AppText
                                                                    text={this.props.viewMoreReducer?.agentDetail?.agentName}/>
                                                            </View>
                                                            <View style={styles.headingContainer}>
                                                                <AppText style={styles.headingText}
                                                                         text={I18N.t("AgentEmailLabel")}/>
                                                                <AppText
                                                                    text={this.props.viewMoreReducer?.agentDetail?.agentEmail}/>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.cardContainer}>
                                                        <AppFlatList
                                                            // numColumns={2}
                                                            initialNumToRender={1}
                                                            scrollEnabled={true}
                                                            nestedScrollEnabled={true}
                                                            data={[{
                                                                title: I18N.t('LanguageLabel'),
                                                                description: I18N.t('ChooseLanguageLabel'),
                                                                onPress: this.onPressLanguage,
                                                                icon: {type: "Icons.FontAwesome", name: "language"}
                                                            }, {
                                                                title: I18N.t('ThemeLabel'),
                                                                description: I18N.t('ChooseThemeLabel'),
                                                                onPress: this.onPressTheme,
                                                                icon: {
                                                                    type: "Icons.MaterialCommunityIcons",
                                                                    name: "theme-light-dark"
                                                                }
                                                            }, {
                                                                title: I18N.t('OTAUpdateLabel'),
                                                                description: `${I18N.t('CheckUpdateLabel')} (${envType}${app.expo.version})`,
                                                                onPress: this.triggerCheckForUpdate,
                                                                icon: {
                                                                    type: "Icons.MaterialCommunityIcons",
                                                                    name: "update",
                                                                }
                                                            }, {
                                                                title: I18N.t('ErrorLogLabel'),
                                                                description: I18N.t('CheckErrorLogsLabel'),
                                                                onPress: this.triggerCheckErrorLogs,
                                                                icon: {type: "Icons.Feather", name: "file-text",}
                                                            }]}
                                                            contentContainerStyle={{
                                                                flexDirection: 'row',
                                                                flexWrap: 'wrap'
                                                            }}
                                                            keyExtractor={this.keyExtractor}
                                                            renderItem={this.renderCartItem}
                                                        />
                                                    </View>
                                                </ScrollView>
                                            )
                                        }}
                                    </ViewMoreThemeContext.Consumer>
                                )
                            }}
                        </AppContext.Consumer>
                    )
                }}
            </I18NContext.Consumer>
            </ViewMoreThemeProvider>
        );
    }
}

const styles = StyleSheet.create({
    viewMoreContainer: {
        flex: 1,
    },
    headerStyle: {
        position: "relative",
        width: "100%",
        height: height / 3.5,
    },
    logoutContainer: {
        minWidth: 120,
        position: 'absolute',
        top: 0,
        right: 0,
        alignItems: 'flex-end',
        paddingRight: 10,
        paddingTop: 10,
    },
    logoutButton: {
        margin: 10,
        borderWidth: 2,
        borderColor: AppColors.americanSilver,
        borderRadius: 4
    },
    profileContainer: {
        position: "absolute",
        top: height / 6,
        alignSelf: "center",
        width: width / 3,
        // height: height / 3  
    },
    profileImageContainer: {
        // position: "absolute",
        // top: height / 6,
        alignSelf: "center",
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        backgroundColor: AppColors.sonicSilver,
    },
    profileImage: {
        height: getDynamicFontSize(120),
        width: getDynamicFontSize(120),
        borderColor: AppColors.colorBackgroundWhite,
        borderRadius: 150
    },
    detailContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    headingContainer: {
        flexDirection: "row"
    },
    headingText: {
        fontWeight: "bold",
        fontFamily: AppFonts.bold
    },
    cardContainer: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: getDynamicFontSize(110),
    },
    card: {
        width: 300,
        margin: 10,
        borderRadius: 10,
        borderColor: AppColors.chineseWhite,
        borderWidth: 1,
    },
});

const mapStateToProps = ({authReducer, viewMoreReducer}) => {
    return {authReducer, viewMoreReducer}
}

const mapDispatchToProps = {
    logout, fetchViewMoreScreenData, setShowErrorLog
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMoreScreen)



