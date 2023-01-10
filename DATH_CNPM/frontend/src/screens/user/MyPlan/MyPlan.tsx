import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MyPlanStackParamList, UserTabParamList } from '../../../util/types'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import MyPlanList from './MyPlanList'
import FoodDetail from '../FoodDetail/FoodDetail'
import CreatePlan from '../CreatePlan/CreatePlan'
import HeaderButton from '../../../components/headerButton/HeaderButton'
import color from '../../../styles/color'

const Stack = createNativeStackNavigator<MyPlanStackParamList>()
type Props = BottomTabScreenProps<UserTabParamList, 'MyPlan page'>

export default function MyPlan({ navigation }: Props) {
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
                name='MyPlan List'
                component={MyPlanList}
                options={{
                    title: 'My Plan',
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
                })}
            />
            <Stack.Screen name='Create Plan' component={CreatePlan} />
        </Stack.Navigator>
    )
}
