import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { MyPlanStackParamList } from '../../../util/types'
import { Food } from '../../../util/interface'
import Card from '../../../components/card/Card'
import UserContext, { UserContextInterface } from '../../../context/UserContext'

type Props = NativeStackScreenProps<MyPlanStackParamList>

const useMyPlan = (name: string | null, setMyPlan: any) => {
    React.useEffect(() => {
        fetch('https://foodyforapi.herokuapp.com/getPlan', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: name,
            }),
        })
            .then((res) => res.json())
            .then((obj) => {
                if (obj.result === 'ok') setMyPlan(obj.message)
            })
    }, [name])
}

export default function MyPlanList({ route, navigation }: Props) {
    const { name, myPlan, setMyPlan } =
        React.useContext<UserContextInterface>(UserContext)
    useMyPlan(name, setMyPlan)

    const handleOnPress = (obj: any) => {
        navigation.navigate('Food Detail', obj)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {myPlan.map((food: Food, i: number) => (
                <View key={i} style={styles.mealContainer}>
                    <Text style={styles.text}>
                        {i === 0 ? 'Breakfast' : i === 1 ? 'Lunch' : 'Dinner'}
                    </Text>
                    <Card
                        cardStyle={2}
                        name={food.name}
                        des={food.des}
                        image={food.image}
                        rate={food.avgStar}
                        recipt={food.recipt}
                        calo={food.calo}
                        protein={food.protein}
                        fat={food.fat}
                        carb={food.carb}
                        onPress={() => handleOnPress(food)}
                    />
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingTop: 20,
    },

    mealContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginBottom: 10,
        paddingLeft: 20,

        fontFamily: 'SF-Pro-Rounded_medium',
        fontSize: 22,
        alignSelf: 'flex-start',
    },
})
