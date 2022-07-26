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
  Alert,
  Button,
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
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Register from './src/components/Register';
// import LoadingScreen from './src/components/LoadingScreen';
import Home from './pages/Home';
import Notification from './pages/Notification';
import ChatListScreen from './pages/ChatList';
import ChatStack from './pages/ChatList';
import Register from './components/Register';
import SelectTutor from './components/SelectTutor';
import TutorInformation from './components/TutorInformation';
import OrderMatched from './components/OrderMatched';
// import OrderSubmission from './backup/OrderSubmission';

import { Center, NativeBaseProvider, Fab, Box } from 'native-base';
import OrderSubmission from './components/OrderSubmission';
import SuccessRegister from './components/SuccessRegister';
import LoadingScreen from './components/LoadingScreen';
import LoginPage from './components/LoginPage';
import Chatroom from './components/Chatroom';

import OrderStatus from './pages/OrderStatus/OrderStatus';
import { HomeDrawer } from './components/HomeDrawer';
import HomeScreen from './components/HomeScreen';
import Account from './components/Account';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './redux/store';
import { AppParamList, useAppNavigation } from './routes';
import { useEffect } from 'react';
import { getData } from './storage/storage';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode'
import { fetchLoginWithToken } from './redux/auth/actions';
import { AppDispatch } from './redux/dispatch';
import { roundToNearestMinutes } from 'date-fns';
import ViewMatchedOrder from './pages/ViewMatchedOrder';
import Comment from './pages/Comment';
import AboutUs from './pages/AboutUs';
// import OrderSubmission from './src/components/OrderSubmission';

const Stack = createStackNavigator<AppParamList>();
const Tab = createBottomTabNavigator();

// Floating Action Button (FAB)

export const Fabtn = () => {
  return (
    <Center>
      <Box w="50" shadow="2" rounded="lg">
        <Fab
          _pressed={{
            backgroundColor: 'teal.800',
          }}
          renderInPortal={true}
          shadow={2}
          right={9}
          marginBottom={90}
          backgroundColor="teal.700"
          icon={<Ionicons name="notifications" color="white" size={18} />}
        />
      </Box>
    </Center>
  );
};

