import { StyleSheet } from 'react-native'
import color from '../../../styles/color'

const styles = StyleSheet.create({
    imgContainer: {
        width: '100%',
        height: 270,
    },
    img: {
        width: '100%',
        height: '100%',
    },

    bodyContainer: {
        flex: 6,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
    },
    headerText: {
        width: '100%',

        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 14,
        textAlign: 'center',
    },

    tabBody: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    recipe: {
        marginVertical: 10,
    },
    recipeTitle: {
        fontFamily: 'SF-Pro-Rounded_semibold',
        fontSize: 20,
    },

    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontFamily: 'SF-Pro-Rounded_bold',
        fontSize: 20,
    },
    sectionText: {
        fontFamily: 'SF-Pro-Rounded_regular',
        fontSize: 17,
    },
    sectionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    nutrientElement: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    nutrientElementTitle: {
        flexBasis: '20%',
    },
    progressBar: {
        marginLeft: 20,
        borderRadius: 10,
    },
    button: {
        flex: 1,
        alignItems: 'center',
    },
    reviewCardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    videoContainer: {
        width: '100%',
        height: 270,
    },
    video: {
        width: 400,
        height: 270,
    },
})

export default styles
