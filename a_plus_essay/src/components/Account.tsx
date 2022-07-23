import { Alert } from 'react-native'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Box, HStack, IconButton, StatusBar, Text, View } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useAppNavigation } from '../../routes';
import TutorBox from './TutorBox';
import SubjectRow from './SubjectRow';
export default function Account() {
    const state: any = useSelector((state: RootState) => state.auth)
    const user = state.user
    // if (state.tutor) {
    //     const tutor = state.tutor[0]
    //     const school = state.tutor[1]
    //     const transcript = state.tutor[2]
    // }
    console.log('userInfo in Account', state?.user)
    console.log('tutorInfo in Account', state?.tutor[3])
    const navigation = useAppNavigation()
    // const [isAuth, setIsAuth] = useState(false)
    const [editProfile, setEditProfile] = useState<Boolean | null>(null)
    const [editSchool, setEditSchool] = useState<String | null>(null)
    const [editStudentCard, setEditStudentCard] = useState<String | null>(null)
    const [editTranscript, setEditTranscript] = useState<String | null>(null)
    const [editPreferredSubject, setEditPreferredSubject] = useState<String | null>(null)
    const [editSelfIntro, setEditSelfIntro] = useState<String | null>(null)

    return (
        state?.user ?
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text>{state.user?.nickname}</Text>
                    </View>
                    {editProfile ?
                        <TouchableOpacity onPress={() => setEditProfile(false)}>
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
                    <Text>********</Text>
                </View>
                <View>
                    <Text>Phone Number</Text>
                    <Text>{state.user?.phone_number}</Text>
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
                                <Text key={i}>{subject.subject_name}</Text>
                            ))}
                        </View>

                        <View>
                            <Text>Self Introduction</Text>
                            <Text>{state.tutor[0].self_intro}</Text>
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