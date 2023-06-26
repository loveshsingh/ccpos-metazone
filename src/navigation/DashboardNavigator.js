import React, {useState, useEffect} from 'react'
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import AppIcon, {Icons} from '../components/lib/AppIcon'
import {useTheme} from '../base/contexts/ThemeProvider'
import I18N from '../helper/translation'

import CloseSessionScreen from '../screens/dashboard/CloseSessionScreen'
import HoldCartScreen from '../screens/dashboard/HoldCartScreen'
import OrdersScreen from '../screens/dashboard/OrdersScreen'
import ViewMoreScreen from '../screens/dashboard/ViewMoreScreen'
import DashboardHomeScreenNavigator from "./DashboardHomeScreenNavigator";
import {useLocale} from "../base/contexts/I18NProvider";


// const Tab = createMaterialBottomTabNavigator()
const Tab = createBottomTabNavigator()


/**
 * @author Vipin Joshi.
 * @since 08-12-2021.
 * @description hold Dashboard navigation.
 * @returns dashboard bottom tab navigator.
 */
const DashboardNavigator = (): JSX.Element => {

    /**
     * @author Vipin Joshi.
     * @since 08-12-2021.
     * @description hold Dashboard navigation screens.
     */
    const screens = [
        {
            name: 'DashboardHomeScreen',
            component: DashboardHomeScreenNavigator,
            options: {
                tabBarLabel: I18N.t('Dashboard'),
                tabBarIcon: ({color, size}) => (
                    <AppIcon name={'home'} type={Icons.Feather} size={size} color={color}/>),
                tabBarAccessibilityLabel: I18N.t('Dashboard') //for narrator only
            }
        },
        {
            name: 'OrdersScreen',
            component: OrdersScreen,
            options: {
                tabBarLabel: I18N.t('Orders'),
                tabBarIcon: ({color, size}) => (
                    <AppIcon name={'file-text-o'} type={Icons.FontAwesome} size={size} color={color}/>),
                tabBarAccessibilityLabel: I18N.t('Orders') //for narrator only
            }
        },
        {
            name: 'HoldCartScreen',
            component: HoldCartScreen,
            options: {
                tabBarLabel: I18N.t('HoldCart'),
                tabBarIcon: ({color, size}) => (
                    <AppIcon name={'cart-plus'} type={Icons.MaterialCommunityIcons} size={size} color={color}/>),
                tabBarAccessibilityLabel: I18N.t('HoldCart') //for narrator only
            }
        },
        {
            name: 'CloseSessionScreen',
            component: CloseSessionScreen,
            options: {
                tabBarLabel: I18N.t('CloseSession'),
                tabBarIcon: ({color, size}) => (
                    <AppIcon name={'close'} type={Icons.AntDesign} size={size} color={color}/>),
                tabBarAccessibilityLabel: I18N.t('CloseSession') //for narrator only
            }
        },
        {
            name: 'ViewMoreScreen',
            component: ViewMoreScreen,
            options: {
                tabBarLabel: I18N.t('ViewMore'),
                tabBarIcon: ({color, size}) => (
                    <AppIcon name={'grid-view'} type={Icons.MaterialIcons} size={size} color={color}/>),
                tabBarAccessibilityLabel: I18N.t('ViewMore'), //for narrator only
            }
        },
    ]


    const {theme} = useTheme()
    const [activeColor, setActiveColor] = useState(theme?.bottomTabNav?.activeColor)
    const [inactiveColor, setInactiveColor] = useState(theme?.bottomTabNav?.inactiveColor)
    const [backgroundColor, setBackgroundColor] = useState(theme?.bottomTabNav?.backgroundColor)

    useEffect(() => {
        const nav = theme?.bottomTabNav
        setActiveColor(nav?.activeColor)
        setInactiveColor(nav?.inactiveColor)
        setBackgroundColor(nav?.backgroundColor)
    }, [theme])
    const {locale} = useLocale()
    const [selectedLocale, setSelectedLocale] = useState(locale)

    useEffect(() => {
        setSelectedLocale(locale)
    }, [locale])

    return (
        <Tab.Navigator
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            sceneAnimationEnabled={true}
            shifting={true}
            labeled={true}
            initialRouteName='DashboardHomeScreen'
            barStyle={{backgroundColor: backgroundColor}}
            screenOptions={{headerShown: false, tabBarStyle: {backgroundColor}}}>

            {
                screens.map((_, index) => {
                    return (
                        <Tab.Screen key={index} name={_.name} component={_.component}
                                    options={_.options ? {
                                        tabBarActiveTintColor: activeColor,
                                        tabBarColor: _.options.tabBarColor,
                                        tabBarLabel: _.options.tabBarLabel, //<AppText style={{color: activeColor}} text={_.options.tabBarLabel} />,
                                        tabBarAccessibilityLabel: _.options.tabBarAccessibilityLabel,
                                        tabBarIcon: _.options.tabBarIcon
                                    } : undefined}
                        />
                    )
                })
            }
        </Tab.Navigator>
    )
}

export default DashboardNavigator
