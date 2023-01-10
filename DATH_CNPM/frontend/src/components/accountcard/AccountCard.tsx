import * as React from 'react'
import { View, Image, Text, Pressable } from 'react-native'

import styles from './styles'

export interface AccountCardAttribute {
    username: string
    role: string
    status: string
    imgSrc: string
    onPress?: () => void
}

export default function AccountCard({
    username,
    role,
    status,
    imgSrc,
    onPress,
}: AccountCardAttribute) {
    const [pressed, setPressed] = React.useState<boolean>(false)
    const handlePressIn = () => {
        setPressed(true)
        if (onPress) onPress()
    }

    return (
        <Pressable onPress={handlePressIn} onPressOut={() => setPressed(false)}>
            <View style={styles.view_layout}>
                <Image
                    style={styles.img_1}
                    source={{
                        uri: imgSrc,
                    }}
                    fadeDuration={300}
                />
                <View
                    // style={textSize}
                    style={{
                        borderRadius: 20,
                    }}
                >
                    <View>
                        <Text style={styles.text_1}>{username}</Text>
                        {/* Role */}
                        <View style={styles.text_direction}>
                            <View>
                                <Text style={styles.text_2}>Role:</Text>
                            </View>
                            <View>
                                <Text style={styles.text_3}>{role}</Text>
                            </View>
                        </View>
                        {/* Status */}
                        <View style={styles.text_direction}>
                            <View>
                                <Text style={styles.text_2}>Status:</Text>
                            </View>
                            <View>
                                <Text
                                    style={
                                        status === 'Active'
                                            ? styles.text_3
                                            : styles.text_4
                                    }
                                >
                                    {status}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
