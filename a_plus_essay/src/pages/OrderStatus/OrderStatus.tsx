import { Alert } from 'react-native'
import React from 'react'
import { Box, HStack, IconButton, StatusBar, Text, View } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// Status Page 
import PendingPage from './PendingPage';
import MatchingPage from './MatchingPage';
import OngoingPage from './OngoingPage';
import CompletedPage from './CompletedPage';

const MainTab = createMaterialTopTabNavigator<MainTabParamList>()

export type MainTabParamList = {
    Pending: undefined,
    Matching:undefined,
    Ongoing: undefined,
    Completed: undefined,
}

export function TopTabNavigator() {
    return (
        <MainTab.Navigator
            initialRouteName="Pending"
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarStyle: { backgroundColor: '#BBD3CF' },
                tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' },
                tabBarIndicatorStyle: {backgroundColor: 'white'}
            }}>
            <MainTab.Screen name="Pending" component={PendingPage} />
            <MainTab.Screen name="Matching" component={MatchingPage} />
            <MainTab.Screen name="Ongoing" component={OngoingPage} />
            <MainTab.Screen name="Completed" component={CompletedPage} />
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
