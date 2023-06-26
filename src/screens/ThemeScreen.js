import React from "react";
import {
    StyleSheet,
    View,
    ScrollView,
} from "react-native";
import AppText from "../components/lib/AppText";
import {AppColors} from "../assets/AppColors";
import AppIcon, {Icons} from "../components/lib/AppIcon";
import I18N from "../helper/translation";
import {AppFonts} from "../assets/AppFonts";
import {getDynamicFontSize} from "../helper/Utility";
import {AppContext} from "../base/contexts/AppProvider";
import AppRoundButton from "../components/lib/AppRoundButton";
import {BaseComponent} from "../base/BaseComponent";
import {supportingThemes, ThemeContext} from "../base/contexts/ThemeProvider";
import AppTouchableOpacity from "../components/lib/AppTouchableOpacity";
import AppCard from "../components/lib/AppCard";
import type {AppContextValueType} from "../base/contexts/AppProvider";
import ErrorHandler from "../base/contexts/ErrorProvider";
import Switch from "expo-dark-mode-switch";
import AppProgressDialog from "../components/lib/AppProgressDialog";
import AppFlatList from "../components/lib/AppFlatList";

/**
 * @author Lovesh Singh.
 * @since 12-05-2021.
 * @description Theme Screen.
 */
class ThemeScreen extends BaseComponent {
    updateTheme;
    showToast;
    updateUIMode

    constructor(props) {
        super(props);
        this.state = {
            theme: undefined,
            themeMode: undefined,
            firstTimeLocaleSelect: false,
            uIMode: undefined,
            isDarkMode: false,
            uILoading: false,
        };
    }

    /**
     * @author Lovesh Singh.
     * @since 01-02-2021.
     * @description to perform initial loading data.
     */
    componentDidMount = (): void => {
    };

    /**
     * @author Lovesh Singh.
     * @since 01-02-2021.
     * @description to check component will re-render or not.
     */
    shouldComponentUpdate(
        nextProps: Readonly<any>,
        nextState: Readonly<any>,
        nextContext: any
    ): boolean {
        const state = this.state
        if (state.themeMode !== nextState.themeMode)
            return true
        else if (state.theme !== nextState.theme)
            return true
        else if (state.uIMode !== nextState.uIMode)
            return true
        else if (state.isDarkMode !== nextState.isDarkMode)
            return true
        // else if (state.uILoading !== nextState.uILoading)
        //     return true
        return false
    }

    /**
     * @author Lovesh Singh.
     * @since 01-02-2021.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (
        prevProps: Readonly<any>,
        prevState: Readonly<any>
    ): void => {
        const state = this.state;
        if (state.themeMode !== prevState.themeMode)
            this.setState({themeMode: state.themeMode});
        if (state.theme !== prevState.theme)
            this.setState({theme: state.theme});
        if (state.uIMode !== prevState.uIMode)
            this.setState({uIMode: state.uIMode})
        if (state.isDarkMode !== prevState.isDarkMode)
            this.setState({isDarkMode: state.isDarkMode})
        // if (state.uILoading !== prevState.uILoading)
        //     this.setState({uILoading: state.uILoading})
    };

    onPressProceed = (): void => {
        if (this.state.themeMode) {
            // this.setState({uILoading: true})
            let uIMode;
            if (this.state.isDarkMode) {
                uIMode = 'dark'
            } else {
                uIMode = 'light'
            }
            this.updateTheme(this.state.themeMode, uIMode);
            // this.props.navigation.replace(this.props.route.params?.next);
            if (this.props.route.params?.next === "goBack") {
                this.props.navigation.goBack();
                // this.props.navigation.replace(this.props.route.params?.next);
            } else {
                this.props.navigation.replace(this.props.route.params?.next);
            }
        } else this.showToast(I18N.t('SelectThemeMsg'), {type: "info"});
    };

    /**
     * @author Lovesh Singh.
     * @since 15-01-2022
     * @description to render each Product Item unique key.
     * @returns {JSX.Element}
     */
    keyExtractor = (item, index): string => index.toString();

    /**
     * @author Lovesh Singh.
     * @since 12-05-2022.
     * @description to change UI Mode.
     */
    onPressUIMode = (): void => {
        this.setState({isDarkMode: !this.state.isDarkMode})
    };

