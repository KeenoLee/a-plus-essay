import { useEffect, useState, useCallback } from 'react';
import {
    Button,
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    SafeAreaView,
} from 'react-native';
import * as React from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
// import { Formik, Field, Form } from 'formik';
// import { StackActions, useNavigation } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import RegisterSuccess from "./RegisterSuccess";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import SubjectRow, { Subject } from './SubjectRow';
import DocumentPicker from 'react-native-document-picker';
import { env } from '../env/env';
import { useNavigation } from '@react-navigation/native';
import { just } from '@beenotung/tslib';
import {
    Box,
    FormControl,
    Input,
    Stack,
    VStack,
    TextArea,
    HStack,
    Icon,
    CloseIcon,
    IconButton,
} from 'native-base';
import { fetchLogin } from '../redux/auth/actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/dispatch';
import { useAppNavigation } from '../routes';
import { AppIonIcon } from './Icon';
// import RNFetchBlob from 'rn-fetch-blob'

const roleData: RadioButtonProps[] = [
    {
        id: '1',
        label: 'Student',
        value: 'student',
        selected: true,
        borderColor: '#2dd4bf',
        color: '#2dd4bf',
    },
    {
        id: '2',
        label: 'Tutor',
        value: 'tutor',
        borderColor: '#2dd4bf',
        color: '#2dd4bf',
    },
];
const reg: RegExp = /^[0-9\b]+$/;
const passwordLength = 7;
const mobileNumberLength = 8;
function shorterFilename(filename: string) {
    if (filename.length > 16) {
        return filename.substring(0, 17) + '...';
    }
    return filename;
}
const genUniqueKey = () => {
    let key = Math.floor(Math.random() * 100000).toString();
    return key;
};
// type NativeImage = {
//     uri: string,
//     filename: string,
//     type: string,
//     base64Data: string
// }
type Image = {
    uri: string;
    name: string;
    type: string;
};

const disableStyle = {
    backgroundColor: '#a8a29e',
    padding: 10,
    margin: 40,
    borderRadius: 14,
    width: 210,
};
const nonDisableStyle = {
    backgroundColor: '#14b8a6',
    padding: 10,
    margin: 40,
    borderRadius: 14,
    width: 210,
};
interface StudentData {
    isTutor: boolean;
    nickname: string;
    email: string;
    password: string;
    rePassword: string;
    phoneNumber: string;
    isOAuth: boolean;
}
interface CheckTutorDuplicate {
    email: string;
    phoneNumber: string;
}

interface TutorData {
    isTutor: boolean;
    nickname: string;
    email: string;
    password: string;
    rePassword: string;
    phoneNumber: string;
    isOAuth: boolean;
    transcript: Image[];
    studentCard: Image;
    school: string;
    major: string;
    selfIntro: string;
    subjects: Subject[];
}

async function fetchStudent(registerData: StudentData) {
    const res = await fetch(`${env.BACKEND_URL}/register/student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
    });
    const result = await res.json();
    if (result.error) {
        return result;
    }
    return 'success';
}

async function checkTutorEmailAndPhone(data: CheckTutorDuplicate) {
    const res = await fetch(`${env.BACKEND_URL}/checkemailandphone`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    console.log(result);
    if (result.error) {
        return result;
    }
    return 'success';
}
async function fetchTutor(registerData: TutorData) {
    const res = await fetch(`${env.BACKEND_URL}/register/tutor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
    });
    const result = await res.json();
    console.log('RESULT in register: ', result);
    if (result.error) {
        return result;
    }
    if (!result.tutorId) {
        return { error: 'Failed to create account. Please try again!' };
    }
    const formData = new FormData();
    console.log('reegisterdata.transcript: ', registerData.transcript);
    console.log('registerdata.studentcard: ', registerData.studentCard);
    formData.append('tutorId', result.tutorId.toString());
    for (let t = 0; t < registerData.transcript.length; t++) {
        formData.append(`transcript_${t}`, registerData.transcript[t] as any);
        console.log('WHAT HAPPEN?: ', registerData.transcript[t]);
    }
    if (registerData.studentCard) {
        formData.append(`student_card`, registerData.studentCard as any);
        console.log('STUDENTCARD???', registerData.studentCard);
    }
    console.log('FORMDATA??: ', formData);
    const fileRes = await fetch(`${env.BACKEND_URL}/tutor-file`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    });
    const fileResult = await fileRes.json();
    return { result, fileResult };
}
// async function fetchTutorFile(studentCard: Image | null, transcripts: Image[], tutorId: number) {
//     const formData = new FormData()
//     for (let t = 0; t < transcripts.length; t++) {
//         formData.append(`transcript_${t}`, transcripts[t] as any)
//     }
//     if (studentCard) {
//         formData.append(`student_card`, studentCard as any)
//     }
//     const res = await fetch(`${env.BACKEND_URL}/tutor-file`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//         body: formData
//     })
//     const result = await res.json()
//     return result
// }

