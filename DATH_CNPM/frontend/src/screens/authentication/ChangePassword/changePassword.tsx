import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Alert from '../../../components/alert/Alert'
import Button from '../../../components/button/Button'
import Input from '../../../components/input/Input'
import UserContext, { UserContextInterface } from '../../../context/UserContext'
import styles from './styles'

export default function ChangePassword({ navigation }: any) {
    const { name } = React.useContext<UserContextInterface>(UserContext)
    const [warningOldPassword, setWarningOldPassword] = React.useState<string>('')
    const [warningNewPassword, setWarningNewPassword] = React.useState<string>('')
    const [warningConfirmNewPassword, setWarningConfirmNewPassword] = React.useState<string>('')
    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
    const [notification, setNotification] = useState<string>('')
    const [visible, setVisible] = React.useState<boolean>(false)
    const [success, setSuccess] = React.useState<boolean>(false)

    const verifyInformation = (oldPassword: string, newPassword: string, confirmNewPassword: string) => {
        let flag = 0
        let regexPassword = new RegExp(/.{8,32}/)

        if(oldPassword === ''){
            flag++
            setWarningOldPassword('Please enter Password')
        } else {
            if (regexPassword.test(oldPassword)) {
                setWarningOldPassword('')
            } else {
                flag++
                setWarningOldPassword(
                    'Password must be longer than 8 characters'
                )
            }
        }
        if (newPassword === '') {
            flag++
            setWarningNewPassword('Please enter new password')
        } else {
            if (regexPassword.test(newPassword)) {
                if (oldPassword === newPassword) {
                    flag++
                    setWarningNewPassword(
                        'New Password cannot be the same as current password'
                    )
                } else setWarningNewPassword('')
            } else {
                flag++
                setWarningNewPassword(
                    'Password must be longer than 8 characters'
                )
            }
        }
        if (confirmNewPassword === '') {
            flag++
            setWarningConfirmNewPassword('Please enter confirm password')
        } else {
            if (newPassword === confirmNewPassword) {
                setWarningConfirmNewPassword('')
            } else {
                flag++
                setWarningConfirmNewPassword('Confirm Password does not match')
            }
        }
        if(flag === 0){
            handleChangePassword(oldPassword, newPassword)
        }
    }

    const handleNavigate = (success: Boolean) => {
        if (success) navigation.goBack()
        else return null
    }

    const handleChangePassword = (oldPassword: string, newPassword: string) => {
        fetch(
            'https://foodyforapi.herokuapp.com/getPassword',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: name,
                }),
            }
        )
            .then(res => res.json())
            .then(obj => {
                if (obj?.result === 'ok' && obj?.password !== oldPassword)
                    throw new Error('Old password is incorrect')

                return fetch(
                    'https://foodyforapi.herokuapp.com/password',
                    {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: name,
                            newPass: newPassword
                        }),
                    }
                ) 
            })
            .then(res => res.json())
            .then(obj => {
                if (obj?.result === 'ok')
                    setSuccess(true)
                    setNotification('Password has been changed')
                    setVisible(true)
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
                title={success ? 'Success' : 'Fail'}
                message={notification}
                visible={visible}
                setVisible={setVisible}
                handleOk={() => {
                    handleNavigate(success)
                }}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Change password</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <Input
                            type='old_password'
                            value={oldPassword}
                            setValue={setOldPassword}
                        />
                        <Text style={styles.warningText}>
                            {warningOldPassword}
                        </Text>
                    </View>
                    <View style={styles.input}>
                        <Input
                            type='new_password'
                            value={newPassword}
                            setValue={setNewPassword}
                        />
                        <Text style={styles.warningText}>
                            {warningNewPassword}
                        </Text>
                    </View>
                    <View style={styles.input}>
                        <Input
                            type='confirm_new_password'
                            value={confirmNewPassword}
                            setValue={setConfirmNewPassword}
                        />
                        <Text style={styles.warningText}>
                            {warningConfirmNewPassword}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        content='SUBMIT'
                        type='confirm'
                        arrow
                        onPress={() =>
                            verifyInformation(
                                oldPassword,
                                newPassword,
                                confirmNewPassword
                            )
                        }
                    />
                </View>
            </ScrollView>
        </>
    )
}
