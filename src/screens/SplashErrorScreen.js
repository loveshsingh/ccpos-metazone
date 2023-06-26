import React from "react";
import {StyleSheet, View} from "react-native";
import AppImage from "../components/lib/AppImage";
import AppText from "../components/lib/AppText";
import {AppFonts} from "../assets/AppFonts";
import {AppColors} from "../assets/AppColors";
import AppIcon, {Icons} from "../components/lib/AppIcon";
import I18N from "../helper/translation";
import {getDynamicFontSize, height, width} from "../helper/Utility";
import AppRoundButton from "../components/lib/AppRoundButton";
import {I18NContext} from "../base/contexts/I18NProvider";
import {ThemeContext} from "../base/contexts/ThemeProvider";

/**
 * @author Vipin Joshi.
 * @since 26-11-2021.
 * @description Splash Error Screen.
 */
class SplashErrorScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            locale: undefined,
            theme: undefined,
        }
    }

    componentDidMount() {
        this.setState({error: this.props.route.params?.error})
    }

    /**
     * @author Lovesh Singh.
     * @since 02-05-2022.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>): void => {
        const state = this.state

        if (state.locale !== prevState.locale)
            this.setState({locale: state.locale})
        if (state.theme !== prevState.theme)
            this.setState({theme: state.theme})
    }

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description to check component will re-render or not.
     */
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        if (nextState.locale !== this.state.locale)
            return true
        else if (nextState.error !== this.state.error)
            return true
        else if (nextState.theme !== this.state.theme)
            return true
        return false
    }

    render(): JSX.Element {
        return (
            <ThemeContext.Consumer>
                {({theme}) => {
                    this.setState({theme})
                    return (
                        <I18NContext.Consumer>
                            {({locale}) => {
                                this.setState({locale});
                                return (
                                    <View style={[styles.container, {backgroundColor: theme?.backgroundColor}]}>
                                        <AppText text={` ${this.state.error?.status} ${this.state.error?.message} `}
                                                 style={styles.errorText}/>
                                        <AppImage source={require("../assets/images/errorImg.png")}
                                                  resizeMode={'contain'}
                                                  style={styles.errorImage}/>
                                        <AppRoundButton
                                            title={I18N.t('ReloadAction')}
                                            uppercase={false}
                                            icon={({size, color}) => (
                                                <AppIcon type={Icons.Ionicons} name={'reload'} color={color}
                                                         size={size}/>
                                            )}
                                            onPress={() => {
                                                this.props.navigation.replace('SplashScreen')
                                            }}
                                            style={styles.actionButton}
                                            color={theme?.primaryColor}
                                            borderColor={theme?.primaryColor}
                                        />
                                    </View>
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
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    errorText: {
        fontFamily: AppFonts.bold,
        fontSize: getDynamicFontSize(40),
        textAlign: 'center',
        // color: AppColors.arsenic
    },
    errorImage: {
        width: width / 1.6,
        height: height / 1.6,
    },
    actionButton: {
        marginVertical: 20,
        alignSelf: "center",
        backgroundColor: 'transparent',
    }
});

export default SplashErrorScreen

