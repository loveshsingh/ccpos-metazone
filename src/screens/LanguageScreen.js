import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import AppText from "../components/lib/AppText";
import {AppColors} from "../assets/AppColors";
import AppIcon, {Icons} from "../components/lib/AppIcon";
import I18N from "../helper/translation";
import {AppFonts} from "../assets/AppFonts";
import {getDynamicFontSize} from "../helper/Utility";
import {
    I18NContext,
    supportingLanguages,
} from "../base/contexts/I18NProvider";
import {AppContext} from "../base/contexts/AppProvider";
import AppRoundButton from "../components/lib/AppRoundButton";
import {BaseComponent} from "../base/BaseComponent";
import type {AppContextValueType} from "../base/contexts/AppProvider";
import {ThemeContext} from "../base/contexts/ThemeProvider";
import AppFlatList from "../components/lib/AppFlatList";

/**
 * @author Lovesh Singh.
 * @since 25-01-2021.
 * @description Language Screen.
 */
class LanguageScreen extends BaseComponent {
    updateLocale;
    showToast;

    constructor(props) {
        super(props);
        this.state = {
            locale: undefined,
            firstTimeLocaleSelect: false,
            theme: undefined,
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
        if (nextState.locale !== this.state.locale)
            return true;
        else if (nextState.theme !== this.state.theme)
            return true;
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
        if (state.locale !== prevState.locale)
            this.setState({locale: state.locale});
        if (state.theme !== prevState.theme)
            this.setState({theme: state.theme});
    };

    onPressProceed = (): void => {
        if (this.state.locale) {
            this.updateLocale(this.state.locale);
            // this.props.navigation.replace(this.props.route.params?.next);
            if (this.props.route.params?.next === "goBack") {
                this.props.navigation.goBack();
                // this.props.navigation.replace(this.props.route.params?.next);
            } else {
                this.props.navigation.replace(this.props.route.params?.next);
            }
        } else this.showToast(I18N.t('SelectLanguageMsg'), {type: "info"});
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
     * @since 15-01-2022.
     * @description to render cart list Item.
     * @returns {JSX.Element}
     */
    renderLangItem = ({item, index}): JSX.Element => {
        return (
            <TouchableOpacity onPress={() => this.setState({locale: item?.value})} /*disabled={item?.value !== "en"}*/>
                <AppText
                    text={item.title}
                    style={[
                        styles.langText,
                        {
                            backgroundColor:
                                item?.value === this.state.locale
                                    ? this.state.theme?.primaryColor
                                    : this.state.theme?.card?.backgroundColor,//AppColors.azureishWhite,
                            color:
                                item?.value === this.state.locale
                                    ? AppColors.white
                                    : '#999',//AppColors.colorAccent,
                            borderColor:
                                item?.value === this.state.locale
                                    ? this.state.theme?.card?.backgroundColor
                                    : '#999',//AppColors.colorAccent,
                        },
                    ]}
                />
            </TouchableOpacity>
        );
    };

    /**
     * @author Lovesh Singh.
     * @since 25-01-2021.
     * @description to render UI.
     * @returns {JSX.Element}
     */
    renderAppComponent = (): JSX.Element => {
        return (
            <ThemeContext.Consumer>
                {({theme}) => {
                    this.setState({theme})
                    return (
                        <I18NContext.Consumer>
                            {({locale, updateLocale}) => {
                                this.setState({locale});
                                if (locale === undefined)
                                    this.setState({firstTimeLocaleSelect: true});
                                this.updateLocale = updateLocale;
                                return (
                                    <AppContext.Consumer>
                                        {({messageContext}: AppContextValueType) => {
                                            this.showToast = messageContext.showToast;
                                            return (
                                                <View
                                                    style={[styles.container, {backgroundColor: this.state.theme?.backgroundColor}]}>
                                                    <AppText
                                                        text={I18N.t("SelectLangLabel")}
                                                        style={[styles.mainHeading, , {
                                                            borderColor: this.state.theme?.primaryColor,
                                                            color: this.state.theme?.primaryColor,
                                                        }]}
                                                    />
                                                    <ScrollView
                                                        style={styles.langContainer}
                                                        showsVerticalScrollIndicator={false}
                                                    >
                                                        <View style={styles.cardContainer}>
                                                            <AppFlatList
                                                                numColumns={3}
                                                                initialNumToRender={1}
                                                                scrollEnabled={true}
                                                                nestedScrollEnabled={true}
                                                                data={supportingLanguages}
                                                                extraData={this.state.locale}
                                                                keyExtractor={this.keyExtractor}
                                                                renderItem={this.renderLangItem}
                                                            />
                                                            <View style={[styles.infoContainer, {backgroundColor: this.state.theme?.card?.backgroundColor}]}>
                                                                <AppIcon
                                                                    type={Icons.AntDesign}
                                                                    name={"infocirlceo"}
                                                                    color={this.state.theme?.primaryColor}
                                                                    size={20}
                                                                />
                                                                <AppText
                                                                    text={I18N.t("LanguageInfoMsg")}
                                                                    style={[styles.infoText, {color: this.state.theme?.primaryColor}]}
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
        borderColor: AppColors.colorAccent,
        padding: 10,
        color: AppColors.colorAccent,
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        margin: 20,
        flexDirection: "row",
        alignItems: "center",
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
});
export default LanguageScreen;
