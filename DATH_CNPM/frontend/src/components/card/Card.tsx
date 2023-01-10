import * as React from 'react'
import { View, Image, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import styles from './styles'
import { ResizeMode } from 'expo-av'

export interface CardAttribute {
    cardStyle: number
    name: string
    des: string
    image: string
    rate: number
    recipt: string
    calo: number | null
    protein: number | null
    fat: number | null
    carb: number | null
    onPress?: () => void
}

interface StarsAttribute {
    rate: number
    style: number
}

function Stars({ rate, style }: StarsAttribute) {
    if (style != 1 && style != 2) return null

    let starArr: string[] = []
    for (let i = 0; i < 5; i++) {
        if (i < rate) starArr.push('star')
        else starArr.push('staro')
    }

    return (
        <View style={styles.starContainer}>
            {starArr.map((element, i) => (
                <AntDesign
                    key={i}
                    name={element === 'star' ? 'star' : 'staro'}
                    size={20}
                    style={styles.star}
                />
            ))}
        </View>
    )
}

export default function Card({
    cardStyle,
    name,
    des,
    calo,
    protein,
    fat,
    carb,
    rate,
    image,
    onPress,
}: CardAttribute) {
    const [backgroundSize, setBackgroundSize] = React.useState<any>(null)
    const [imgSize, setImgSize] = React.useState<any>(null)
    const [textSize, setTextSize] = React.useState<any>(null)

    // decide with style card will use
    React.useEffect(() => {
        switch (cardStyle) {
            case 1:
                setBackgroundSize(styles.background_1)
                setImgSize(styles.img_1)
                setTextSize(styles.content_1)
                break
            case 2:
                setBackgroundSize(styles.background_2)
                setImgSize(styles.img_2)
                setTextSize(styles.content_1)
                break
            case 3:
                setBackgroundSize(styles.background_3)
                setImgSize(styles.img_3)
                setTextSize(styles.content_2)
                break
            case 4:
                setBackgroundSize(styles.background_3)
                setImgSize(styles.img_4)
                setTextSize(styles.content_2)
                break
        }
    }, [cardStyle])

    return (
        <Pressable
            style={[styles.background, backgroundSize]}
            onPress={onPress}
        >
            <Image
                style={imgSize}
                source={{ uri: image }}
                fadeDuration={300}
                resizeMode={ResizeMode.COVER}
            />
            <View style={textSize}>
                <View>
                    <Text
                        style={
                            cardStyle !== 3 && cardStyle !== 4
                                ? styles.title
                                : styles.title_2
                        }
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {name}
                    </Text>
                    {cardStyle !== 4 ? (
                        <Text style={styles.text} numberOfLines={2}>
                            {des}
                        </Text>
                    ) : (
                        <View>
                            <Text style={styles.text_2}>
                                Calories: {calo ? calo : 0}
                            </Text>
                            <Text style={styles.text_2}>
                                Protein: {protein ? protein : 0}
                            </Text>
                            <Text style={styles.text_2}>
                                Carb: {carb ? carb : 0}
                            </Text>
                            <Text style={styles.text_2}>
                                Fat: {fat ? fat : 0}
                            </Text>
                        </View>
                    )}
                </View>
                <Stars rate={rate} style={cardStyle}></Stars>
            </View>
        </Pressable>
    )
}
