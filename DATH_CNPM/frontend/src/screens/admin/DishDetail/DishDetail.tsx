import * as React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    Linking,
} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as Progress from 'react-native-progress'

import Button from '../../../components/button/Button'
import { ReviewInput, ReviewCard } from '../../../components/review/Review'
import Alert from '../../../components/alert/Alert'
import { Comment } from '../../../util/interface'
import styles from './styles'
import color from '../../../styles/color'

const Tab = createMaterialTopTabNavigator()

function Review() {
    const [reviews, setReview] = React.useState<Comment[]>([])
    const [rate, setRate] = React.useState<number>(0)
    const [comment, setComment] = React.useState<string>('')

    const handleSubmit = (rate: number, comment: string) => {
        setReview([...reviews])
    }

    return (
        <ScrollView>
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

            {/* <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recipe</Text>
                <View style={styles.sectionContainer}>
                    <Button
                        content='Go to recipe'
                        type='confirm'
                        onPress={handlePress}
                    />
                </View>
            </View> */}
        </ScrollView>
    )
}

export default function FoodDetail({ route, navigation }: any) {
    const { id, name, des, image, recipt, calo, protein, fat, carb }: any =
        route?.params
    const [confirm, setConfirm] = React.useState<boolean>(false)
    const [success, setSuccess] = React.useState<boolean>(false)
    const handleOnPress = (obj: any) => {
        navigation.navigate('Edit Food', obj, 'edit')
    }
    
    const handleOnPressDelete = async (id: number) => {
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
                setSuccess(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Alert
                type='remove'
                title='Are you sure want to do this?'
                message=''
                visible={confirm}
                setVisible={setConfirm}
                handleOk={() => handleOnPressDelete(id)}
            />
            <Alert
                type='change_password'
                title='Success'
                message='Success'
                visible={success}
                setVisible={setSuccess}
                handleOk={() => navigation.navigate('Food list', {id})}
            />
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
                <Tab.Screen name='Review' component={Review} />
            </Tab.Navigator>

            {/* Button DELETE and EDIT */}
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button
                        content='DELETE'
                        type='error'
                        onPress={() => {
                            setConfirm(true)
                        }}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        content='EDIT'
                        type='confirm'
                        onPress={() =>
                            handleOnPress({
                                id,
                                name,
                                des,
                                image,
                                recipt,
                                calo,
                                protein,
                                fat,
                                carb,
                            })
                        }
                    />
                </View>
            </View>
        </>
    )
}
