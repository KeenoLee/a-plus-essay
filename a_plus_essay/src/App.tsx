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
import Home from './pages/Home'
import Notification from './pages/Notification';
import ChatList from './pages/ChatList';
import Register from './components/Register';
import SelectTutor from './components/SelectTutor';
import TutorInformation from './components/TutorInformation';
import OrderMatched from './components/OrderMatched';
// import OrderSubmission from './backup/OrderSubmission';

import { NativeBaseProvider } from 'native-base';
import OrderSubmission from './components/OrderSubmission';
import SuccessRegister from './components/SuccessRegister';
import LoadingScreen from './components/LoadingScreen';
import LoginPage from './components/LoginPage';
import Chatroom from './components/Chatroom';

import OrderStatus from './pages/OrderStatus';
// import OrderSubmission from './src/components/OrderSubmission';
<<<<<<< HEAD
export type RootStackParamList = {
=======

type RootStackParamList = {
>>>>>>> 5a3d8f8435f905f979e4db42a84896ad95e52219
  Welcome: undefined
  ChatList: undefined
  'Success Register': undefined
  'Order Submission': undefined
  'Thank You': undefined
  'Tutor Information': undefined
  'Select Tutor': undefined
  HomeScreen: undefined
  Register: undefined
  Chats: undefined
  Message: undefined
  Status: undefined
  'A Plus Company': undefined
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarStyle: { backgroundColor: '#BBD3CF' },
        headerShown: false
      }}>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" color={color} size={focused ? 30 : size} />
          ),
        }} />
      <Tab.Screen name="Order Status" component={OrderStatus}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="hourglass" color={color} size={focused ? 30 : size} />
          ),
        }}
      />
      <Tab.Screen name="Chats" component={ChatList}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="chatbubbles" color={color} size={focused ? 30 : size} />
          ),
        }} />
      <Tab.Screen name="Account" component={Notification}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person-circle" color={color} size={focused ? 30 : size} />
          ),
        }} />
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
<<<<<<< HEAD
        <Stack.Navigator initialRouteName="Welcome">
          {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
          <Stack.Screen name="A Plus Company" component={Tabs} />
          <Stack.Screen name="Welcome" component={LoginPage}/>
            {/* {(props)=> <LoginPage navigation={props}/>} */}
=======
        <Stack.Navigator initialRouteName="HomeScreen">
          {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
          <Stack.Screen name="HomeScreen" component={Tabs} />
          <Stack.Screen name="Welcome" component={LoginPage} />
          {/* {(props)=> <LoginPage navigation={props}/>} */}
>>>>>>> 5a3d8f8435f905f979e4db42a84896ad95e52219
          {/* </Stack.Screen> */}
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="Success Register" component={SuccessRegister} />
          <Stack.Screen name="Order Submission" component={OrderSubmission} />
          <Stack.Screen name="Thank You" component={OrderMatched} />
          <Stack.Screen name="Tutor Information" component={TutorInformation} />
          <Stack.Screen name="Select Tutor" component={SelectTutor} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Chats" component={Chatroom} />
          <Stack.Screen name="Message" component={Notification} />
<<<<<<< HEAD
          <Stack.Screen name="Status" component={Status} />
          {/* <Stack.Screen name="A Plus Company" component={Home} /> */}

=======
>>>>>>> 5a3d8f8435f905f979e4db42a84896ad95e52219
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>

    // <NativeBaseProvider>
    //   <NavigationContainer>
    //     {/* Check Authentication in loading page */}
    //     <Stack.Navigator initialRouteName="Loading">
    //       <Stack.Screen name="Loading" component={LoadingScreen} />

    //       <Stack.Screen name="A Plus Company" component={Tabs} />
    //       <Stack.Screen name="Message" component={Notification} />
    //       <Stack.Screen name="Status" component={Status} />

    //       {/* Stack to Login Page if Authentication is not found */}
    //       <Stack.Screen name="Welcome" component={LoginPage} />
    //       <Stack.Screen name="Register" component={Register} />
    //       <Stack.Screen name="Success Register" component={SuccessRegister} />

    //       {/* Stack to Home if Authentication is found */}
    //       <Stack.Screen name="A Plus Company" component={Home} />

    //       {/* Pages for Students */}
    //       <Stack.Screen name="Order Submission" component={OrderSubmission} />
    //       <Stack.Screen name="Thank You" component={OrderMatched} />
    //       <Stack.Screen name="Tutor Information" component={TutorInformation} />
    //       <Stack.Screen name="Select Tutor" component={SelectTutor} />

    //       {/* Pages for Tutor */}
    //       {/* TODO: Reply to randomly allocated orders */}

    //       {/* Pages for both Students and Tutors */}
    //       <Stack.Screen name="Chats" component={ChatList} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </NativeBaseProvider>


  )
}

const styles = StyleSheet.create({


})


