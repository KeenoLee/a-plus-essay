import { useEffect, useState } from "react";
import { Button, View, Text, TextInput, StyleSheet, Image } from "react-native";
import * as React from 'react'
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
// import { Formik, Field, Form } from 'formik';
// import { StackActions, useNavigation } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import RegisterSuccess from "./RegisterSuccess";
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchImageLibrary } from 'react-native-image-picker';
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
function shorterFilename(filename: string) {
    if (filename.length > 10) {
        return filename.substring(0, 11) + '...'
    }
    return filename
}

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

    // Checking Page Three

    // Page Four Information (School Life 2)
    const [subjects, setSubjects] = useState([{
        subject: '',
        grade: ''
    }])
    const [preSubjects, setPreSubjects] = useState([])
    // let mapSubjectRow = subjects.map((subject,i)=> <SubjectRow key={i} subject={subject}/>)
    // let mapSubjectRow
    // useEffect(()=>{
    // mapSubjectRow
    // mapSubjectRow = subjects.map((_,i)=> <SubjectRow id={i}/>)
    // },[subjects])

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
                setTranscriptName(() => shorterFilename(filename))
            } else if (type === 'studentCard') {
                const file = { uri: res.assets[0].uri }
                const filename = res.assets[0].fileName
                setStudentCardUri(() => file)
                setStudentCardName(() => shorterFilename(filename))
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
        if (page.step !== 1) {
            return
        }
        // Todo: fetch server to check email
        if (true) {
            setEmailUnique(true)
        }
        if (password.length > passwordLength) {
            setPasswordLengthEnough(true)
        } else {
            setPasswordLengthEnough(false)
        }
        if (firmPassword === password) {
            setPasswordMatch(true)
        } else {
            setPasswordMatch(false)
        }
        if (mobileNumber.length === mobileNumberLength && !isNaN(+mobileNumber)) {
            setMobileValid(true)
        } else {
            setMobileValid(false)
        }
        if (emailUnique && passwordLengthEnough && passwordMatch && mobileValid) {
            setDisableNext(false)
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
        console.log('subjects: ', subjects)
        console.log('preSubjects: ', preSubjects)
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
                    <Text style={styles.title}>Create New Account</Text>
                    <RadioGroup
                        containerStyle={{ flexDirection: 'row', color: 'blue' }}
                        radioButtons={role}
                        onPress={() => {
                            onPressRole
                            setIsTutor(!isTutor)
                        }}
                    />
                    <TextInput style={styles.input} placeholder="Nickname" onChangeText={(nickname) => setNickname(nickname)} />
                    <TextInput style={styles.input} textContentType='emailAddress' placeholder="Email address" onChangeText={(email) => setEmail(email)} />
                    <TextInput style={styles.input} textContentType='password' placeholder="Password" onChangeText={(password) => setPassword(password)} />
                    <TextInput style={styles.input} textContentType='password' placeholder="Confirm Password" onChangeText={(firmPassword) => setFirmPassword(firmPassword)} />
                    {/* {passwordNotMatch && <Text style={{color: 'red', fontSize: 10}}>Password not match</Text>} */}
                </> : null}
            {!isTutor && page.step === 1 &&
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setContact
                    }}
                    disabled={!nickname && !email && !password && !firmPassword}>
                    <Text style={styles.buttonText}>Create Account</Text>
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
                    <TextInput style={styles.input} textContentType='telephoneNumber' placeholder='Mobile Number' onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)} />
                    <TouchableOpacity style={styles.button} disabled={disableNext} onPress={() => {
                        setPage({ step: 2 })
                        // setDisableNext(true)
                    }}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </>
            }
            {page.step === 2 ?
                <>
                    <Text style={styles.title}>Academic Infomation</Text>
                    <View style={{ padding: 10 }}>
                        <View style={styles.fileSelector}>
                            <Text>Transcript</Text>
                            <TouchableOpacity onPress={() => openGallery('transcript')}>
                                <Text>Choose Photo</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ height: 25 }}>
                            {transcriptName && <Text>{transcriptName}</Text>}
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <View style={styles.fileSelector}>
                            <Text>Student Card</Text>
                            <TouchableOpacity onPress={() => openGallery('studentCard')}>
                                <Text>Choose Photo</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 25 }}>

                            {studentCardName && <Text>{studentCardName}</Text>}
                        </View>
                    </View>

                    {/* FOR TESTING */}
                    {/* <Image source={studentCardUri} style={{ height: 100, width: 100 }} /> */}

                    <TouchableOpacity style={styles.button} disabled={disableNext} onPress={() => {
                        setPage({ step: 3 })
                        // setDisableNext(true)
                    }} >
                        <Text style={styles.buttonText} >Next</Text>
                    </TouchableOpacity>
                </> : null}

            {page.step === 3 ?
                <>
                    <Text style={styles.title}>School Life</Text>
                    <TextInput style={styles.input} placeholder="School" onChangeText={value => setSchoolLife({
                        ...schoolLife,
                        school: value
                    })} />
                    <TextInput style={styles.input} placeholder="Major" onChangeText={value => setSchoolLife({
                        ...schoolLife,
                        major: value
                    })} />
                    <TextInput style={styles.tutorIntroduction} multiline placeholder="Tutor Introduction" onChangeText={value => setSchoolLife({
                        ...schoolLife,
                        tutorIntroduction: value
                    })} />

                    <TouchableOpacity style={styles.button} disabled={disableNext} onPress={() => {
                        setPage({ step: 4 })
                        // setDisableNext(true)
                    }} >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </> : null}

            {/* TODO: Subjects & Preference Subjects */}
            {page.step === 4 ?
                <>
                    <Text style={styles.title}>School Life</Text>
                    <View style={{ flexDirection: 'row', width: 300 }}>
                        <Text style={{ flex: 7 }}>Subject</Text>
                        <Text style={{ flex: 2 }}>Grade</Text>
                        <TouchableOpacity style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 30, width: 17, height: 30 }} onPress={() => setSubjects([...subjects, { subject: '', grade: '' }])}>
                            <Text style={{}}>+</Text>
                        </TouchableOpacity>
                    </View>
                    {subjects.map((subject, index) => (
                        <SubjectRow key={index} index={index} subject={subject} onDelete={(index) => {
                            const newSubjects = [...subjects]
                            let filteredNewSubjects = newSubjects.filter((_, i) => i !== index)
                            setSubjects(filteredNewSubjects)
                        }} onSubjectChange={(text: any) => {
                            const newSubjects = [...subjects]
                            newSubjects[index].subject = text    
                            setSubjects(newSubjects)
                        }} onGradeChange={(text: any) => {
                            const newSubjects = [...subjects]
                            newSubjects[index].grade = text
                            setSubjects(newSubjects)
                        }} />
                    ))}

                    <Text style={{ marginTop: 10 }}>Preference Subject (3 Limited)</Text>
                    <TextInput style={styles.input} onChangeText={value => {
                        // value.length > 0 ? setPreSubjects(()=>[...preSubjects, value]) : null
                        value.length > 0 ? setPreSubjects((v) => preSubjects[0] = v) : null
                    }} />
                    <TextInput style={styles.input} onChangeText={value => {
                        value.length > 0 ? setPreSubjects([...preSubjects, value]) : null
                    }} />
                    <TextInput style={styles.input} onChangeText={value => {
                        value.length > 0 ? setPreSubjects([...preSubjects, value]) : null
                    }} />

                    <TouchableOpacity style={styles.button} disabled={disableNext} onPress={() => {
                        // Send to DB
                        console.log(preSubjects)
                        console.log('success create')
                    }} >
                        <Text style={styles.buttonText}>Create Account</Text>
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
        backgroundColor: 'white',
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    tutorIntroduction: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: 250,
        height: 200,
        backgroundColor: 'white',
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
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
    },
    title: {
        fontSize: 30,
        padding: 10
    },

    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: 200,

    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    disabledButton: {
        backgroundColor: '#222222'
    },
    fileSelector: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#AAAAFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300
    }

})
