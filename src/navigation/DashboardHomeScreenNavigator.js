import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {options} from './AppNavigator'

import DashboardHomeScreen from '../screens/dashboard/HomeScreen'
import CustomersScreen from "../screens/dashboard/home/CustomersScreen";
import PaymentScreen from "../screens/dashboard/home/PaymentScreen";

const Stack = createStackNavigator()

/**
 * @author Vipin Joshi.
 * @since 22-12-2021.
 * @description hold Customer navigation.
 * @returns DashboardHomeScreen stack navigator.
 */
const DashboardHomeScreenNavigator = (): JSX.Element => {
    return (
        <Stack.Navigator initialRouteName="DashboardHomeScreen" screenOptions={options}>
            <Stack.Screen name="DashboardHomeScreen" component={DashboardHomeScreen}/>
            <Stack.Screen name="CustomersScreen" component={CustomersScreen}/>
            <Stack.Screen name="PaymentScreen" component={PaymentScreen}/>
        </Stack.Navigator>
    )
}

export default DashboardHomeScreenNavigator
