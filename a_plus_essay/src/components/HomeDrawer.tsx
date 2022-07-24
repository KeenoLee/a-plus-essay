import { View, Text } from 'react-native';
import * as React from 'react';

import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import OrderSubmission from './OrderSubmission';
import Welcome from '../pages/Welcome';
import Register from './Register';
import FAQ from '../pages/FAQ';
import Rules from '../pages/Rules';
import AboutUs from '../pages/AboutUs';
import LoginPage from './LoginPage';
import HomeScreen from './HomeScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import App, { HomeStack, Tabs } from '../App';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectTutor from './SelectTutor';
import ChatRoom from './Chatroom';
import { useRoute } from '@react-navigation/native';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/dispatch';
import { logout } from '../redux/auth/actions';
import { getData, removeData } from '../storage/storage';

const Drawer = createDrawerNavigator();

export function HomeDrawer() {
  const state = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>()
  //    let loc = useLocationHook();

  // const [ showsMenu, setShowsMenu ] = useState(true)

  return (
    <Drawer.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: '#BBD3CF' },
        // headerShown:false,
        // headerShown: showsMenu,
        // headerLeft: ()=>null,
        // headerRight: ()=><TouchableOpacity onPress={()=>navigation.toggleDrawer()}><Text>@</Text></TouchableOpacity>,
        // drawerType: 'front',
        headerTintColor: 'white',
        // headerTitle: '',
        drawerPosition: 'left',
        drawerActiveTintColor: '#5eead4',
        drawerStyle: {
          // width: 500,
        }
      })}
      // drawerContent={}
      initialRouteName="Home Stack">
      <Drawer.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false, title: 'A Plus Essay' }}
      />
      {/* <Drawer.Screen name='App' component={App} /> */}
      {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
      {/* <Drawer.Screen name="Login" component={LoginPage} options={{ title: ""}}/> */}
      {state.token ? null : (
        <>
          <Drawer.Screen name="Login" component={LoginPage} options={{ headerTitle: '' }} />
          <Drawer.Screen name="Sign up" component={Register} />
        </>
      )}
      <Drawer.Screen name="Rules" component={Rules} />
      <Drawer.Screen name="FAQ" component={FAQ} />
      <Drawer.Screen name="About Us" component={AboutUs} />
      {state.user && !state.tutor ? (
        <Drawer.Screen name="Order Submission" component={OrderSubmission} />
      ) : null}
      {state.token ? (
        <Drawer.Screen name="Chatroom" component={ChatRoom} />
      ) : null}
      {state.token ? (
        <Drawer.Screen name="Logout" component={LoginPage} listeners={{
          drawerItemPress: async () => {
            dispatch(logout())
            await removeData('token')
            console.log('Store should be removed: ', state)
            console.log('async storage should be removed: ', await getData('token'))
          }
        }} options={() => ({
          headerShown: false
        })} />
      ) : null}
    </Drawer.Navigator>
  );
}
