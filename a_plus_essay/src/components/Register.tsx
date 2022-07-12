import { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import * as React from 'react'
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { Formik, Field, Form } from 'formik';
import { StackActions, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterSuccess from "./RegisterSuccess";
import { TouchableOpacity } from "react-native-gesture-handler";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';



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
    const [page, setPage] = useState({ step: 1 })
    const [role, setRole] = useState<RadioButtonProps[]>(roleData)
    const [contact, setContact] = useState<RadioButtonProps[]>(contactData)
    const [nickname, setNickname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [firmPassword, setFirmPassword] = useState(null)
    const [isTutor, setIsTutor] = useState(false)
    const [isSignal, setIsSignal] = useState(false)
    const [transcription, setTranscription] = useState(null)
    const [studentCard, setStudentCard] = useState(null)
    const [schoolLife, setSchoolLife] = useState({
        school: '',
        major: '',
        tutorIntroduction: ''
    })
    const [subject, setSubject] = useState([''])
    const [preSubject, setPreSubject] = useState([''])

    // const result = await launchCamera({mediaType: 'photo', cameraType: 'back'});



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
            {page.step === 1 ?
                <>
                    <Text>Create New Account</Text>
                    <RadioGroup
                        containerStyle={{ flexDirection: 'row' }}
                        radioButtons={role}
                        onPress={() => {
                            onPressRole
                            setIsTutor(!isTutor)
                        }}
                    />
                    <TextInput style={styles.input} placeholder="Nickname" onChangeText={() => setNickname(nickname)} />
                    <TextInput style={styles.input} placeholder="Email address" onChangeText={() => setEmail(email)} />
                    <TextInput style={styles.input} placeholder="Password" onChangeText={() => setPassword(password)} />
                    <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={() => setFirmPassword(firmPassword)} />
                </> : null}
            {!isTutor && page.step === 1 &&
                <TouchableOpacity>
                    <Button title='Create Account' onPress={() => {
                        setContact
                    }} />
                </TouchableOpacity>
            }
            {/* Submit Page 1 */}
            {isTutor && page.step === 1 &&
                <>
                    <RadioGroup
                        containerStyle={{ flexDirection: 'row' }}
                        radioButtons={contact}
                        onPress={() => {
                            onPressContact
                            setIsSignal(!isSignal)
                        }}
                    />
                    <TextInput style={styles.input} placeholder='Mobile Number' />
                    <TouchableOpacity>
                        <Button title='Next' onPress={() => {
                            setContact
                            setPage({ step: 2 })
                        }} />
                    </TouchableOpacity>
                </>
            }
            {page.step === 2 ?
                <>
                    <Text>Academic Infomation</Text>
                    <TouchableOpacity>
                        <Button title='Next' onPress={() => {
                            setContact
                            setPage({ step: 3 })
                        }} />
                    </TouchableOpacity>

                </> : null}

            {page.step === 3 ?
                <>
                    <Text>School Life</Text>
                    <TextInput style={styles.input} placeholder="School" onChangeText={(value) => setSchoolLife({
                        ...schoolLife,
                        school: value
                    })} />
                    <TextInput style={styles.input} placeholder="Major" onChangeText={(value) => setSchoolLife({
                        ...schoolLife,
                        major: value
                    })} />
                    <TextInput style={styles.input} placeholder="Tutor Introduction" onChangeText={(value) => setSchoolLife({
                        ...schoolLife,
                        tutorIntroduction: value
                    })} />

                    <TouchableOpacity>
                        <Button title='Next' onPress={() => {
                            setContact
                            setPage({ step: 4 })
                        }} />
                    </TouchableOpacity>
                </> : null}

            {page.step === 4 ?
                <>
                    <Text>School Life</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={(value) => {
                            setSubject([...subject, value])
                        }}/>
                        <TextInput />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={(value) => {
                            setSubject([...subject, value])
                        }}/>
                        <TextInput />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={(value) => {
                            setSubject([...subject, value])
                        }}/>
                        <TextInput />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={(value) => {
                            setSubject([...subject, value])
                        }}/>
                        <TextInput />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={(value) => {
                            setSubject([...subject, value])
                        }}/>
                        <TextInput />
                    </View>
                    
                    <Text>Preference Subject (3 Limited)</Text>
                    <TextInput onChangeText={(value) => {
                        setPreSubject([...preSubject, value])
                    }} />
                    <TextInput onChangeText={(value) => {
                        setPreSubject([...preSubject, value])
                    }} />
                    <TextInput onChangeText={(value) => {
                        setPreSubject([...preSubject, value])
                    }} />
                    
                    <TouchableOpacity>
                        <Button title='Create Account' onPress={() => {
                            setContact
                        }} />
                    </TouchableOpacity>
                </> : null}
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