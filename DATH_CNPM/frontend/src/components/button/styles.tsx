import { StyleSheet } from 'react-native'
import color from '../../styles/color'

const styles = StyleSheet.create({
    button: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    comment: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    text: {
        color: color.background,
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 15,
    },
    icon: {
        color: color.background,
    },
    arrow: {
        paddingLeft: 10,
    },
})

export default styles
