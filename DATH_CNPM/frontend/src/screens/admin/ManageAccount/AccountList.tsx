import * as React from 'react'
import { ActivityIndicator, View, ScrollView, Text } from 'react-native'

import AccountCard from '../../../components/accountcard/AccountCard'
import styles from './styles'
import color from '../../../styles/color'

interface User {
    id: number,
    role: number,
    status: number,
    username: string
}

export default function AccountList({ route, navigation }: any) {
    const [users, setUsers] = React.useState<User[]>([])
    const [loading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        if (route.params) {
            let arr:User[] = users.map((user:User) => {
                if (user.username === route.params.username)
                    return {
                        ...user,
                        status: route.params.isBanned ? 0 : 1
                    }
                else 
                    return user
            })
            setUsers(arr)
        }
    }, [route])

    const getUsers = async () => {
        try {
            const response = await fetch(
                'https://foodyforapi.herokuapp.com/getListUser'
            )
            const data = await response.json()
            if (data.result === 'ok') {
                setUsers(data.message)
                setLoading(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    React.useEffect(() => {
        getUsers()
    }, [])

    const handleOnPress = (username: string) => {
        navigation.navigate('Account detail', {username})
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>All account</Text>
                {loading ? (
                    <View style={styles.loadingScreen}>
                        <ActivityIndicator size='large' color={color.primary} />
                    </View>
                ) : (
                    <View style={styles.account_list}>
                        <ScrollView
                            contentContainerStyle={{
                                paddingHorizontal: 0,
                            }}
                        >
                            {users.map((user: any, i: number) => (
                                <View style={styles.card} key={i}>
                                    <AccountCard
                                        username={user.username}
                                        role={user.role === 1 ? 'User' : 'Admin'}
                                        status={user.status === 1 ? 'Active' : 'Banned'}
                                        imgSrc={`https://api.multiavatar.com/${user.username}.png`}
                                        onPress={() => handleOnPress(user.username)}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>
        </>
    )
}