export default function Register() {
    const navigation = useAppNavigation();

    // For Test ONLY: Should be passed as props
    const [isOAuth, setIsOAuth] = useState(false);

    // Page Switching
    const [page, setPage] = useState({ step: 1 });
    const [disableNext, setDisableNext] = useState(true);
    const [nextButtonStyle, setNextButtonStyle] = useState(disableStyle);
    const [input, setInput] = useState('');
    // const [submitStudent, setSubmitStudent] = useState(false)

    // Page One Information (Create new account)
    const [role, setRole] = useState<RadioButtonProps[]>(roleData);
    console.log('RolE?? ', role)
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firmPassword, setFirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [isTutor, setIsTutor] = useState(false);
    function onPressRole(roleData: RadioButtonProps[]) {
        setRole(roleData);
    }

    // Checking Page One
    const [passwordLengthEnough, setPasswordLengthEnough] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [emailUnique, setEmailUnique] = useState(false);
    const [mobileValid, setMobileValid] = useState(false);

    // Page Two Information (Academic Information)
    const [transcriptImages, setTranscriptImages] = useState<Image[]>([]);
    // const [transcriptFiles, setTranscriptFiles] = useState<TranscriptImage[]>([])
    const [studentCardImage, setStudentCardImage] = useState<Image | null>(null);
    const [position, setPosition] = useState('Upload');
    const addTranscriptImage = () => {
        openGallery(file => {
            setTranscriptImages(files => [...files, file]);
        });
    };

    const addStudentCardImage = () => {
        openGallery(file => {
            console.log('WHY NO FILENAME????: ', file);
            setStudentCardImage(() => file);
        });
    };

    const openGallery = (
        callback: (file: { uri: string; name: string; type: string }) => void,
    ) => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            res => {
                if (res.didCancel) {
                    console.log('user cancelled image picker');
                } else if (res.errorMessage) {
                    console.log('Error: ', res.errorMessage);
                } else {
                    let uri = res.assets?.[0].uri;
                    let name = res.assets?.[0].fileName;
                    let type = res.assets?.[0].type;

                    if (uri && name && type) {
                        callback({ uri, name, type });
                        return;
                    }
                    console.log('file is not found');
                    return;
                }
            },
        );
    };

    // Checking Page Two

    // Page Three Information (School Life 1)
    const [schoolLife, setSchoolLife] = useState({
        school: '',
        major: '',
        tutorIntroduction: '',
    });

    // Checking Page Three

    // Page Four Information (School Life 2)
    const [subjects, setSubjects] = useState([
        {
            key: genUniqueKey(),
            subject: '',
            score: '',
            isChecked: false,
        },
    ]);
    function onCheckBox(isChecked: boolean, index: number) {
        setSubjects(state =>
            state.map((subject: Subject, i: number) => {
                if (i === index) {
                    return {
                        ...subject,
                        isChecked: isChecked,
                    };
                }
                return subject;
            }),
        );
    }

    const dispatch = useDispatch<AppDispatch>();

    // Check Page One (Create an account)
    useEffect(() => {
        if (page.step !== 1) {
            return;
        }
        // Todo: fetch server to check email unique
        true ? setEmailUnique(true) : null;
        password.length > passwordLength
            ? setPasswordLengthEnough(true)
            : setPasswordLengthEnough(false);
        firmPassword === password
            ? setPasswordMatch(true)
            : setPasswordMatch(false);
        mobileNumber.length === mobileNumberLength && !isNaN(+mobileNumber)
            ? setMobileValid(true)
            : setMobileValid(false);

        if (emailUnique && passwordLengthEnough && passwordMatch && mobileValid) {
            setDisableNext(false);
            setNextButtonStyle(nonDisableStyle);
        } else {
            setDisableNext(true);
            setNextButtonStyle(disableStyle);
        }
        // }, [nickname, email, password, firmPassword, mobileNumber])
    });

    // Check Page Two (Academic Information)
    useEffect(() => {
        if (page.step !== 2) {
            return;
        }
        if (transcriptImages.length > 0 && studentCardImage) {
            // if ((transcriptFiles.length > 0 || transcriptImages.length > 0) && studentCardImage) {
            setDisableNext(false);
            setNextButtonStyle(nonDisableStyle);
        } else {
            setDisableNext(true);
            setNextButtonStyle(disableStyle);
        }
        // }, [transcriptFiles, studentCardImage])
    }, [studentCardImage]);

    // Check Page Three (School Life 1)
    useEffect(() => {
        if (page.step !== 3) {
            return;
        }
        if (schoolLife.school && schoolLife.major) {
            setDisableNext(false);
            setNextButtonStyle(nonDisableStyle);
        } else {
            setDisableNext(true);
            setNextButtonStyle(disableStyle);
        }
    }, [schoolLife]);
    // Check Page Four (School Life 2)
    function countPreSubject() {
        let count = 0;
        subjects.map(subject => (subject.isChecked === true ? count++ : null));
        return count;
    }
    useEffect(() => {
        if (page.step !== 4) {
            return;
        }
        if (countPreSubject() > 0) {
            setDisableNext(false);
            setNextButtonStyle(nonDisableStyle);
        } else {
            setDisableNext(true);
            setNextButtonStyle(disableStyle);
        }
    }, [subjects]);

    useEffect(() => {
        setIsTutor(() => false);
    }, []);

    return (
        <View style={styles.form}>
            {/* <SafeAreaView> */}
            {page.step === 1 && !isOAuth ? (
                <>
                    <Text style={{paddingTop: 30, paddingBottom: 10}}>
                        <Text style={styles.title}>Create New Account</Text>
                    </Text>
                    <RadioGroup
                        containerStyle={{
                            flexDirection: 'row',
                            marginVertical: 10,
                            justifyContent: 'space-evenly',
                            width: '75%',
                        }}
                        radioButtons={role}
                        onPress={() => {
                            onPressRole;
                            setIsTutor(!isTutor);
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nickname"
                        autoCapitalize="none"
                        onChangeText={nickname => setNickname(nickname)}
                    />
                    <TextInput
                        style={styles.input}
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        placeholder="Email address"
                        onChangeText={email => setEmail(email)}
                    />
                    <TextInput
                        style={styles.input}
                        textContentType="password"
                        secureTextEntry
                        placeholder="Password"
                        onChangeText={password => setPassword(password)}
                    />
                    <TextInput
                        style={styles.input}
                        textContentType="password"
                        secureTextEntry
                        placeholder="Confirm Password"
                        onChangeText={firmPassword => setFirmPassword(firmPassword)}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        textContentType="telephoneNumber"
                        placeholder="Mobile Number"
                        maxLength={8}
                        onChangeText={mobileNumber => {
                            setMobileNumber(mobileNumber);
                            setInput(text => (reg.test(mobileNumber) ? '' : text));
                        }}
                    />
                    {/* {passwordNotMatch && <Text style={{color: 'red', fontSize: 10}}>Password not match</Text>} */}
                </>
            ) : null}

            {page.step === 1 && isOAuth ? (
                <>
                    {isTutor ? (
                        <Text style={styles.title}>Become a Tutor</Text>
                    ) : (
                        <Text style={styles.title}>Become a Student</Text>
                    )}
                    {/* <Text style={styles.title}>Create New Account</Text> */}
                    <RadioGroup
                        containerStyle={{ flexDirection: 'row', color: 'blue' }}
                        radioButtons={role}
                        onPress={() => {
                            onPressRole;
                            setIsTutor(!isTutor);
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nickname"
                        autoCapitalize="none"
                        onChangeText={nickname => setNickname(nickname)}
                    />
                    <TextInput
                        style={styles.input}
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        value="oauth email"
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        textContentType="telephoneNumber"
                        placeholder="Mobile Number"
                        maxLength={8}
                        onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
                    />
                    {/* {passwordNotMatch && <Text style={{color: 'red', fontSize: 10}}>Password not match</Text>} */}
                </>
            ) : null}

            {/* {!isTutor && page.step === 1 && ( */}
            {role[0].selected && page.step === 1 && (
                <View>
                    <TouchableOpacity
                        style={nextButtonStyle}
                        disabled={disableNext}
                        onPress={async () => {
                            console.log('going to fetch');
                            // setSubmitStudent(()=>!submitStudent)
                            // console.log(submitStudent)
                            const result = await fetchStudent({
                                isTutor: isTutor,
                                nickname: nickname,
                                email: email,
                                password: password,
                                rePassword: firmPassword,
                                phoneNumber: mobileNumber,
                                isOAuth: false,
                            });
                            console.log('RESULT: ', result);
                            if (result.error) {
                                setDisableNext(true);
                                setNextButtonStyle(disableStyle);
                                Alert.alert('Error', result.error);
                            } else {
                                setDisableNext(true);
                                setNextButtonStyle(disableStyle);
                                setPage({ step: 5 });
                                dispatch(fetchLogin({ email: email, password: password }));
                            }
                        }}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text>Have an account? </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Login');
                            }}>
                            <Text style={{ color: '#14b8a6', fontWeight: 'bold' }}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {/* Submit Page 1 */}
            {role[1].selected && page.step === 1 && (
                // {isTutor && page.step === 1 && (
                <>
                    <TouchableOpacity
                        style={nextButtonStyle}
                        disabled={disableNext}
                        onPress={async () => {
                            const result = await checkTutorEmailAndPhone({
                                email: email,
                                phoneNumber: mobileNumber,
                            });
                            if (result.error) {
                                setDisableNext(true);
                                setNextButtonStyle(disableStyle);
                                Alert.alert('Error', result.error);
                            } else {
                                console.log('switching page');
                                setDisableNext(true);
                                setNextButtonStyle(disableStyle);
                                setPage({ step: 2 });
                            }
                        }}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text>Have an account? </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Login');
                            }}>
                            <Text style={{ color: '#14b8a6', fontWeight: 'bold' }}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {page.step === 2 ? (
                <>
                    <Text style={styles.title}>Academic Infomation</Text>
                    <View style={{ padding: 10 }}>
                        <View style={styles.fileSelector}>
                            <Text>Transcript</Text>
                            {/* <VStack style={{ marginRight: 10, }} space={6} alignSelf="flex-start" w="30%">
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
                            </VStack> */}
                            <TouchableOpacity onPress={() => addTranscriptImage()}>
                                <AppIonIcon name="attach" color="grey" size={18} />
                                {/* <Text style={{ paddingRight: 10, color: '#888888' }}>Upload Photo</Text> */}
                            </TouchableOpacity>
                        </View>

                        <View style={{}}>
                            {/* {transcriptFiles && transcriptFiles.map((file, index) => (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text key={index}>{shorterFilename(file.filename)}</Text>
                                    <TouchableOpacity style={{ marginRight: 180 }} onPress={() => { setTranscriptFiles(files => files.filter((_, i) => i !== index)) }}>
                                        <Text style={{ color: 'grey' }}>x</Text>
                                    </TouchableOpacity>
                                </View>
                            ))} */}
                            {transcriptImages &&
                                transcriptImages.map((image, index) => (
                                    <View
                                        key={index}
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: 180,
                                            }}>
                                            <Text>{shorterFilename(image.name)}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setTranscriptImages(images =>
                                                        images.filter((_, i) => i !== index),
                                                    );
                                                }}>
                                                <AppIonIcon name="close" color="grey" size={18} />
                                                {/* <Text style={{ color: 'grey' }}>x</Text> */}
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
                            {studentCardImage ? (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingRight: 10,
                                    }}>
                                    <Text>{shorterFilename(studentCardImage.name)}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setStudentCardImage(() => null);
                                        }}>
                                        <AppIonIcon name="close" color="grey" size={18} />
                                        {/* <Text style={{ color: 'grey' }}>x</Text> */}
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={() => addStudentCardImage()}>
                                    <AppIonIcon name="attach" color="grey" size={18} />
                                    {/* <Text style={{ paddingRight: 10, color: '#888888' }}>Upload Photo</Text> */}
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={nextButtonStyle}
                        disabled={disableNext}
                        onPress={() => {
                            if (!transcriptImages[0]) {
                                Alert.alert('Please upload transcript to continue!')
                            } else {
                                setDisableNext(true);
                                setNextButtonStyle(disableStyle);
                                setPage({ step: 3 });
                            }
                        }}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </>
            ) : null}

            {page.step === 3 ? (
                <>
                    <Text style={styles.title}>School Life</Text>
                    <Stack space={4} w="85%">
                        <Stack>
                            <FormControl.Label>School(Full Name)</FormControl.Label>
                            <Input
                                variant="underlined"
                                fontSize="17"
                                fontWeight="semibold"
                                placeholder=""
                                onChangeText={value =>
                                    setSchoolLife({
                                        ...schoolLife,
                                        school: value,
                                    })
                                }
                            />
                        </Stack>

                        <Stack>
                            <FormControl.Label>Major(Full Name)</FormControl.Label>
                            <Input
                                variant="underlined"
                                fontSize="17"
                                fontWeight="semibold"
                                placeholder=""
                                onChangeText={value =>
                                    setSchoolLife({
                                        ...schoolLife,
                                        major: value,
                                    })
                                }
                            />
                        </Stack>
                        <Stack>
                            <FormControl.Label>Tutor Introduction</FormControl.Label>
                        </Stack>
                        <Stack alignItems="center">
                            <TextArea
                                h={40}
                                placeholder=""
                                maxW="300"
                                w="85%"
                                onChangeText={(value: string) =>
                                    setSchoolLife({
                                        ...schoolLife,
                                        tutorIntroduction: value,
                                    })
                                }
                                autoCompleteType={undefined}
                            />
                        </Stack>
                    </Stack>

                    {/* <TextInput style={styles.input} placeholder="School" onChangeText={value => setSchoolLife({
                            ...schoolLife,
                            school: value
                        })} /> */}
                    {/* <TextInput style={styles.input} placeholder="Major" onChangeText={value => setSchoolLife({
                            ...schoolLife,
                            major: value
                        })} /> */}
                    {/* <TextInput style={styles.tutorIntroduction} autoCapitalize="none" multiline placeholder="Tutor Introduction" onChangeText={value => setSchoolLife({
                            ...schoolLife,
                            tutorIntroduction: value
                        })} /> */}

                    <TouchableOpacity
                        style={nextButtonStyle}
                        disabled={disableNext}
                        onPress={() => {
                            setDisableNext(true);
                            setNextButtonStyle(disableStyle);
                            setPage({ step: 4 });
                        }}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </>
            ) : null}

            {/* TODO: Subjects & Preference Subjects */}
            {page.step === 4 ? (
                <>
                    <Text style={styles.title}>School Life</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '70%',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={{}}>Subject</Text>
                        <Text style={{}}>Score</Text>
                        {/* <TouchableOpacity */}
                        {/* // style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 30, width: 17, height: 30 }} */}
                        {/* // onPress={() => { setSubjects((subjects) => [...subjects, { subject: '', score: '', isChecked: false, key: genUniqueKey() }]) }}> */}
                        {/* <Text style={{}}>+</Text> */}
                        {/* <AppIonIcon name="add-circle-outline" color='grey' size={18} />
                            </TouchableOpacity> */}
                    </View>
                    {subjects.map((subject, index) => (
                        <SubjectRow
                            key={subject.key}
                            index={index}
                            subject={subject}
                            onDelete={index => {
                                const newSubjects = [...subjects];
                                let filteredNewSubjects = newSubjects.filter(
                                    (_, i) => i !== index,
                                );
                                setSubjects(filteredNewSubjects);
                            }}
                            onSubjectChange={(text: string) => {
                                const newSubjects = [...subjects];
                                newSubjects[index].subject = text;
                                setSubjects(newSubjects);
                            }}
                            onScoreChange={(text: string) => {
                                const newSubjects = [...subjects];
                                newSubjects[index].score = text;
                                setSubjects(newSubjects);
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
                    <TouchableOpacity
                        // style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 30, width: 17, height: 30 }}
                        onPress={() => {
                            setSubjects(subjects => [
                                ...subjects,
                                { subject: '', score: '', isChecked: false, key: genUniqueKey() },
                            ]);
                        }}>
                        {/* <Text style={{}}>+</Text> */}
                        <AppIonIcon name="add-circle-outline" color="#0f766e" size={30} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={nextButtonStyle}
                        disabled={disableNext}
                        onPress={async () => {
                            // Send to DB
                            console.log('success create');
                            // const transcriptArray = transcriptImages.concat(transcriptFiles)
                            // PayloadTooLargeError: request entity too large
                            const result = await fetchTutor({
                                isTutor: isTutor,
                                nickname: nickname,
                                email: email,
                                password: password,
                                rePassword: firmPassword,
                                phoneNumber: mobileNumber,
                                isOAuth: false,
                                transcript: transcriptImages,
                                studentCard: studentCardImage!,
                                school: schoolLife.school,
                                major: schoolLife.major,
                                selfIntro: schoolLife.tutorIntroduction,
                                subjects: subjects,
                            });
                            console.log('I need RESULT! ', result);
                            // const fileResult = await fetchTutorFile(studentCardImage, transcriptImages)
                            // console.log('RESULT: ', result)
                            if (result.result.error || result.fileResult.error) {
                                setDisableNext(true);
                                setNextButtonStyle(disableStyle);
                                Alert.alert(
                                    'Error',
                                    result.result.error || result.fileResult.error,
                                );
                            } else {
                                setDisableNext(true);
                                setNextButtonStyle(disableStyle);
                                setPage({ step: 5 });
                                // dispatch(fetchLogin({ email: email, password: password }));
                            }
                        }}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                </>
            ) : null}
            {page.step === 5 ? (
                <View style={{
                    height: '70%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 30,
                        padding: 20,
                        textAlign: 'center',
                        marginBottom: 15
                    }}>Thank you for your registration!</Text>
                    <Text style={styles.message}>We are processing your request.</Text>
                    <Text style={styles.message}>A confirmation message</Text>
                    <Text style={styles.message}>will be sent toyou shortly.</Text>
                    <TouchableOpacity style={{
                        margin: 30,
                        marginTop: 50,
                        padding: 10,
                        backgroundColor: 'rgb(27,70,245)',
                        width: 250,
                        borderRadius: 15,
                    }} onPress={() => {
                        setPage({ step: 1 })
                        dispatch(fetchLogin({ email: email, password: password }));
                        navigation.navigate('Tabs')
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: 'white',
                        }}>Let's started</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
            {/* </SafeAreaView> */}
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
    },
    input: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        maxWidth: '80%',
        width: 300,
        backgroundColor: '#F6F6F9',
        textAlign: 'left',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
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

    editRow: {
        padding: 10,
        margin: 10,
        marginRight: 50,
        fontSize: 20,
        flex: 0.1,
    },
    checkbox: {
        padding: 10,
        textDecoration: 'none',
    },
    title: {
        marginVertical: 20,
        fontWeight: '700',
        fontSize: 30,
    },

    // button: {
    //     backgroundColor: "#007AFF",
    //     padding: 10,
    //     margin: 10,
    //     borderRadius: 10,
    //     width: 200,
    // },

    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    // disabledButton: {
    //     backgroundColor: '#222222'
    // },
    fileSelector: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#134e4a',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
        height: 40,
    },
    message: {
        paddingLeft: 60,
        paddingRight: 60,
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'rgb(132,164,193)',
        fontWeight: 'bold'
    }
});
