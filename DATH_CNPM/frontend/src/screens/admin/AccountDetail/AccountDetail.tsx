import * as React from 'react'
import { View, Text, Image } from 'react-native'
import Button from '../../../components/button/Button'
import Alert from '../../../components/alert/Alert'
import convertDate from '../../../util/convertDate'
import styles from './styles'
import { User } from '../../../util/interface'

export default function AccountDetail({ route, navigation }: any) {
    const { username }: any = route?.params
    const [user, setUser] = React.useState<User>()
    const [isBanned, setIsBanned] = React.useState<boolean>(false)
    const [confirm, setConfirm] = React.useState<boolean>(false)
    const [success, setSuccess] = React.useState<boolean>(false)

    const getUsersDetail = async (username: String) => {
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
                setUser(data.message[0])
            }
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        getUsersDetail(username)
    }, [username])

    React.useEffect(() => {
        setIsBanned(user?.status !== 1)
    }, [user])

    const handleBan = async (username: string) => {
        try {
            const response = await fetch(
                'https://foodyforapi.herokuapp.com/banAcc',
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
                setSuccess(true)
                setIsBanned(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleActive = async (username: string) => {
        try {
            const response = await fetch(
                'https://foodyforapi.herokuapp.com/unlockAcc',
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
                setSuccess(true)
                setIsBanned(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Alert
                type='remove'
                title='Are you sure want to do this?'
                message=''
                visible={confirm}
                setVisible={setConfirm}
                handleOk={() => [
                    user?.status === 1 ? handleBan(username) : handleActive(username),
                ]}
            />
            <Alert
                type='change_password'
                title='Success'
                message='Success'
                visible={success}
                setVisible={setSuccess}
                handleOk={() => {
                    navigation.navigate('Account list', { username, isBanned })
                }}
            />
            <View style={styles.avatar_username_container}>
                <View style={styles.avatar_container}>
                    <View style={styles.avatar}>
                        <Image
                            style={{ flex: 1, borderRadius: 75 }}
                            source={{
                                uri: `https://api.multiavatar.com/${user?.username}.png`,
                            }}
                            fadeDuration={300}
                        />
                    </View>
                </View>

                <View style={styles.username_container}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>
            </View>

            <View style={styles.information_container}>
                {/* Name */}
                <View style={styles.line_container}>
                    <View>
                        <Text style={styles.text_1}>Name</Text>
                    </View>
                    <View>
                        <Text style={styles.text_2}>{user?.name}</Text>
                    </View>
                </View>

                {/* Day of Birth */}
                <View style={styles.line_container}>
                    <View>
                        <Text style={styles.text_1}> Day of Birth</Text>
                    </View>
                    <View>
                        <Text style={styles.text_2}>
                            {convertDate(user?.dob ? user.dob : null)}
                        </Text>
                    </View>
                </View>

                {/* Weight */}
                <View style={styles.line_container}>
                    <View>
                        <Text style={styles.text_1}> Weight</Text>
                    </View>
                    <View>
                        <Text style={styles.text_2}>{user?.weight}</Text>
                    </View>
                </View>

                {/* Height */}
                <View style={styles.line_container}>
                    <View>
                        <Text style={styles.text_1}> Height</Text>
                    </View>
                    <View>
                        <Text style={styles.text_2}>{user?.height}</Text>
                    </View>
                </View>

                {/* Current TDEE */}
                <View style={styles.line_container}>
                    <View>
                        <Text style={styles.text_1}> Current TDEE</Text>
                    </View>
                    <View>
                        <Text style={styles.text_2}>{user?.TDEE}</Text>
                    </View>
                </View>

                {/* Current target */}
                <View style={styles.line_container}>
                    <View>
                        <Text style={styles.text_1}> Current target</Text>
                    </View>
                    <View>
                        <Text style={styles.text_2}>{user?.object}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.button_container}>
                <View style={styles.button}>
                    {user?.status === 1 ? (
                        <Button
                            content='BAN'
                            type='error'
                            onPress={() => {
                                setConfirm(true)
                            }}
                        />
                    ) : (
                        <Button
                            content='ACTIVE'
                            type='confirm'
                            onPress={() => {
                                setConfirm(true)
                            }}
                        />
                    )}
                </View>
            </View>
        </>
    )
}
