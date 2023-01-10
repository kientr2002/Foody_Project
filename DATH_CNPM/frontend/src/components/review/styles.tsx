import { StyleSheet } from 'react-native'
import color from '../../styles/color'

const styles = StyleSheet.create({
    reviewInput: {
        width: '95%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        paddingVertical: 15,
        borderRadius: 20,
        backgroundColor: color.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 1,
    },
    input: {
        width: '75%',
        marginRight: 10,
    },
    comment: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 5,

        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 18,
    },

    reviewCard: {
        width: '95%',
        marginVertical: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: color.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 1,
    },
    reviewCardTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewCardBody: {
        marginLeft: 65,
        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 18,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 5,
    },
    username: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 20,
        marginHorizontal: 5,
    },
    starContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    star: {
        color: color.yellow,
        paddingLeft: 2,
        paddingRight: 2,
    },
})

export default styles
