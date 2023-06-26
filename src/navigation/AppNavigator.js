import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SplashErrorScreen from '../screens/SplashErrorScreen'
import SplashScreen from '../screens/SplashScreen'
import DashboardNavigator from './DashboardNavigator'
import LanguageScreen from "../screens/LanguageScreen";
import ThemeScreen from "../screens/ThemeScreen";


// const Stack = createNativeStackNavigator()
const Stack = createStackNavigator()

/**
 * @author Vipin Joshi.
 * @since 08-12-2021.
 * @description hold App navigator options.
 * @returns stack navigator config.
 */
export const options = {
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerShown: false,
}

/**
 * @author Vipin Joshi.
 * @since 08-12-2021.
 * @description hold App root navigation.
 * @returns app stack navigator.
 */
const AppNavigator = (): JSX.Element => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={options}>
                <Stack.Screen name="LanguageScreen" component={LanguageScreen}/>
                <Stack.Screen name="ThemeScreen" component={ThemeScreen}/>
                <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                <Stack.Screen name="SplashErrorScreen" component={SplashErrorScreen}/>
                <Stack.Screen name="DashboardScreen" component={DashboardNavigator}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
