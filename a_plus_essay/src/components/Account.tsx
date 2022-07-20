import { Alert } from 'react-native'
import React, { useState } from 'react'
import { Box, HStack, IconButton, StatusBar, Text, View } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';

export default function Account() {
    const userInfo = useSelector((state: RootState) => state.auth.user)
    console.log('userInfo in Account', userInfo)
    const navigation = useNavigation()
    const [editProfile, setEditProfile] = useState()
    return (
        userInfo?.user_id ?
            <View>
                <View>
                    <Text>Nickname</Text>
                    <Text>{userInfo.nickname}</Text>
                </View>
                <Text>email</Text>
                <Text>password</Text>
                <Text>phone number</Text>

                <Text>student card</Text>
                <Text>transcript</Text>
                <Text>prefered subjects</Text>
                <Text>self intro</Text>
                <Text>ongoing order</Text>
                <Text>completed order</Text>


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