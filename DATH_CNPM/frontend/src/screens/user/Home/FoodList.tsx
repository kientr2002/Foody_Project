import * as React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    ActivityIndicator,
} from 'react-native'
import { HomeStackParamList } from '../../../util/types'
import { Food } from '../../../util/interface'
import Card from '../../../components/card/Card'
import color from '../../../styles/color'

type Props = NativeStackScreenProps<HomeStackParamList>

export default function FoodList({ route, navigation }: Props) {
    const [foods, setFoods] = React.useState<Food[]>([])
    const [breakfast, setBreakfast] = React.useState<Food[]>([])
    const [lunch, setLunch] = React.useState<Food[]>([])
    const [dinner, setDinner] = React.useState<Food[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const getFoods = async () => {
        try {
            const response = await fetch(
                'https://foodyforapi.herokuapp.com/getListFood'
            )
            const data = await response.json()
            if (data.result === 'ok') {
                setFoods(data.message)
                setLoading(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        getFoods()
    }, [])

    React.useEffect(() => {
        setBreakfast(foods.slice(0, 15))
        setLunch(foods.slice(15, 30))
        setDinner(foods.slice(30))
    }, [foods])

    const handleOnPress = (obj: any) => {
        navigation.navigate('Food Detail', obj)
    }

    return (
        <>
            {loading ? (
                <View style={styles.loadingScreen}>
                    <ActivityIndicator size='large' color={color.primary} />
                </View>
            ) : (
                <ScrollView style={styles.container}>
                    <View>
                        <Text style={styles.mealTitle}>Breakfast</Text>
                        <ScrollView
                            contentContainerStyle={styles.mealContainer}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        >
                            {breakfast.map((food: any, i: number) => {
                                return (
                                    <Card
                                        key={i}
                                        cardStyle={1}
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
                                )
                            })}
                        </ScrollView>
                    </View>
                    <View>
                        <Text style={styles.mealTitle}>Lunch</Text>
                        <ScrollView
                            contentContainerStyle={styles.mealContainer}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        >
                            {lunch.map((food: Food, i: number) => (
                                <Card
                                    key={i}
                                    cardStyle={1}
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
                            ))}
                        </ScrollView>
                    </View>
                    <View>
                        <Text style={styles.mealTitle}>Dinner</Text>
                        <ScrollView
                            contentContainerStyle={styles.mealContainer}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                        >
                            {dinner.map((food: Food, i: number) => (
                                <Card
                                    key={i}
                                    cardStyle={1}
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
                            ))}
                        </ScrollView>
                    </View>
                    <View style={{ marginVertical: 10 }}></View>
                </ScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'transparent',
    },
    mealContainer: {
        backgroundColor: 'transparent',
        paddingLeft: 20,
        marginBottom: 20,
    },
    mealTitle: {
        fontFamily: 'SF-Pro-Rounded_semibold',
        fontSize: 23,
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 10,
    },
})
