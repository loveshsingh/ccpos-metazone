import React from "react";
import {connect} from "react-redux";
import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView, Animated, Keyboard,
} from "react-native";
import {getDynamicFontSize, height, width} from "../helper/Utility";
import I18N from "../helper/translation/index";
import {Constant} from "../helper/constant";
import {login} from "../actions/auth";
import {Video} from "expo-av";
import AppTextIconInput from "../components/lib/AppTextIconInput";
import AppIcon, {Icons} from "../components/lib/AppIcon";
import {AppFonts} from "../assets/AppFonts";
import AppText from "../components/lib/AppText";
import {AppColors} from "../assets/AppColors";
import type {AppContextValueType} from "../base/contexts/AppProvider";
import {AppContext} from "../base/contexts/AppProvider";
import AppTouchableOpacity from "../components/lib/AppTouchableOpacity";
import AppRoundButton from "../components/lib/AppRoundButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppCheckbox from "../components/lib/AppCheckbox";
import SavedUserList from "../components/screen/login/SavedUserList";
import AppPressable from "../components/lib/AppPressable";
import AppTextInput from "../components/lib/AppTextInput";
import {BaseComponent} from "../base/BaseComponent";
import {I18NContext} from "../base/contexts/I18NProvider";
import {ThemeContext} from "../base/contexts/ThemeProvider";


/**
 * @author Vipin Joshi.
 * @since 24-11-2021.
 * @description Login Screen.
 */
class LoginScreen extends BaseComponent {
    showToast;
    setStatusBarTranslucent;

    constructor(props) {
        super(props);
        this.state = {
            username: Constant.DEFAULT_USER_NAME,
            password: Constant.DEFAULT_PASSWORD,
            usernameError: "",
            passwordError: "",
            showPassword: false,
            showProgressDialog: false,
            saveUserCredentials: false,
            savedUserList: undefined,
            showUserListDialog: false,
            userListDialogAnimation: new Animated.Value(0),
            onFocusUserName: false,
            onFocusPassword: false,
            locale: undefined,
            theme: undefined,
        };
    }

