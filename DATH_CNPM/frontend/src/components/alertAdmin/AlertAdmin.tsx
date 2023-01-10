import * as React from 'react'
import { Modal, View, Pressable, Text } from 'react-native'
import Button from '../button/Button'

import styles from './styles'
import { Foundation } from '@expo/vector-icons'

export interface AlertAttribute {
    visible: boolean
    setVisible: (v: boolean) => void
    handleOk?: () => void
}

function ButtonBox(props: any) {
    return (
        <View style={styles.buttonBox}>
            <Button
                type='error'
                content='cancel'
                onPress={() => props?.setVisible(false)}
            />

            <Button
                type='confirm'
                content='SUBMIT'
                onPress={() => {
                    props?.setVisible(false)
                    props?.handleOk?.()
                }}
            />
        </View>
    )
}

export default function AlertAdmin({
    visible,
    setVisible,
    handleOk,
}: AlertAttribute) {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.alertBox}>
                <View style={styles.box}>
                    <View style={styles.xContainer}>
                        <Pressable onPress={() => setVisible(false)}>
                            <Foundation name='x' size={30} color='#ADAAAA' />
                        </Pressable>
                    </View>
                    <Text style={styles.title}>
                        Are you sure want to do this?
                    </Text>
                    <ButtonBox setVisible={setVisible} handleOk={handleOk} />
                </View>
            </View>
        </Modal>
    )
}
