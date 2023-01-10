import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import color from '../../styles/color'
const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 50,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        borderRadius: 20,
        backgroundColor: color.background,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonText: {
        flex: 1,
        fontFamily: 'SF-Pro-Rounded_medium',
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 10,
    },
    icon: {
        marginRight: 20,
    },
    dropdown: {
        width: '90%',
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'absolute',
        left: 20,
        backgroundColor: '#fff',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        elevation: 1,
    },
    overlay: {
        width: '100%',
        height: '100%',
    },
    item: {
        paddingVertical: 10,
    },
    text: {
        fontFamily: 'SF-Pro-Rounded_medium',
        fontSize: 15,
    },
})
export default styles
