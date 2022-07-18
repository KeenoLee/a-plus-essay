import { View, Text } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import Chatroom from './Chatroom';
import OrderSubmission from './OrderSubmission';

const Drawer = createDrawerNavigator();

export function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Feed" component={Chatroom} />
            <Drawer.Screen name="Article" component={OrderSubmission} />
        </Drawer.Navigator>
    );
}