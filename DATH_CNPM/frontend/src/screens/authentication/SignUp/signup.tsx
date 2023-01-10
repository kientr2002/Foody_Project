import React, { FC, Component, useState } from 'react'
import Select from 'react-select'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import UserContext, { UserContextInterface } from '../../../context/UserContext'
import Alert from '../../../components/alert/Alert'
import Button from '../../../components/button/Button'
import Input from '../../../components/input/Input'
import styles from './styles'

export default function SignUp({ navigation }: any) {
        React.useContext<UserContextInterface>(UserContext)
    const [success, setSuccess] = React.useState<boolean>(false)
    const [visible, setVisible] = React.useState<boolean>(false)
    const [warningUser, setWarningUser] = React.useState<string>('')
    const [warningEmail, setwarningEmail] = React.useState<string>('')
    const [warningPassword, setWarningPassword] = React.useState<string>('')
    const [warningConfirm_password, setWarningConfirm_password] = useState<string>('')
    const [warningName, setWarningName] = useState<string>('')
    const [warningSex, setWarningSex] = useState<string>('')
    const [warningDate, setWarningDate] = useState<string>('')
    const [warningQuestion, setwarningQuestion] = React.useState<string>('')
    const [warningAnswer, setwarningAnswer] = React.useState<string>('')
    const [user, setUser] = React.useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm_password, setconfirm_password] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [sex, setSex] = useState<string>('')
    const [Date, setDate] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const verifyInformation = () => {
        let flag = 0
        let regexEmail = new RegExp(/^[\S]+$/)
        let regexPassword = new RegExp(/.{8,32}/)
        let regexName = new RegExp(/^[a-z|A-Z|\s]{1,128}$/)
        let regexDate = new RegExp(
            /^(?:(?:31(-)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(-)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(-)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(-)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
        )
        if(user === ''){
            setWarningUser('Please enter Username')
            flag++;
        } else {
            setWarningUser('')
        }
        if (email === '') {
            setwarningEmail('Please enter Email')
            flag++
        } else {
            
            if (regexEmail.test(email)) {
                setwarningEmail('')
            } else {
                setwarningEmail('Email must be in format')
                flag++
            }
        }

        if (password === '') {
            setWarningPassword('Please enter Password')
            flag++
        } else {
            if (regexPassword.test(password)) {
                setWarningPassword('')
            } else {
                setWarningPassword('Password must be longer than 8 characters')
                flag++
            }
        }

        if (confirm_password === '') {
            setWarningConfirm_password('Please enter Confirm Password')
            flag++
        } else {
            if (password === confirm_password) {
                setWarningConfirm_password('')
            } else {
                setWarningConfirm_password(
                    'Confirm Password does not match with Password'
                )
                flag++
            }
        }

        if (name === '') {
            setWarningName('Please enter Name')
            flag++
        } else {
            if (regexName.test(name)) {
                setWarningName('')
            } else {
                setWarningName('Name format is incorrect')
                flag++
            }
        }
        if (sex === '') {
            setWarningSex('Please enter Sex')
            flag++
        } else {
            if (sex === 'male' || sex === 'female' || sex === 'other') {
                setWarningSex('')
            } else {
                setWarningSex('You must enter "male", "female" or "other"')
                flag++
            }
        }
        if (Date === '') {
            setWarningDate('Please enter Date')
            flag++
        } else {
            if (regexDate.test(Date)) {
                setWarningDate('')
                var yearAge = parseInt(
                    Date.substring(Date.length - 4, Date.length),
                    10
                )
                var age = 2022 - yearAge + 1
                if (age <= 15) {
                    setWarningDate('You are not be old enough to using App')
                    flag++
                }
            } else {
                setWarningDate(
                    'Please enter the date in the format dd-mm-yyyy and Enter it correctly'
                )
                flag++
            }
        }

        if (question === '') {
            setwarningQuestion('Please enter Question')
            flag++
        } else {
            setwarningQuestion('')
        }

        if (answer === '') {
            setwarningAnswer('Please enter Answer')
            flag++
        } else {
            setwarningAnswer('')
        }
        if (flag === 0) {
            handleSignUp(email,user,password,name,sex,Date,question,answer)
        }
    }

    const  handleSignUp = async (
        email: string,
        username: string,
        password: string,
        name: string,
        sex: string,
        date: string,
        question: string,
        answer: string) => {
            try{
                const response = await fetch(
                    'https://foodyforapi.herokuapp.com/Account',
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            username: username,
                            pass: password,
                            name: name,
                            sex: sex,
                            dob: date,
                            ques: question,
                            ans: answer
                        }),
                    }
                ) 
                const data = await response.json()
                if(data.result === 'fail'){
                    setSuccess(false)
                } else {
                    setSuccess(true)
                }
                setVisible(true)
            } catch (error) {
                console.error(error)
            }
    }

    return (
        <>
            <Alert
                type='change_password'
                title={success ? 'Success' : 'Fail'}
                message={success? 'Your account has been created': 'Something wrong has happened'}
                visible={visible}
                setVisible={setVisible}
                handleOk={() => {
                    success ? navigation.navigate('Login') : undefined
                }}
            />
            <View style={styles.container}>
                <Text style={styles.title}>Sign up</Text>
                <ScrollView contentContainerStyle={styles.inputContainer}>
                    <View style={styles.input}>
                        <Input type='user' value={user} setValue={setUser} />
                        <Text style={styles.warningText}>{warningUser}</Text>
                    </View>
                    <View style={styles.input}>
                        <Input type='email' value={email} setValue={setEmail} />
                        <Text style={styles.warningText}>{warningEmail}</Text>
                    </View>
                    <View style={styles.input}>
                        <Input type='name' value={name} setValue={setName} />
                        <Text style={styles.warningText}>{warningName}</Text>
                    </View>
                    <View style={styles.input}>
                        <Input type='sex' value={sex} setValue={setSex} />
                        <Text style={styles.warningText}>{warningSex}</Text>
                    </View>
                    <View style={styles.input}>
                        <Input
                            type='calendar'
                            value={Date}
                            setValue={setDate}
                        />
                        <Text style={styles.warningText}>{warningDate}</Text>
                    </View>
                    <View style={styles.input}>
                        <Input
                            type='password'
                            value={password}
                            setValue={setPassword}
                        />
                        <Text style={styles.warningText}>
                            {warningPassword}
                        </Text>
                    </View>
                    <View style={styles.input}>
                        <Input
                            type='confirm_password'
                            value={confirm_password}
                            setValue={setconfirm_password}
                        />
                        <Text style={styles.warningText}>
                            {warningConfirm_password}
                        </Text>
                    </View>
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

                    <View style={styles.buttonContainer}>
                        <Button
                            content='SIGN UP'
                            type='confirm'
                            arrow
                            onPress={() => verifyInformation()}
                        />
                    </View>
                </ScrollView>
                <View style={styles.logInContainer}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text>Already have account?</Text>
                        <Text
                            accessibilityRole='button'
                            onPress={() => navigation.navigate('Login')}
                            style={[styles.highlightText, styles.marginLeft_10]}
                        >
                            Log In
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )
}
