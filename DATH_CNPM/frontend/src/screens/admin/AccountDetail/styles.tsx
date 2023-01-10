import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    avatar_username_container: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    avatar_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
    },
    username_container: {
        flex: 1,
        justifyContent: 'center',
    },
    username: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 25,
    },
    email: {
        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 17,
        color: '#ADAAAA',
    },
    information_container: {
        flex: 5,
        paddingLeft: 30,
        paddingRight: 30,
    },
    line_container: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    text_1: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 17,
        color: '#000000',
        marginRight: 20,
    },
    text_2: {
        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 17,
        color: '#000000',
        marginRight: 20,
    },
    button_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 30,
        paddingRight: 50,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default styles
