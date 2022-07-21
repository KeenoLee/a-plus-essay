import { Alert } from 'react-native'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { Box, HStack, IconButton, StatusBar, Text, View } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';

export default function Account() {
    const state = useSelector((state: RootState) => state.auth)
    console.log('userInfo in Account', state?.user)
    const navigation = useNavigation()
    // const [isAuth, setIsAuth] = useState(false)
    const [editProfile, setEditProfile] = useState()
    // useEffect(()=>{
    //     if (!state.user && !state.tutor) {
        
    //         navigation.navigate('Login')
    //     }
    // })
    return (
        state?.user || state?.tutor ?
            <View>
                <View>
                    <Text>Nickname</Text>
                    <Text>{state.user?.nickname}</Text>
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