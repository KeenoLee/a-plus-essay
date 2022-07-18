import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import OrderSubmission from './OrderSubmission';
import welcome from '../pages/Welcome';
import Register from './Register';
import FAQ from '../pages/FAQ';
import Rules from '../pages/Rules';
import ContactUs from '../pages/ContactUs';
import LoginPage from './LoginPage'
import HomeScreen from './HomeScreen';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();


export function HomeDrawer() {
    const navigation = useNavigation()
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerPosition: "right",
                drawerActiveTintColor: "#5eead4",
                drawerStyle: {
                    // width: 500,
                },

                
            }}
        >
            <Drawer.Screen  name="Home" component={HomeScreen} />
            <Drawer.Screen name="Login" component={LoginPage} />
            <Drawer.Screen name="Sign up" component={Register} />
            <Drawer.Screen name="Rules" component={Rules} />
            <Drawer.Screen name="FAQ" component={FAQ} />
            <Drawer.Screen name="Contact Us" component={ContactUs} />
            <Drawer.Screen name="Order Submission" component={OrderSubmission} />
            <Drawer.Screen name="Logout" component={welcome} />
        </Drawer.Navigator>
    );
}