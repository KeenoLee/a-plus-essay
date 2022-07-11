import { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import * as React from 'react'
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { create, MMKVLoader } from "react-native-mmkv-storage";
import { Formik, Field, Form } from 'formik';
import { StackActions, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterSuccess from "./RegisterSuccess";


const MMKV = new MMKVLoader().initialize();
export const useStorage = create(MMKV);
const roleData: RadioButtonProps[] = [{
    id: '1',
    label: 'Student',
    value: 'student',
    selected: true
}, {
    id: '2',
    label: 'Tutor',
    value: 'tutor'
}]
const contactData: RadioButtonProps[] = [{
    id: '1',
    label: 'Whatsapp',
    value: 'whatsapp',
    selected: true
}, {
    id: '2',
    label: 'Signal',
    value: 'signal'
}]

const RegisterStack = createStackNavigator()

function RegisterStacks() {
  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen name='RegisterSuccess' component={RegisterSuccess} />
      <RegisterStack.Screen name='TutorAcademic' component={Register} />
    </RegisterStack.Navigator>
  )
}

export default function Register() {
    const [role, setRole] = useState<RadioButtonProps[]>(roleData)
    const [contact, setContact] = useState<RadioButtonProps[]>(contactData)
    const [nickname, setNickname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [firmPassword, setFirmPassword] = useState(null)
    const [isTutor, setIsTutor] = useState(false)
    const [isSignal, setIsSignal] = useState(false)
    const [page, setPage] = useState(1)
    const navigation = useNavigation()

    function onPressRole(roleData: RadioButtonProps[]) {
        setRole(roleData);
    }

    function onPressContact(contactData: RadioButtonProps[]) {
        setContact(contactData)
    }
    useEffect(() => {
        console.log('isTutor ', isTutor)
        console.log('isSignal ', isSignal)
    }, [isTutor, isSignal])

    return (
        <View style={styles.form}>
            
            <RadioGroup
                containerStyle={{ flexDirection: 'row' }}
                radioButtons={role}
                onPress={() => {
                    onPressRole
                    setIsTutor(!isTutor)
                }}
            />
            <TextInput style={styles.input} placeholder="NicknameSSS" onChangeText={() => setNickname(nickname)} />
            <TextInput style={styles.input} placeholder="Email address" onChangeText={() => setEmail(email)} />
            <TextInput style={styles.input} placeholder="Password" onChangeText={() => setPassword(password)} />
            <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={() => setFirmPassword(firmPassword)} />
            {!isTutor && <Button title='Create Account' onPress={() => setContact} />}
            {/* Submit Page 1 */}
            {isTutor &&
                <>
                    <RadioGroup
                        containerStyle={{ flexDirection: 'row' }}
                        radioButtons={contact}
                        onPress={() => {
                            onPressContact
                            setIsSignal(!isSignal)
                        }}
                    />
                    <TextInput style={styles.input} placeholder='Mobile Number'></TextInput>
                    <Button title='Next' onPress={() => {
                        setContact
                        }} />
                </>
            }
        </View>
    )
}

// export function TutorAcademic() {
//     return (

//     )
// }

const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
    },
    input: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: 200,
        backgroundColor: 'white'
    },
    checkbox: {
        padding: 10,
        textDecoration: 'none'
    }
})