import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { View, Text } from 'react-native'
import React from 'react'
import Chatroom from '../components/Chatroom'


const Stack = createStackNavigator();

export default function ChatList() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chatroom" component={Chatroom} />
    </Stack.Navigator>
  )
}