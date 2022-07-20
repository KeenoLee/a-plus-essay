import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import OrderSubmission from './OrderSubmission';
import Welcome from '../pages/Welcome';
import Register from './Register';
import FAQ from '../pages/FAQ';
import Rules from '../pages/Rules';
import ContactUs from '../pages/ContactUs';
import LoginPage from './LoginPage'
import HomeScreen from './HomeScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import App, { HomeStack, Tabs } from '../App';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

export function HomeDrawer() {
    const navigation = useNavigation<any>()
    return (
        <Drawer.Navigator
            screenOptions={{
                // headerLeft: ()=>null,
                // headerRight: ()=><TouchableOpacity onPress={()=>navigation.toggleDrawer()}><Text>@</Text></TouchableOpacity>,
                // drawerType: 'front',
                drawerPosition: "left",
                drawerActiveTintColor: "#5eead4",
                drawerStyle: {
                    // width: 500,
                },
            }}
            // drawerContent={}
            // initialRouteName='Home Stack'
        >
            <Drawer.Screen name="A Plus Essay" component={HomeStack}  />
            {/* <Drawer.Screen name='App' component={App} /> */}
            {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
            <Drawer.Screen name="Login" component={LoginPage} />
            <Drawer.Screen name="Sign up" component={Register} />
            <Drawer.Screen name="Rules" component={Rules} />
            <Drawer.Screen name="FAQ" component={FAQ} />
            <Drawer.Screen name="Contact Us" component={ContactUs} />
            <Drawer.Screen name="Order Submission" component={OrderSubmission} />
            <Drawer.Screen name="Logout" component={LoginPage} />
        </Drawer.Navigator>
    );
}