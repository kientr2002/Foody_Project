import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeStackParamList, UserTabParamList } from '../../../util/types'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import FoodList from './FoodList'
import FoodDetail from '../FoodDetail/FoodDetail'
import CreatePlan from '../CreatePlan/CreatePlan'
import HeaderButton from '../../../components/headerButton/HeaderButton'
import color from '../../../styles/color'

const Stack = createNativeStackNavigator<HomeStackParamList>()
type Props = BottomTabScreenProps<UserTabParamList, 'Home page'>

export default function Home({ navigation }: Props) {
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
                name='Food List'
                component={FoodList}
                options={{
                    title: 'Home',
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
