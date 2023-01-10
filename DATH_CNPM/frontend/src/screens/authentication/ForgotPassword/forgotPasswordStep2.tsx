import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Button from '../../../components/button/Button'
import Input from '../../../components/input/Input'
import Alert from '../../../components/alert/Alert'
import styles from './styles'
import UserContext, { UserContextInterface } from '../../../context/UserContext'

export default function ForgotPasswordStep2({ navigation }: any) {
    const { name } = React.useContext<UserContextInterface>(UserContext)
    const [notification, setNotification] = React.useState<string>('')
    const [warningQuestion, setwarningQuestion] = React.useState<string>('')
    const [warningAnswer, setwarningAnswer] = React.useState<string>('')
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [success, setSuccess] = React.useState<boolean>(false)
    const [visible, setVisible] = React.useState<boolean>(false)

    const handleNavigate = (success: Boolean) => {
        if (success === true) {
            navigation.navigate('Login')
        }
    }

    const verifyInformation = (question: string, answer: string) => {
        if (question === '') {
            setwarningQuestion('Please enter Question')
        } else {
            if (answer === '') {
                setwarningAnswer('Please enter Answer')
            } else {
                handleForgotPassword(name, question, answer)                                     
            }
        }
    }

    const handleForgotPassword = (username: string | null, question: string, answer: string) => {
        fetch(
            'https://foodyforapi.herokuapp.com/getForgotpass',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    ques: question,
                    ans: answer
                }),
            }
        )
            .then(res => res.json())
            .then(obj => {
                if (obj?.result !== 'ok')
                    throw new Error('Secret question or answer is incorrect')
                return fetch(
                    'https://foodyforapi.herokuapp.com/getPassword',
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username
                        }),
                    }
                )
            })
            .then(res => res.json())
            .then(obj => {
                if (obj?.result === 'ok') {
                    setNotification(obj?.password)
                    setSuccess(true)
                    setVisible(true)
                }
            })
            .catch(error => {
                console.log(error)
                setSuccess(false)
                setNotification(error.message)
                setVisible(true)
            })
    }

    return (
        <>
            <Alert
                type='change_password'
                title={success ? 'Your password is:' : 'Fail'}
                message={notification}
                visible={visible}
                setVisible={setVisible}
                handleOk={() => handleNavigate(success)}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.textBackground}>Step 2 of 2</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <Input
                            type='question'
                            value={question}
                            setValue={setQuestion}
                        />
                        <Text style={styles.warningText}>
                            {warningQuestion}
                        </Text>
                    </View>
                    <View style={styles.input}>
                        <Input
                            type='answer'
                            value={answer}
                            setValue={setAnswer}
                        />
                        <Text style={styles.warningText}>{warningAnswer}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        content='SUBMIT'
                        type='confirm'
                        arrow
                        onPress={() => verifyInformation(question, answer)}
                    />
                </View>
            </ScrollView>
        </>
    )
}
