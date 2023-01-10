import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, StyleSheet } from 'react-native'
import { FavoriteStackParamList } from '../../../util/types'
import { Food } from '../../../util/interface'
import Card from '../../../components/card/Card'
import UserContext, { UserContextInterface } from '../../../context/UserContext'

type Props = NativeStackScreenProps<FavoriteStackParamList>

export default function FavoriteList({ route, navigation }: Props) {
    const { myFavorite } = React.useContext<UserContextInterface>(UserContext)

    const handleOnPress = (obj: any) => {
        navigation.navigate('Food Detail', obj)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {myFavorite?.map((food: Food, i: number) => (
                <Card
                    key={i}
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
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingTop: 20,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
