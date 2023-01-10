import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'
import Card from '../../../components/card/Card'
import Input from '../../../components/input/Input'
import { Food } from '../../../util/interface'

const useSearch = (key: string, setResult: any) => {
    const searchFood = async () => {
        try {
            const response = await fetch(
                'https://foodyforapi.herokuapp.com/search',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: key }),
                }
            )
            const data = await response.json()
            if (data.result === 'ok') {
                setResult(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        if (key === '') setResult([])
        else {
            searchFood()
        }
    }, [key])
}

export default function SearchList({ navigation }: any) {
    const [searchKeyWord, setSearchKeyWord] = React.useState<string>('')
    const [result, setResult] = React.useState<Food[]>([])
    useSearch(searchKeyWord, setResult)

    const handleOnPress = (obj: any) => {
        navigation.navigate('Food Detail', obj)
    }

    return (
        <View>
            <View style={styles.searchInput}>
                <Input
                    type='search'
                    focus
                    value={searchKeyWord}
                    setValue={setSearchKeyWord}
                />
            </View>

            {result.length !== 0 ? (
                <ScrollView contentContainerStyle={styles.resultList}>
                    {result.map((food: Food, i: number) => (
                        <Card
                            key={i}
                            cardStyle={3}
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
            ) : (
                <AnimatedLottieView
                    style={styles.notFound}
                    source={require('../../../../assets/animation/search.json')}
                    autoPlay
                    loop
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    searchInput: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    resultList: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFound: {
        width: 300,
        marginLeft: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})
