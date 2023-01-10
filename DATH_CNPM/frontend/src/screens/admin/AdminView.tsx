import * as React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AdminTabParamList } from '../../util/types'
import { AdminProvider } from '../../context/AdminContext'
import Navbar from '../../components/navbar/Navbar'
import ManageAccount from './ManageAccount/ManageAccount'
import ManageDish from './ManageDish/ManageDish'
import Profile from './Profile/Profile'

import color from '../../styles/color'

const Tab = createBottomTabNavigator<AdminTabParamList>()
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: color.background,
    },
}

export default function AdminView() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
                tabBar={(props) => <Navbar {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen name='Manage Account' component={ManageAccount} />
                <Tab.Screen name='Manage Dish' component={ManageDish} />
                <Tab.Screen name='Profile page' component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
