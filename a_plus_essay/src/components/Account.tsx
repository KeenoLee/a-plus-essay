import { Alert } from 'react-native'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Box, HStack, IconButton, StatusBar, Text, View } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Account() {
    const state = useSelector((state: RootState) => state.auth)
    console.log('userInfo in Account', state?.user)
    console.log('tutorInfo in Account', state?.tutor)
    const navigation = useNavigation()
    // const [isAuth, setIsAuth] = useState(false)
    const [editProfile, setEditProfile] = useState()

    return (
        state?.user || state?.tutor ?
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
                <View>
                    <Text>School</Text>
                    <Text>{state.tutor}</Text>
                </View>
                <View>
                    <Text>Student Card</Text>
                    <Text>{}</Text>
                </View>
                <View>
                    <Text>Transcript</Text>
                    <Text>{'Fetch'}</Text>
                </View>
                <View>
                    <Text>Preferred Subjects</Text>
                    <Text>{'TODO'}</Text>
                </View>
                <View>
                    <Text>Self Introduction</Text>
                    <Text>{'TODO'}</Text>
                </View>
                <View>
                    <Text>Ongoing Order</Text>
                    <Text>{'TODO'}</Text>
                </View>
                <View>
                    <Text>Completed Order</Text>
                    <Text>{'TODO'}</Text>
                </View>

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