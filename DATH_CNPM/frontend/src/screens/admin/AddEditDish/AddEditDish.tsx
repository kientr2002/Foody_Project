import * as React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import Button from '../../../components/button/Button'
import Input from '../../../components/input/Input'
import AlertAdmin from '../../../components/alertAdmin/AlertAdmin'
import Alert from '../../../components/alert/Alert'
import TextArea from '../../../components/textarea/TextArea'
import styles from './styles'
export default function AddEditDish({ route, navigation }: any) {
    const { id, name, des, image, recipt, calo, protein, fat, carb }: any =
        route?.params
    const [dishName, setDishName] = React.useState<string>(name)
    const [dishImage, setDishImage] = React.useState<string>(image)
    const [dishRecipt, setDishRecipt] = React.useState<string>(recipt)
    const [dishCalo, setDishCalo] = React.useState<string>(calo?.toString())
    const [dishProtein, setDishProtein] = React.useState<string>(
        protein?.toString()
    )
    const [dishFat, setDishFat] = React.useState<string>(fat?.toString())
    const [dishCarb, setDishCarb] = React.useState<string>(carb?.toString())
    const [description, setDescription] = React.useState<string>(des)
    const [submit, setSubmit] = React.useState<boolean>(false)
    const [fail, setFail] = React.useState<boolean>(false)
    const [success, setSuccess] = React.useState<boolean>(false)
    const [failEdit, setFailEdit] = React.useState<boolean>(false)

    const handleAdd = async (
        name: string,
        calo: number,
        protein: number,
        fat: number,
        carb: number,
        description: string,
        image: string,
        recipt: string
    ) => {
        try {
            const response = await fetch(
                'https://foodyforapi.herokuapp.com/food',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        calo: calo,
                        protein: protein,
                        fat: fat,
                        carb: carb,
                        description: description,
                        image: image,
                        recipt: recipt,
                    }),
                }
            )
            const data = await response.json()
            if (data.result === 'ok') {
                setSuccess(true)
            } else {
                setFail(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleEdit = async (
        id: number,
        calo: number,
        protein: number,
        fat: number,
        carb: number,
        description: string,
        image: string,
        recipt: string
    ) => {
        try {
            const response = await fetch(
                'https://foodyforapi.herokuapp.com/food',
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: id,
                        calo: calo,
                        protein: protein,
                        fat: fat,
                        carb: carb,
                        description: description,
                        recipt: recipt,
                        image: image,
                    }),
                }
            )
            const data = await response.json()
            if (data.result === 'ok') {
                setSuccess(true)
            } else {
                setFailEdit(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <AlertAdmin
                visible={submit}
                setVisible={setSubmit}
                handleOk={() => {
                    !id 
                        ? handleAdd(
                              dishName,
                              Number.parseInt(dishCalo),
                              Number.parseInt(dishProtein),
                              Number.parseInt(dishFat),
                              Number.parseInt(dishCarb),
                              description,
                              dishImage,
                              dishRecipt
                          )
                        : handleEdit(
                              id,
                              Number.parseInt(dishCalo),
                              Number.parseInt(dishProtein),
                              Number.parseInt(dishFat),
                              Number.parseInt(dishCarb),
                              description,
                              dishImage,
                              dishRecipt
                          )
                }}
            />
            <Alert
                type='change_password'
                title='Success'
                message='Success'
                visible={success}
                setVisible={setSuccess}
                handleOk={() => navigation.navigate('Food list', {
                    id: id,
                    name: dishName,
                    des: description,
                    image: dishImage,
                    avgStar: 0,
                    recipt: dishRecipt,
                    calo: Number(dishCalo),
                    protein: Number(dishProtein),
                    fat: Number(dishFat),
                    carb: Number(dishCarb)
                })}
            />
            <Alert
                type='change_password'
                title='Fail'
                message='This food have already existed'
                visible={fail}
                setVisible={setFail}
            />
            <Alert
                type='change_password'
                title='Fail'
                message='Edit failed'
                visible={failEdit}
                setVisible={setFailEdit}
            />
            
            <ScrollView contentContainerStyle={styles.information_container}>
                <View style={styles.videoContainer}>
                    <Image source={{ uri: dishImage !== '' ? dishImage : undefined }} style={styles.video} />
                </View>
                {/* Dish name */}
                <Text style={styles.text_1}>Dish name</Text>
                <Input
                    focus={false}
                    value={dishName}
                    setValue={setDishName}
                />

                {/* Calorioes */}
                <Text style={styles.text_1}>Calories</Text>
                <Input
                    focus={false}
                    value={dishCalo}
                    setValue={setDishCalo}
                />

                <Text style={styles.text_1}>Recipe video</Text>
                <Input
                    focus={false}
                    value={dishRecipt}
                    setValue={setDishRecipt}
                />

                <Text style={styles.text_1}>Image</Text>
                <Input
                    focus={false}
                    value={dishImage}
                    setValue={setDishImage}
                />

                <View style={styles.space_3items}>
                    <View>
                        <Text style={styles.text_1}>Protein</Text>
                        <View style={styles.inputContainer}>
                            <Input
                                focus={false}
                                value={dishProtein}
                                setValue={setDishProtein}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.text_1}>Fat</Text>
                        <View style={styles.inputContainer}>
                            <Input
                                focus={false}
                                value={dishFat}
                                setValue={setDishFat}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.text_1}>Carb</Text>
                        <View style={styles.inputContainer}>
                            <Input
                                focus={false}
                                value={dishCarb}
                                setValue={setDishCarb}
                            />
                        </View>
                    </View>
                </View>

                {/* Description */}
                <Text style={styles.text_1}>Description</Text>
                <TextArea
                    value={description}
                    setValue={setDescription}
                />

                {/* Button DELETE and EDIT */}
                <View style={styles.button_container}>
                    <View style={styles.button}>
                        <Button
                            content='CANCEL'
                            type='error'
                            onPress={() => {
                                setSubmit(false)
                                navigation.goBack()
                            }}
                        />
                    </View>
                    <View>
                        <Button
                            content='SUBMIT'
                            type='confirm'
                            onPress={() => setSubmit(true)}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
