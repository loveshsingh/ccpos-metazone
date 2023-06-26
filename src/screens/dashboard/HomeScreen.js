import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text, Animated,
} from "react-native";
import {connect} from "react-redux";
import {
    loadOnlineData, loadOfflineData,
    filterProducts, clearProductCart,
    addToHoldCart, setLimit50
} from "../../actions/dashboard/home";
import {Appbar, Badge, Searchbar} from "react-native-paper";
import {AppColors} from "../../assets/AppColors";
import {
    getDynamicFontSize,
    isCurrentDateSession,
    isNetworkAvailable,
} from "../../helper/Utility";
import I18N from "../../helper/translation";
import AppBar from "../../components/lib/AppBar";
import AppText from "../../components/lib/AppText";
import {Constant} from "../../helper/constant";
import {debounce} from "../../base/hook/app_hook";
import MainSection from "../../components/screen/dashboard/home/MainSection";
import SideFeatureSection from "../../components/screen/dashboard/home/SideFeatureSection";
import ProductDiscountDialog from "../../components/screen/dashboard/home/ProductDiscountDialog";
import {AppFonts} from "../../assets/AppFonts";
import type {AppContextValueType} from "../../base/contexts/AppProvider";
import {AppContext} from "../../base/contexts/AppProvider";
import {BaseComponent} from "../../base/BaseComponent";
import ErrorHandler from "../../base/contexts/ErrorProvider";
import {I18NContext} from "../../base/contexts/I18NProvider";
import PurposeDialog from "../../components/screen/dashboard/home/PurposeDialog";
import AppSearchBar from "../../components/lib/AppSearchBar";

/**
 * @author Vipin Joshi.
 * @since 26-11-2021.
 * @description Dashboard Home Screen.
 */
class HomeScreen extends BaseComponent {

    TAG = 'DashboardHomeScreen:'

    showToast;

    constructor(props) {
        super(props);
        this.state = {
            showProgressDialog: false,
            isOnline: false, // might be no need
            searchQuery: '',
            isLoading: false, // might be no need
            hasDisplayData: true, // might be no need
            isActiveDaySession: isCurrentDateSession(this.props.authReducer.sessionDetails),
            showCartSection: true,
            cartAnimation: new Animated.Value(0),
            locale: undefined,
            purpose: ''
        };
        this.networkEventUnsubscribe = undefined // might be no need
    }


    /**
     * @author Vipin Joshi.
     * @since 09-12-2021.
     * @description to perform initial loading data.
     */
    componentDidMount = (): void => {
        // this.networkEventUnsubscribe = NetInfo.addEventListener(state => {
        //     this.setState({isOnline: state.isConnected})
        // });
        isNetworkAvailable().then(isOnline => {
            const initOn_OfflineData = async ():void => {
                if (isOnline) {
                    this.props.loadOnlineData(this.props.authReducer?.sessionDetails)
                } else {
                    this.props.loadOfflineData()
                }
            }
            initOn_OfflineData()
        })
    }

    /**
     * @author Vipin Joshi.
     * @since 13-12-2021.
     * @description to perform clean out tasks.
     */
    componentWillUnmount = (): void => {
        if (this.networkEventUnsubscribe)
            this.networkEventUnsubscribe();
    }