    /**
     * @author Lovesh Singh.
     * @since 25-01-2021.
     * @description to render UI.
     * @returns {JSX.Element}
     */
    renderAppComponent = (): JSX.Element => {

        /**
         * @author Lovesh Singh.
         * @since 15-01-2022.
         * @description to render theme list Item.
         * @returns {JSX.Element}
         */
        const renderThemeItem = ({item, index}): JSX.Element => {
            return (
                <AppCard style={styles.themeCard}
                         elevation={12} childrenStyle={styles.cardChildren}>
                    <AppTouchableOpacity
                        style={styles.viewContainer}
                        onPress={() => this.setState({themeMode: item?.value})}>
                        <View style={{
                            flex: 1,
                            width: '100%',
                            height: '50%',
                            backgroundColor: item?.value === 'default' ? AppColors.oxfordBlue : AppColors.crimsonRed,
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12
                        }}></View>
                        <View style={{
                            flex: 1,
                            width: '100%',
                            height: '50%',
                            backgroundColor: item?.value === 'default' ? AppColors.greenSheen : AppColors.yellow,
                            borderBottomLeftRadius: 12,
                            borderBottomRightRadius: 12
                        }}></View>
                        <View style={{
                            flex: 1,
                            width: '100%',
                            height: '100%',
                            backgroundColor: item?.value === this.state.themeMode ? AppColors.gunmetal : AppColors.transparent,
                            position: 'absolute',
                            opacity: 0.6,
                            borderRadius: 12,
                        }}></View>
                        <View style={{
                            position: 'absolute',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center'
                        }}>
                            <AppText style={[styles.productTitle, {
                                position: 'absolute',
                                color: item?.value === this.state.themeMode ? AppColors.white : AppColors.transparent
                            }]} text={item.title}/>
                        </View>
                        <View style={{
                            position: 'absolute',
                            right: getDynamicFontSize(10),
                            top: getDynamicFontSize(10),
                        }}>
                            <AppIcon name={'checkcircle'} type={Icons.AntDesign}
                                     color={item?.value === 'default' ? AppColors.greenSheen : AppColors.yellow}
                                     size={getDynamicFontSize(20)}
                                     style={{
                                         display: item?.value === this.state.themeMode ? 'flex' : 'none'
                                     }}/>
                        </View>
                    </AppTouchableOpacity>
                </AppCard>
            );
        };

        return (
            <ThemeContext.Consumer>
                {({theme, uIMode, isLoadingUIMode, updateTheme}) => {
                    console.log("UI Loading: ", isLoadingUIMode)
                    this.setState({uILoading: isLoadingUIMode})
                    this.setState({uIMode})
                    this.setState({theme, themeMode: theme?.themeMode})
                    uIMode === 'light' ? this.setState({isDarkMode: false}) : this.setState({isDarkMode: true})
                    // if (theme === undefined)
                    //     this.setState({ firstTimeLocaleSelect: true });
                    this.updateTheme = updateTheme;
                    return (
                        <AppContext.Consumer>
                            {({messageContext}: AppContextValueType) => {
                                this.showToast = messageContext.showToast;
                                return (
                                    <View
                                        style={[styles.container, {backgroundColor: this.state.theme?.backgroundColor}]}>
                                        <AppText
                                            text={I18N.t("SelectThemeLabel")}
                                            style={[styles.mainHeading, {
                                                borderColor: this.state.theme?.primaryColor,
                                                color: this.state.theme?.primaryColor,
                                            }]}
                                        />
                                        <ScrollView
                                            style={styles.langContainer}
                                            showsVerticalScrollIndicator={false}
                                        >
                                            <View style={styles.uiModeContainer}>
                                                <ErrorHandler>
                                                    <AppText
                                                        text={"Light"}
                                                        style={{
                                                            color: this.state.isDarkMode ? this.state.theme?.textColor : this.state.theme?.primaryColor,
                                                            marginHorizontal: 20,
                                                            fontSize: this.state.isDarkMode ? getDynamicFontSize(14) : getDynamicFontSize(18)
                                                        }}
                                                    />
                                                    <Switch value={this.state.isDarkMode}
                                                            onChange={this.onPressUIMode}/>
                                                    <AppText
                                                        text={"Dark"}
                                                        style={{
                                                            color: this.state.isDarkMode ? this.state.theme?.primaryColor : this.state.theme?.textColor,
                                                            marginHorizontal: 20,
                                                            fontSize: this.state.isDarkMode ? getDynamicFontSize(18) : getDynamicFontSize(14)
                                                        }}
                                                    />
                                                </ErrorHandler>
                                            </View>
                                            <View style={styles.cardContainer}>
                                                <AppFlatList
                                                    numColumns={3}
                                                    initialNumToRender={1}
                                                    scrollEnabled={true}
                                                    nestedScrollEnabled={true}
                                                    data={supportingThemes}
                                                    extraData={this.state.locale}
                                                    keyExtractor={this.keyExtractor}
                                                    renderItem={renderThemeItem}
                                                />
                                                <View
                                                    style={[styles.infoContainer, {backgroundColor: this.state.uIMode?.card?.backgroundColor}]}>
                                                    <AppIcon
                                                        type={Icons.AntDesign}
                                                        name={"infocirlceo"}
                                                        color={this.state.uIMode?.mode === 'dark' && this.state.theme?.themeMode === 'default' ? AppColors.oxfordBlueSecond : this.state.theme?.primaryColor}
                                                        size={20}
                                                    />
                                                    <AppText
                                                        text={I18N.t("LanguageInfoMsg")}
                                                        style={[styles.infoText, {color: this.state.uIMode?.mode === 'dark' && this.state.theme?.themeMode === 'default' ? AppColors.oxfordBlueSecond : this.state.theme?.primaryColor}]}
                                                    />
                                                </View>
                                            </View>
                                            <AppRoundButton
                                                type="primary"
                                                uppercase={false}
                                                icon={({size, color}) => (
                                                    <AppIcon
                                                        type={Icons.Ionicons}
                                                        name={"ios-arrow-forward"}
                                                        color={color}
                                                        size={size}
                                                    />
                                                )}
                                                onPress={this.onPressProceed}
                                                color={AppColors.azureishWhite}
                                                title={I18N.t("ProceedLabel")}
                                                style={styles.actionButton}
                                            />
                                        </ScrollView>
                                        <AppProgressDialog
                                            visible={this.state.uILoading}
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
            </ThemeContext.Consumer>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    mainHeading: {
        textAlign: "center",
        fontSize: getDynamicFontSize(30),
        borderRadius: 30,
        borderBottomWidth: 2,
        padding: 10,
        fontFamily: AppFonts.bold,
    },
    langContainer: {flex: 1, marginTop: 30},
    langText: {
        opacity: 0.8,
        fontFamily: AppFonts.bold,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 130,
        borderRadius: 30,
        borderWidth: 1,
        textAlign: "center",
        margin: 20,
    },
    infoContainer: {
        // backgroundColor: AppColors.chineseWhite,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        margin: 20,
        flexDirection: "row",
        alignItems: "center",
        borderColor: AppColors.chineseWhite,
        borderWidth: 1,
    },
    infoText: {
        fontFamily: AppFonts.regular,
        textAlign: "center",
        fontSize: getDynamicFontSize(15),
        marginHorizontal: 10
    },
    cardContainer: {
        flex: 1,
        alignItems: "center",
    },
    actionButton: {
        marginVertical: 20,
        paddingVertical: 3,
        fontFamily: AppFonts.regular,
        width: 200,
        alignSelf: "center",
    },
    themeItemText: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: getDynamicFontSize(18),
        marginTop: getDynamicFontSize(10)
    },
    themeCard: {
        width: getDynamicFontSize(180),
        height: getDynamicFontSize(180),
        margin: getDynamicFontSize(5),
        // alignItems: 'center',
        borderColor: AppColors.chineseWhite,
        borderWidth: 1,
        borderRadius: 12,
        // paddingHorizontal: 10,
    },
    themeCardContainer: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        height: '100%',
        // width: '100%',
        backgroundColor: 'red'
    },
    cardChildren: {
        paddingHorizontal: 0,
        paddingBottom: 0
    },
    card: {
        // ...AppStyleSheet.DashboardPageCardContainerstyle,
        // backgroundColor: AppColors.white,
        // width: (width / 3) - 10,
        // maxWidth: (width / 3) - 10,
        width: getDynamicFontSize(140),
        height: getDynamicFontSize(200),
        borderColor: AppColors.chineseWhite,
        borderWidth: 1,
        borderRadius: 12,
        // marginBottom: 2,
        // marginRight: 5,
        // marginTop: 2,
        // marginLeft: 5,
        margin: getDynamicFontSize(5),
        // marginHorizontal: 10
        // flex: 1
    },
    viewContainer: {
        // flex: 1,
        height: '100%'
    },
    productImage: {
        // flex: 1,
        // height: (((SCREEN_WIDTH / 13) * 8) / 4) - 8,
        height: '65%',
        width: '100%',
        // width: (((SCREEN_WIDTH / 13) * 8) / 4) - 8,
        padding: 8,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    productTitle: {
        fontSize: getDynamicFontSize(20),
        marginHorizontal: 8,
        fontFamily: AppFonts.bold,
    },
    productPrice: {
        fontSize: getDynamicFontSize(14),
        fontStyle: 'italic',
        // fontWeight: '700',
        marginHorizontal: 8,
        marginBottom: 10,
        fontFamily: AppFonts.regular,
    },
    uiModeContainer: {
        flexDirection: 'row',
        // minWidth: 85,
        // backgroundColor: 'red',
        justifyContent: 'center',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        alignItems: 'center',
        margin: 20
        // paddingLeft: 10,
        // paddingTop: 10,
    },
});
export default ThemeScreen;
