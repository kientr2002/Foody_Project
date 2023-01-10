import React, { Component, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Alert from '../../../components/alert/Alert'
import Button from '../../../components/button/Button'
import Input from '../../../components/input/Input'
import UserContext, { UserContextInterface } from '../../../context/UserContext'
import styles from './styles'

export default function Login({ navigation }: any) {
    const { setAdmin, setLogin, setName } =
        React.useContext<UserContextInterface>(UserContext)
    const [warningUsername, setWarningUsername] = React.useState<string>('')
    const [warningPassword, setWarningPassword] = React.useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [success, setSuccess] = React.useState<boolean>(false)
    const [visible, setVisible] = React.useState<boolean>(false)

    const verifyInformation = (user: string, password: string) => {
        setSuccess(false)
        if (username !== '') {
            setWarningUsername('')
            if (password === '') {
                setWarningPassword('Please enter password')
            } else {
                setWarningPassword('')
                handleLogin(username, password)
            }
        } else {
            if (user === '') {
                setWarningUsername('Please enter username')
            }
        }
    }

    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await fetch(
                'https://foodyforapi.herokuapp.com/getAccount',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        pass: password,
                    }),
                }
            )
            const data = await response.json()
            if (data.result === 'ok') {
                setAdmin(data?.role !== 1)
                setName(username)
                setSuccess(true)
            } else {
                setSuccess(false)
            }
            setVisible(true)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Alert
                type='create_plan'
                title='Login'
                message={
                    success
                        ? 'Log in success'
                        : 'User or Password is incorrect'
                }
                visible={visible}
                setVisible={setVisible}
                handleOk={() => {
                    success ? setLogin(true) : setLogin(false)
                }}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../../../../assets/logo.png')}
                    />
                </View>

                <Text style={styles.title}>Login</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <Input
                            type='user'
                            focus
                            value={username}
                            setValue={setUsername}
                        />
                        <Text style={styles.warningText}>{warningUsername}</Text>
                    </View>
                    <View style={styles.input}>
                        <Input
                            type='password'
                            value={password}
                            setValue={setPassword}
                            editable={true}
                        />
                        <Text style={styles.warningText}>
                            {warningPassword}
                        </Text>
                    </View>
                </View>

                <View style={styles.focusPassContainer}>
                    <Text
                        onPress={() =>
                            navigation.navigate('Forgot password step 1')
                        }
                        style={[styles.highlightText, styles.marginTop_10]}
                    >
                        Forgot password?
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        content='LOGIN'
                        type='confirm'
                        arrow
                        onPress={() => verifyInformation(username, password)}
                    />
                </View>
            </ScrollView>
            <View style={styles.signUpContainer}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>Don't have any account?</Text>
                    <Text
                        accessibilityRole='button'
                        onPress={() => navigation.navigate('Sign Up')}
                        style={[styles.highlightText, styles.marginLeft_10]}
                    >
                        Sign up
                    </Text>
                </View>
            </View>
        </>
    )
}
