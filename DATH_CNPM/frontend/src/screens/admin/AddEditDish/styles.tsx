import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    videoContainer: {
        width: '100%',
        height: 270,
    },
    video: {
        width: 400,
        height: 270,
    },
    information_container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputContainer: {
        width: 120,
    },
    space_3items: {
        flexDirection: 'row',
        marginTop: 10,
    },
    text_1: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 19,
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 10,
    },
    button_container: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        paddingTop: 30,
        marginRight: 20,
        marginBottom: 20,
    },
    button: {
        marginHorizontal: 10,
    },
})

export default styles