    /**
     * @author Vipin Joshi.
     * @since 17-12-2021.
     * @description to check component will re-render or not.
     */
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        if (nextProps.dashboardHomeReducer.loading !== this.props.dashboardHomeReducer.loading)
            return true
        else if (nextState.showProgressDialog !== this.state.showProgressDialog)
            return true
        else if (nextState.searchQuery !== this.state.searchQuery)
            return true
        else if (nextState.isOnline !== this.state.isOnline)
            return true
        else if (nextState.showCartSection !== this.state.showCartSection)
            return true
        else if (nextState.locale !== this.state.locale)
            return true
        else if (nextState.purpose !== this.state.purpose)
            return true
        else if (nextProps.dashboardHomeReducer?.cartProducts?.length !== this.props.dashboardHomeReducer?.cartProducts?.length)
            return true
        else if (
            nextProps.dashboardHomeReducer.limit50Products !==
            this.props.dashboardHomeReducer.limit50Products
        )
            return true;
        else if (
            nextProps.dashboardHomeReducer.purpose !==
            this.props.dashboardHomeReducer.purpose
        )
            return true;
        return false
    }

    /**
     * @author Vipin Joshi.
     * @since 09-12-2021.
     * @description to perform action on state or props change.
     */
    componentDidUpdate = (prevProps: Readonly<any>, prevState: Readonly<any>): void => {
        const props = this.props
        const state = this.state
        if (props.dashboardHomeReducer.loading !== prevProps.dashboardHomeReducer.loading)
            this.setState({showProgressDialog: props.dashboardHomeReducer.loading})
        if (state.isOnline !== prevState.isOnline)
            this.setState({isOnline: state.isOnline})
        if (state.showCartSection !== prevState.showCartSection)
            this.setState({showCartSection: state.showCartSection})
        if (state.locale !== prevState.locale)
            this.setState({locale: state.locale})
        if (state.purpose !== prevState.purpose) {
            this.setState({purpose: state.purpose})
            const initFilterProducts = async ():void => {
                this.props.filterProducts({
                    search: this.props.dashboardHomeReducer.search,
                    category: this.props.dashboardHomeReducer.selectedCategory,
                    purpose: state.purpose
                })
            }
            initFilterProducts()
        }
        if (
            props.dashboardHomeReducer.limit50Products !==
            prevProps.dashboardHomeReducer.limit50Products
        ) {
            if (props.dashboardHomeReducer.limit50Products) {
                this.showToast(I18N.t('Cart50ProductsLimitMsg'), {type: 'info'})
                this.props.setLimit50(false)
            }
        }
        if (
            props.dashboardHomeReducer.purpose !==
            prevProps.dashboardHomeReducer.purpose
        ) {
            this.setState({purpose: this.props.dashboardHomeReducer.purpose})
        }
    }

    /**
     * @author Vipin Joshi.
     * @since 15-12-2021.
     * @description on search bar text change event handler.
     * @param text searched text.
     */
    onSearchQueryChange = (text): void => {
        this.setState({searchQuery: text}, debounce(this.props.filterProducts.bind(this, {
            search: text,
            category: this.props.dashboardHomeReducer.selectedCategory,
            purpose: this.props.dashboardHomeReducer.purpose
        })))
    }

    /**
     * @author Lovesh Singh.
     * @since 14-01-2022.
     * @description on hold cart event handler.
     */
    onHoldCartPress = (): void => {
        // if (this.state.isActiveDaySession) {
        let selectedCustomer = undefined
        let selectedPurpose = undefined
        if (this.props.customerReducer?.selectedCustomer)
            selectedCustomer = this.props.customerReducer?.selectedCustomer
        if (this.props.dashboardHomeReducer?.purpose)
            selectedPurpose = this.props.dashboardHomeReducer?.purpose
        const {cartProducts, isComplimentarySelected} = this.props.dashboardHomeReducer
        this.props.addToHoldCart(cartProducts, selectedCustomer, selectedPurpose, isComplimentarySelected)
        // } else {
        //     console.log(this.TAG, 'onHoldCartPress: ', 'active session expired')
        // }
    }

    /**
     * @author Lovesh Singh.
     * @since 15-02-2022.
     * @description apply animation on cart section.
     */
    toggleCartSection = () => {
        const {showCartSection} = this.state
        this.setState((prevState) => ({
            showCartSection: !prevState.showCartSection,
        }))
        Animated.timing(this.state.cartAnimation, {
            toValue: showCartSection ? 1 : 0,
            duration: Constant.ANIMATION_DURATION,
            useNativeDriver: false
        }).start()
    }

    renderAppComponent(): JSX.Element {
        return (
            <I18NContext.Consumer>
                {({locale}) => {
                    this.setState({locale});
                    return (
                        <AppContext.Consumer>
                            {({networkContext, messageContext}: AppContextValueType) => {
                                this.showToast = messageContext.showToast
                                return (
                                    <SafeAreaView style={styles.container}>
                                        <Animated.View
                                            style={[styles.mainSectionContainer, {
                                                width: this.state.cartAnimation.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ["62%", "100%"],
                                                })
                                            }]}>
                                            <AppBar
                                                statusBarHeight={8}
                                                headerStyle={styles.mainSectionHeader}
                                                title={<AppText style={styles.mainSectionHeaderText}
                                                                text={I18N.t('PointOfSale')}/>}
                                                subtitle={networkContext?.isOnline ?
                                                    <AppText
                                                        style={[styles.networkStatus, {
                                                            color: AppColors.americanGreen,
                                                            fontSize: getDynamicFontSize(15)
                                                        }]} text={I18N.t('OnlineStatus')}/> :
                                                    <AppText
                                                        style={[styles.networkStatus, {
                                                            color: AppColors.slateGray,
                                                            fontSize: getDynamicFontSize(15)
                                                        }]} text={I18N.t('OfflineStatus')}/>}
                                                afterContent={<>
                                                    <AppSearchBar
                                                        placeholder={I18N.t('SearchProductsPlaceholder')}
                                                        onChangeText={this.onSearchQueryChange}
                                                        style={[styles.productSearch, {
                                                            marginRight: this.state.showCartSection ? 10 : getDynamicFontSize(160)
                                                        }]}
                                                        inputStyle={styles.searchInput}
                                                        value={this.state.searchQuery}
                                                    />
                                                    <View
                                                        style={{display: !this.state.showCartSection ? 'flex' : 'none'}}>
                                                        <Badge
                                                            visible={this.props.dashboardHomeReducer?.cartProducts.length && this.props.dashboardHomeReducer?.cartProducts.length >= 0}
                                                            size={getDynamicFontSize(18)}
                                                            style={styles.cartBadge}
                                                        >
                                                            {this.props.dashboardHomeReducer?.cartProducts.length}
                                                        </Badge>
                                                        <Appbar.Action icon="cart"
                                                                       color={AppColors.colorBackgroundWhite}
                                                                       size={getDynamicFontSize(25)}
                                                                       onPress={this.toggleCartSection}/>
                                                    </View>
                                                </>}
                                            />
                                            {
                                                !this.state.isLoading ? (
                                                    this.state.hasDisplayData ? <ErrorHandler>
                                                        <MainSection
                                                            showCartSection={this.state.showCartSection}/>
                                                    </ErrorHandler> : (
                                                        <View style={styles.nothingToDisplayTextContainer}>
                                                            <AppText style={styles.nothingToDisplayText}
                                                                     text={I18N.t('NothingToDisplayMsg')}/>
                                                        </View>)
                                                ) : <View/>
                                            }
                                        </Animated.View>
                                        <Animated.View
                                            style={{
                                                width: this.state.cartAnimation.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ["38%", "0%"],
                                                }),
                                                // display: this.state.showCartSection ? 'flex' : 'none'
                                            }}>
                                            {
                                                !this.state.isLoading ?
                                                    <ErrorHandler>
                                                        <SideFeatureSection
                                                            onPressCart={this.toggleCartSection}
                                                            navigation={this.props.navigation}
                                                            onPressHoldCart={this.onHoldCartPress}
                                                            showCartSection={this.state.showCartSection}/>
                                                    </ErrorHandler>
                                                    : null
                                            }
                                        </Animated.View>
                                        <ErrorHandler>
                                            <PurposeDialog/>
                                        </ErrorHandler>
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
    container: {
        flex: 1,
        flexDirection: "row",
    },
    mainSectionContainer: {
        borderRightColor: '#e6e6e6',
        borderRightWidth: 1,
    },
    mainSectionHeader: {
        backgroundColor: AppColors.colorPrimary,
        alignItems: 'flex-start',
        height: getDynamicFontSize(55),
        justifyContent: "center",
    },
    mainSectionHeaderText: {
        color: AppColors.colorBackgroundWhite,
        fontSize: getDynamicFontSize(22)
    },
    mainSectionHeaderContent: {
        paddingVertical: 4
    },
    cartBackdrop: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.charlestonGreen,
        opacity: 0.32,
        top: 0,
    },
    cartSection: {
        flex: 1,
        width: '38%',
        backgroundColor: AppColors.colorBackgroundWhite,
    },
    productSearch: {
        width: '50%',
        // width: (((width / 13) * 8) / 2),
        // width: (((width / 8) * 8) / 2),
        borderRadius: 50,
        height: '80%',
        fontFamily: AppFonts.regular,
    },
    searchInput: {
        fontSize: getDynamicFontSize(15)
    },
    networkStatus: {
        fontWeight: 'bold'
    },
    nothingToDisplayTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: AppFonts.bold
    },
    nothingToDisplayText: {
        fontSize: getDynamicFontSize(Constant.TEXT_SIZE_BIG),
        color: AppColors.arsenic,
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: AppFonts.bold
    },
    cartBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: AppColors.greenSheen,
        color: AppColors.white,
        zIndex: 2
    }
})

const mapStateToProps = ({authReducer, dashboardHomeReducer, customerReducer}) => {
    return {authReducer, dashboardHomeReducer, customerReducer}
}

const mapDispatchToProps = {
    filterProducts,
    loadOnlineData,
    loadOfflineData,
    clearProductCart,
    addToHoldCart,
    setLimit50
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