    /**
     * @author Lovesh Singh.
     * @since 22-02-2022.
     * @description to perform initial loading data.
     */
    componentDidMount = (): void => {
        this.setSavedUsers()
        this.toggleUserListDialog()
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({keyboardShow: true}));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({
            onFocusUserName: false,
            onFocusPassword: false
        }));
    }

    setSavedUsers = () => {
        AsyncStorage.getItem('AGENT_AUTH_DETAILS').then(AuthDetails => {
            let UsersId = JSON.parse(AuthDetails)
            this.setState({savedUserList: UsersId})
        })
    }

    /**
     * @author Vipin Joshi.
     * @since 26-11-2021.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>): void => {
        const props = this.props;
        const state = this.state

        if (props.authReducer.loading !== prevProps.authReducer.loading) {
            // set loading dialog state on change.
            this.setState({showProgressDialog: props.authReducer.loading});
        }
        if (state.saveUserCredentials !== prevState.saveUserCredentials) {
            this.setState({saveUserCredentials: state.saveUserCredentials});
        }
        if (state.savedUserList !== prevState.savedUserList) {
            this.setState({savedUserList: state.savedUserList});
        }
        if (state.onFocusUserName !== prevState.onFocusUserName) {
            this.setState({onFocusUserName: state.onFocusUserName});
        }
        if (state.onFocusPassword !== prevState.onFocusPassword) {
            this.setState({onFocusPassword: state.onFocusPassword});
        }
        if (state.showUserListDialog !== prevState.showUserListDialog) {
            this.setState({showUserListDialog: state.showUserListDialog})
            this.setSavedUsers()
        }
        if (state.locale !== prevState.locale)
            this.setState({locale: state.locale})
        if (state.theme !== prevState.theme)
            this.setState({theme: state.theme})
    };

    /**
     * @author Vipin Joshi.
     * @since 07-02-2022.
     * @description to clean out subscription or reset data.
     */
    componentWillUnmount = (): void => {
        this.setStatusBarTranslucent(false);
        // this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

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
        if (nextProps.authReducer.loading !== this.props.authReducer.loading)
            return true;
        else if (nextState.showProgressDialog !== this.state.showProgressDialog)
            return true;
        else if (nextState.username !== this.state.username) return true;
        else if (nextState.password !== this.state.password) return true;
        else if (nextState.usernameError !== this.state.usernameError) return true;
        else if (nextState.passwordError !== this.state.passwordError) return true;
        else if (nextState.showPassword !== this.state.showPassword) return true;
        else if (nextState.saveUserCredentials !== this.state.saveUserCredentials) return true;
        else if (nextState.savedUserList !== this.state.savedUserList) return true;
        else if (nextState.showUserListDialog !== this.state.showUserListDialog) return true;
        else if (nextState.onFocusUserName !== this.state.onFocusUserName) return true;
        else if (nextState.onFocusPassword !== this.state.onFocusPassword) return true;
        else if (nextState.locale !== this.state.locale)
            return true
        else if (nextState.theme !== this.state.theme)
            return true
        return false;
    }

    /**
     * @author Vipin Joshi.
     * @since 25-11-2021.
     * @description to check password is valid or not.
     * @return true if valid password.
     * @see onPressLoginButton
     */
    isValidPassword = (password): boolean => {
        let error;
        if (!password?.trim()) {
            error = I18N.t("PasswordCannotBeEmptyLabel");
        }
        this.setState({passwordError: error});
        return !error;
    };

    /**
     * @author Vipin Joshi.
     * @since 25-11-2021.
     * @description to check username is valid or not.
     * @return true if valid username.
     * @see onPressLoginButton
     */
    isValidEmail = (email): boolean => {
        let error;
        if (!email?.trim()) {
            error = I18N.t("EmailOrUsernameCannotBeEmptyLabel");
        }
        this.setState({usernameError: error});
        return !error;
    };

    /**
     * @author Vipin Joshi.
     * @since 25-11-2021.
     * @description login button on press event handler.
     */
    onPressLoginButton = async (): void => {
        const {username, password} = this.state;

        // AsyncStorage.removeItem('AGENT_AUTH_DETAILS')

        if (this.isValidEmail(username) && this.isValidPassword(password)) {
            this.props.login(username, password, this.state.saveUserCredentials).finally(() => {
                const error = this.props.authReducer?.error;
                if (error) {
                    this.showToast(error.message, {type: "error"});
                } else {
                    this.props.navigation.replace("HomeScreen");
                }
            });
        }
    };

    /**
     * @author Vipin Joshi.
     * @since 25-11-2021.
     * @description username input on change text event handler.
     * @param username input
     */
    onUserNameChangeText = (username): void => this.setState({username});

    /**
     * @author Vipin Joshi.
     * @since 25-11-2021.
     * @description password input on change text event handler.
     * @param password input
     */
    onPasswordChangeText = (password): void => this.setState({password});

    /**
     * @author Lovesh Singh.
     * @since 22-02-2022.
     * @description to handle saved user press event.
     */
    onPressSavedUser = (user): void => {
        this.setState({
            username: user?.username,
            password: user?.password,
            saveUserCredentials: true
        })
        this.toggleUserListDialog()
    }

    /**
     * @author Lovesh Singh.
     * @since 22-02-2022.
     * @description to handle checkbox press event.
     */
    onPressCheckBox = (): void => {
        this.setState({saveUserCredentials: !this.state.saveUserCredentials})
    }

    /**
     * @author Lovesh Singh.
     * @since 17-01-2022.
     * @description to show user list dialog.
     */
    toggleUserListDialog = (): void => {
        const {showUserListDialog} = this.state
        this.setState((prevState) => ({
            showUserListDialog: !prevState.showUserListDialog,
        }))
        Animated.timing(this.state.userListDialogAnimation, {
            toValue: showUserListDialog ? 0 : -160,
            duration: Constant.ANIMATION_DURATION,
            useNativeDriver: true
        }).start()
    }

    renderAppComponent(): JSX.Element {
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
                                        {({messageContext, setStatusBarTranslucent}: AppContextValueType) => {
                                            this.showToast = messageContext.showToast;
                                            this.setStatusBarTranslucent = setStatusBarTranslucent;
                                            this.setStatusBarTranslucent(true);
                                            return (
                                                <View style={styles.container}>
                                                    <Video
                                                        style={styles.video}
                                                        source={require("../assets/videos/login_background.mp4")}
                                                        volume={0}
                                                        isMuted={false}
                                                        shouldPlay
                                                        resizeMode="cover"
                                                        repeat={true}
                                                        disableFocus={true}
                                                        muted={true}
                                                        isLooping
                                                    />

                                                    <View style={styles.headingContainer}>
                                                        <AppText
                                                            style={styles.heading}
                                                            text={I18N.t("CauveryCallingLabel")}
                                                        />
                                                        {/* <AppText
                                    style={styles.subHeading}
                                    text={I18N.t("GraceOfLivingMasterLabel")}
                                /> */}
                                                    </View>

                                                    <ScrollView style={styles.loginContainer}>
                                                        <KeyboardAvoidingView>
                                                            <View style={styles.inputView}>
                                                                <AppTextIconInput
                                                                    value={this.state.username}
                                                                    mode="flat"
                                                                    error={this.state.usernameError}
                                                                    onChangeText={(username) => this.setState({username})}
                                                                    style={[styles.input, {backgroundColor: this.state.onFocusUserName ? AppColors.white : AppColors.transparent}]}
                                                                    left={
                                                                        <AppIcon
                                                                            type={Icons.FontAwesome}
                                                                            name={"user"}
                                                                            color={this.state.onFocusUserName ? AppColors.black : AppColors.white}
                                                                            style={{marginLeft: 10}}
                                                                            size={getDynamicFontSize(30)}
                                                                        />
                                                                    }
                                                                    placeholder={I18N.t("EnterEmailUsername")}
                                                                    selectionColor={AppColors.midNightBlack}
                                                                    underlineColor={AppColors.white}
                                                                    onFocus={() => this.setState({onFocusUserName: true})}
                                                                    theme={{
                                                                        colors: {
                                                                            text: this.state.onFocusUserName ? AppColors.black : AppColors.white,
                                                                            placeholder: this.state.onFocusUserName ? AppColors.black : AppColors.white,
                                                                            background: AppColors.transparent,
                                                                            primary: AppColors.white,
                                                                        },
                                                                    }}
                                                                />
                                                            </View>

                                                            <View style={styles.inputView}>
                                                                <AppTextIconInput
                                                                    value={this.state.password}
                                                                    mode="flat"
                                                                    error={this.state.passwordError}
                                                                    onChangeText={(password) => this.setState({password})}
                                                                    secureTextEntry={!this.state.showPassword}
                                                                    style={[styles.input, {backgroundColor: this.state.onFocusPassword ? AppColors.white : AppColors.transparent}]}
                                                                    left={
                                                                        <AppIcon
                                                                            type={Icons.FontAwesome}
                                                                            name="lock"
                                                                            style={{marginLeft: 10}}
                                                                            size={getDynamicFontSize(30)}
                                                                            color={this.state.onFocusPassword ? AppColors.black : AppColors.white}
                                                                        />
                                                                    }
                                                                    right={
                                                                        <AppTouchableOpacity
                                                                            onPress={() => {
                                                                                this.setState({
                                                                                    showPassword: !this.state.showPassword,
                                                                                });
                                                                            }}
                                                                        >
                                                                            <AppIcon
                                                                                type={Icons.FontAwesome}
                                                                                name={
                                                                                    !this.state.showPassword ? "eye" : "eye-slash"
                                                                                }
                                                                                style={{marginRight: 10}}
                                                                                size={getDynamicFontSize(30)}
                                                                                color={this.state.onFocusPassword ? AppColors.black : AppColors.white}
                                                                            />
                                                                        </AppTouchableOpacity>
                                                                    }
                                                                    placeholder={I18N.t("EnterPassword")}
                                                                    selectionColor={AppColors.midNightBlack}
                                                                    underlineColor={AppColors.white}
                                                                    onFocus={() => this.setState({onFocusPassword: true})}
                                                                    theme={{
                                                                        colors: {
                                                                            text: this.state.onFocusPassword ? AppColors.black : AppColors.white,
                                                                            placeholder: this.state.onFocusPassword ? AppColors.black : AppColors.white,
                                                                            background: AppColors.transparent,
                                                                            primary: AppColors.white,
                                                                        },
                                                                    }}
                                                                />
                                                            </View>
                                                            <View style={styles.checkboxContainer}>
                                                                <AppCheckbox checked={this.state.saveUserCredentials}
                                                                             onPress={this.onPressCheckBox}/>
                                                                <AppText text={I18N.t('SaveUsersMsg')}
                                                                         style={styles.saveUserText}
                                                                         onPress={this.onPressCheckBox}/>
                                                            </View>
                                                            <AppRoundButton
                                                                uppercase={false}
                                                                color={AppColors.white}
                                                                style={styles.loginAction}
                                                                onPress={this.onPressLoginButton}
                                                                title={I18N.t("LoginAction")}
                                                            />
                                                        </KeyboardAvoidingView>
                                                    </ScrollView>
                                                    {this.state.savedUserList?.length > 0 && (<Animated.View
                                                        style={[styles.savedUserListDialog, {transform: [{translateY: this.state.userListDialogAnimation}],backgroundColor: this.state.theme?.backgroundColor,}]}>
                                                        <AppTouchableOpacity style={[styles.savedUserListHide, {
                                                            display: !this.state.showUserListDialog ? 'flex' : 'none'
                                                        }]} onPress={this.toggleUserListDialog}>

                                                            <AppIcon type={Icons.MaterialIcons} name={'vpn-key'}
                                                                     color={this.state.theme?.primaryColor}
                                                                     size={getDynamicFontSize(20)}/>
                                                            <AppText style={[styles.savedUserListHideText, {color: this.state.theme?.primaryColor}]}
                                                                     text={I18N.t('SelectSavedUsersMsg')}/>

                                                        </AppTouchableOpacity>
                                                        <SavedUserList data={this.state.savedUserList}
                                                                       onPress={this.onPressSavedUser}
                                                                       show={this.state.showUserListDialog}
                                                                       onPressCancel={this.toggleUserListDialog}/>
                                                    </Animated.View>)}
                                                    {(this.state.showUserListDialog && this.state.savedUserList?.length > 0) &&
                                                        <AppPressable style={styles.backdrop}
                                                                      onPress={this.toggleUserListDialog}/>}
                                                </View>
                                            )
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
    container: {
        flex: 1,
    },
    video: {
        flex: 1,
        position: "absolute",
        zIndex: 1,
        width: width,
        height: height * 1.2,
    },
    headingContainer: {
        zIndex: 3,
        flex: 1,
        alignItems: "center",
        backgroundColor: AppColors.midNightBlack,
    },
    heading: {
        marginTop: height * 0.1,
        fontSize: getDynamicFontSize(50),
        color: AppColors.white,
        fontFamily: AppFonts.niconne,
    },
    subHeading: {
        fontSize: getDynamicFontSize(20),
        color: AppColors.white,
        fontFamily: AppFonts.regular,
    },
    loginContainer: {
        position: "absolute",
        alignSelf: "center",
        top: height / 3.2,
        zIndex: 3,
        width: width,
        height: height / 1.7,
    },
    inputView: {
        width: width * 0.35,
        alignSelf: "center",
    },
    input: {
        margin: getDynamicFontSize(8),
        flexGrow: 1,
        paddingLeft: 35,
        backgroundColor: "transparent",
    },
    loginAction: {
        height: 48,
        width: width * 0.35,
        alignSelf: "center",
        marginTop: 30,
        backgroundColor: "transparent",
        borderColor: AppColors.white,
        justifyContent: "center",
    },
    checkboxContainer: {
        alignSelf: 'center',
        width: width * 0.35,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectSavedUserText: {fontSize: getDynamicFontSize(15), color: AppColors.white, alignSelf: 'center'},
    saveUserText: {fontFamily: AppFonts.bold, color: AppColors.white, fontSize: getDynamicFontSize(15)},
    savedUserListHide: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    savedUserListHideText: {
        marginLeft: 10,
        fontFamily: AppFonts.bold,
        fontSize: getDynamicFontSize(15),
    },
    savedUserListDialog: {
        flex: 1,
        width: width / 3,
        height: 200,
        position: 'absolute',
        bottom: -160,
        right: 0,
        // bottom: 0,
        // left: 0,
        zIndex: 5,
        // padding: 10,
        // marginLeft: width / 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: AppColors.white,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: AppColors.charlestonGreen,
        opacity: 0.52,
        zIndex: 3
    },
});

const mapStateToProps = ({authReducer}) => {
    return {authReducer};
};

const mapDispatchToProps = {
    login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
