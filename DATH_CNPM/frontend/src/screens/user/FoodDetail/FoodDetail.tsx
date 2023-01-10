import * as React from 'react'
import * as Progress from 'react-native-progress'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { View, Text, Image, ScrollView, Linking } from 'react-native'
import { ReviewInput, ReviewCard } from '../../../components/review/Review'
import { Comment } from '../../../util/interface'

import styles from './styles'
import color from '../../../styles/color'
import Button from '../../../components/button/Button'
import UserContext, { UserContextInterface } from '../../../context/UserContext'

const Tab = createMaterialTopTabNavigator()

function Review({ foodId }: any) {
    const { name } = React.useContext<UserContextInterface>(UserContext)
    const [reviews, setReview] = React.useState<Comment[]>([])
    const [rate, setRate] = React.useState<number>(0)
    const [comment, setComment] = React.useState<string>('')

    React.useEffect(() => {
        fetch('https://foodyforapi.herokuapp.com/getFoodReviews', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foodId,
            }),
        })
            .then((res) => res.json())
            .then((obj) => {
                if (obj?.result === 'ok') setReview(obj?.message)
            })
            .catch((error) => console.log(error))
    }, [foodId])

    const handleSubmitComment = (rate: number, comment: string) => {
        fetch('https://foodyforapi.herokuapp.com/foodReviews', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foodId,
                username: name,
                comment,
                star: rate,
            }),
        })
            .then((res) => res.json())
            .then((obj) => {
                if (obj?.result === 'ok')
                    setReview([
                        ...reviews,
                        { username: name, comment, star: rate },
                    ])
            })
            .catch((error) => console.log(error))
    }

    return (
        <ScrollView>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginTop: 5,
                }}
            >
                <ReviewInput
                    rate={rate}
                    setRate={setRate}
                    comment={comment}
                    setComment={setComment}
                    handleSubmit={handleSubmitComment}
                />
            </View>
            <View style={styles.reviewCardContainer}>
                {reviews.length !== 0 &&
                    reviews.map((review: Comment, i: any) => (
                        <ReviewCard
                            key={i}
                            username={review.username}
                            comment={review.comment}
                            star={review.star}
                        />
                    ))}
                {reviews.length === 0 && <Text>No comments</Text>}
            </View>
        </ScrollView>
    )
}

function About({ des, recipt, calo, protein, fat, carb }: any) {
    const [total, setTotal] = React.useState<number>(0)

    React.useEffect(() => {
        setTotal(protein + fat + carb)
    }, [protein, carb, fat])

    const handlePress = React.useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(recipt)
        if (supported) await Linking.openURL(recipt)
    }, [recipt])

    return (
        <ScrollView style={styles.tabBody}>
            {/* Nutrient section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Nutrient</Text>
                <View style={styles.sectionContainer}>
                    <View style={styles.nutrientElement}>
                        <Text
                            style={[
                                styles.sectionText,
                                styles.nutrientElementTitle,
                            ]}
                        >
                            Calories
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={calo ? calo * 0.7 : 0}
                            width={250}
                            height={13}
                            color={'#E3A74D'}
                            borderWidth={0}
                        />
                    </View>
                    <View style={styles.nutrientElement}>
                        <Text
                            style={[
                                styles.sectionText,
                                styles.nutrientElementTitle,
                            ]}
                        >
                            Protein
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={protein ? protein / total : 0}
                            width={250}
                            height={13}
                            color={'#DC4040'}
                            borderWidth={0}
                        />
                    </View>
                    <View style={styles.nutrientElement}>
                        <Text
                            style={[
                                styles.sectionText,
                                styles.nutrientElementTitle,
                            ]}
                        >
                            Carb
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={carb ? carb / total : 0}
                            width={250}
                            height={13}
                            color={'#3DC73A'}
                            borderWidth={0}
                        />
                    </View>
                    <View style={styles.nutrientElement}>
                        <Text
                            style={[
                                styles.sectionText,
                                styles.nutrientElementTitle,
                            ]}
                        >
                            Fat
                        </Text>
                        <Progress.Bar
                            style={styles.progressBar}
                            progress={fat ? fat / total : 0}
                            width={250}
                            height={13}
                            color={'#DD34AE'}
                            borderWidth={0}
                        />
                    </View>
                </View>
            </View>

            {/* Description section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionText}>{des}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recipe</Text>
                <View style={styles.sectionContainer}>
                    <Button
                        content='Go to recipe'
                        type='confirm'
                        onPress={handlePress}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default function FoodDetail({ route }: any) {
    const { id, des, image, recipt, calo, protein, fat, carb }: any =
        route?.params

    return (
        <>
            <View style={styles.videoContainer}>
                <Image source={{ uri: image }} style={styles.video} />
            </View>

            <Tab.Navigator
                style={styles.bodyContainer}
                screenOptions={{
                    tabBarInactiveTintColor: color.textBackground,
                    tabBarActiveTintColor: color.text,
                    tabBarLabelStyle: styles.headerText,
                    tabBarStyle: {
                        elevation: 0,
                        backgroundColor: color.background,
                    },
                    tabBarPressColor: '000000',
                    tabBarItemStyle: {
                        paddingVertical: 5,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: color.primary,
                    },
                }}
            >
                <Tab.Screen name='About'>
                    {(props) => (
                        <About
                            {...props}
                            des={des}
                            calo={calo}
                            protein={protein}
                            fat={fat}
                            carb={carb}
                            recipt={recipt}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen name='Review'>
                    {(props) => <Review {...props} foodId={id} />}
                </Tab.Screen>
            </Tab.Navigator>
        </>
    )
}
