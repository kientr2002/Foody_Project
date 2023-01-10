import { StyleSheet } from 'react-native'
import color from '../../styles/color'

const styles = StyleSheet.create({
    alertBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: '100%',
        maxWidth: 350,
        marin: 24,
        backgroundColor: color.background,
        borderRadius: 20,
        elevation: 5,
    },
    title: {
        fontFamily: 'SF-Pro-Rounded_bold',
        textAlign: 'center',
        fontSize: 20,
        margin: 40,
        marginTop: 10,
        marginBottom: 10,
    },
    message: {
        fontFamily: 'SF-Pro-Rounded_medium',
        fontSize: 18,
        margin: 24,
        marginTop: 5,
        marginBottom: 15,
        color: color.textBackground,
    },
    backdrop: {
        backgroundColor: '#232f34',
        opacity: 0.3,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    buttonBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
    },
    xContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10,
        paddingRight: 20,
    },
})

export default styles
