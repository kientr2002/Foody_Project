import * as React from 'react'
import { View, Text, TextInput } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import styles from './styles'

export interface InputAttribute {
    editable?: boolean
    value: string
    setValue?: (value: string) => void
}

export default function TextArea({
    editable,
    value,
    setValue,
}: InputAttribute) {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.inputText, styles.inputTextDefault]}
                    multiline={true}
                    numberOfLines={1}
                    textAlignVertical='center'
                    editable={editable}
                    value={value}
                    onChangeText={setValue}
                />
            </View>
        </View>
    )
}
