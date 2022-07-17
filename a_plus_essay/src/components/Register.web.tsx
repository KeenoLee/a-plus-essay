import { useEffect, useState } from "react";
import { Button, View, Text, TextInput, StyleSheet, Image } from "react-native";
import * as React from 'react'
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
// import { Formik, Field, Form } from 'formik';
// import { StackActions, useNavigation } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import RegisterSuccess from "./RegisterSuccess";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { launchImageLibrary } from 'react-native-image-picker';
import SubjectRow, { Subject } from "./SubjectRow";
import DocumentPicker from 'react-native-document-picker'
import { Select, VStack } from 'native-base';
import SuccessRegister from "./SuccessRegister";
import { stringToHex } from "react-native-mmkv-storage/dist/src/utils";




const roleData: RadioButtonProps[] = [{
    id: '1',
    label: 'Student',
    value: 'student',
    selected: true,
    borderColor: 'rgb(51,130,251)',
    color: 'rgb(51,130,251)'
}, {
    id: '2',
    label: 'Tutor',
    value: 'tutor',
    borderColor: 'rgb(51,130,251)',
    color: 'rgb(51,130,251)'
}]
const passwordLength = 7
const mobileNumberLength = 8
function shorterFilename(filename: string) {
    if (filename.length > 10) {
        return filename.substring(0, 11) + '...'
    }
    return filename
}
const genUniqueKey = () => {
    let key = Math.floor(Math.random() * 100000).toString()
    return key
}
type NativeImage = {
    uri: string,
    filename: string
}
type NativeFile = {
    uri: string,
    filename: string,
    type: string | null
}
type StudentCardImage = {
    uri: string,
    filename: string
}
const disableStyle = {
    backgroundColor: "grey",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 200,
}
const nonDisableStyle = {
    backgroundColor: "#007AFF",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 200,
}
interface RegisterData {
    role: string
    // nickname: string
    // email: string
    // password: string
    // mobileNumber: string
    school: string
    major: string
    tutorIntroduction?: string
    subjects: Subject[]
}
interface UserData {
    isTutor: boolean,
    nickname: string,
    email: string,
    password: string,
    rePassword: string,
    phoneNumber: string,
    oAuth: boolean
}
function checkIsTutor(role: RadioButtonProps[]): boolean | string {
    const selectedRole = role.find(object => object.selected === true)
    if (!selectedRole || !selectedRole.value) {
        return 'role not found'
    }
    if (selectedRole.value === 'tutor') {
        return true
    }
    return false
}
async function fetchUser(registerData: UserData) {

    console.log('COMING ', registerData)
    // const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register/tutor`)
    const res = await fetch(`http://localhost:8111/register/tutor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    })
    const result = await res.json()
    console.log('RESULT: ', result)
}
export default function Register() {
    // Page Switching
    const [page, setPage] = useState({ step: 1 })
    const [disableNext, setDisableNext] = useState(true)
    const [nextButtonStyle, setNextButtonStyle] = useState(
        disableStyle
    )


    // Page One Information (Create new account)
    const [role, setRole] = useState<RadioButtonProps[]>(roleData)
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firmPassword, setFirmPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [isTutor, setIsTutor] = useState(false)
    function onPressRole(roleData: RadioButtonProps[]) {
        setRole(roleData);
    }

    // Checking Page One
    const [passwordLengthEnough, setPasswordLengthEnough] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [emailUnique, setEmailUnique] = useState(false)
    const [mobileValid, setMobileValid] = useState(false)

    // Page Two Information (Academic Information)
    const [transcriptImages, setTranscriptImages] = useState<NativeImage[]>([])
    const [transcriptFiles, setTranscriptFiles] = useState<NativeFile[]>([])
    const [studentCardImage, setStudentCardImage] = useState<StudentCardImage | null>()
    const [position, setPosition] = useState("Upload");
    const addTranscriptImage = () => {
        openGallery(file => {
            setTranscriptImages((files) => [...files, file])
        })
    }

    const addStudentCardImage = () => {
        openGallery(file => {
            setStudentCardImage(() => file)
        })
    }

    const openGallery = (callback: (file: { uri: string, filename: string }) => void) => {
        // launchImageLibrary({
        //     mediaType: 'photo',
        //     // includeBase64: true
        // }, (res) => {
        //     if (res.didCancel) {
        //         console.log('user cancelled image picker')
        //     } else if (res.errorMessage) {
        //         console.log('Error: ', res.errorMessage)
        //     } else {
        //         let uri = res.assets?.[0].uri
        //         let filename = res.assets?.[0].fileName
        //         if (uri && filename) {
        //             callback({ uri, filename })
        //         }
        //         console.log('file is not found')
        //         return
        //     }
        // })
    }

    const addTranscriptFile = async () => {
        try {
            const { uri, name, type } = await DocumentPicker.pickSingle()
            setTranscriptFiles([...transcriptFiles, { uri, filename: name, type }])
        } catch (error) {
            console.log(error)
        }
    }

    // Checking Page Two

    // Page Three Information (School Life 1)
    const [schoolLife, setSchoolLife] = useState({
        school: '',
        major: '',
        tutorIntroduction: ''
    })

    // Checking Page Three

    // Page Four Information (School Life 2)
    const [subjects, setSubjects] = useState([{
        key: genUniqueKey(),
        subject: '',
        grade: '',
        isChecked: false,
    }])
    function onCheckBox(isChecked: boolean, index: number) {
        setSubjects(state => state.map((subject: Subject, i: number) => {
            if (i === index) {
                return {
                    ...subject,
                    isChecked: isChecked
                }
            }
            return subject
        }))
    }

    // Check Page One (Create an account)
    useEffect(() => {
        if (page.step !== 1) {
            return
        }
        console.log('role? ', role)
        console.log(checkIsTutor(role))
        // Todo: fetch server to check email unique
        true ? setEmailUnique(true) : null
        password.length > passwordLength ? setPasswordLengthEnough(true) : setPasswordLengthEnough(false)
        firmPassword === password ? setPasswordMatch(true) : setPasswordMatch(false)
        mobileNumber.length === mobileNumberLength && !isNaN(+mobileNumber) ? setMobileValid(true) : setMobileValid(false)

        if (emailUnique && passwordLengthEnough && passwordMatch && mobileValid) {
            setDisableNext(false)
            setNextButtonStyle(nonDisableStyle)
        } else {
            setDisableNext(true)
            setNextButtonStyle(disableStyle)
        }
        // }, [nickname, email, password, firmPassword, mobileNumber])
    })

    // Check Page Two (Academic Information)
    useEffect(() => {
        if (page.step !== 2) {
            return
        }
        if ((transcriptFiles.length > 0 || transcriptImages.length > 0) && studentCardImage) {
            setDisableNext(false)
            setNextButtonStyle(nonDisableStyle)
        } else {
            setDisableNext(true)
            setNextButtonStyle(disableStyle)
        }
    }, [transcriptFiles, studentCardImage])

    // Check Page Three (School Life 1)
    useEffect(() => {
        if (page.step !== 3) {
            return
        }
        if (schoolLife.school && schoolLife.major) {
            setDisableNext(false)
            setNextButtonStyle(nonDisableStyle)
        } else {
            setDisableNext(true)
            setNextButtonStyle(disableStyle)
        }
    }, [schoolLife])
    // Check Page Four (School Life 2)
    function countPreSubject() {
        let count = 0
        subjects.map(subject => subject.isChecked === true ? count++ : null)
        return count
    }
    useEffect(() => {
        if (page.step !== 4) {
            return
        }
        if (countPreSubject() > 0) {
            setDisableNext(false)
            setNextButtonStyle(nonDisableStyle)
        } else {
            setDisableNext(true)
            setNextButtonStyle(disableStyle)
        }
    }, [subjects])


    // Fetch Server
    useEffect(() => {

    }, [])

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
                    <TextInput style={styles.input} keyboardType='number-pad' textContentType='telephoneNumber' placeholder='Mobile Number' onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)} />
                    {/* {passwordNotMatch && <Text style={{color: 'red', fontSize: 10}}>Password not match</Text>} */}
                </> : null}

            {!isTutor && page.step === 1 &&
                <TouchableOpacity
                    style={nextButtonStyle}
                    disabled={disableNext}
                    onPress={async () => {
                        await fetchUser({
                            isTutor: isTutor,
                            nickname: nickname,
                            email: email,
                            password: password,
                            rePassword: firmPassword,
                            phoneNumber: mobileNumber,
                            oAuth: false
                        })
                        setDisableNext(true)
                        setPage({ step: 5 })
                    }}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            }
            {/* Submit Page 1 */}
            {isTutor && page.step === 1 &&
                <>
                    <TouchableOpacity
                        style={nextButtonStyle}
                        disabled={disableNext}
                        onPress={() => {
                            fetchUser({
                                isTutor: isTutor,
                                nickname: nickname,
                                email: email,
                                password: password,
                                rePassword: firmPassword,
                                phoneNumber: mobileNumber,
                                oAuth: false
                            })
                            setDisableNext(true)
                            setNextButtonStyle(disableStyle)
                            setPage({ step: 2 })
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
                            <VStack style={{ marginRight: 10, }} space={6} alignSelf="flex-start" w="30%">
                                <Select
                                    selectedValue={position}
                                    mx={{ base: -0.5, md: "Image" }}
                                    onValueChange={nextValue => setPosition(nextValue)}
                                    accessibilityLabel="Upload Image or file"
                                >
                                    <Select.Item label="Upload" value="Upload" disabled />
                                    <Select.Item label="Image" value="Image" onPress={() => addTranscriptImage()} />
                                    <Select.Item label="File" value="File" onPress={() => addTranscriptFile()} />
                                </Select>
                            </VStack>
                        </View>

                        <View style={{ height: 100 }}>
                            {transcriptFiles && transcriptFiles.map((file, index) => (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text key={index}>{shorterFilename(file.filename)}</Text>
                                    <TouchableOpacity style={{ marginRight: 180 }} onPress={() => { setTranscriptFiles(files => files.filter((_, i) => i !== index)) }}>
                                        <Text style={{ color: 'grey' }}>x</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            {transcriptImages && transcriptImages.map((image, index) => (
                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 5 }}>
                                        <Text>{shorterFilename(image.filename)}</Text>
                                        <TouchableOpacity onPress={() => { setTranscriptImages(images => images.filter((_, i) => i !== index)) }}>
                                            <Text style={{ color: 'grey' }}>x</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 5 }}></View>
                                </View>
                            ))}
                        </View>

                    </View>
                    <View style={{ padding: 10, marginBottom: 50 }}>
                        <View style={styles.fileSelector}>
                            <Text style={{ flex: 6 }}>Student Card</Text>
                            {studentCardImage ?
                                (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 4.5, paddingRight: 10 }}>
                                        <Text>{shorterFilename(studentCardImage.filename)}</Text>
                                        <TouchableOpacity onPress={() => { setStudentCardImage(() => null); }}>
                                            <Text style={{ color: 'grey' }}>x</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) :
                                (
                                    <TouchableOpacity onPress={() => addStudentCardImage()}>
                                        <Text style={{ paddingRight: 10, color: '#888888' }}>Upload Photo</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>

                    <TouchableOpacity style={nextButtonStyle} disabled={disableNext} onPress={() => {
                        setDisableNext(true)
                        setNextButtonStyle(disableStyle)
                        setPage({ step: 3 })
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

                    <TouchableOpacity style={nextButtonStyle} disabled={disableNext} onPress={() => {
                        setDisableNext(true)
                        setNextButtonStyle(disableStyle)
                        setPage({ step: 4 })
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
                        <TouchableOpacity
                            style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 30, width: 17, height: 30 }}
                            onPress={() => { setSubjects((subjects) => [...subjects, { subject: '', grade: '', isChecked: false, key: genUniqueKey() }]) }}>
                            <Text style={{}}>+</Text>
                        </TouchableOpacity>
                    </View>
                    {subjects.map((subject, index) => (

                        <SubjectRow
                            key={subject.key}
                            index={index}
                            subject={subject}
                            onDelete={(index) => {
                                const newSubjects = [...subjects]
                                let filteredNewSubjects = newSubjects.filter((_, i) => i !== index)
                                setSubjects(filteredNewSubjects)
                            }}
                            onSubjectChange={(text: string) => {
                                const newSubjects = [...subjects]
                                newSubjects[index].subject = text
                                setSubjects(newSubjects)
                            }}
                            onGradeChange={(text: string) => {
                                const newSubjects = [...subjects]
                                newSubjects[index].grade = text
                                setSubjects(newSubjects)
                            }}
                            // 點解呢個又得！！！？
                            onCheckBox={(isChecked: boolean) => onCheckBox(isChecked, index)}
                        // 點解呢個唔得！！！！！！？
                        // onCheckBox={(isChecked: boolean) => {
                        //     const newSubjects = [...subjects]
                        //     newSubjects[index].isChecked = isChecked
                        //     setSubjects(newSubjects)
                        // }｝
                        />
                    ))}

                    <TouchableOpacity style={nextButtonStyle} disabled={disableNext} onPress={() => {
                        // Send to DB
                        console.log('success create')
                        // fetchRegister({
                        //     role: checkRole(role),
                        //     nickname: nickname,
                        //     email: email,
                        //     password: password,
                        //     mobileNumber: mobileNumber,
                        //     school: schoolLife.school,
                        //     major: schoolLife.major,
                        //     tutorIntroduction: schoolLife.tutorIntroduction,
                        //     subjects: subjects
                        // })
                        setDisableNext(true)
                        setNextButtonStyle(disableStyle)
                        setPage({ step: 5 })
                    }} >
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                </> : null}
            {page.step === 5 ?
                <SuccessRegister /> : null
            }
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
        alignItems: 'center',
        width: 300,
        height: 50
    }
})