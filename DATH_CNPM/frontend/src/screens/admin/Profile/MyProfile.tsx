import * as React from 'react'
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native'
import Alert from '../../../components/alert/Alert'
import Button from '../../../components/button/Button'
import UserContext, { UserContextInterface } from '../../../context/UserContext'
import styles from './styles'
import convertDate from '../../../util/convertDate'
export default function Profile({ navigation }: any) {
    const { setLogin, setAdmin, name } =
        React.useContext<UserContextInterface>(UserContext)
    const [logOut, setLogOut] = React.useState<boolean>(false)
    const [adminDetail, setAdminDetail] = React.useState<{
        ans: string
        dob: string
        email: string
        name: string
        pass: string
        ques: string
        role: number
        username: string
    }>()
    const getAdminDetail = async (username: string | null) => {
        try {
            const response = await fetch(
                'https://foodyforapi.herokuapp.com/getDetailAcc',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                    }),
                }
            )
            const data = await response.json()
            if (data.result === 'ok') {
                setAdminDetail(data.message[0])
            }
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        getAdminDetail(name)
    }, [])

    return (
        <>
            <Alert
                type='logout'
                title='Log out'
                message='Are you sure want to logout?'
                visible={logOut}
                setVisible={setLogOut}
                handleOk={() => {
                    setLogin(false)
                    setAdmin(false)
                }}
            />
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Image
                        source={{
                            uri: 'https://www.clipartmax.com/png/middle/171-1716274_animaljake-the-dog-jake-the-dog-adventure-time.png',
                        }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={[styles.text_bold, styles.textSize_23]}>
                            {name}
                        </Text>
                        <Text
                            style={[
                                styles.text_regular,
                                styles.textSize_18,
                                styles.color_1,
                                styles.marginBottom,
                            ]}
                        >
                            {adminDetail?.email}
                        </Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.text_bold, styles.textSize_18]}>
                            Name:
                        </Text>
                        <Text
                            style={[
                                styles.text_regular,
                                styles.textSize_18,
                                styles.color_1,
                            ]}
                        >
                            {adminDetail?.name}
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.text_bold, styles.textSize_18]}>
                            Day of Birth:
                        </Text>
                        <Text
                            style={[
                                styles.text_regular,
                                styles.textSize_18,
                                styles.color_1,
                            ]}
                        >
                            {convertDate(adminDetail ? adminDetail.dob : null)}
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.text_bold, styles.textSize_18]}>
                            Email:
                        </Text>
                        <Text
                            style={[
                                styles.text_regular,
                                styles.textSize_18,
                                styles.color_1,
                            ]}
                        >
                            {adminDetail?.email}
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.text_bold, styles.textSize_18]}>
                            Contact number:
                        </Text>
                        <Text
                            style={[
                                styles.text_regular,
                                styles.textSize_18,
                                styles.color_1,
                            ]}
                        >
                            0368514720
                        </Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <View
                        style={{
                            marginRight: 10,
                        }}
                    >
                        <Button
                            type='confirm'
                            content='CHANGE PASSWORD'
                            onPress={() => {
                                navigation.navigate('Change password')
                            }}
                        />
                    </View>
                    <View>
                        <Button
                            type='error'
                            content='LOG OUT'
                            onPress={() => {
                                setLogOut(true)
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
