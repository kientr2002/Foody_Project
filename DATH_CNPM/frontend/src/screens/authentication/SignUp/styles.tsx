import { StyleSheet } from 'react-native'
import color from '../../../styles/color'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 20,
        flex: 1,
    },
    title: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 30,
        color: color.text,
        marginLeft: 20,
    },
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        alignItems: 'center',
        marginBottom: 5,
    },
    buttonContainer: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10,
        marginBottom: 5,
    },
    logInContainer: {
        alignSelf: 'center',
        marginLeft: 20,
        marginBottom: 10,
    },
    highlightText: {
        fontFamily: 'SF-Pro-Rounded_heavy',
        fontSize: 15,
        color: color.primary,
    },
    marginLeft_10: {
        marginLeft: 5,
    },
    warningText: {
        color: 'tomato',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
    },
})

export default styles
