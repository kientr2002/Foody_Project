import * as React from 'react'
import { Pressable, View, Animated } from 'react-native'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import UserContext, { UserContextInterface } from '../../context/UserContext'

import styles from './styles'
import color from '../../styles/color'
import { Food } from '../../util/interface'

interface HeaderButtonAttribute {
    type: number
    navigation?: any
    route?: any
}

export default function HeaderButton({
    type,
    navigation,
    route,
}: HeaderButtonAttribute) {
    const {
        createPlanList,
        myFavorite,
        handleAddToCreatePlan,
        handleRemoveFromCreatePlan,
        handleAddToFavorite,
        handleRemoveFromFavorite,
    } = React.useContext<UserContextInterface>(UserContext)
    const [like, setLike] = React.useState<boolean>(false)
    const [inPlan, setInPlan] = React.useState<boolean>(false)

    // check if the food is in favorite or in create plan list
    React.useEffect(() => {
        if (createPlanList.find((food: Food) => food.id === route?.params?.id))
            setInPlan(true)
    }, [createPlanList])
    React.useEffect(() => {
        if (myFavorite.find((food: Food) => food.id === route?.params?.id))
            setLike(true)
    }, [myFavorite])

    const handleGoToCreatePlan = () => {
        navigation?.navigate('Create Plan')
    }

    return (
        <>
            {type === 1 ? (
                <View style={styles.container}>
                    <Pressable
                        style={styles.item}
                        onPress={handleGoToCreatePlan}
                    >
                        <FontAwesome5
                            name='shopping-basket'
                            size={23}
                            color={color.textBackground}
                        />
                    </Pressable>
                </View>
            ) : (
                <View style={styles.container}>
                    <Pressable
                        style={styles.item}
                        onPress={() => {
                            if (!like) {
                                const food: Food = {
                                    id: route?.params?.id,
                                    name: route?.params?.name,
                                    des: route?.params?.des,
                                    image: route?.params?.image,
                                    avgStar: route?.params?.avgStar,
                                    recipt: route?.params?.recipt,
                                    calo: route?.params?.calo,
                                    protein: route?.params?.protein,
                                    fat: route?.params?.fat,
                                    carb: route?.params?.carb,
                                }
                                handleAddToFavorite(food)
                            } else handleRemoveFromFavorite(route?.params?.id)
                            setLike(!like)
                        }}
                    >
                        <MaterialIcons
                            name='favorite'
                            size={27}
                            color={like ? 'tomato' : color.textBackground}
                        />
                    </Pressable>
                    <View>
                        <Pressable
                            style={[
                                styles.item,
                                inPlan ? styles.overlap_disappear : null,
                            ]}
                            onPress={() => {
                                const food: Food = {
                                    id: route?.params?.id,
                                    name: route?.params?.name,
                                    des: route?.params?.des,
                                    image: route?.params?.image,
                                    avgStar: route?.params?.avgStar,
                                    recipt: route?.params?.recipt,
                                    calo: route?.params?.calo,
                                    protein: route?.params?.protein,
                                    fat: route?.params?.fat,
                                    carb: route?.params?.carb,
                                }
                                setInPlan(true)
                                handleAddToCreatePlan(food)
                            }}
                        >
                            <MaterialIcons
                                name='add-circle'
                                size={27}
                                color={color.textBackground}
                            />
                        </Pressable>
                        <Pressable
                            style={[
                                styles.item,
                                !inPlan ? styles.overlap_disappear : null,
                            ]}
                            onPress={() => {
                                setInPlan(false)
                                handleRemoveFromCreatePlan(route?.params?.id)
                            }}
                        >
                            <MaterialIcons
                                name='check-circle'
                                size={27}
                                color={color.primary}
                            />
                        </Pressable>
                    </View>
                </View>
            )}
        </>
    )
}
