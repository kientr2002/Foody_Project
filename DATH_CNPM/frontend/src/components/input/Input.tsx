import * as React from 'react'
import { View, Text, TextInput } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import styles from './styles'

export interface InputAttribute {
    type?: string
    focus?: boolean
    editable?: boolean
    value: string
    setValue?: (value: string) => void
}

/*
    Component Input
        type (String): 
            set input type 
            default: '' 
            values 
                'email', 'password' , 'confirm_password', 'name', 'calendar',
                'weight', 'height', 'question', 'answer', 'search', 'sex'
        focus (boolean): set auto focus on that input
        editable
*/

export default function Input({
    type,
    focus,
    editable,
    value,
    setValue,
}: InputAttribute) {
    const [name, setName] = React.useState<string>('')
    const [icon, setIcon] = React.useState<string>('')
    React.useEffect(() => {
        switch (type) {
            case 'user':
                setName('USER')
                setIcon('user')
                break
            case 'email':
                setName('EMAIL')
                setIcon('envelope')
                break
            case 'password':
                setName('PASSWORD')
                setIcon('key')
                break
            case 'old_password':
                setName('OLD PASSWORD')
                setIcon('key')
                break
            case 'new_password':
                setName('NEW PASSWORD')
                setIcon('key')
                break
            case 'confirm_password':
                setName('CONFIRM PASSWORD')
                setIcon('lock')
                break
            case 'confirm_new_password':
                setName('CONFIRM NEW PASSWORD')
                setIcon('lock')
                break
            case 'name':
                setName('NAME')
                setIcon('signature')
                break
            case 'calendar':
                setName('DATE OF BIRTH')
                setIcon('calendar-day')
                break
            case 'weight':
                setName('WEIGHT')
                setIcon('dumbbell')
                break
            case 'height':
                setName('HEIGHT')
                setIcon('ruler-vertical')
                break
            case 'question':
                setName('QUESTION')
                setIcon('question')
                break
            case 'answer':
                setName('ANSWER')
                setIcon('comment-dots')
                break
            case 'search':
                setName('SEARCH')
                setIcon('search')
                break
            case 'sex':
                setName('SEX')
                setIcon('venus-mars')
                break;
            
            default:
                setName('')
                setIcon('')
        }
    }, [type])

    return (
        <View>
            <View style={styles.container}>
                {name !== '' && (
                    <View style={styles.icon}>
                        <FontAwesome5 name={icon} size={22} color='black' />
                    </View>
                )}
                <View style={styles.inputContainer}>
                    {name !== '' && name !== 'SEARCH' && (
                        <Text style={styles.nameText}>{name}</Text>
                    )}
                    <TextInput
                        style={
                            name !== ''
                                ? styles.inputText
                                : [styles.inputText, styles.inputTextDefault]
                        }
                        textAlignVertical='center'
                        autoFocus={focus ? focus : false}
                        secureTextEntry={
                            type === 'password' ||
                            type === 'old_password' ||
                            type === 'new_password' ||
                            type === 'confirm_password' ||
                            type === 'confirm_new_password'
                                ? true
                                : false
                        }
                        keyboardType={
                            type === 'height' || type === 'weight'
                                ? 'numeric'
                                : 'default'
                        }
                        editable={editable}
                        value={value}
                        onChangeText={setValue}
                    />
                </View>
            </View>
        </View>
    )
}
