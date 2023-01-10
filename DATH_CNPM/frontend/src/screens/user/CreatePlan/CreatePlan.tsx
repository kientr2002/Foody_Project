import * as React from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'
import UserContext, { UserContextInterface } from '../../../context/UserContext'
import Alert from '../../../components/alert/Alert'
import Button from '../../../components/button/Button'
import Card from '../../../components/card/Card'
import { Food } from '../../../util/interface'

const useCalculateNutrition = (planList: Food[]) => {
    const [totalCalories, setTotalCalories] = React.useState<number>(0)
    const [totalProtein, setTotalProtein] = React.useState<number>(0)
    const [totalFat, setTotalFat] = React.useState<number>(0)
    const [totalCarb, setTotalCarb] = React.useState<number>(0)

    React.useEffect(() => {
        let c = 0,
            p = 0,
            f = 0,
            cb = 0
        planList.forEach((food: Food) => {
            c += food.calo ? food.calo : 0
            p += food.protein ? food.protein : 0
            f += food.fat ? food.fat : 0
            cb += food.carb ? food.carb : 0
        })
        setTotalCalories(c)
        setTotalProtein(p)
        setTotalFat(f)
        setTotalCarb(cb)
    }, [planList])

    return { totalCalories, totalCarb, totalProtein, totalFat }
}

export default function CreatePlan({ navigation }: any) {
    const { name, createPlanList, setCreatePlanList, setMyPlan } =
        React.useContext<UserContextInterface>(UserContext)
    const [visible, setVisible] = React.useState<boolean>(false)
    const [success, setSuccess] = React.useState<boolean>(false)
    const [alertMessage, setAlertMessage] = React.useState<string>('')
    const { totalCalories, totalCarb, totalProtein, totalFat } =
        useCalculateNutrition(createPlanList)

    const handleCreatePlan = async () => {
        try {
            const response = await fetch(
                'https://foodyforapi.herokuapp.com/plan',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: name,
                        breakfast: createPlanList[0].id,
                        lunch: createPlanList[1].id,
                        dinner: createPlanList[2].id,
                    }),
                }
            )
            const data = await response.json()
            if (data?.result === 'ok') {
                setSuccess(true)
                setCreatePlanList([])
                setMyPlan(createPlanList)
            } else setSuccess(false)
            setAlertMessage(data?.message)
            setVisible(true)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Alert
                type='create_plan'
                title={success ? 'Success' : 'Fail'}
                message={alertMessage}
                visible={visible}
                setVisible={setVisible}
            />
            {createPlanList.length !== 0 ? (
                <ScrollView>
                    <View style={styles.foodContainer}>
                        {createPlanList.map((food: Food, i: number) => (
                            <Card
                                key={i}
                                cardStyle={4}
                                name={food.name}
                                des={food.des}
                                image={food.image}
                                rate={food.avgStar}
                                recipt={food.recipt}
                                calo={food.calo}
                                protein={food.protein}
                                fat={food.fat}
                                carb={food.carb}
                            />
                        ))}
                    </View>
                    <View style={styles.summary}>
                        <View style={styles.textContainer}>
                            <Text
                                style={[styles.text_semibold, styles.textSize]}
                            >
                                Number of food:
                            </Text>
                            <Text
                                style={[styles.text_regular, styles.textSize]}
                            >
                                {createPlanList.length}
                            </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text
                                style={[styles.text_semibold, styles.textSize]}
                            >
                                Total Calories
                            </Text>
                            <Text
                                style={[styles.text_regular, styles.textSize]}
                            >
                                {totalCalories}
                            </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text
                                style={[styles.text_semibold, styles.textSize]}
                            >
                                Total Protein
                            </Text>
                            <Text
                                style={[styles.text_regular, styles.textSize]}
                            >
                                {totalProtein}
                            </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text
                                style={[styles.text_semibold, styles.textSize]}
                            >
                                Total Carb
                            </Text>
                            <Text
                                style={[styles.text_regular, styles.textSize]}
                            >
                                {totalCarb}
                            </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text
                                style={[styles.text_semibold, styles.textSize]}
                            >
                                Total Fat
                            </Text>
                            <Text
                                style={[styles.text_regular, styles.textSize]}
                            >
                                {totalFat}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View>
                            <Button
                                content='CANCEL'
                                type='error'
                                onPress={() => {
                                    setVisible(false)
                                    navigation.goBack()
                                }}
                            />
                        </View>
                        <View
                            style={{
                                marginLeft: 10,
                                display:
                                    createPlanList.length === 3
                                        ? 'flex'
                                        : 'none',
                            }}
                        >
                            <Button
                                content='CREATE'
                                type='confirm'
                                onPress={handleCreatePlan}
                            />
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <AnimatedLottieView
                    style={styles.empty}
                    source={require('../../../../assets/animation/empty.json')}
                    autoPlay
                    loop
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    foodContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summary: {
        paddingHorizontal: 20,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textContainer: {
        flexDirection: 'row',
    },
    text_semibold: {
        fontFamily: 'SF-Pro-Rounded_semibold',
    },
    text_regular: {
        marginLeft: 10,
        fontFamily: 'SF-Pro-Rounded_regular',
    },
    textSize: {
        fontSize: 18,
    },
    buttonContainer: {
        marginVertical: 10,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
