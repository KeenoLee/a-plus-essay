/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Register from './src/components/Register';
// import LoadingScreen from './src/components/LoadingScreen';
import Home from './src/pages/Home'
import Notification from './src/pages/Notification';
import Status from './src/pages/Status';
import ChatMain from './src/pages/ChatMain';
import Register from './src/components/Register';
import SelectTutor from './src/components/SelectTutor';
import TutorInformation from './src/components/TutorInformation';
import OrderMatched from './src/components/OrderMatched';
// import OrderSubmission from './backup/OrderSubmission';

import { NativeBaseProvider } from 'native-base';
import OrderSubmission from './src/components/OrderSubmission';
import exsample from './src/components/exsample';
// import OrderSubmission from './src/components/OrderSubmission';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarStyle: { backgroundColor: '#BBD3CF' }
      }}>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" color={color} size={focused ? 30 : size} />
          ),
        }} />
      <Tab.Screen name="Chats" component={ChatMain}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={focused ? 30 : size} />
          ),
        }} />
      <Tab.Screen name="Message" component={Notification}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="notifications" color={color} size={focused ? 30 : size} />
          ),
        }} />
      <Tab.Screen name="Status" component={Status}
        options={{
          tabBarLabel: 'Status',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="hourglass" color={color} size={focused ? 30 : size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
// const RegisterStack = createStackNavigator()

// function RegisterStacks() {
//   return (
//     <RegisterStack.Navigator>
//       <RegisterStack.Screen name='RegisterSuccess' component={Register} />
//       <RegisterStack.Screen name='TutorAcademic' component={Register} />
//     </RegisterStack.Navigator>
//   )
// }

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Order Submission">
          {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
          {/* <Stack.Screen name="A Plus Company" component={Tabs} /> */}
          {/* <Stack.Screen name="123" component={exsample} /> */}
          <Stack.Screen name="Order Submission" component={OrderSubmission} />
          <Stack.Screen name="Thank You" component={OrderMatched} />
          <Stack.Screen name="Tutor Information" component={TutorInformation} />
          <Stack.Screen name="Select Tutor" component={SelectTutor} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Chats" component={ChatMain} />
          <Stack.Screen name="Message" component={Notification} />
          <Stack.Screen name="Status" component={Status} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({


})


