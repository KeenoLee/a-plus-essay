import { Alert } from 'react-native'

import React from 'react'
import { Box, HStack, IconButton, StatusBar, Text, View } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigation } from '@react-navigation/native';

export default function OrderStatus() {
    const userInfo = useSelector((state: RootState) => state.auth.user)
    const navigation = useNavigation()
    return (
        userInfo?.userId ?

            <View>
                <Text>OrderStatus</Text>
            </View> :

            <View>
                {Alert.alert(
                    'Unauthorized',
                    'Please login to view order status!',
                    [
                        { text: 'OK', onPress: () => { navigation.navigate('Login') } },
                    ]
                )}
            </View>
    )
}