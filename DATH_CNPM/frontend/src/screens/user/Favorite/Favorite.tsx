import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FavoriteStackParamList, UserTabParamList } from '../../../util/types'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import FavoriteList from './FavoriteList'
import FoodDetail from '../FoodDetail/FoodDetail'
import HeaderButton from '../../../components/headerButton/HeaderButton'
import color from '../../../styles/color'
import CreatePlan from '../CreatePlan/CreatePlan'

const Stack = createNativeStackNavigator<FavoriteStackParamList>()
type Props = BottomTabScreenProps<UserTabParamList, 'Favorite page'>

export default function Favorite({ navigation }: Props) {
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
                name='Favorite List'
                component={FavoriteList}
                options={{
                    title: 'Favorite',
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
                    headerRight: () => <HeaderButton type={4} route={route} />,
                })}
            />
            <Stack.Screen name='Create Plan' component={CreatePlan} />
        </Stack.Navigator>
    )
}
