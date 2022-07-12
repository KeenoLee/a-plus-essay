import { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Button, Text, Image } from "react-native";
import * as React from 'react'
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { Formik, Field, Form } from 'formik';
import { StackActions, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterSuccess from "./RegisterSuccess";
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';



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
    const [transcriptUri, setTranscriptUri] = useState(null)
    const [studentCardUri, setStudentCardUri] = useState(null)

    const [transcriptName, setTranscriptName] = useState(null)
    const [studentCardName, setStudentCardName] = useState(null)

    const [transcription, setTranscription] = useState(null)
    const [studentCard, setStudentCard] = useState(null)
    const [schoolLife, setSchoolLife] = useState({
        school: '',
        major: '',
        tutorIntroduction: ''
    })
    const [subject, setSubject] = useState([])
    const [preSubject, setPreSubject] = useState([])

    // const openCamera = () => {
    //     launchCamera({
    //         mediaType: 'photo',
    //         includeBase64: true
    //     }, res => {
    //         if (res.didCancel) {
    //             console.log('user cancelled image picker')
    //         } else if (res.errorMessage) {
    //             console.log('Error: ', res.errorMessage)
    //         } else {
    //             const source = { url: 'data:image/jpeg:base64,' + res.assets }
    //         }
    //     })
    // }

    const openGallery = (type: string) => {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true
        }, res => {
            if (res.didCancel) {
                console.log('user cancelled image picker')
            } else if (res.errorMessage) {
                console.log('Error: ', res.errorMessage)
            } else if (type === 'transcript') {
                const file = { uri: 'data:image/jpeg:base64,' + res.assets[0].base64 }
                const filename = res.assets[0].fileName
                setTranscriptUri(file)
                setTranscriptName(filename)
            } else if (type === 'studentCard') {
                const file = { uri: 'data:image/jpeg:base64,' + res.assets[0].base64 }
                const filename = res.assets[0].fileName
                setStudentCardUri(file)
                setStudentCardName(filename)
                console.log('A: ', filename)
                console.log(typeof filename)
                console.log('Should same: ', studentCardName) // Old State!
            }
            return
        })
    }


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
                    <Button
                        title='Create Account'
                        onPress={() => {
                            setContact
                        }}
                        disabled={!nickname && !email && !password && !firmPassword} />
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
                    <TouchableOpacity onPress={() => {
                        setPage({ step: 2 })
                    }}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </>
            }
            {page.step === 2 ?
                <>
                    <Text>Academic Infomation</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Transcript</Text>
                        <TouchableOpacity onPress={() => openGallery('transcript')}>
                            <Text>Choose Photo</Text>
                        </TouchableOpacity>
                    </View>
                    {/* {transcriptName !== null && <View>{transcriptName}</View>} */}

                    <View style={{ flexDirection: 'row' }}>
                        <Text>Student Card</Text>
                        <TouchableOpacity onPress={() => openGallery('studentCard')}>
                            <Text>Choose Photo</Text>
                        </TouchableOpacity>
                    </View>
                    {/* {studentCardName !== null && <View>HIHIHI</View>} */}
                    <Image source={studentCardUri} />

                    <TouchableOpacity onPress={() => {
                        setPage({ step: 3 })
                    }} >
                        <Text>Next</Text>
                    </TouchableOpacity>
                </> : null}

            {page.step === 3 ?
                <>
                    <Text>School Life</Text>
                    <TextInput style={styles.input} placeholder="School" onChangeText={value => setSchoolLife({
                        ...schoolLife,
                        school: value
                    })} />
                    <TextInput style={styles.input} placeholder="Major" onChangeText={value => setSchoolLife({
                        ...schoolLife,
                        major: value
                    })} />
                    <TextInput style={styles.input} placeholder="Tutor Introduction" onChangeText={value => setSchoolLife({
                        ...schoolLife,
                        tutorIntroduction: value
                    })} />

                    <TouchableOpacity onPress={() => {
                        setPage({ step: 4 })
                    }} >
                        <Text>Next</Text>
                    </TouchableOpacity>
                </> : null}

            {page.step === 4 ?
                <>
                    <Text>School Life</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={(value) => {
                            setSubject([...subject, value])
                        }} />
                        <TextInput />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={(value) => {
                            setSubject([...subject, value])
                        }} />
                        <TextInput />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={(value) => {
                            setSubject([...subject, value])
                        }} />
                        <TextInput />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={(value) => {
                            setSubject([...subject, value])
                        }} />
                        <TextInput />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput onChangeText={(value) => {
                            setSubject([...subject, value])
                        }} />
                        <TextInput />
                    </View>

                    <Text>Preference Subject (3 Limited)</Text>
                    <TextInput onChangeText={value => {
                        setPreSubject([...preSubject, value])
                    }} />
                    <TextInput onChangeText={value => {
                        setPreSubject([...preSubject, value])
                    }} />
                    <TextInput onChangeText={value => {
                        setPreSubject([...preSubject, value])
                    }} />

                    <TouchableOpacity onPress={() => {
                        setContact
                    }} >
                        <Text>Create Account</Text>
                    </TouchableOpacity>
                </> : null}
        </View>
    )
}

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