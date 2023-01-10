import { StyleSheet } from 'react-native'
import color from '../../styles/color'

const styles = StyleSheet.create({
    background: {
        borderRadius: 20,
        marginBottom: 5,

        display: 'flex',
        flexDirection: 'column',

        backgroundColor: color.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 2,
    },
    background_1: {
        width: 250,
        height: 410,
        marginRight: 20,
    },
    background_2: {
        width: '80%',
        marginBottom: 20,
    },
    background_3: {
        width: '90%',
        flexDirection: 'row',
        marginBottom: 10,
    },

    img_1: {
        width: '100%',
        height: 260,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    img_2: {
        width: '100%',
        height: 285,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    img_3: {
        width: 120,
        height: 100,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    img_4: {
        width: 160,
        height: '100%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },

    content_1: {
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 10,
    },
    content_2: {
        width: '65%',
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 10,
    },

    title: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 21,
    },
    title_2: {
        width: '80%',
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 19,
    },
    text: {
        height: 50,
        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 15,
        color: color.textBackground,
    },
    text_2: {
        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 15,
        color: '#000',
    },

    starContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    star: {
        color: color.yellow,
        paddingLeft: 2,
        paddingRight: 2,
    },
})

export default styles
