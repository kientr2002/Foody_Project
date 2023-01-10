import * as React from 'react'
import {
    View,
    Image,
    Text,
    Pressable,
    PressableProps,
    StyleSheet,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import styles from './styles'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
export interface CardAttribute {
    name: string
    imgSrc: string
    onPress?: () => void
    onPressEdit?: () => void
    onPressDelete?: () => void
}

export default function FoodCardAdmin(
    { name, imgSrc, onPress, onPressEdit, onPressDelete }: CardAttribute,
    { navigation }: any
) {
    const [backgroundSize, setBackgroundSize] = React.useState<any>(null)
    const [imgSize, setImgSize] = React.useState<any>(null)
    const [textSize, setTextSize] = React.useState<any>(null)
    const [pressed, setPressed] = React.useState<any>(null)

    React.useEffect(() => {
        setBackgroundSize(styles.background_3)
        setImgSize(styles.img_3)
        setTextSize(styles.content_2)
    })

    const handlePressIn = (i: any): any => {
        setPressed(i)
    }

    React.useEffect(() => {
        pressed === 1
            ? [onPress ? onPress() : null]
            : [
                  pressed === 3
                      ? [onPressEdit ? onPressEdit() : null]
                      : [
                            pressed === 4
                                ? [onPressDelete ? onPressDelete() : null]
                                : null,
                        ],
              ]
    }, [pressed])

    return (
        <View style={[styles.background, backgroundSize]}>
            <Image
                style={imgSize}
                source={{ uri: imgSrc }}
                fadeDuration={300}
            />
            <View style={textSize}>
                <View style={styles.name}>
                    <Pressable
                        onPress={() =>
                            pressed === 2 ? null : handlePressIn(1)
                        }
                        onPressOut={() => setPressed(0)}
                    >
                        <Text style={styles.title}>{name}</Text>
                    </Pressable>
                </View>
                <View style={styles.icon}>
                    <Pressable
                        onPressIn={() =>
                            pressed === 2 ? setPressed(0) : handlePressIn(2)
                        }
                        // onPressOut={() => setPressed(0)}
                    >
                        <FontAwesome5
                            name='ellipsis-v'
                            size={20}
                            color='black'
                        />
                    </Pressable>
                    <View style={pressed === 2 ? styles.menu2 : styles.menu1}>
                        <Pressable onPress={() => handlePressIn(3)}>
                            <Text
                                style={{
                                    fontFamily: 'SF-Pro-Rounded_bold',
                                    fontSize: 15,
                                }}
                            >
                                Edit
                            </Text>
                        </Pressable>

                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                margin: 5,
                            }}
                        ></View>
                        <Pressable onPress={() => handlePressIn(4)}>
                            <Text
                                style={{
                                    fontFamily: 'SF-Pro-Rounded_bold',
                                    fontSize: 15,
                                }}
                            >
                                Delete
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}
