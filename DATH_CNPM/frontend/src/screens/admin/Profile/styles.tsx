import { StyleSheet } from 'react-native'
import color from '../../../styles/color'

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 30,
        marginBottom: 40,
        paddingHorizontal: 10,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    text_bold: {
        fontFamily: 'SF-Pro-Rounded_bold',
        paddingRight: 10,
    },
    text_regular: {
        fontFamily: 'SF-Pro-Rounded_medium',
    },
    textSize_23: {
        fontSize: 23,
    },
    textSize_18: {
        fontSize: 18,
    },
    color_1: {
        color: color.textBackground,
    },
    marginBottom: {
        marginBottom: 10,
    },

    infoContainer: {
        paddingHorizontal: 20,
    },
    textContainer: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        paddingRight: 20,

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})

export default styles
