import { StyleSheet } from 'react-native'
import color from '../../styles/color'

const styles = StyleSheet.create({
    background: {
        width: '100%',
        paddingVertical: 10,

        display: 'flex',
        flexDirection: 'row',

        // position: 'absolute',
        // bottom: 0,
        // zIndex: 10,

        backgroundColor: color.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
    },
    element: {
        flexBasis: '20%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: color.textBackground,
    },
    iconActive: {
        color: color.second,
        shadowColor: '#000',
        elevation: 10,
    },
})

export default styles
