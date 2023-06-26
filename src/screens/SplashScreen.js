import React from "react";
import {connect} from "react-redux";
import {StyleSheet} from "react-native";
import {height} from "../helper/Utility";
import {ThemeContext} from "../base/contexts/ThemeProvider";
import AppImageBackground from "../components/lib/AppImageBackground";
import AppImage from "../components/lib/AppImage";
import {fetchSplashData} from "../actions/splash";
import {I18NContext} from "../base/contexts/I18NProvider";
import {getAuthAsyncStorage} from "../storage/getAuthAsyncStorage";
import {AppContext} from "../base/contexts/AppProvider";
import type {AppContextValueType} from "../base/contexts/AppProvider";
import {BaseComponent} from "../base/BaseComponent";

/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description Splash Screen.
 */
class SplashScreen extends BaseComponent {
    showToast;
    showUpdate;
    checkForUpdate;
    showUpdateWithData;

    constructor(props) {
        super(props);
        this.state = {
            locale: undefined,
            logo: require("../assets/images/logo-animation.gif"),
        };
    }

    /**
     * @author Vipin Joshi.
     * @since 26-11-2021.
     * @description to perform initial loading data.
     */
    componentDidMount = (): void => {

        const initSplashData = async (): void => {
            setTimeout(() => {
                this.setState({logo: require("../assets/images/logo.png")})
            }, 2000)

            this.checkForUpdate(
                (update) => {
                    this.showUpdateWithData(update);
                },
                (err) => {
                    this.props.fetchSplashData().finally(this.redirect);
                }
            );
        }
        initSplashData()
    };

    /**
     * @author Lovesh Singh.
     * @since 01-02-2021.
     * @description to check component will re-render or not.
     */
    shouldComponentUpdate = (nextProps: Readonly<any>, nextState: Readonly<any>): boolean => {
        const currentState = this.state
        return nextState.locale !== currentState.locale || nextState.logo !== currentState.logo;
    }

    /**
     * @author Lovesh Singh.
     * @since 01-02-2021.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>): void => {
        const state = this.state
        if (state.locale !== prevState.locale)
            this.setState({locale: state.locale})
        if (state.logo !== prevState.logo)
            this.setState({logo: state.logo})
    }

    /**
     * @author Vipin Joshi.
     * @since 26-11-2021.
     * @description to perform conditional redirection to a screen.
     */
    redirect = (): void => {
        const error = this.props.splashReducer.error;

        if (!error) {
            // No Splash data error.
            getAuthAsyncStorage().then((authStorage) => {
                let redirectScreen = "LoginScreen";

                let next;
                if (!this.state.locale) {
                    redirectScreen = "LanguageScreen"
                    next = "LoginScreen"
                } else if (authStorage.isLoggedIn === "true") {
                    redirectScreen = "HomeScreen"
                }
                this.navigate(redirectScreen, {next})
            })
        } else {
            this.navigate("SplashErrorScreen", {error});
        }
    };

    /**
     * @author Vipin Joshi.
     * @since 26-11-2021.
     * @description to navigate to a passed screen.
     * @param screen navigate screen name.
     * @param param navigation data.
     */
    navigate = (screen: string, param?: any): void => {
        this.props.navigation.replace(screen, param);
    };

    /**
     * @author Vipin Joshi.
     * @since 24-11-2021.
     * @description to render UI.
     * @returns {JSX.Element}
     */
    renderAppComponent = (): JSX.Element => {
        return (
            <AppContext.Consumer>
                {({
                      messageContext,
                      showUpdateDialog,
                      checkForUpdate,
                      showUpdateDialogWithData,
                  }: AppContextValueType) => {
                    this.showToast = messageContext.showToast;
                    this.showUpdate = showUpdateDialog;
                    this.checkForUpdate = checkForUpdate;
                    this.showUpdateWithData = showUpdateDialogWithData;

                    return (
                        <I18NContext.Consumer>
                            {({locale, updateLocale}) => {
                                this.setState({locale: locale});
                                return (
                                    <ThemeContext.Consumer>
                                        {({theme, updateTheme}) => {
                                            //todo remove this console log.
                                            console.log(theme);
                                            return (
                                                <AppImageBackground
                                                    source={require("../assets/images/full_screen_bg.png")}
                                                    style={[styles.container]}
                                                >
                                                    <AppImage
                                                        source={this.state.logo}
                                                        style={styles.logo}
                                                        fadeDuration={0}
                                                    />
                                                </AppImageBackground>
                                            );
                                        }}
                                    </ThemeContext.Consumer>
                                );
                            }}
                        </I18NContext.Consumer>
                    );
                }}
            </AppContext.Consumer>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    logo: {
        alignContent: "center",
        alignSelf: "center",
        height: height / 4,
        width: height / 4,
        justifyContent: "center",
        alignItems: "center",
    },
});

const mapStateToProps = ({splashReducer}) => {
    return {splashReducer}
}

const mapDispatchToProps = {
    fetchSplashData,
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
