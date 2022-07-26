import { Alert } from 'react-native'
import React from 'react'
import { Box, HStack, IconButton, StatusBar, Text, View } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// Status Page 
import { env } from '../../env/env';
import { useAppNavigation } from '../../routes';
import { CompletedOrderListPage, MatchingOrderListPage, OngoingOrderListPage, PendingOrderListPage } from './OrderListPage';

const MainTab = createMaterialTopTabNavigator<MainTabParamList>()

export type MainTabParamList = {
    Pending: undefined,
    Matching: undefined,
    Ongoing: undefined,
    Completed: undefined,
}

//TODO: Sorting Function

//TODO: Add button link to orderSubmission

export function TopTabNavigator() {
    const state = useSelector((state: RootState) => state.auth)
    const navigation = useAppNavigation()
    return (
        <MainTab.Navigator
            initialRouteName="Pending"
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarStyle: { backgroundColor: '#BBD3CF' },
                tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' },
                tabBarIndicatorStyle: { backgroundColor: 'white' }
            }}
        >
            {/* <MainTab.Screen name="Pending" component={PendingOrderListPage}
            // listeners={{
            //     tabPress: async (event) => {
            //         event.preventDefault()
            // if (state.user) {
            //     console.log('User IDDDDD', state.user.id)
            //     const res = await fetch(`${env.BACKEND_URL}/order/pending/${state.user.id}/${state.user.is_tutor}`)
            //     const result = await res.json()
            //     console.log('BE', result)
            //     if (!result.error) {
            //         navigation.navigate('Pending', {result: result, isTutor: state.user.is_tutor})
            //     }
            //     return result
            // }

            //     },
            // }} 

            /> */}
            <MainTab.Screen name="Matching" component={MatchingOrderListPage} />
            <MainTab.Screen name="Ongoing" component={OngoingOrderListPage} />
            <MainTab.Screen name="Completed" component={CompletedOrderListPage} />
        </MainTab.Navigator>
    )
}


export default function OrderStatus() {
    // const userInfo = useSelector((state: RootState) => state.auth.user)
    // const navigation = useNavigation()
    return (
        <TopTabNavigator />
        // userInfo?.userId ?
        // <View>
        //     {Alert.alert(
        //         'Unauthorized',
        //         'Please login to view order status!',
        //         [
        //             { text: 'OK', onPress: () => { navigation.navigate('Login') } },
        //         ]
        //     )}
        // </View>


    )
}
