import { StyleSheet } from 'react-native'
import color from '../../styles/color'

const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        position: 'relative',

        borderRadius: 20,
        backgroundColor: color.background,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    icon: {
        width: '15%',
        paddingTop: 5,
        paddingLeft: 5,
        paddingBottom: 5,
    },
    inputContainer: {
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    nameText: {
        marginBottom: 1,

        color: color.textBackground,
        fontFamily: 'SF-Pro-Rounded_semibold',
        fontSize: 10,
    },
    inputText: {
        height: 32,
        fontFamily: 'SF-Pro-Rounded_medium',
        fontSize: 20,
    },
    inputTextDefault: {
        height: 45,
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
})

export default styles
