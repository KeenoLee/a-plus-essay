import { Alert } from 'react-native'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Box, HStack, IconButton, StatusBar, Text, View } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useAppNavigation } from '../../routes';
import { env } from '../env/env';
import { getData } from '../storage/storage';
interface PreferredSubject {
    subject_name: string
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
    const [editTranscript, setEditTranscript] = useState<string | null>(null)
    const [editPreferredSubject, setEditPreferredSubject] = useState<Array<PreferredSubject | null>>([null])
    const [editSelfIntro, setEditSelfIntro] = useState<string | null>(null)
    useEffect(()=>{
        async function getStorage() {
            const token = await getData('token')
            console.log('can get token from storage?: ', token)
        }
        getStorage()
    })
    return (
        state?.user ?
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        {editProfile ?
                            <TextInput placeholder='Edit Nickname' onChangeText={value => { setEditNickname(() => value); console.log('edit nickname MATCH? ', value, editNickname) }}></TextInput> :
                            <Text>{state.user?.nickname}</Text>
                        }
                    </View>
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
                            <Text>Confirm</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => setEditProfile(true)}>
                            <Text>Edit</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View>
                    <Text>Email</Text>
                    <Text>{state.user?.email}</Text>

                </View>
                <View>
                    <Text>Password</Text>
                    {editProfile ?
                        <TextInput placeholder='Edit Password' onChangeText={value => setEditPassword(() => value)}></TextInput> :
                        <Text>********</Text>
                    }
                </View>
                <View>
                    <Text>Phone Number</Text>
                    {editProfile ?
                        <TextInput placeholder='Edit Phone Number' onChangeText={value => setEditPhoneNumber(() => value)}></TextInput> :
                        <Text>{state.user?.phone_number}</Text>
                    }
                </View>
                {state?.tutor ?
                    <>
                        <View>
                            <Text>School</Text>
                            <Text>{state.tutor[1].school}</Text>
                        </View>
                        <View>
                            <Text>Student Card</Text>
                            <Text>{state.tutor[0].student_card}</Text>
                        </View>
                        <View>
                            <Text>Transcript</Text>
                            {state.tutor[2].map((transcript: any, i: number) =>
                                <Text key={i}>{transcript.filename}</Text>
                            )}
                        </View>

                        <View>
                            <Text>Preferred Subjects</Text>
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
                        </View>
                        <View>
                            <Text>Self Introduction</Text>
                            {editProfile ?
                                <TextInput placeholder='Edit Self Introduction' onChangeText={value => setEditSelfIntro(() => value)}></TextInput> :
                                <Text>{state.tutor[0].self_intro}</Text>
                            }
                        </View>
                        <View>
                            <Text>Rating</Text>
                            <Text>{state.tutor[0].rating}</Text>
                        </View>
                        <View>
                            <Text>Ongoing Order</Text>
                            <Text>{state.tutor[0].ongoing_order_amount}</Text>
                        </View>
                        <View>
                            <Text>Completed Order</Text>
                            <Text>{state.tutor[0].completed_order_amount}</Text>
                        </View>
                    </>
                    : null}

            </View> : null
    )
}

function dispatch() {
    throw new Error('Function not implemented.');
}
