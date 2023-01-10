import { StyleSheet } from 'react-native'
import color from '../../styles/color'

const styles = StyleSheet.create({
    view_layout: {
        flexDirection: 'row',
        height: 100,
        width: '90%',
        borderRadius: 20,
        backgroundColor: color.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 1,
    },
    img_1: {
        height: '100%',
        width: '46%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    text_direction: {
        flexDirection: 'row',
    },
    text_1: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 20,
        marginLeft: 20,
    },
    text_2: {
        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 15,
        marginRight: 10,
        marginLeft: 20,
    },
    text_3: {
        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 15,
        color: '#9ABF11',
    },
    text_4: {
        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 15,
        color: '#FF0000',
    },
})

export default styles
