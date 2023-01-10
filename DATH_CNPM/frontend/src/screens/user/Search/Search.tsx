import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SearchStackParamList, UserTabParamList } from '../../../util/types'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import HeaderButton from '../../../components/headerButton/HeaderButton'
import CreatePlan from '../CreatePlan/CreatePlan'
import FoodDetail from '../FoodDetail/FoodDetail'
import SearchList from './SearchList'

import color from '../../../styles/color'

const Stack = createNativeStackNavigator<SearchStackParamList>()
type Props = BottomTabScreenProps<UserTabParamList, 'Search page'>

export default function Search({ navigation }: Props) {
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
                name='Search List'
                component={SearchList}
                options={{
                    title: 'Search',
                    headerRight: () => (
                        <HeaderButton type={1} navigation={navigation} />
                    ),
                }}
            />
            <Stack.Screen
                name='Food Detail'
                component={FoodDetail}
                options={({ route }) => ({
                    title: route.params.name,
                    headerRight: () => <HeaderButton type={2} route={route} />,
                })}
            />
            <Stack.Screen name='Create Plan' component={CreatePlan} />
        </Stack.Navigator>
    )
}
