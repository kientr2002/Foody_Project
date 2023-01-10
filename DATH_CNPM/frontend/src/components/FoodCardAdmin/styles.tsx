import { StyleSheet } from 'react-native'
import color from '../../styles/color'

const styles = StyleSheet.create({
    background: {
        position: 'relative',
        borderRadius: 20,
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        backgroundColor: color.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 2,
    },
    title: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 20,
    },
    background_3: {
        height: 90,
        flexDirection: 'row',
    },
    img_3: {
        width: 120,
        height: '100%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    content_2: {
        width: '65%',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    name: {
        flex: 9,
        justifyContent: 'center',
    },
    icon: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconActive: {
        color: color.second,
        shadowColor: '#000',
        elevation: 10,
    },
    menu1: {
        position: 'absolute',
        display: 'none',
        right: 0,
        bottom: 0,
        width: 120,
        padding: 10,
        backgroundColor: color.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    menu2: {
        position: 'absolute',
        right: 25,
        bottom: -10,
        width: 100,
        padding: 10,
        backgroundColor: color.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
})

export default styles
