import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import Alert from '../../../components/alert/Alert'
import Button from '../../../components/button/Button'
import Input from '../../../components/input/Input'
import styles from './styles'
import Dropdown from '../../../components/dropdown/Dropdown'
import UserContext, { UserContextInterface } from '../../../context/UserContext'

export default function Calculate({ navigation }: any) {
    const targets = ['Increase Weight', 'Reduce Weight', 'Keep This Weight']
    const data = [ 
        'Sedentary',
        'Light exercise (1-2 days/week)',
        'Moderate exercise (3-4 days/week)',
        'Heavy exercise (6-7 days/week)',
        'Athlete exercise (2x per day)',
    ]

    const { name } = React.useContext<UserContextInterface>(UserContext)
    const [success, setSuccess] = React.useState<boolean>(false)
    const [warningWeight, setWarningWeight] = React.useState<string>('')
    const [warningHeight, setWarningHeight] = React.useState<string>('')
    const [warningActivity, setWarningActivity] = React.useState<string>('')
    const [warningYourTarget, setWarningYourTarget] = useState<string>('')
    const [weight, setWeight] = React.useState<string>('')
    const [height, setHeight] = React.useState<string>('')
    const [activity, setActivity] = React.useState<string>('')
    const [yourTarget, setYourTarget] = useState<string>('')

    const [activity1, setActivity1] = React.useState<string>('')
    const [object, setObject] = useState<string>('')

    const [visible, setVisible] = React.useState<boolean>(false)
    const [notification, setNotification] = useState<string>('')

    
    const handleNavigate = (success: Boolean) => {
        if (success) navigation.goBack()
        else return null
    }

    const verifyInformation = (weight: string, height: string, activity: string, target: string) => {
        let  flag = 0
        if(weight === ''){
            flag++
            setWarningWeight('Please enter weight')
        } else {
            setWarningWeight('')
        }
        if (height === '') {
            flag++
            setWarningHeight('Please enter height')
        } else {
            setWarningHeight('')
        }
        if (activity === '') {
            flag++
            setWarningActivity('Please choose activity')
        }else {
            if(activity === 'Sedentary'){
                setActivity1('very little')
            } else if (activity === 'Light exercise (1-2 days/week)'){
                setActivity1('little')
            } else if (activity ===  'Moderate exercise (3-4 days/week)') {
                setActivity1('normal')
            } else if (activity === 'Heavy exercise (6-7 days/week)'){
                setActivity1('heavy')
            } else {
                setActivity1('very heavy')
            }
            setWarningActivity('')
        }
        if (target === '') {
            flag++
            setWarningYourTarget('Please choose target')
        } else {
            if(target === 'Increase Weight'){
                setObject('increase')
            } else if(target === 'Reduce Weight'){
                setObject('stable')               
            } else {
                setObject('decrease')
            }
            setWarningYourTarget('')
        }
        if(flag === 0){
            handleChangeTDEE(
                Number.parseInt(height),
                Number.parseInt(weight),
                activity1,
                object
            )
        }
    }

    const handleChangeTDEE = async(
        outputHeight: number,
        outputWeight: number,
        activity: string,
        object: string,
    ) => {
          if(name == ''){
            setSuccess(false)
            setNotification('Please Submit again')
            setVisible(true)
          } else {
            try{
                const response = await fetch(
                    'https://foodyforapi.herokuapp.com/CalcTDEE',
                    {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: name,
                            height: outputHeight,
                            weight: outputWeight,
                            activity: activity,
                            object: object,
                        }),
                    }
                )
                const data = await response.json()
                if(data.result == 'fail'){
                    setNotification('Caculate has been failed!')
                } else {
                    setNotification('TDEE has been update')
                    setSuccess(true)
                }
                setVisible(true)
            }  catch (error) {
                console.error(error)
            }
          }
    }

    return (
        <>
            <Alert
                type='create_plan'
                title={success ? 'Success' : 'notification'}
                message= {notification}
                visible={visible}
                setVisible={setVisible}
                handleOk={() => {
                    handleNavigate(success)
                }}
            />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Update your status</Text>

                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <Input
                            type='weight'
                            value={weight}
                            setValue={setWeight}
                        />
                        <Text style={styles.warningText}>{warningWeight}</Text>
                    </View>
                    <View style={styles.input}>
                        <Input
                            type='height'
                            value={height}
                            setValue={setHeight}
                        />
                        <Text style={styles.warningText}>{warningHeight}</Text>
                    </View>

                    <View style={styles.dropdown}>
                        <Dropdown
                            label='Activity'
                            data={data}
                            onSelect={(data) => {
                                setActivity(data)
                            }}
                        />
                        <Text style={styles.warningText}>
                            {warningActivity}
                        </Text>
                    </View>

                    <View style={styles.target}>
                        <Text style={styles.targetHeader}>
                            Choose your target
                        </Text>
                        <View style={styles.targetContent}>
                            {targets.map((target) => (
                                <View key={target} style={styles.chooseButton}>
                                    <TouchableOpacity
                                        style={styles.outter}
                                        onPress={() => setYourTarget(target)}
                                    >
                                        {target === yourTarget && (
                                            <View style={styles.inner} />
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.textChooseButton}>
                                        {target}{' '}
                                    </Text>
                                </View>
                            ))}
                            <Text style={styles.warningText}>
                                {warningYourTarget}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        content='Calculate TDEE'
                        type='confirm'
                        arrow
                        onPress={() => {
                            verifyInformation(
                                weight,
                                height,
                                activity,
                                yourTarget
                            )
                        }}
                    />
                </View>
            </ScrollView>
        </>
    )
}
