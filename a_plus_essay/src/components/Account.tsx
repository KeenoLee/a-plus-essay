import { Alert, Image } from 'react-native'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Box, HStack, IconButton, ScrollView, Stack, StatusBar, Text, View, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useAppNavigation } from '../routes';
import { env } from '../env/env';
import { getData } from '../storage/storage';
import { AppIonIcon } from './Icon';
interface PreferredSubject {
    subject_name: string
}
type EditTranscript = {
    id: number,
    filename?: string
}
export type EditInfo = {
    userId: number,
    nickname: string | null,
    password: string | null,
    phoneNumber: string | null,
    preferredSubject: Array<PreferredSubject | null>,
    selfIntro: string | null,
}
async function fetchEditProfile(editInfo: EditInfo) {
    const res = await fetch(`${env.BACKEND_URL}/edit-profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editInfo)
    })
    const result = await res.json()
    return result
}
async function fetchGetImage(tutorId: number) {
    const res = await fetch(`${env.BACKEND_URL}/get-image/${tutorId}`)
    const result = await res.json()
}
export default function Account() {
    const state: any = useSelector((state: RootState) => state.auth)

    // if (state.tutor) {
    //     const tutor = state.tutor[0]
    //     const school = state.tutor[1]
    //     const transcript = state.tutor[2]
    // }

    console.log('userInfo in Account', state?.user)
    console.log('tutorInfo in Account', state?.tutor)
    const navigation = useAppNavigation()
    // const [isAuth, setIsAuth] = useState(false)
    const [editProfile, setEditProfile] = useState<Boolean | null>(null)
    const [editNickname, setEditNickname] = useState<string | null>(null)
    const [editPassword, setEditPassword] = useState<string | null>(null)
    const [editPhoneNumber, setEditPhoneNumber] = useState<string | null>(null)
    const [editSchool, setEditSchool] = useState<string | null>(null)
    const [editStudentCard, setEditStudentCard] = useState<string | null>(null)
    const [editTranscript, setEditTranscript] = useState<Array<EditTranscript>>([])
    const [editPreferredSubject, setEditPreferredSubject] = useState<Array<PreferredSubject | null>>([null])
    const [editSelfIntro, setEditSelfIntro] = useState<string | null>(null)
    useEffect(() => {
        async function fetchImageFilename() {
            const res = await fetch(`${env.BACKEND_URL}/get-user-file`, {
                headers: { Authorization: `Bearer ${state.token}` }
            })
            const result = await res.json()
            if (!result.error) {
                result.studentCard ? setEditStudentCard(() => result.studentCard.student_card) : null
                result.transcript ? setEditTranscript(() => result.transcript) : null
                // setEditTranscript(()=>[...editTranscript, result.transcript])
                console.log('studentcard: ', editStudentCard)
                console.log('transcripts: ', editTranscript)
            }
            console.log('RESULT in aCCount: ', result)
        }
        fetchImageFilename()
    }, [])
    return (
        state?.user ?
            <View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <HStack ml='2' marginY='2'>
                            <HStack>
                                <Text fontWeight='bold' fontSize='16' textAlign='center'>Nickname :</Text>
                            </HStack>
                            <HStack ml='6' mt='0.5'>
                                {editProfile ?
                                    <TextInput placeholder='Edit Nickname' onChangeText={value => { setEditNickname(() => value); console.log('edit nickname MATCH? ', value, editNickname) }}>
                                    </TextInput> :
                                    <Text fontWeight='semibold' fontSize='14' textAlign='center'>{state.user?.nickname}</Text>
                                }
                            </HStack>
                        </HStack>
                        {editProfile ?
                            <TouchableOpacity onPress={async () => {
                                setEditProfile(false)
                                const result = await fetchEditProfile({
                                    userId: state.user.id,
                                    nickname: editNickname,
                                    password: editPassword,
                                    phoneNumber: editPhoneNumber,
                                    preferredSubject: editPreferredSubject,
                                    selfIntro: editSelfIntro
                                })
                                console.log('result from edit profile: ', result)
                                if (result.success) {
                                    console.log('going to update store...')
                                }
                            }
                            }>
                                <AppIonIcon name="checkmark-circle-outline" color='grey' size={25} />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => setEditProfile(true)}>
                                <AppIonIcon name="create-outline" color='grey' size={25} />
                            </TouchableOpacity>
                        }
                    </View>
                    <HStack ml='2' marginY='2'>
                        <HStack>
                            <Text fontWeight='bold' fontSize='16'>Email :</Text>
                        </HStack>
                        <HStack ml='4' mt='0.5'>
                            <Text>{state.user?.email}</Text>
                        </HStack>
                    </HStack>
                    <HStack ml='2' marginY='2'>
                        <HStack>
                            <Text fontWeight='semibold' fontSize='16' textAlign='center'>Password :</Text>
                        </HStack>
                        <HStack ml='4' mt='0.5'>
                            {editProfile ?
                                <TextInput placeholder='Edit Password' onChangeText={value => setEditPassword(() => value)}></TextInput> :
                                <Text>********</Text>
                            }
                        </HStack>
                    </HStack>
                    <HStack ml='2' marginY='2'>
                        <HStack>
                            <Text fontWeight='bold' fontSize='16'>Phone Number :</Text>
                        </HStack>
                        <HStack ml='4' mt='0.5'>
                            {editProfile ?
                                <TextInput placeholder='Edit Phone Number' onChangeText={value => setEditPhoneNumber(() => value)}></TextInput> :
                                <Text>{state.user?.phone_number}</Text>
                            }
                        </HStack>
                    </HStack>
                    {state?.tutor ?
                        <>
                            <Stack ml='2' marginY='2'>
                                <Stack>
                                    <Text fontWeight='bold' fontSize='16'>School :</Text>
                                </Stack>
                                <Stack>
                                    <Text ml='4' mt='2'>{state.tutor[1].school}</Text>
                                </Stack>
                            </Stack>
                            <View ml='2' marginY='2'>
                                <HStack>
                                    <Text fontWeight='bold' fontSize='16'>Student Card :</Text>
                                </HStack>
                                <View mt='2' marginX='4'>
                                    {/* <Text>{state.tutor[0].student_card}</Text> */}
                                    <Image style={{ width: 100, height: 100 }} source={{ uri: `${env.BACKEND_URL}/get-image/${editStudentCard}` }} />
                                    {/* Only Display the photo*/}
                                </View>
                            </View>
                            <View ml='2' marginY='2'>
                                <Text fontWeight='bold' fontSize='16'>Transcript :</Text>
                                <View mt='2' marginX='2' style={{ flexDirection: 'row' }}>
                                    {editTranscript.map((transcript: EditTranscript, i: number) =>
                                        // console.log('INSide .mAP: ', transcript)
                                        transcript.filename ?
                                            <Image key={i} style={{ width: 100, height: 100, margin: 10 }} source={{ uri: `${env.BACKEND_URL}/get-image/${transcript.filename}` }} />
                                            : null
                                    )}
                                </View>
                                {/* Only Display the photo*/}
                            </View>
                            <Stack ml='2' marginY='2'>
                                <Stack>
                                    <Text fontWeight='bold' fontSize='16'>Preferred Subjects :</Text>
                                </Stack>
                                <Stack ml='4' mt='2'>
                                    {state.tutor[3].map((subject: any, i: number) => (
                                        editProfile ?
                                            <TextInput
                                                key={i}
                                                placeholder='Edit Subject'
                                                onChangeText={value => {
                                                    console.log('State.Tutor[3]: ', state.tutor[3])
                                                    let newPreferredSubject = [...state.tutor[3]]
                                                    newPreferredSubject[i].subject_name = value
                                                    console.log('NEW PreferredSubject Array: ', newPreferredSubject)
                                                    setEditPreferredSubject(newPreferredSubject)
                                                }}></TextInput> :
                                            <Text key={i}>{subject.subject_name}</Text>
                                    ))}
                                </Stack>
                            </Stack>
                            <VStack ml='2' marginY='2'>
                                <VStack>
                                    <Text fontWeight='bold' fontSize='16'>Self Introduction :</Text>
                                </VStack>
                                <VStack ml='4' mt='0.5' mb='10' width='80%' alignSelf='center'>
                                    {editProfile ?
                                        <TextInput placeholder='Edit Self Introduction' onChangeText={value => setEditSelfIntro(() => value)}></TextInput> :
                                        <Text>{state.tutor[0].self_intro}</Text>
                                    }
                                </VStack>
                            </VStack>
                            {/* <HStack  ml='2' marginY='2'>
                            <HStack>
                                <Text fontWeight='bold' fontSize='16'>Rating :</Text>
                            </HStack>
                            <HStack>
                                <Text>{state.tutor[0].rating}</Text>
                            </HStack>
                        </HStack> */}
                        </>

                        : null}
                </ScrollView>
            </View> : null
    )
}

function dispatch() {
    throw new Error('Function not implemented.');
}
