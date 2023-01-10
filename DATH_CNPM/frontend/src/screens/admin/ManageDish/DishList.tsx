import * as React from 'react'
import { ActivityIndicator, ScrollView, Text, View } from 'react-native'

import { Food } from '../../../util/interface'
import Button from '../../../components/button/Button'
import Alert from '../../../components/alert/Alert'
import styles from './styles'
import FoodCardAdmin from '../../../components/FoodCardAdmin/FoodCardAdmin'
import color from '../../../styles/color'

export default function DishList({ route, navigation }: any) {
    const [foods, setFoods] = React.useState<Array<Food>>([])
    const [loading, setLoading] = React.useState<boolean>(true)
    const [success, setSuccess] = React.useState<boolean>(false)
    const [visible, setVisible] = React.useState<boolean>(false)

    // handle when route has value
    React.useEffect(() => {
        if (route.params) {
            if (route?.params.id && !route?.params.calo) {
                let arr = foods.filter((food:Food) => food.id !== route?.params?.id)
                setFoods(arr)
            }
            else if (route?.params.id && route?.params.calo) {
                let arr:Food[] = foods.map((food:Food) => {
                    if (food.id === route.params.id)
                        return {
                            ...food,
                            id: route.params.id,
                            des: route.params.des,
                            image: route.params.image,
                            avgStar: route.params.avgStar,
                            recipt: route.params.recipt,
                            calo: route.params.calo,
                            protein: route.params.protein,
                            fat: route.params.fat,
                            carb: route.params.carb
                        }
                    else 
                        return food
                })
                setFoods(arr)
            }
            else if (route?.params.name) {
                setFoods([...foods, {
                    id: route.params.id,
                    name: route.params.name,
                    des: route.params.des,
                    image: route.params.image,
                    avgStar: route.params.avgStar,
                    recipt: route.params.recipt,
                    calo: route.params.calo,
                    protein: route.params.protein,
                    fat: route.params.fat,
                    carb: route.params.carb
                }])
            }
        }

    }, [route])


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

    const handleOnPress = (page: string, obj: any) => {
        page === 'Food detail'
            ? navigation.navigate('Food detail', obj)
            : [
                  page === 'Edit Dish'
                      ? navigation.navigate('Edit Food', obj, 'edit')
                      : null,
              ]
    }

    const handleOnPressAdd = () => {
        navigation.navigate('Add Food', { undefined }, 'add')
    }

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(
                'https://foodyforapi.herokuapp.com/food',
                {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        foodId: id,
                    }),
                }
            )
            const data = await response.json()
            if (data.result === 'ok') {
                let arr = foods.filter((food:Food) => food.id !== id)
                setFoods(arr)
                setSuccess(true)
            }
            setVisible(true)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Alert
                type='change_password'
                title={success ? 'Success' : 'Fail'}
                message={success ? 'Food has been deleted' : 'Something wrong were happened'}
                visible={visible}
                setVisible={setVisible}
            />

            <View style={styles.container}>
                {/* Add dish */}
                <View style={styles.button}>
                    <Button
                        content='ADD DISH'
                        type='warning'
                        onPress={() => handleOnPressAdd()}
                    />
                </View>
                {/* All dish */}
                <View>
                    <Text style={styles.title}>All dish</Text>
                </View>

                {/* List */}
                {loading ? (
                    <View style={styles.loadingScreen}>
                        <ActivityIndicator size='large' color={color.primary} />
                    </View>
                ) : (
                    <ScrollView>
                        {foods.map((food: Food, i: number) => (
                            <FoodCardAdmin
                                key={i}
                                name={food.name}
                                imgSrc={food.image}
                                onPress={() =>
                                    handleOnPress('Food detail', food)
                                }
                                onPressEdit={() =>
                                    handleOnPress('Edit Dish', food)
                                }
                                onPressDelete={() =>
                                    handleDelete(food.id)
                                }
                            />
                        ))}
                    </ScrollView>
                )}
            </View>
        </>
    )
}
