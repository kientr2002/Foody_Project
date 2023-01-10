import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontFamily: 'SF-Pro-Rounded_regular',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: '8%',
        marginTop: 15,
        marginBottom: 20,
    },
    account_list: {
        flex: 10,
        paddingLeft: '8%',
    },
    card: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    loadingScreen: {
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default styles
