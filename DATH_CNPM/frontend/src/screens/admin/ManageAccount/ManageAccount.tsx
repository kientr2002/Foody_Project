import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    ManageAccountStackParamList,
    AdminTabParamList,
} from '../../../util/types'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import AccountList from './AccountList'
import AccountDetail from '../AccountDetail/AccountDetail'

import color from '../../../styles/color'

const Stack = createNativeStackNavigator<ManageAccountStackParamList>()
type Props = BottomTabScreenProps<AdminTabParamList, 'Manage Account'>

export default function ManageAccount({ navigation }: Props) {
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
                name='Account list'
                component={AccountList}
                options={{
                    title: 'Manage Account',
                }}
            />
            <Stack.Screen name='Account detail' component={AccountDetail} />
        </Stack.Navigator>
    )
}
