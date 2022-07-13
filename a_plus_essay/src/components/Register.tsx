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
import SubjectRow from "./SubjectRow";



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
const passwordLength = 7
const mobileNumberLength = 8

export default function Register() {
    const [page, setPage] = useState({ step: 1 })
    const [disableNext, setDisableNext] = useState(false)

    const [role, setRole] = useState<RadioButtonProps[]>(roleData)
    const [contact, setContact] = useState<RadioButtonProps[]>(contactData)

    // Page One Information (Create new account)
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firmPassword, setFirmPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [isTutor, setIsTutor] = useState(false)
    const [isSignal, setIsSignal] = useState(false)

    // Checking Page One
    const [passwordLengthEnough, setPasswordLengthEnough] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [emailUnique, setEmailUnique] = useState(false)
    const [mobileValid, setMobileValid] = useState(false)

    // Page Two Information (Academic Information)
    const [transcriptUri, setTranscriptUri] = useState(null)
    const [studentCardUri, setStudentCardUri] = useState(null)
    const [transcriptName, setTranscriptName] = useState('')
    const [studentCardName, setStudentCardName] = useState('')

    // Checking Page Two

    // Page Three Information (School Life 1)
    const [schoolLife, setSchoolLife] = useState({
        school: null,
        major: null,
        tutorIntroduction: null
    })

<<<<<<< HEAD
    // Checking Page Three

    // Page Four Information (School Life 2)
    const [subjects, setSubjects] = useState([])
    const [preSubjects, setPreSubjects] = useState([])
    let mapSubjectRow = subjects.map((_,i)=> <SubjectRow id={i}/>)
    useEffect(()=>{
        mapSubjectRow = subjects.map((_,i)=> <SubjectRow id={i}/>)
    },[subjects])
=======
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
>>>>>>> 6a0495a1bba06aff282b69d5d7fd12661ac9780b

    const openGallery = (type: string) => {
        launchImageLibrary({
            mediaType: 'photo',
            // includeBase64: true
        }, (res) => {
            if (res.didCancel) {
                console.log('user cancelled image picker')
            } else if (res.errorMessage) {
                console.log('Error: ', res.errorMessage)
            } else if (type === 'transcript') {
                const file = { uri: res.assets[0].uri }
                const filename = res.assets[0].fileName
                setTranscriptUri(() => file)
                setTranscriptName(() => filename)
            } else if (type === 'studentCard') {
                const file = { uri: res.assets[0].uri }
                const filename = res.assets[0].fileName
                setStudentCardUri(() => file)
                setStudentCardName(() => filename)
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

    // Check Page One (Create an account)
    useEffect(() => {
        // Todo: fetch server to check email
        if (page.step !== 1) {
            return
        }
        if (true) {
            setEmailUnique(true)
            console.log('email: ', emailUnique)
        }
        if (password.length > passwordLength) {
            setPasswordLengthEnough(true)
            console.log('pw length: ', passwordLengthEnough)
        } else {
            setPasswordLengthEnough(false)
            console.log('pw length: ', passwordLengthEnough)
        }
        if (firmPassword === password) {
            setPasswordMatch(true)
            console.log('pw match: ', passwordMatch)
            console.log('pw: ', password)
        } else {
            setPasswordMatch(false)
            console.log('pw match: ', passwordMatch)
        }
        if (mobileNumber.length === mobileNumberLength && !isNaN(+mobileNumber)) {
            setMobileValid(true)
            console.log('mobile valid', mobileValid)
        } else {
            setMobileValid(false)
            console.log('mobile valid', mobileValid)
        }
        if (emailUnique && passwordLengthEnough && passwordMatch && mobileValid) {
            setDisableNext(false)
            console.log('disable next: ', disableNext)
        }
        // }, [nickname, email, password, firmPassword, mobileNumber])
    })

    // Check Page Two (Academic Information)
    useEffect(() => {
        if (page.step !== 2) {
            return
        }
        if (transcriptUri && studentCardUri) {
            setDisableNext(false)
        }
    }, [transcriptUri, studentCardUri])

    // Check Page Three (School Life 1)
    useEffect(() => {
        if (page.step !== 3) {
            return
        }
        if (schoolLife.school && schoolLife.major) {
            setDisableNext(false)
        }
    }, [schoolLife])

    // Check Page Four (School Life 2)
    useEffect(() => {
        if (page.step !== 4) {
            return
        }
        if (preSubjects.length >= 1) {
            setDisableNext(false)
        }
    }, [subjects, preSubjects])

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
                    <TextInput style={styles.input} placeholder="Nickname" onChangeText={(nickname) => setNickname(nickname)} />
                    <TextInput style={styles.input} placeholder="Email address" onChangeText={(email) => setEmail(email)} />
                    <TextInput style={styles.input} placeholder="Password" onChangeText={(password) => setPassword(password)} />
                    <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={(firmPassword) => setFirmPassword(firmPassword)} />
                    {/* {passwordNotMatch && <Text style={{color: 'red', fontSize: 10}}>Password not match</Text>} */}
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
                    <TextInput style={styles.input} placeholder='Mobile Number' onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)} />
                    <TouchableOpacity disabled={disableNext} onPress={() => {
                        setPage({ step: 2 })
                        // setDisableNext(true)
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
                    {transcriptName && <Text>{transcriptName}</Text>}

                    <View style={{ flexDirection: 'row' }}>
                        <Text>Student Card</Text>
                        <TouchableOpacity onPress={() => openGallery('studentCard')}>
                            <Text>Choose Photo</Text>
                        </TouchableOpacity>
                    </View>
<<<<<<< HEAD
                    {studentCardName && <Text>{studentCardName}</Text>}
=======
                    {/* {studentCardName !== null && <View>HIHIHI</View>} */}
                    <Image source={studentCardUri} />
>>>>>>> 6a0495a1bba06aff282b69d5d7fd12661ac9780b

                    {/* FOR TESTING */}
                    <View>
                        <Image source={studentCardUri} style={{ height: 100, width: 100 }} />
                    </View>

                    <TouchableOpacity disabled={disableNext} onPress={() => {
                        setPage({ step: 3 })
                        // setDisableNext(true)
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

                    <TouchableOpacity disabled={disableNext} onPress={() => {
                        setPage({ step: 4 })
                        // setDisableNext(true)
                    }} >
                        <Text>Next</Text>
                    </TouchableOpacity>
                </> : null}

            {page.step === 4 ?
                <>
                    <Text>School Life</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 0.7, marginLeft: 55, alignItems: 'center'}}>Subject</Text>
                        <Text style={{ flex: 0.2, alignItems: 'center' }}>Grade</Text>
                        <Button title='+' onPress={()=>setSubjects([...subjects, ''])} />
                        {/* <TouchableOpacity onPress={()=>setSubjects([...subjects, ''])}>
                            <Text style={{ flex: 0.1, marginRight: 50, fontSize: 20}}>+</Text>
                        </TouchableOpacity> */}
                    </View>
                    {mapSubjectRow}

                    {/* <View style={{ flexDirection: 'row' }}>
                        <TextInput style={styles.subjects} onChangeText={value => {
                            setSubjects([...subjects, value])
                        }} />
                        <TextInput style={styles.subjectsGrade} />
                        <TouchableOpacity onPress={() => {}}>
                            <Text style={styles.editRow}>+</Text>
                        </TouchableOpacity>
                    </View> */}
                    {/* <SubjectRow subject={subject}/> */}
                    {/* <View style={{ flexDirection: 'row' }}>
                        <TextInput style={styles.subjects} onChangeText={value => {
                            setSubject([...subject, value])
                        }} />
                        <TextInput style={styles.subjectsGrade} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput style={styles.subjects} onChangeText={value => {
                            setSubject([...subject, value])
                        }} />
                        <TextInput style={styles.subjectsGrade} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput style={styles.subjects} onChangeText={value => {
                            setSubject([...subject, value])
                        }} />
                        <TextInput style={styles.subjectsGrade} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput style={styles.subjects} onChangeText={value => {
                            setSubject([...subject, value])
                        }} />
                        <TextInput style={styles.subjectsGrade} />
                    </View> */}

                    <Text>Preference Subject (3 Limited)</Text>
                    <TextInput style={styles.input} onChangeText={value => {
                        value.length > 0 ? setPreSubjects([...preSubjects, value]) : null
                    }} />
                    <TextInput style={styles.input} onChangeText={value => {
                        value.length > 0 ? setPreSubjects([...preSubjects, value]) : null
                    }} />
                    <TextInput style={styles.input} onChangeText={value => {
                        value.length > 0 ? setPreSubjects([...preSubjects, value]) : null
                    }} />

                    <TouchableOpacity disabled={disableNext} onPress={() => {
                        // Send to DB
                        console.log(preSubjects)
                        console.log('success create')
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
    subjects: {
        padding: 10,
        margin: 10,
        marginLeft: 50,
        borderRadius: 10,
        // width: 150,
        flex: 0.7,
        backgroundColor: 'white',
    },
    subjectsGrade: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        // width: 50,
        flex: 0.2,
        backgroundColor: 'white',
    },
    editRow: {
        padding: 10,
        margin: 10,
        marginRight: 50,
        fontSize: 20,
        flex: 0.1
    },
    checkbox: {
        padding: 10,
        textDecoration: 'none'
    }
})