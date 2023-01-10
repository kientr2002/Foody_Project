import React, { FC, ReactElement, useRef, useState } from 'react'
import { FlatList, Text, TouchableOpacity, Modal, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import styles from './styles'

interface Props {
    label: string
    data: Array<string>
    onSelect: (item: string) => void
}

interface Item {
    label: string
}

const Dropdown: FC<Props> = ({ label, data, onSelect }) => {
    const DropdownButton = useRef<TouchableOpacity>(null)
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState<string>()
    const [dropdownTop, setDropdownTop] = useState(0)

    const toggleDropdown = (): void => {
        visible ? setVisible(false) : openDropdown()
    }

    const openDropdown = (): void => {
        DropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
            setDropdownTop(py + h / 2)
        })
        setVisible(true)
    }

    const onItemPress = (item: string): void => {
        setSelected(item)
        onSelect(item)
        setVisible(false)
    }

    const renderItem = ({ item }: any): ReactElement<any, any> => (
        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
            <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
    )

    const renderDropdown = (): ReactElement<any, any> => {
        return (
            <Modal visible={visible} transparent animationType='none'>
                <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={[styles.dropdown, { top: dropdownTop }]}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    return (
        <TouchableOpacity
            ref={DropdownButton}
            style={styles.button}
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text style={styles.buttonText}>{selected || label}</Text>
            <FontAwesome name='caret-down' size={22} color='black' />
        </TouchableOpacity>
    )
}

export default Dropdown
