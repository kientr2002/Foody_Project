import { StyleSheet } from 'react-native'
import color from '../../../styles/color'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },

    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 33,
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 60,
    },

    input: {
        marginBottom: 20,
    },
    Activity: {
        marginLeft: 20,
        flexDirection: 'row',
    },
    Text: {
        height: '6.5%',
        width: '100%',
        backgroundColor: color.background,
    },

    target: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginVertical: 15,
    },
    targetHeader: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 20,
        marginBottom: 5,
    },
    targetContent: {},

    dropdown: {
        alignSelf: 'flex-start',
        marginLeft: 20,
    },

    buttonContainer: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10,
    },

    chooseButton: {
        flexDirection: 'row',
        marginHorizontal: 15,
        alignItems: 'center',
    },
    textChooseButton: {
        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 17,
        marginLeft: 10,
    },
    outter: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        width: 15,
        height: 15,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    warningText: {
        color: 'tomato',
        alignSelf: 'flex-start',
        fontWeight: 'bold',

        marginTop: 5,
        marginBottom: 5,
    },
})

export default styles
