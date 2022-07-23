import { Alert } from 'react-native'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Box, HStack, IconButton, StatusBar, Text, View } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppNavigation } from '../../routes';
import TutorBox from './TutorBox';
import SubjectRow from './SubjectRow';

export default function Account() {
    const state = useSelector((state: RootState) => state.auth)
    const user = state.user
    // if (state.tutor) {
    //     const tutor = state.tutor[0]
    //     const school = state.tutor[1]
    //     const transcript = state.tutor[2]
    // }
    console.log('userInfo in Account', state?.user)
    console.log('tutorInfo in Account', state?.tutor)
    const navigation = useAppNavigation()
    // const [isAuth, setIsAuth] = useState(false)
    const [editProfile, setEditProfile] = useState()

    return (
        state?.user ?
            <View>
                <View>
                    <Text>Nickname</Text>
                    <Text>{state.user?.nickname}</Text>
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
                        {state.tutor[2].map((transcript,i) =>
                            <View key={i}>
                                <Text>{transcript.filename}</Text>
                            </View>
                        )}

                        {/* {state.tutor[3].map(subject =>
                            <View>
                                <Text>{subject}</Text>
                            </View>
                        )} */}

                        <View>
                            <Text>Self Introduction</Text>
                            <Text>{state.tutor[0].self_intro}</Text>
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

            </View> :

            <View>
                {Alert.alert(
                    'Unauthorized',
                    'Please login to view profile!',
                    [
                        { text: 'OK', onPress: () => { navigation.navigate('Login') } },
                    ]
                )}
            </View>
    )
}