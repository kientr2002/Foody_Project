import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    AdminProfileStackParamList,
    AdminTabParamList,
} from '../../../util/types'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import color from '../../../styles/color'
import MyProfile from './MyProfile'
import ChangePassword from '../../authentication/ChangePassword/changePassword'

const Stack = createNativeStackNavigator<AdminProfileStackParamList>()
type Props = BottomTabScreenProps<AdminTabParamList, 'Profile page'>

export default function Profile({ navigation }: Props) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: color.primary,
                headerTitleStyle: {
                    fontFamily: 'SF-Pro-Rounded_bold',
                    fontSize: 23,
                },
            }}
        >
            <Stack.Screen
                name='My profile'
                component={MyProfile}
                options={{
                    title: 'Profile',
                }}
            />

            <Stack.Screen
                name='Change password'
                component={ChangePassword}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}