// Bottom Tab navigation
export const Tabs = () => {
  const navigation = useAppNavigation();
  const state = useSelector((state: RootState) => state.auth);
  return (
    <Tab.Navigator
      // initialRouteName="View Matched Order"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarStyle: { backgroundColor: '#BBD3CF' },
        headerStyle: { backgroundColor: '#BBD3CF' },
        // headerShown: false
      }}>
      {/* <Tab.Screen name="View Matched Order" component={ViewMatchedOrder} /> */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" color={color} size={focused ? 30 : size} />
          ),
        }}
      />
      <Tab.Screen
        name="Order Status"
        component={OrderStatus}
        options={{
          headerRight: () => (state?.tutor ? null :
            <View
              style={{
                flexDirection: 'row',
                width: 50,
                justifyContent: 'space-between',
                marginRight: 15,
              }}>
              <Ionicons name="funnel" color="grey" size={18} />
              <Ionicons
                name="add-circle"
                color="grey"
                size={18}
                onPress={() => {
                  navigation.navigate('Order Submission');
                }}
              />
            </View>
          ),

          // headerStyle: { backgroundColor: '#BBD3CF' },
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'left',
          tabBarLabel: 'Order',
          // TODO: No. of unread message
          tabBarBadge: '1',
          tabBarBadgeStyle: { backgroundColor: '#0d9488' },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="hourglass"
              color={color}
              size={focused ? 30 : size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{
          tabBarLabel: 'Chats',
          // TODO: No. of unread message
          tabBarBadge: '1',
          tabBarBadgeStyle: { backgroundColor: '#0d9488' },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="chatbubbles"
              color={color}
              size={focused ? 30 : size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ focused, color, size }) => (
            // Sometime cannot navigate
            <Ionicons
              name="person-circle"
              color={color}
              size={focused ? 30 : size}
              onPress={() =>
                state.user ?
                  navigation.navigate('Account') :
                  Alert.alert('Unauthorized', 'Please login to view profile!', [
                    {
                      text: 'Login',
                      onPress: () => {
                        navigation.navigate('Login');
                      },
                    },
                    {
                      text: 'Close',
                      onPress: () => {
                        null;
                      },
                    },
                  ])
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const RegisterStack = createStackNavigator();

function RegisterStacks() {
  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen name="RegisterSuccess" component={Register} />
      <RegisterStack.Screen name="TutorAcademic" component={Register} />
    </RegisterStack.Navigator>
  );
}

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#BBD3CF' },
        headerBackTitleVisible: false,
      }}>
      {/* <NavigationContainer> */}
      {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Home Drawer" component={HomeDrawer} options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="Welcome"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      {/* {(props)=> <LoginPage navigation={props}/>} */}
      {/* </Stack.Screen> */}
      {/* <Stack.Screen name="ChatList" component={ChatList} options={{ headerShown: false }} /> */}
      {/* <HomeDrawer /> */}
      {/* <Stack.Navigator initialRouteName="Order Submission" screenOptions={{headerStyle:{backgroundColor: '#ccfbf1'}}}> */}
      {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
      {/* <Stack.Screen name="HomeScreen" component={Tabs} /> */}
      {/* <Stack.Screen name="Welcome" component={LoginPage} /> */}
      {/* {(props)=> <LoginPage navigation={props}/>} */}
      {/* </Stack.Screen> */}
      {/* <Stack.Screen name="ChatList" component={ChatList}/>
          <Stack.Screen name="Success Register" component={SuccessRegister} />
          <Stack.Screen name="Order Submission" component={OrderSubmission} />
          {/* {(props) => <LoginPage navigation={props} />}
          </Stack.Screen> */}
      {/* <Stack.Screen name="ChatList" component={ChatList} /> */}
      <Stack.Screen name="Success Register" component={SuccessRegister} />
      <Stack.Screen name="Thank You" component={OrderMatched} />
      <Stack.Screen
        name="Tutor Information"
        component={TutorInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Select Tutor" component={SelectTutor} />
      <Stack.Screen name="Comment" component={Comment} />
      <Stack.Screen name="About Us" component={AboutUs} />
      {/* <Stack.Screen name="Register" component={Register} /> */}
      <Stack.Screen name="Message" component={Notification} />
      <Stack.Screen name="Chatroom" component={Chatroom}
        options={{ headerTitle: '' }}
      // options={{
      //   headerTitle: 'Chatroom',
      //   headerRight: () => {
      //     return (
      //       <Button titleStyle={{fontSize: 10}}
      //         onPress={() => Alert.alert('Comfirm to complete?')}
      //         title="Complete"
      //         color="rgb(42,122,255)"
      //       />
      //     )
      //   }
      // }}
      />
      {/* <Fabtn/> */}
      {/* </NavigationContainer> */}
    </Stack.Navigator>

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
  );
}

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

function App2() {
  const state = useSelector((state: RootState) => state.auth)
  console.log('USERID?? ID??: ', state.user)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    console.log('going to get token from async storage...')
    async function getStorage() {
      if (!state.token) {
        const token = await getData('token')
        console.log('TOKEN from App: ', token)
        if (token) {
          const userInfo = jwt_decode(token)
          console.log('decoded?: ', userInfo)
          const result = await dispatch(fetchLoginWithToken(token))
          console.log('result from login with token: ', result)
        }
      }
    }
    getStorage()
  }, [])
  return (
    <NativeBaseProvider config={config}>
      <NavigationContainer>
        {/* <Fabtn/> */}
        <HomeDrawer />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
export default function App() {
  return <Provider store={store}>
    <App2 />
  </Provider>
}


