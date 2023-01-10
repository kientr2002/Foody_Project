import * as React from 'react'
import { View, Text, Pressable, PressableProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'

import color from '../../styles/color'
import styles from './styles'

export interface ButtonAttribute {
    type: string
    content?: string
    arrow?: boolean
    comment?: boolean
    onPress?: () => void
}

const buttonColor = {
    confirm: [color.primary, '#C4E156'],
    warning: [color.warning, color.warningSupport],
    error: [color.notice, color.noticeSupport],
}

/*
    Component Button:
        content (String): the text inside button
        type (String): color of the button, value: 'confirm', 'warning', 'error'
            - 'confirm': green
            - 'warning': yellow
            - 'error': red
        arrow (Boolean): show arrow icon or not
        comment (Boolean): show send icon, not using this with others
        onPress (Function): action when press in the button
*/

export default function Button({
    content,
    type,
    arrow,
    comment,
    onPress,
}: ButtonAttribute) {
    const [selectedColor, setSelectedColor] = React.useState<Array<string>>(
        buttonColor.confirm
    )
    const [pressed, setPressed] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (type === 'warning') setSelectedColor(buttonColor.warning)
        else if (type === 'error') setSelectedColor(buttonColor.error)
        else setSelectedColor(buttonColor.confirm)
    }, [type])

    const handlePressIn = () => {
        setPressed(true)
        if (onPress) onPress()
    }

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={() => setPressed(false)}
        >
            <LinearGradient
                colors={
                    pressed
                        ? ['rgba(0, 0, 0, 0.4)', selectedColor[0]]
                        : selectedColor
                }
                style={
                    comment ? [styles.button, styles.comment] : styles.button
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {comment && (
                    <Ionicons name='send' size={20} style={styles.icon} />
                )}
                <Text style={styles.text}>{content?.toUpperCase()}</Text>
                {arrow && (
                    <FontAwesome5
                        name='long-arrow-alt-right'
                        size={21}
                        style={[styles.icon, styles.arrow]}
                    />
                )}
            </LinearGradient>
        </Pressable>
    )
}
